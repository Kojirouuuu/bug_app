import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useRewardStore } from '@/store/rewardStore';
import { useArticleStore } from '@/store/articleStore';
import { Insect } from '@/src/API';

const { width, height } = Dimensions.get('window');

type GachaResult = 'jackpot' | 'win' | 'lose';

export default function GachaResults() {
  const params = useLocalSearchParams();
  const [result, setResult] = useState<GachaResult>('lose');
  const [showResult, setShowResult] = useState(false);
  const [rewardBug, setRewardBug] = useState<Bug | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const { addPoints } = useRewardStore();
  const { addInsect } = useArticleStore();

  useEffect(() => {
    // パラメータから結果を取得
    const gachaResult = (params.results as GachaResult) || 'lose';
    setResult(gachaResult);

    // アニメーション開始
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
      giveReward(gachaResult);
    });
  }, [params.result]);

  const giveReward = (gachaResult: GachaResult) => {
    let points = 0;
    let bug: Insect | null = null;

    switch (gachaResult) {
      case 'jackpot':
        points = 1000;
        bug = {
          id: Date.now().toString(),
          scientificName: 'Papilio machaon',
          japaneseName: 'アゲハチョウ',
          family: 'Papilionidae',
          s3path:
            'https://images.pexels.com/photos/672142/pexels-photo-672142.jpeg?auto=compress&cs=tinysrgb&w=400',
          foundAt: new Date(),
          notes: '大当たりで見つけた美しい蝶！',
        };
        break;
      case 'win':
        points = 100;
        bug = {
          id: Date.now().toString(),
          scientificName: 'Coccinella septempunctata',
          japaneseName: 'ナナホシテントウ',
          family: 'Coccinellidae',
          s3path:
            'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
          foundAt: new Date(),
          notes: 'ガチャで見つけた幸運の虫！',
        };
        break;
      case 'lose':
        points = 10;
        break;
    }

    addPoints(points);
    if (bug) {
      addInsect(bug);
      setRewardBug(bug);
    }
  };

  const getResultText = () => {
    switch (result) {
      case 'jackpot':
        return {
          title: '大当たり！',
          subtitle: 'レアな虫を発見！',
          color: '#FFD700',
        };
      case 'win':
        return {
          title: '当たり！',
          subtitle: '新しい虫を発見！',
          color: '#FF6B6B',
        };
      case 'lose':
        return {
          title: '外れ...',
          subtitle: 'また挑戦してみよう！',
          color: '#6C757D',
        };
    }
  };

  const getPointsText = () => {
    switch (result) {
      case 'jackpot':
        return '+1000ポイント';
      case 'win':
        return '+100ポイント';
      case 'lose':
        return '+10ポイント';
    }
  };

  const resultInfo = getResultText();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.resultContainer,
          {
            opacity: animation,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={[styles.resultTitle, { color: resultInfo.color }]}>
          {resultInfo.title}
        </Text>
        <Text style={styles.resultSubtitle}>{resultInfo.subtitle}</Text>

        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{getPointsText()}</Text>
        </View>

        {showResult && rewardBug && (
          <View style={styles.bugContainer}>
            <Image source={{ uri: rewardBug.img }} style={styles.bugImage} />
            <Text style={styles.bugName}>{rewardBug.japaneseName}</Text>
            <Text style={styles.bugScientificName}>
              {rewardBug.scientificName}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/gacha/movie')}
          >
            <Text style={styles.buttonText}>もう一度ガチャを回す</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              ホームに戻る
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: width * 0.9,
    maxWidth: 400,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  pointsContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  pointsText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bugContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bugImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  bugName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  bugScientificName: {
    fontSize: 14,
    color: '#cccccc',
    fontStyle: 'italic',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});
