import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatTurn } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';
import { useSettingsStore } from '@/store/settingsStore';

interface ChatBubbleProps {
  turn: ChatTurn;
  isLast?: boolean;
  chatType?: 'doctor' | 'friend';
}

const DOCTOR_ICON = 'man';

export default function ChatBubble({ turn, isLast = false, chatType = 'doctor' }: ChatBubbleProps) {
  const { friendGender } = useSettingsStore();
  const isBot = turn.role === 'doctor' || turn.role === 'friend';
  const iconName = turn.role === 'doctor'
    ? DOCTOR_ICON
    : friendGender === 'girl'
      ? 'woman'
      : 'man';

  return (
    <View style={[styles.container, isLast && styles.lastMessage]}>
      {isBot && (
        <View style={[
          styles.avatar,
          turn.role === 'friend' ? styles.friendAvatar : styles.doctorAvatar,
        ]}>
          <Ionicons name={iconName as any} size={20} color={Colors.white} />
        </View>
      )}
      <View
        style={[
          styles.bubble,
          isBot ? styles.botBubble : styles.childBubble,
          turn.role === 'friend' && styles.friendBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isBot ? styles.botText : styles.childText,
          ]}
        >
          {turn.message}
        </Text>
      </View>
      {!isBot && <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  lastMessage: {
    marginBottom: Spacing.xl,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorAvatar: {
    backgroundColor: Colors.doctorBubble,
  },
  friendAvatar: {
    backgroundColor: Colors.accent,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
  },
  botBubble: {
    backgroundColor: Colors.doctorBubble,
    borderBottomLeftRadius: 4,
  },
  friendBubble: {
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: 4,
  },
  childBubble: {
    backgroundColor: Colors.childBubble,
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  text: {
    fontSize: Typography.medium,
    lineHeight: 24,
  },
  botText: {
    color: Colors.white,
  },
  childText: {
    color: Colors.darkGray,
  },
  spacer: {
    width: 32,
  },
});