import { uploadData, getUrl } from '@aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Builds an S3 key for insect images following the pattern:
 * insect_image/<firstLetterOfInsectName>/<uuid>.jpg
 *
 * @param insectName The name of the insect
 * @param uuid A UUID string
 * @returns The formatted S3 key
 */
export const buildInsectImageKey = (
  insectName: string,
  uuid: string
): string => {
  const first = /^[A-Za-z]/.test(insectName[0])
    ? insectName[0].toLowerCase()
    : '_';
  return `insect_image/${first}/${uuid}.jpg`;
};

/**
 * Uploads an insect image to S3
 *
 * @param uri The local URI of the image file
 * @param insectName The name of the insect
 * @returns Object containing the S3 key and bucket name
 */
export const uploadInsectImage = async (uri: string, insectName: string) => {
  try {
    // Generate a UUID for the file
    const uuid = uuidv4();

    // Build the S3 key
    const path = buildInsectImageKey(insectName, uuid);

    // Convert the URI to a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload the file to S3
    const result = await uploadData({
      path,
      data: blob,
      options: {
        contentType: 'image/jpeg',
      },
    }).result;

    // Return the key and bucket
    return {
      path,
    };
  } catch (error) {
    console.error('Error uploading insect image:', error);
    throw new Error('Failed to upload image to S3');
  }
};

/**
 * Gets the URL for an S3 object
 *
 * @param key The S3 key of the object
 * @returns The URL of the object
 */
export const getImageUrl = async (key: string): Promise<string> => {
  try {
    const result = await getUrl({
      key,
    });
    return result.url.href;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw new Error('Failed to get image URL from S3');
  }
};
