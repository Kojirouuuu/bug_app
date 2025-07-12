import json
import boto3
import os
import base64
import logging
from botocore.exceptions import ClientError

# Configure root logger
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
    level=LOG_LEVEL
)
logger = logging.getLogger(__name__)

# Initialize Bedrock client once at cold start
try:
    bedrock = boto3.client(
        service_name="bedrock-runtime",
        region_name=os.getenv("AWS_REGION", "us-east-1"),
    )
    logger.info("Initialized Bedrock client for region %s", os.getenv("AWS_REGION", "ap-northeast-1"))
except Exception as e:
    logger.exception("Failed to initialize Bedrock client")
    raise

# ============================
# Prompts & helpers
# ============================
SYSTEM_PROMPT = """
You are an entomologist who specialises in identifying insects from photographs.
Return **only** a JSON object with the three keys shown below. If you are unsure, return an empty string for that key—never invent data.

Keys (language to use for value)
--------------------------------------------------------
scientificName    Latin binomial         例: Dynastes hercules
japaneseName      Japanese common name   例: ヘラクレスオオカブト
family            Latin *or* Japanese    例: Scarabaeidae / コガネムシ科

► Do **not** output anything except the JSON.
► Key order must stay: scientificName → japaneseName → family.
► Short comments are unnecessary—just the JSON.
""".strip()

REQUIRED_FIELDS = ("scientificName", "japaneseName", "family")


def _validate_json(data: dict) -> dict:
    if not isinstance(data, dict):
        raise ValueError("Response must be a JSON object")
    for field in REQUIRED_FIELDS:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
        if not isinstance(data[field], str):
            raise ValueError(f"Field '{field}' must be a string")
    return data


def _build_bedrock_request(b64_image: str) -> dict:
    # Combine system prompt and image into a single user message, per Bedrock Anthropic spec
    return {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 512,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text",  "text": SYSTEM_PROMPT},
                    {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": b64_image}}
                ]
            }
        ],
    }


def _extract_json(text: str) -> dict:
    if not text:
        raise ValueError("Empty response text from model")
    if "```" in text:
        start = text.find("```") + 3
        end = text.find("```", start)
        text = text[start:end].strip()
    left = text.find("{")
    right = text.rfind("}")
    if left == -1 or right == -1:
        raise ValueError("No JSON object detected in model response")
    return json.loads(text[left:right+1])


def handler(event, context):
    logger.info("Received event: %s", event)
    try:
        body = json.loads(event.get("body", "{}"))
        b64_image = body.get("photo", "")
        logger.debug("Received photo field length: %d", len(b64_image))
    except json.JSONDecodeError as e:
        logger.error("JSON decode error: %s", e)
        return _response(400, {"error": "Request body is not valid JSON"})

    if not b64_image:
        logger.warning("Missing 'photo' in request")
        return _response(400, {"error": "'photo' (base64 image data) is required"})

    try:
        decoded = base64.b64decode(b64_image)
        logger.debug("Decoded image size: %d bytes", len(decoded))
    except Exception as e:
        logger.error("Invalid base64 data: %s", e)
        return _response(400, {"error": "'photo' is not valid base64"})

    try:
        req = _build_bedrock_request(b64_image)
        logger.info("Invoking Bedrock model anthropic.claude-3-5-sonnet-20240620-v1:0")
        raw = bedrock.invoke_model(
            modelId="anthropic.claude-3-5-sonnet-20240620-v1:0",
            body=json.dumps(req),
        )
        resp = json.loads(raw["body"].read())
        assistant_text = resp.get("content", [])[0].get("text", "")
        logger.debug("Model reply text: %s", assistant_text)
    except ClientError as e:
        code = e.response.get("Error", {}).get("Code", "Unknown")
        msg = e.response.get("Error", {}).get("Message", "")
        logger.exception("Bedrock API error (%s): %s", code, msg)
        return _response(502, {"error": f"Bedrock API Error ({code}): {msg}"})
    except Exception as e:
        logger.exception("Unexpected error calling Bedrock")
        return _response(500, {"error": "Internal server error"})

    try:
        data = _extract_json(assistant_text)
        validated = _validate_json(data)
        logger.info("Validated response: %s", validated)
    except Exception as e:
        logger.error("Parsing/validation error: %s", e)
        return _response(500, {"error": f"Model response error: {str(e)}"})

    return _response(200, validated)


def _response(status: int, body: dict) -> dict:
    resp = {
        "statusCode": status,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps(body, ensure_ascii=False),
    }
    logger.debug("Response: %s", resp)
    return resp
