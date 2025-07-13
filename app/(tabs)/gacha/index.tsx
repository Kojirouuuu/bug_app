import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRewardStore } from '@/store/rewardStore';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';
import { API, graphqlOperation } from 'aws-amplify';
import { rollGacha } from '@/src/graphql/mutations';
import { getUser, getGacha } from '@/src/graphql/queries';
import { v4 as uuidv4 } from 'uuid';

export default function GachaScreen() {
  const { points, setPoints } = useRewardStore();
  const [loading, setLoading] = useState(false);
  const [gacha, setGacha] = useState(null);
  const [userId, setUserId] = useState('user-123'); // In a real app, get this from auth context

  // Fetch active gacha and user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch the active gacha from the API
        const gachaResult = await API.graphql(
          graphqlOperation(getGacha, { id: 'gacha-123' })
        );
        setGacha(gachaResult.data.getGacha);
        
        // Fetch user data to get current points
        const userResult = await API.graphql(
          graphqlOperation(getUser, { id: userId })
        );
        setPoints(userResult.data.getUser.points);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleDraw = async () => {
    if (!gacha) {
      Alert.alert('Error', 'Gacha information not available');
      return;
    }
    
    if (points < gacha.costPoints) {
      Alert.alert('Insufficient Points', `You need ${gacha.costPoints} points to roll this gacha.`);
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate a client-side UUID for idempotency
      const resultId = uuidv4();
      
      // Call the rollGacha mutation
      const result = await API.graphql(
        graphqlOperation(rollGacha, {
          gachaID: gacha.id,
          userID: userId,
          clientGeneratedId: resultId // This would be used in a real implementation for idempotency
        })
      );
      
      // Update local points state
      setPoints(points - gacha.costPoints);
      
      // Navigate to the result screen
      router.push({
        pathname: '/gacha/movie',
        params: {
          resultId: result.data.rollGacha.id
        }
      });
    } catch (error) {
      console.error('Error rolling gacha:', error);
      
      if (error.errors && error.errors[0]) {
        const errorMessage = error.errors[0].message;
        const errorType = error.errors[0].errorType;
        
        if (errorType === 'INSUFFICIENT_POINTS') {
          Alert.alert('Insufficient Points', errorMessage);
        } else if (errorType === 'GACHA_NOT_ACTIVE') {
          Alert.alert('Gacha Not Available', errorMessage);
        } else {
          Alert.alert('Error', 'An error occurred while rolling the gacha. Please try again.');
        }
      } else {
        Alert.alert('Error', 'An error occurred while rolling the gacha. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.points}>ポイント: {points}</Text>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleDraw}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Ionicons name="gift" size={40} color={Colors.white} />
          <Text style={styles.buttonText}>
            {loading ? 'ロード中...' : `ガチャを回す (${gacha?.costPoints || 10}pt)`}
          </Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  points: {
    fontSize: Typography.large,
    color: Colors.primary,
    marginBottom: Spacing.xl,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.large,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.large,
    fontWeight: 'bold',
  },
  result: {
    fontSize: Typography.extraLarge,
    color: Colors.darkGray,
    marginTop: Spacing.lg,
    fontWeight: '600',
  },
});
