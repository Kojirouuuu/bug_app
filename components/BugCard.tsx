import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';
import { ArticleForFrontend } from '@/types';

interface InsectCardProps {
  article: ArticleForFrontend;
  onPress?: () => void;
  showDate?: boolean;
}

export default function InsectCard({
  article,
  onPress,
  showDate = false,
}: InsectCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.japaneseName}>
          {article.article.insects[0].japaneseName}
        </Text>
        <Text style={styles.scientificName}>
          {article.article.insects[0].scientificName}
        </Text>
        <Text style={styles.family}>{article.article.insects[0].family}</Text>
        {showDate && (
          <Text style={styles.date}>
            発見日: {formatDate(new Date(article.article.insects[0].foundAt))}
          </Text>
        )}
        {article.article.insects[0].notes && (
          <Text style={styles.notes} numberOfLines={2}>
            {article.article.insects[0].notes}
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
