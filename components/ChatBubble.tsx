import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ChatTurn } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

interface ChatBubbleProps {
  turn: ChatTurn;
  isLast?: boolean;
  chatType?: 'doctor' | 'friend';
}

const DOCTOR_AVATAR = 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200';
const FRIEND_AVATAR = 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=200';

export default function ChatBubble({ turn, isLast = false, chatType = 'doctor' }: ChatBubbleProps) {
  const isBot = turn.role === 'doctor' || turn.role === 'friend';
  const avatar = turn.role === 'friend' ? FRIEND_AVATAR : DOCTOR_AVATAR;

  return (
    <View style={[styles.container, isLast && styles.lastMessage]}>
      {isBot && (
        <Image source={{ uri: avatar }} style={styles.avatar} />
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
    backgroundColor: Colors.lightGray,
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