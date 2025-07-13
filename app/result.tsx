import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArticleStore } from '@/store/articleStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AnalyzeResult } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';
import { createSummary } from '@/lib/AI/summary';
import { v4 as uuidv4 } from 'uuid';
import { uploadInsectImage } from '@/lib/aws/storage';
import { getCurrentLocation } from '@/lib/location';
import { generateClient } from '@aws-amplify/api';
import { createInsectObservation } from '@/src/graphql/mutations';

export default function ResultScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addInsect } = useArticleStore();
  const client = generateClient();

  useEffect(() => {
    if (imageUri) {
      analyzeImage();
    }
  }, [imageUri]);

  const analyzeImage = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual AWS Bedrock Vision API call
      const summaryData = await createSummary(imageUri);

      console.log('Summary data received:', summaryData);
      setResult({
        scientificName: summaryData.scientificName,
        japaneseName: summaryData.japaneseName,
        family: summaryData.family,
        img: imageUri,
      });
    } catch (error) {
      Alert.alert('エラー', '画像を分析できませんでした');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBug = async () => {
    if (!result) return;
    
    try {
      setSaving(true);
      
      // 1. Get current GPS coordinates
      const coordinates = await getCurrentLocation();
      
      // 2. Upload image to S3
      const { key, bucket } = await uploadInsectImage(imageUri, result.japaneseName);
      
      // 3. Create InsectObservation record in AppSync
      const observationId = uuidv4();
      const observationInput = {
        id: observationId,
        insectName: result.japaneseName,
        scientificName: result.scientificName,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        photoKey: key,
        observedAt: new Date().toISOString(),
        userID: 'current-user-id', // TODO: Replace with actual user ID
        location: 'Captured location', // TODO: Reverse geocode to get location name
        notes: '',
      };
      
      await client.graphql({
        query: createInsectObservation,
        variables: { input: observationInput },
      });
      
      // 4. Add to local store for immediate UI update
      addInsect({
        scientificName: result.scientificName,
        japaneseName: result.japaneseName,
        family: result.family,
        s3path: result.img,
      });
      
      // 5. Show success message
      Alert.alert('保存完了', '虫図鑑に追加されました！', [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/profile'),
        },
      ]);
    } catch (error) {
      console.error('Error saving bug:', error);
      Alert.alert('エラー', '保存に失敗しました。もう一度お試しください。');
    } finally {
      setSaving(false);
    }
  };

  const handleAskDoctor = () => {
    if (result) {
      router.push({
        pathname: '/chat',
        params: {
          bugName: result.japaneseName,
          imageUri: result.s3path,
        },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!result) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>分析結果</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <Image source={{ uri: result.s3path }} style={styles.bugImage} />

          <View style={styles.bugInfo}>
            <Text style={styles.japaneseName}>{result.japaneseName}</Text>
            <Text style={styles.scientificName}>{result.scientificName}</Text>
            <Text style={styles.family}>{result.family}</Text>
          </View>

          <View style={styles.successBadge}>
            <Ionicons
              name="checkmark-circle"
              size={32}
              color={Colors.success}
            />
            <Text style={styles.successText}>発見！</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.doctorButton}
            onPress={handleAskDoctor}
            activeOpacity={0.8}
          >
            <Ionicons name="medical" size={24} color={Colors.white} />
            <Text style={styles.doctorButtonText}>博士に聞く</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveBug}
            activeOpacity={0.8}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <>
                <Ionicons name="bookmark" size={24} color={Colors.white} />
                <Text style={styles.saveButtonText}>図鑑に保存</Text>
              </>
            )}
          </TouchableOpacity>
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
  placeholder: {
    width: 40,
  },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  bugImage: {
    width: 200,
    height: 200,
    borderRadius: BorderRadius.medium,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.lightGray,
  },
  bugInfo: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  japaneseName: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  scientificName: {
    fontSize: Typography.medium,
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  family: {
    fontSize: Typography.medium,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  successText: {
    fontSize: Typography.medium,
    color: Colors.success,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  actions: {
    gap: Spacing.md,
  },
  doctorButton: {
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
  doctorButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
  saveButton: {
    backgroundColor: Colors.accent,
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
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
    marginLeft: Spacing.sm,
  },
});
