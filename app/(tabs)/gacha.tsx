import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { drawGacha } from '@/services/mockApi';
import { useRewardStore } from '@/store/rewardStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

export default function GachaScreen() {
  const [result, setResult] = useState<string | null>(null);
  const { points, consumePoints, setBoost } = useRewardStore();

  const handleDraw = async () => {
    if (!consumePoints(10)) return;
    const res = await drawGacha();
    setResult(res);
    if (res === '大当たり') setBoost(2);
    else if (res === 'あたり') setBoost(1);
    else setBoost(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.points}>ポイント: {points}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDraw} activeOpacity={0.8}>
          <Ionicons name="gift" size={40} color={Colors.white} />
          <Text style={styles.buttonText}>ガチャを回す (10pt)</Text>
        </TouchableOpacity>
        {result && (
          <Text style={styles.result}>結果: {result}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  points: {
    fontSize: Typography.large,
    color: Colors.primary,
    marginBottom: Spacing.xl,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.large,
    fontWeight: 'bold',
  },
  result: {
    fontSize: Typography.extraLarge,
    color: Colors.darkGray,
    marginTop: Spacing.lg,
    fontWeight: '600',
  },
});

