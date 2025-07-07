import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  bugName: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'ダンゴムシが丸くなるのはなぜでしょう？',
    options: ['遊んでいるから', '身を守るため', '眠るため', '食べ物を探すため'],
    correctAnswer: 1,
    explanation: 'ダンゴムシは危険を感じると丸くなって身を守ります。これを「転がり行動」と言います。',
    bugName: 'ダンゴムシ',
  },
  {
    id: '2',
    question: 'テントウムシの斑点は何のためにあるでしょう？',
    options: ['おしゃれのため', '敵を威嚇するため', '仲間を見つけるため', '体温調節のため'],
    correctAnswer: 1,
    explanation: 'テントウムシの鮮やかな色と斑点は、敵に「毒があるよ」と警告する役割があります。',
    bugName: 'テントウムシ',
  },
  {
    id: '3',
    question: 'チョウの羽の粉は何でできているでしょう？',
    options: ['花粉', '鱗粉（りんぷん）', '砂', '毛'],
    correctAnswer: 1,
    explanation: 'チョウの羽には鱗粉という細かい鱗のような粉がついていて、これが美しい色を作り出しています。',
    bugName: 'チョウ',
  },
  {
    id: '4',
    question: 'アリが行列を作って歩くのはなぜでしょう？',
    options: ['楽しいから', 'フェロモンの道しるべがあるから', '迷子にならないため', '競争しているから'],
    correctAnswer: 1,
    explanation: 'アリはフェロモンという匂いの道しるべを残して、仲間に食べ物の場所を教えています。',
    bugName: 'アリ',
  },
  {
    id: '5',
    question: 'カマキリの首が回るのは何度まででしょう？',
    options: ['90度', '180度', '270度', '360度'],
    correctAnswer: 1,
    explanation: 'カマキリは首を180度回すことができ、後ろまで見ることができます。これで獲物を見つけやすくなります。',
    bugName: 'カマキリ',
  },
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));
  const [resultAnimation] = useState(new Animated.Value(0));

  const currentQuestion = quizQuestions[currentQuestionIndex];

  useEffect(() => {
    // 問題が変わるたびにアニメーション
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // 結果表示アニメーション
    Animated.timing(resultAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(resultAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 1500);
    });

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // 2.5秒後に次の問題へ
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        animationValue.setValue(0);
      } else {
        setQuizCompleted(true);
      }
    }, 2500);
  };

  const handleAskDoctor = () => {
    router.push({
      pathname: '/chat',
      params: { 
        bugName: currentQuestion.bugName,
        fromQuiz: 'true',
      },
    });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    animationValue.setValue(0);
    resultAnimation.setValue(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return '素晴らしい！虫博士に近づいています！';
    if (percentage >= 60) return 'よくできました！もう少しで虫博士です！';
    if (percentage >= 40) return 'がんばりました！虫について学んでいますね！';
    return 'まだまだこれから！虫博士に質問してみましょう！';
  };

  if (quizCompleted) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.completedContainer}>
          <View style={styles.resultCard}>
            <Ionicons 
              name="trophy" 
              size={64} 
              color={score >= quizQuestions.length * 0.8 ? Colors.accent : Colors.primary} 
            />
            <Text style={styles.completedTitle}>クイズ完了！</Text>
            <Text style={styles.scoreText}>
              {score} / {quizQuestions.length} 問正解
            </Text>
            <Text style={styles.scoreMessage}>{getScoreMessage()}</Text>
            
            <View style={styles.completedActions}>
              <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                <Ionicons name="refresh" size={20} color={Colors.white} />
                <Text style={styles.restartButtonText}>もう一度挑戦</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.doctorButton} 
                onPress={() => router.push('/chat')}
              >
                <Ionicons name="medical" size={20} color={Colors.white} />
                <Text style={styles.doctorButtonText}>博士に質問</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>昆虫クイズ</Text>
          <Text style={styles.subtitle}>
            問題 {currentQuestionIndex + 1} / {quizQuestions.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }
            ]} 
          />
        </View>

        {/* Question Card */}
        <Animated.View 
          style={[
            styles.questionCard,
            {
              opacity: animationValue,
              transform: [{
                translateY: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            }
          ]}
        >
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = styles.optionButton;
              let textStyle = styles.optionText;
              
              if (showResult && selectedAnswer !== null) {
                if (index === currentQuestion.correctAnswer) {
                  buttonStyle = [styles.optionButton, styles.correctOption];
                  textStyle = [styles.optionText, styles.correctOptionText];
                } else if (index === selectedAnswer) {
                  buttonStyle = [styles.optionButton, styles.incorrectOption];
                  textStyle = [styles.optionText, styles.incorrectOptionText];
                } else {
                  buttonStyle = [styles.optionButton, styles.disabledOption];
                  textStyle = [styles.optionText, styles.disabledOptionText];
                }
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={buttonStyle}
                  onPress={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  activeOpacity={0.8}
                >
                  <Text style={textStyle}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Result Animation */}
        {showResult && (
          <Animated.View 
            style={[
              styles.resultOverlay,
              {
                opacity: resultAnimation,
                transform: [{
                  scale: resultAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                }],
              }
            ]}
          >
            <View style={[
              styles.resultBadge,
              selectedAnswer === currentQuestion.correctAnswer ? 
                styles.correctBadge : styles.incorrectBadge
            ]}>
              <Ionicons 
                name={selectedAnswer === currentQuestion.correctAnswer ? "checkmark-circle" : "close-circle"} 
                size={48} 
                color={Colors.white} 
              />
              <Text style={styles.resultBadgeText}>
                {selectedAnswer === currentQuestion.correctAnswer ? '正解！' : '不正解'}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Explanation */}
        {showResult && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>解説</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
            
            <TouchableOpacity style={styles.askDoctorButton} onPress={handleAskDoctor}>
              <Ionicons name="medical" size={20} color={Colors.primary} />
              <Text style={styles.askDoctorText}>博士にもっと聞く</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.currentScore}>現在のスコア: {score} / {currentQuestionIndex + (showResult ? 1 : 0)}</Text>
        </View>
      </View>
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
    alignItems: 'center',
    marginBottom: Spacing.lg,
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
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  questionCard: {
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
  questionText: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.lg,
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  optionButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: '500',
  },
  correctOption: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  correctOptionText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  incorrectOption: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  incorrectOptionText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledOptionText: {
    color: Colors.gray,
  },
  resultOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1000,
  },
  resultBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  correctBadge: {
    backgroundColor: Colors.success,
  },
  incorrectBadge: {
    backgroundColor: Colors.error,
  },
  resultBadgeText: {
    color: Colors.white,
    fontSize: Typography.large,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
  explanationCard: {
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
  explanationTitle: {
    fontSize: Typography.medium,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  explanationText: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  askDoctorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    padding: Spacing.sm,
  },
  askDoctorText: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  currentScore: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.xl,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  completedTitle: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  scoreText: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
  },
  scoreMessage: {
    fontSize: Typography.medium,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  completedActions: {
    gap: Spacing.md,
    width: '100%',
  },
  restartButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  doctorButton: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
});