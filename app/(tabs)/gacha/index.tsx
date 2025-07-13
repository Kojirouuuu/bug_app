import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRewardStore } from '@/store/rewardStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

export default function GachaScreen() {
  const { points, consumePoints, setBoost } = useRewardStore();

  const handleDraw = async () => {
    if (!consumePoints(10)) return;
    router.push('/gacha/movie');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.points}>ポイント: {points}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDraw}
          activeOpacity={0.8}
        >
          <Image source={require('@/assets/images/mushidama.png')} style={styles.buttonIcon}/>
          <Text style={styles.buttonText}>ガチャを回す (10pt)</Text>
        </TouchableOpacity>
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
    backgroundColor: '#3dba8e',
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  buttonIcon: {
    width: 32,
    height: 32,
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
