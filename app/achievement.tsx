import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArticleStore } from '@/store/articleStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  reward: string;
  tips: string[];
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
};

export default function AchievementScreen() {
  const { achievementId } = useLocalSearchParams<{ achievementId: string }>();
  const { insects } = useArticleStore();

  const achievements: Achievement[] = [
    {
      id: 'first-discovery',
      title: 'はじめての発見',
      description:
        '初めて虫を発見して図鑑に登録しました！虫の世界への第一歩です。',
      icon: 'star',
      requirement: '最初の虫を発見する',
      reward: '虫博士への道がスタート！',
      tips: [
        'カメラボタンを押して虫を撮影してみよう',
        '庭や公園で虫を探してみよう',
        '小さな虫でも大発見です！',
      ],
      isUnlocked: insects.length > 0,
      progress: Math.min(insects.length, 1),
      maxProgress: 1,
    },
    {
      id: 'bug-apprentice',
      title: '虫博士見習い',
      description:
        '5匹の虫を発見して、虫の世界に詳しくなってきました。素晴らしい観察力です！',
      icon: 'trophy',
      requirement: '5匹の虫を発見する',
      reward: '虫博士見習いの称号を獲得！',
      tips: [
        '違う場所で虫を探してみよう',
        '時間帯を変えて観察してみよう',
        '虫博士に質問して知識を深めよう',
      ],
      isUnlocked: insects.length >= 5,
      progress: Math.min(insects.length, 5),
      maxProgress: 5,
    },
    {
      id: 'note-taker',
      title: 'メモマスター',
      description: '虫についてたくさんメモを書いて、観察記録を残しています。',
      icon: 'document-text',
      requirement: '3匹の虫にメモを書く',
      reward: '観察力アップ！',
      tips: [
        '虫の色や形について書いてみよう',
        'どこで見つけたか記録しよう',
        '気づいたことを何でも書いてみよう',
      ],
      isUnlocked:
        insects.filter(
          (insect) => insect.notes && insect.notes.trim().length > 0
        ).length >= 3,
      progress: Math.min(
        insects.filter(
          (insect) => insect.notes && insect.notes.trim().length > 0
        ).length,
        3
      ),
      maxProgress: 3,
    },
    {
      id: 'curious-explorer',
      title: '好奇心旺盛な探検家',
      description: '虫博士にたくさん質問をして、虫について学んでいます。',
      icon: 'help-circle',
      requirement: '虫博士とチャットする',
      reward: '知識が増えて虫博士に近づく！',
      tips: [
        '「博士に質問」ボタンを押してみよう',
        '虫の生態について聞いてみよう',
        '疑問に思ったことは何でも質問しよう',
      ],
      isUnlocked: false, // チャット機能を使った場合にtrueになる
      progress: 0,
      maxProgress: 1,
    },
  ];

  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>実績が見つかりません</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const progressPercentage = achievement.maxProgress
    ? (achievement.progress! / achievement.maxProgress) * 100
    : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>実績詳細</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Achievement Card */}
        <View style={styles.achievementCard}>
          <View style={styles.achievementHeader}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: achievement.isUnlocked
                    ? Colors.accent
                    : Colors.lightGray,
                },
              ]}
            >
              <Ionicons
                name={achievement.icon as any}
                size={48}
                color={achievement.isUnlocked ? Colors.white : Colors.gray}
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text
                style={[
                  styles.achievementStatus,
                  {
                    color: achievement.isUnlocked
                      ? Colors.success
                      : Colors.gray,
                  },
                ]}
              >
                {achievement.isUnlocked ? '達成済み' : '未達成'}
              </Text>
            </View>
          </View>

          <Text style={styles.achievementDescription}>
            {achievement.description}
          </Text>

          {/* Progress Bar */}
          {achievement.maxProgress && achievement.maxProgress > 1 && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>進捗</Text>
                <Text style={styles.progressText}>
                  {achievement.progress}/{achievement.maxProgress}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>
            </View>
          )}
        </View>

        {/* Requirement */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="flag" size={20} color={Colors.primary} />
            <Text style={styles.infoTitle}>達成条件</Text>
          </View>
          <Text style={styles.infoText}>{achievement.requirement}</Text>
        </View>

        {/* Reward */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="gift" size={20} color={Colors.accent} />
            <Text style={styles.infoTitle}>報酬</Text>
          </View>
          <Text style={styles.infoText}>{achievement.reward}</Text>
        </View>

        {/* Tips */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="bulb" size={20} color={Colors.warning} />
            <Text style={styles.infoTitle}>ヒント</Text>
          </View>
          {achievement.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Motivational Message */}
        {!achievement.isUnlocked && (
          <View style={styles.motivationCard}>
            <Ionicons name="heart" size={24} color={Colors.error} />
            <Text style={styles.motivationText}>
              頑張って達成しよう！虫の世界がもっと楽しくなるよ。
            </Text>
          </View>
        )}

        {achievement.isUnlocked && (
          <View style={styles.congratsCard}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.success}
            />
            <Text style={styles.congratsText}>
              おめでとう！この実績を達成しました！
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  placeholder: {
    width: 40,
  },
  achievementCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.xs,
  },
  achievementStatus: {
    fontSize: Typography.medium,
    fontWeight: '600',
  },
  achievementDescription: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  progressSection: {
    marginTop: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  progressLabel: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  progressText: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontSize: Typography.medium,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginLeft: Spacing.sm,
  },
  infoText: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    lineHeight: 22,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  tipBullet: {
    fontSize: Typography.medium,
    color: Colors.primary,
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    lineHeight: 22,
  },
  motivationCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  motivationText: {
    flex: 1,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginLeft: Spacing.md,
    lineHeight: 22,
  },
  congratsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  congratsText: {
    flex: 1,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginLeft: Spacing.md,
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: Typography.medium,
    color: Colors.gray,
  },
});
