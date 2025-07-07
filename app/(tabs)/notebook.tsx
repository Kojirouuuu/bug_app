import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBugStore } from '@/store/bugStore';
import BugCard from '@/components/BugCard';
import { Colors, Typography, Spacing } from '@/constants/colors';

export default function NotebookScreen() {
  const { bugs } = useBugStore();

  const handleBugPress = (bugId: string) => {
    router.push(`/detail?id=${bugId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>虫図鑑</Text>
          <Text style={styles.subtitle}>
            発見した虫: {bugs.length}匹
          </Text>
        </View>

        {/* Bug List */}
        {bugs.length > 0 ? (
          bugs.map((bug) => (
            <BugCard
              key={bug.id}
              bug={bug}
              onPress={() => handleBugPress(bug.id)}
              showDate
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={Colors.gray} />
            <Text style={styles.emptyStateText}>
              まだ虫を発見していません
            </Text>
            <Text style={styles.emptyStateSubtext}>
              ホーム画面から虫を撮影して図鑑を作りましょう！
            </Text>
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    flex: 1,
    justifyContent: 'center',
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
});