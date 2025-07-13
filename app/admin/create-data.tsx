import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  createNewUser,
  createNewInsect,
  createNewPhoto,
} from '@/lib/database/mutations';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

type FormType = 'user' | 'insect' | 'photo';

export default function CreateDataScreen() {
  const [formType, setFormType] = useState<FormType>('user');
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    cognitosub: '',
    region: '',
    points: '0',
    rank: '',
  });

  const [insectData, setInsectData] = useState({
    species: '',
    scientificName: '',
    japaneseName: '',
    family: '',
    description: '',
    notes: '',
    userID: '',
    location: '',
  });

  const [photoData, setPhotoData] = useState({
    url: '',
    userID: '',
    location: '',
    s3path: '',
  });

  const handleCreateUser = async () => {
    if (!userData.name) {
      Alert.alert('エラー', '名前は必須です');
      return;
    }

    setLoading(true);
    try {
      await createNewUser({
        name: userData.name,
        cognitosub: userData.cognitosub || undefined,
        createdAt: new Date().toISOString(),
        region: userData.region || undefined,
        points: parseInt(userData.points) || 0,
        rank: userData.rank || undefined,
      });
      Alert.alert('成功', 'ユーザーが作成されました');
      setUserData({
        name: '',
        cognitosub: '',
        region: '',
        points: '0',
        rank: '',
      });
    } catch (error) {
      Alert.alert('エラー', 'ユーザー作成に失敗しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInsect = async () => {
    if (
      !insectData.species ||
      !insectData.scientificName ||
      !insectData.japaneseName ||
      !insectData.family
    ) {
      Alert.alert('エラー', '必須項目を入力してください');
      return;
    }

    setLoading(true);
    try {
      await createNewInsect({
        scientificName: insectData.scientificName,
        japaneseName: insectData.japaneseName,
        family: insectData.family,
        description: insectData.description || undefined,
        notes: insectData.notes || undefined,
        userID: insectData.userID || undefined,
        location: insectData.location || undefined,
        foundAt: new Date().toISOString().split('T')[0],
        photoID: undefined,
      });
      Alert.alert('成功', '昆虫データが作成されました');
      setInsectData({
        species: '',
        scientificName: '',
        japaneseName: '',
        family: '',
        description: '',
        notes: '',
        userID: '',
        location: '',
      });
    } catch (error) {
      Alert.alert('エラー', '昆虫データ作成に失敗しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePhoto = async () => {
    if (!photoData.url || !photoData.userID) {
      Alert.alert('エラー', '必須項目を入力してください');
      return;
    }

    setLoading(true);
    try {
      await createNewPhoto({
        url: photoData.url,
        userID: photoData.userID,
        takenAt: new Date().toISOString(),
        location: photoData.location || undefined,
        imagePath: photoData.s3path || photoData.url,
        summaryPath: photoData.s3path || photoData.url,
      });
      Alert.alert('成功', '写真データが作成されました');
      setPhotoData({ url: '', userID: '', location: '', s3path: '' });
    } catch (error) {
      Alert.alert('エラー', '写真データ作成に失敗しました');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (formType === 'user') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>ユーザー作成</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>名前 *</Text>
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              placeholder="ユーザー名を入力"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>地域</Text>
            <TextInput
              style={styles.input}
              value={userData.region}
              onChangeText={(text) =>
                setUserData({ ...userData, region: text })
              }
              placeholder="地域名"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ポイント</Text>
            <TextInput
              style={styles.input}
              value={userData.points}
              onChangeText={(text) =>
                setUserData({ ...userData, points: text })
              }
              placeholder="0"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleCreateUser}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? '作成中...' : 'ユーザーを作成'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (formType === 'insect') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>昆虫データ作成</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>種名 *</Text>
            <TextInput
              style={styles.input}
              value={insectData.species}
              onChangeText={(text) =>
                setInsectData({ ...insectData, species: text })
              }
              placeholder="種名"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>学名 *</Text>
            <TextInput
              style={styles.input}
              value={insectData.scientificName}
              onChangeText={(text) =>
                setInsectData({ ...insectData, scientificName: text })
              }
              placeholder="Dynastes hercules"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>和名 *</Text>
            <TextInput
              style={styles.input}
              value={insectData.japaneseName}
              onChangeText={(text) =>
                setInsectData({ ...insectData, japaneseName: text })
              }
              placeholder="ヘラクレスオオカブト"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>科名 *</Text>
            <TextInput
              style={styles.input}
              value={insectData.family}
              onChangeText={(text) =>
                setInsectData({ ...insectData, family: text })
              }
              placeholder="コガネムシ科"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleCreateInsect}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? '作成中...' : '昆虫データを作成'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>写真データ作成</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>画像URL *</Text>
          <TextInput
            style={styles.input}
            value={photoData.url}
            onChangeText={(text) => setPhotoData({ ...photoData, url: text })}
            placeholder="https://example.com/image.jpg"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ユーザーID *</Text>
          <TextInput
            style={styles.input}
            value={photoData.userID}
            onChangeText={(text) =>
              setPhotoData({ ...photoData, userID: text })
            }
            placeholder="撮影者のユーザーID"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>S3パス</Text>
          <TextInput
            style={styles.input}
            value={photoData.s3path}
            onChangeText={(text) =>
              setPhotoData({ ...photoData, s3path: text })
            }
            placeholder="photos/user123/image.jpg"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleCreatePhoto}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? '作成中...' : '写真データを作成'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>データ作成</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, formType === 'user' && styles.activeTab]}
          onPress={() => setFormType('user')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'user' && styles.activeTabText,
            ]}
          >
            ユーザー
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, formType === 'insect' && styles.activeTab]}
          onPress={() => setFormType('insect')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'insect' && styles.activeTabText,
            ]}
          >
            昆虫
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, formType === 'photo' && styles.activeTab]}
          onPress={() => setFormType('photo')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'photo' && styles.activeTabText,
            ]}
          >
            写真
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>{renderForm()}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  headerTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  placeholder: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: Typography.medium,
    color: Colors.gray,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: Spacing.lg,
  },
  formTitle: {
    fontSize: Typography.large,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.medium,
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.medium,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.medium,
    color: Colors.darkGray,
    backgroundColor: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: '600',
  },
});
