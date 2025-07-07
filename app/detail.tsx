import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useBugStore } from '@/store/bugStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getBugById, updateBugNotes } = useBugStore();
  const bug = getBugById(id!);
  const [notes, setNotes] = useState(bug?.notes || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!bug) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>虫が見つかりません</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSaveNotes = () => {
    updateBugNotes(bug.id, notes);
    setIsEditing(false);
    Alert.alert('保存完了', 'メモを保存しました！');
  };

  const handleBack = () => {
    router.back();
  };

  const handleChat = () => {
    router.push({
      pathname: '/chat',
      params: { 
        bugName: bug.japaneseName,
        imageUri: bug.img,
      },
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>虫の詳細</Text>
          <TouchableOpacity style={styles.chatButton} onPress={handleChat}>
            <Ionicons name="chatbubble" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Bug Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: bug.img }} style={styles.bugImage} />
        </View>

        {/* Bug Information */}
        <View style={styles.infoCard}>
          <Text style={styles.japaneseName}>{bug.japaneseName}</Text>
          <Text style={styles.scientificName}>{bug.scientificName}</Text>
          <Text style={styles.family}>{bug.family}</Text>
          
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color={Colors.gray} />
            <Text style={styles.dateText}>
              発見日: {formatDate(bug.discoveredAt)}
            </Text>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>メモ</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons
                name={isEditing ? 'close' : 'pencil'}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.notesInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="この虫について思ったことを書いてみよう..."
                placeholderTextColor={Colors.gray}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveNotes}
              >
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.notesText}>
              {notes || 'まだメモがありません。鉛筆ボタンを押してメモを書いてみましょう！'}
            </Text>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleChat}>
            <Ionicons name="medical" size={24} color={Colors.white} />
            <Text style={styles.actionButtonText}>博士に質問</Text>
          </TouchableOpacity>
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
  chatButton: {
    padding: Spacing.sm,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  bugImage: {
    width: 250,
    height: 250,
    borderRadius: BorderRadius.large,
    backgroundColor: Colors.lightGray,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
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
  japaneseName: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  scientificName: {
    fontSize: Typography.medium,
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  family: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginLeft: Spacing.xs,
  },
  notesCard: {
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
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  notesTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  editButton: {
    padding: Spacing.sm,
  },
  editContainer: {
    gap: Spacing.md,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    padding: Spacing.md,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    minHeight: 120,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.small,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    lineHeight: 24,
  },
  actions: {
    marginTop: Spacing.md,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
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