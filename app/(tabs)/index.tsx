import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBugStore } from '@/store/bugStore';
import { useRewardStore } from '@/store/rewardStore';
import { getNearbyBugs } from '@/services/mockApi';
import BugCard from '@/components/BugCard';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

export default function HomeScreen() {
  const { bugs } = useBugStore();
  const { boostLevel } = useRewardStore();
  const [nearby, setNearby] = useState<string[]>([]);
  const recentBugs = bugs.slice(0, 3);

  const handleCapture = () => {
    router.push('/capture');
  };

  const handleBugPress = (bugId: string) => {
    router.push(`/detail?id=${bugId}`);
  };

  const handleViewAll = () => {
    router.push('/(tabs)/notebook');
  };

  useEffect(() => {
    getNearbyBugs(boostLevel).then(setNearby);
  }, [boostLevel]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>虫図鑑</Text>
          <Text style={styles.subtitle}>虫を見つけて撮影しよう！</Text>
        </View>

        {/* Camera Button */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCapture}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={48} color={Colors.white} />
          <Text style={styles.cameraButtonText}>虫を撮影する</Text>
        </TouchableOpacity>

        {/* Recent Discoveries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>最近の発見</Text>
            {bugs.length > 3 && (
              <TouchableOpacity onPress={handleViewAll}>
                <Text style={styles.viewAllText}>すべて見る</Text>
              </TouchableOpacity>
            )}
          </View>

          {recentBugs.length > 0 ? (
            recentBugs.map((bug) => (
              <BugCard
                key={bug.id}
                bug={bug}
                onPress={() => handleBugPress(bug.id)}
                showDate
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={64} color={Colors.gray} />
              <Text style={styles.emptyStateText}>
                まだ虫を発見していません
              </Text>
              <Text style={styles.emptyStateSubtext}>
                カメラボタンを押して最初の虫を撮影しましょう！
              </Text>
            </View>
          )}
        </View>

        {/* Nearby Recommendations */}
        {nearby.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>近くで見つかるかも?</Text>
            </View>
            {nearby.map((name, idx) => (
              <Text key={idx} style={styles.recommendItem}>• {name}</Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.medium,
    color: Colors.gray,
    textAlign: 'center',
  },
  cameraButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.large,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraButtonText: {
    color: Colors.white,
    fontSize: Typography.large,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  viewAllText: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyStateText: {
    fontSize: Typography.medium,
    color: Colors.gray,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  recommendItem: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.xs,
  },});