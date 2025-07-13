import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useBugStore } from '@/store/bugStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useRewardStore } from '@/store/rewardStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

export default function ProfileScreen() {
  const { bugs } = useBugStore();
  const { friendGender, setFriendGender } = useSettingsStore();
  const { points } = useRewardStore();

  const stats = [
    { icon: 'bug', label: '発見した虫', value: bugs.length },
    { icon: 'camera', label: '撮影回数', value: bugs.length },
    { icon: 'book', label: '図鑑の項目', value: bugs.length },
  ];

  const achievements = [
    {
      id: 'first-discovery',
      icon: 'star',
      title: 'はじめての発見',
      description: bugs.length > 0 ? '達成済み' : '最初の虫を発見しよう',
      isUnlocked: bugs.length > 0,
    },
    {
      id: 'bug-apprentice',
      icon: 'trophy',
      title: '虫博士見習い',
      description:
        bugs.length >= 5 ? '達成済み' : `5匹発見しよう (${bugs.length}/5)`,
      isUnlocked: bugs.length >= 5,
    },
    {
      id: 'note-taker',
      icon: 'document-text',
      title: 'メモマスター',
      description:
        bugs.filter((bug) => bug.notes && bug.notes.trim().length > 0).length >=
        3
          ? '達成済み'
          : `3匹にメモを書こう (${
              bugs.filter((bug) => bug.notes && bug.notes.trim().length > 0)
                .length
            }/3)`,
      isUnlocked:
        bugs.filter((bug) => bug.notes && bug.notes.trim().length > 0).length >=
        3,
    },
    {
      id: 'curious-explorer',
      icon: 'help-circle',
      title: '好奇心旺盛な探検家',
      description: '虫博士とチャットしよう',
      isUnlocked: false,
    },
  ];

  const handleAchievementPress = (achievementId: string) => {
    router.push({
      pathname: '/achievement',
      params: { achievementId },
    });
  };

  const handleSettingsPress = () => {
    Alert.alert('むしむしフレンドの設定', 'どちらを選びますか？', [
      { text: '男の子', onPress: () => setFriendGender('boy') },
      { text: '女の子', onPress: () => setFriendGender('girl') },
      { text: 'キャンセル', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>プロフィール</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettingsPress}
          >
            <Ionicons name="settings" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>虫博士への道</Text>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={Colors.white} />
          </View>
          <Text style={styles.username}>虫博士</Text>
          <View style={styles.ticketsContainer}>
            <View style={styles.ticketItem}>
              <View style={styles.imageFrame}>
                <Image
                  source={require('@/assets/images/mushidama.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.ticketLabel}>ポイント</Text>
              <Text style={styles.ticketValue}>{points}</Text>
            </View>
            <View style={styles.ticketItem}>
              <View style={styles.imageFrame}>
                <Image
                  source={require('@/assets/images/rainbowticket.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.ticketLabel}>URチケット</Text>
              <Text style={styles.ticketValue}>{points}</Text>
            </View>
            <View style={styles.ticketItem}>
              <View style={styles.imageFrame}>
                <Image
                  source={require('@/assets/images/goldticket.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.ticketLabel}>SRチケット</Text>
              <Text style={styles.ticketValue}>{points}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons
                name={stat.icon as any}
                size={32}
                color={Colors.primary}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>実績</Text>
          {achievements.map((achievement, index) => (
            <TouchableOpacity
              key={index}
              style={styles.achievementCard}
              onPress={() => handleAchievementPress(achievement.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={achievement.icon as any}
                size={24}
                color={achievement.isUnlocked ? Colors.accent : Colors.gray}
              />
              <View style={styles.achievementText}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>
                  {achievement.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Level Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>虫博士レベル</Text>
          <View style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>
                レベル {Math.floor(bugs.length / 3) + 1}
              </Text>
              <Text style={styles.levelProgress}>{bugs.length % 3}/3</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${((bugs.length % 3) / 3) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.levelDescription}>
              {bugs.length < 3
                ? `あと${3 - (bugs.length % 3)}匹でレベルアップ！`
                : '次のレベルまであと少し！'}
            </Text>
          </View>
        </View>
      </ScrollView>
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
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
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
    marginBottom: Spacing.xl,
  },
  settingsButton: {
    padding: Spacing.sm,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  username: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  ticketsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  ticketItem: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  imageFrame: {
    borderWidth: 2,
    borderColor: '#3dba8e',
    borderRadius: BorderRadius.medium,
    padding: 4,
    marginVertical: Spacing.xs,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.small,
  },
  ticketLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  ticketValue: {
    fontSize: Typography.medium,
    color: Colors.accent,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.xs,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.md,
  },
  achievementCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementText: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  achievementTitle: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  achievementDesc: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: Spacing.xs,
  },
  levelCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  levelTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  levelProgress: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  levelDescription: {
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
  },
});