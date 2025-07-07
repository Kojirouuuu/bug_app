import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

type ChatOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
  params?: any;
};

export default function ChatSelectScreen() {
  const chatOptions: ChatOption[] = [
    {
      id: 'doctor',
      title: '虫博士',
      description: '虫について何でも知っている優しい博士です。虫の生態や特徴について詳しく教えてくれます。',
      icon: 'medical',
      color: Colors.primary,
      route: '/chat',
      params: { chatType: 'doctor' },
    },
    {
      id: 'friend',
      title: 'むしむしフレンド',
      description: '虫が大好きな元気なお友達AIです。一緒に虫について楽しくおしゃべりしましょう！',
      icon: 'happy',
      color: Colors.accent,
      route: '/chat',
      params: { chatType: 'friend' },
    },
  ];

  const handleChatSelect = (option: ChatOption) => {
    router.push({
      pathname: option.route,
      params: option.params,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>チャット相手を選ぼう</Text>
          <Text style={styles.subtitle}>
            誰とお話ししたいですか？
          </Text>
        </View>

        {/* Chat Options */}
        <View style={styles.optionsContainer}>
          {chatOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleChatSelect(option)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconContainer, { backgroundColor: option.color }]}>
                <Ionicons name={option.icon as any} size={48} color={Colors.white} />
              </View>
              
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              
              <Ionicons name="chevron-forward" size={24} color={Colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>クイックアクション</Text>
          
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push({
              pathname: '/chat',
              params: { 
                chatType: 'doctor',
                quickQuestion: 'この虫は何を食べるの？'
              },
            })}
          >
            <Ionicons name="restaurant" size={24} color={Colors.primary} />
            <Text style={styles.quickActionText}>虫の食べ物について聞く</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push({
              pathname: '/chat',
              params: { 
                chatType: 'doctor',
                quickQuestion: 'この虫はどこに住んでいるの？'
              },
            })}
          >
            <Ionicons name="home" size={24} color={Colors.primary} />
            <Text style={styles.quickActionText}>虫の住む場所について聞く</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionCard}
            onPress={() => router.push({
              pathname: '/chat',
              params: { 
                chatType: 'friend',
                quickQuestion: '一緒に虫探しをしよう！'
              },
            })}
          >
            <Ionicons name="search" size={24} color={Colors.accent} />
            <Text style={styles.quickActionText}>虫探しの相談をする</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 チャットのコツ</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>分からないことは何でも聞いてみよう</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>虫の名前や特徴を教えてもらおう</Text>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>楽しく会話して虫について学ぼう</Text>
            </View>
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
  optionsContainer: {
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  optionCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.xs,
  },
  optionDescription: {
    fontSize: Typography.medium,
    color: Colors.gray,
    lineHeight: 22,
  },
  quickActionsContainer: {
    marginBottom: Spacing.xl,
  },
  quickActionsTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.md,
  },
  quickActionCard: {
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
  quickActionText: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsTitle: {
    fontSize: Typography.medium,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.md,
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
});