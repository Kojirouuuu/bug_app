import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { chatWithBugDoctor, chatWithFriend } from '@/services/mockApi';
import { useArticleStore } from '@/store/articleStore';
import ChatBubble from '@/components/ChatBubble';
import QuestionCard from '@/components/QuestionCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ChatTurn } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';
import { Insect } from '@/src/API';

export default function ChatScreen() {
  const {
    bugName,
    imageUri,
    chatType = 'doctor',
    quickQuestion,
  } = useLocalSearchParams<{
    bugName?: string;
    imageUri?: string;
    chatType?: 'doctor' | 'friend';
    quickQuestion?: string;
  }>();

  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { addInsect, insects } = useArticleStore();

  // Check if this bug is already in the collection
  const isAlreadySaved = bugName
    ? insects.some((insect) => insect.japaneseName === bugName)
    : false;

  const suggestedQuestions =
    chatType === 'doctor'
      ? [
          'この虫は何を食べるの？',
          'どこに住んでいるの？',
          'なぜこんな色をしているの？',
          '危険な虫なの？',
          '似ている虫はいる？',
        ]
      : [
          '一緒に虫探しをしよう！',
          'どんな虫が好き？',
          '虫の面白い話を聞かせて！',
          '虫の鳴き声を真似してみて！',
          '虫になったらどんな気持ち？',
        ];

  useEffect(() => {
    // Initial greeting based on chat type and context
    let initialMessage = '';

    if (quickQuestion) {
      // Quick question was provided
      sendMessage(quickQuestion);
      return;
    } else if (bugName) {
      initialMessage =
        chatType === 'doctor'
          ? `こんにちは！${bugName}について何か知りたいことはありますか？`
          : `やっほー！${bugName}について一緒にお話ししよう！`;
    } else {
      initialMessage =
        chatType === 'doctor'
          ? 'こんにちは！虫について何か知りたいことはありますか？'
          : 'やっほー！虫について一緒にお話ししよう！何が好き？';
    }

    setChatHistory([
      {
        role: chatType === 'doctor' ? 'doctor' : 'friend',
        message: initialMessage,
      },
    ]);
  }, [bugName, chatType, quickQuestion]);

  const sendMessage = async (message: string) => {
    if (!message.trim() || loading) return;

    setLoading(true);
    try {
      // Choose the appropriate chat function based on chat type
      const response =
        chatType === 'doctor'
          ? await chatWithBugDoctor(message)
          : await chatWithFriend(message);
      setChatHistory((prev) => [...prev, ...response]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  const handleSendMessage = () => {
    sendMessage(inputText);
  };

  const handleQuestionPress = (question: string) => {
    sendMessage(question);
  };

  const handleSaveToBugBook = () => {
    if (isAlreadySaved) {
      Alert.alert('既に保存済み', 'この虫は既に図鑑に保存されています。');
      return;
    }

    // Create mock bug data based on the bug name
    const mockBugData = {
      scientificName:
        bugName === 'ダンゴムシ'
          ? 'Armadillidium vulgare'
          : bugName === 'ナナホシテントウ'
          ? 'Coccinella septempunctata'
          : bugName === 'モンシロチョウ'
          ? 'Pieris rapae'
          : 'Unknown species',
      japaneseName: bugName || '不明な虫',
      family:
        bugName === 'ダンゴムシ'
          ? 'Armadillidiidae'
          : bugName === 'ナナホシテントウ'
          ? 'Coccinellidae'
          : bugName === 'モンシロチョウ'
          ? 'Pieridae'
          : 'Unknown family',
      img:
        imageUri ||
        `https://images.pexels.com/photos/${Math.floor(
          Math.random() * 1000000
        )}/pexels-photo-${Math.floor(
          Math.random() * 1000000
        )}.jpeg?auto=compress&cs=tinysrgb&w=400`,
    };

    addInsect(mockBugData as unknown as Insect);

    Alert.alert(
      '図鑑に保存しました！',
      `${bugName}が虫図鑑に追加されました。`,
      [
        {
          text: '図鑑を見る',
          onPress: () => router.push('/(tabs)/notebook'),
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  const handleBack = () => {
    router.back();
  };

  const getChatTitle = () => {
    if (chatType === 'friend') {
      return 'むしむしフレンド';
    }
    return '虫博士とチャット';
  };

  const getChatSubtitle = () => {
    if (bugName) {
      return `${bugName}について`;
    }
    return chatType === 'friend' ? '楽しくおしゃべり' : '何でも質問してね';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.bottom}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{getChatTitle()}</Text>
            <Text style={styles.headerSubtitle}>{getChatSubtitle()}</Text>
          </View>
          {bugName && (
            <TouchableOpacity
              style={[
                styles.saveButton,
                isAlreadySaved && styles.saveButtonDisabled,
              ]}
              onPress={handleSaveToBugBook}
              disabled={isAlreadySaved}
            >
              <Ionicons
                name={isAlreadySaved ? 'checkmark' : 'bookmark-outline'}
                size={24}
                color={isAlreadySaved ? Colors.gray : Colors.primary}
              />
            </TouchableOpacity>
          )}
          {!bugName && <View style={styles.placeholder} />}
        </View>

        {/* Chat Messages */}
        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((turn, index) => (
            <ChatBubble
              key={index}
              turn={turn}
              isLast={index === chatHistory.length - 1}
              chatType={chatType}
            />
          ))}

          {loading && (
            <View style={styles.loadingContainer}>
              <LoadingSpinner size="small" />
            </View>
          )}
        </ScrollView>

        {/* Suggested Questions */}
        {chatHistory.length === 1 && !loading && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>
              {chatType === 'doctor' ? '質問例:' : 'おしゃべりのきっかけ:'}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsContent}
            >
              {suggestedQuestions.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  onPress={() => handleQuestionPress(question)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={
              chatType === 'doctor'
                ? '質問を入力してください...'
                : 'メッセージを入力してください...'
            }
            placeholderTextColor={Colors.gray}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={200}
            editable={!loading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                opacity: inputText.trim() && !loading ? 1 : 0.5,
                backgroundColor:
                  chatType === 'friend' ? Colors.accent : Colors.primary,
              },
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || loading}
          >
            <Ionicons name="send" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  headerSubtitle: {
    fontSize: Typography.small,
    color: Colors.gray,
    marginTop: 2,
  },
  saveButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.lightGray,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  placeholder: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: Spacing.lg,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  suggestionsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  suggestionsTitle: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  suggestionsContent: {
    paddingRight: Spacing.lg,
    gap: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    maxHeight: 100,
    marginRight: Spacing.sm,
  },
  sendButton: {
    borderRadius: BorderRadius.medium,
    padding: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});
