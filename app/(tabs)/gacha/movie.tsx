import React, { useEffect, useState } from 'react';
import { useEvent, useEventListener } from 'expo';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { router } from 'expo-router';

export default function GachaMovie() {
  const [gachaResult, setGachaResult] = useState<'jackpot' | 'win' | 'lose'>(
    'lose'
  );
  const [videoSource, setVideoSource] = useState<any | null>(null);
  const [isLooping, setIsLooping] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);

  // 初回のみガチャ結果決定＆動画ソースセット
  useEffect(() => {
    setIsCalculating(true);
    // ガチャ結果を決定
    const random = Math.random() * 100;
    if (random < 1) {
      setVideoSource(require('@/assets/movies/jackpot.mp4')); // 1%の確率で大当たり
      setGachaResult('jackpot');
    } else if (random < 20) {
      setVideoSource(require('@/assets/movies/win.mp4')); // 19%の確率で当たり
      setGachaResult('win');
    } else {
      setVideoSource(require('@/assets/movies/lose.mp4')); // 80%の確率で外れ
      setGachaResult('lose');
    }
    setIsCalculating(false);
  }, []);

  // playerはvideoSourceが決まってから生成
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.timeUpdateEventInterval = 0.1; // 100ms 間隔で timeUpdate
    player.play();
  });

  const { status, error } = useEvent(player, 'statusChange', {
    status: player.status,
  });

  // 動画準備完了を監視
  useEffect(() => {
    if ((status as string) === 'readyToPlay') {
      setIsReady(true);
      player.play();
    }
  }, [status]);

  // 動画の時間更新を監視
  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    if (!player.duration) return;
    
    // ループ中は3.4秒でリセット
    if (isLooping && currentTime >= 3.4) {
      player.currentTime = 1.3;
      player.play();
      return;
    }
    
    // ボタン押下後は最後まで再生して遷移
    if (!isLooping && currentTime >= player.duration && !hasNavigated) {
      setHasNavigated(true);
      router.push(`/gacha/${gachaResult}`);
    }
  });

  // 3.4秒でループ
  useEffect(() => {
    if (
      isLooping &&
      player.duration > 0 &&
      player.currentTime >= 3.4
    ) {
      player.currentTime = 3.4;
      player.play();
    }
  }, [player.currentTime, isLooping]);

  // 残りを再生しきったら遷移
  useEffect(() => {
    if (
      !isLooping &&
      player.currentTime === player.duration &&
      !hasNavigated &&
      player.duration > 0
    ) {
      setHasNavigated(true);
      router.push({ pathname: `/gacha/${gachaResult}` as any });
    }
  }, [
    player.currentTime,
    isLooping,
    player.duration,
    hasNavigated,
    gachaResult,
  ]);

  if (isCalculating) {
    return (
      <View style={styles.container}>
        <Text>ガチャ中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <VideoView player={player} style={[styles.video, { zIndex: -1000 }]} />
      </TouchableWithoutFeedback>
      {isLooping && (
        <TouchableOpacity
          onPress={() => {
            setIsLooping(false);
            player.currentTime = 3.4;
            player.play();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 画面全体を使う
    justifyContent: 'center', // 縦方向中央揃え
    alignItems: 'center', // 横方向中央揃え
  },
  video: {
    width: '100%', // 幅いっぱいに表示
    height: '100%', // 高さいっぱいに表示
  },
button: {
  backgroundColor: 'transparent',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 8,
  zIndex: 1000,
  position: 'absolute',
  bottom: 60,
  alignSelf: 'center',

  // 追加: 画面全体に広げる
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
