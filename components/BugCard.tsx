import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Bug } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

interface BugCardProps {
  bug: Bug;
  onPress?: () => void;
  showDate?: boolean;
}

export default function BugCard({ bug, onPress, showDate = false }: BugCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: bug.img }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.japaneseName}>{bug.japaneseName}</Text>
        <Text style={styles.scientificName}>{bug.scientificName}</Text>
        <Text style={styles.family}>{bug.family}</Text>
        {showDate && (
          <Text style={styles.date}>
            発見日: {formatDate(bug.discoveredAt)}
          </Text>
        )}
        {bug.notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {bug.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: Colors.lightGray,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  japaneseName: {
    fontSize: Typography.medium,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.xs,
  },
  scientificName: {
    fontSize: Typography.small,
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: Spacing.xs,
  },
  family: {
    fontSize: Typography.small,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  date: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginBottom: Spacing.xs,
  },
  notes: {
    fontSize: Typography.small,
    color: Colors.darkGray,
    marginTop: Spacing.xs,
  },
});