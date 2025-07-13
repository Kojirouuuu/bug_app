// Mock API functions - replace with real AWS integrations later
import { AnalyzeResult, ChatTurn } from '@/types';
import { API, graphqlOperation } from 'aws-amplify';
import { rollGacha } from '@/src/graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// TODO: Replace with AWS Bedrock Vision API integration
export async function analyzeBugImage(imageUri: string): Promise<AnalyzeResult> {
  await delay(2000); // Simulate API call delay
  
  const mockResults: AnalyzeResult[] = [
    {
      scientificName: "Armadillidium vulgare",
      japaneseName: "ダンゴムシ",
      family: "Armadillidiidae",
      img: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      scientificName: "Coccinella septempunctata",
      japaneseName: "ナナホシテントウ",
      family: "Coccinellidae",
      img: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      scientificName: "Pieris rapae",
      japaneseName: "モンシロチョウ",
      family: "Pieridae",
      img: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  
  return mockResults[Math.floor(Math.random() * mockResults.length)];
}

// TODO: Replace with AWS Bedrock Chat API integration
export async function chatWithBugDoctor(question: string): Promise<ChatTurn[]> {
  await delay(1500); // Simulate API call delay
  
  const mockResponses = [
    "ダンゴムシは陸に住む甲殻類で、丸くなることで身を守るよ！",
    "この虫は昼間は隠れていて、夜に活動することが多いんだ。",
    "とても興味深い質問だね！この虫の特徴をもっと教えてあげるよ。",
    "虫たちにはそれぞれ大切な役割があるんだよ。",
    "素晴らしい観察力だね！虫について詳しく説明してあげよう。",
    "その虫は生態系でとても重要な役割を果たしているんだ。",
  ];
  
  const followUpQuestions = [
    "この虫は何を食べるの？",
    "どこに住んでいるの？",
    "どうして丸くなるの？",
    "他にはどんな虫がいるの？",
    "この虫の天敵は何？",
    "どうやって子供を育てるの？",
  ];
  
  return [
    { role: "child", message: question },
    { 
      role: "doctor", 
      message: mockResponses[Math.floor(Math.random() * mockResponses.length)]
    },
    { 
      role: "doctor", 
      message: `次に興味があるかな？『${followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)]}』`
    },
  ];
}

// TODO: Replace with AWS Bedrock Chat API integration for friend chat
export async function chatWithFriend(message: string): Promise<ChatTurn[]> {
  await delay(1200); // Simulate API call delay
  
  const friendResponses = [
    "わあ！それすごく面白いね！僕も虫が大好きなんだ！",
    "一緒に虫探しをしよう！きっと楽しいよ！",
    "その虫、僕も見たことがあるよ！とってもかわいいよね！",
    "虫って本当に不思議だよね！もっと教えて！",
    "やったー！虫のお話だ！僕も虫博士になりたいな！",
    "すごいすごい！君は虫のことをよく知ってるね！",
    "一緒に虫の観察をしない？きっと新しい発見があるよ！",
  ];
  
  const friendQuestions = [
    "どんな虫が一番好き？",
    "今度一緒に虫探しをしよう！",
    "虫の鳴き声を聞いたことある？",
    "虫になったらどんな気持ちかな？",
    "虫の色ってきれいだよね！",
    "虫の家族はどんな感じかな？",
  ];
  
  return [
    { role: "child", message: message },
    { 
      role: "friend", 
      message: friendResponses[Math.floor(Math.random() * friendResponses.length)]
    },
    { 
      role: "friend", 
      message: friendQuestions[Math.floor(Math.random() * friendQuestions.length)]
    },
  ];
}

// Mock posting of discovery data to backend
export async function postDiscovery(imageUri: string, location: { lat: number; lon: number }) {
  await delay(500);
  // normally would save to backend and award points
  return { pointsAwarded: 5 };
}

// Updated Gacha draw function that uses the rollGacha mutation
export async function drawGacha(userId: string, gachaId: string): Promise<'大当たり' | 'あたり' | 'ハズレ'> {
  try {
    // Generate a client-side UUID for idempotency
    const resultId = uuidv4();
    
    // Call the rollGacha mutation
    const result = await API.graphql(
      graphqlOperation(rollGacha, {
        gachaID: gachaId,
        userID: userId,
        clientGeneratedId: resultId // This would be used in a real implementation for idempotency
      })
    );
    
    // Determine the result based on the ticket type
    const ticketType = result.data.rollGacha.obtainedTicket.type;
    
    if (ticketType === 'LEGENDARY_GACHA_TICKET') {
      return '大当たり';
    } else if (ticketType === 'RARE_GACHA_TICKET') {
      return 'あたり';
    } else {
      return 'ハズレ';
    }
  } catch (error) {
    console.error('Error rolling gacha:', error);
    throw error;
  }
}

// Mock nearby bug recommendation
export async function getNearbyBugs(boostLevel: number): Promise<string[]> {
  await delay(500);
  const bugs = ['ダンゴムシ', 'ナナホシテントウ', 'モンシロチョウ', 'カブトムシ', 'クワガタ'];
  const count = 3 + boostLevel;
  const shuffled = bugs.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
