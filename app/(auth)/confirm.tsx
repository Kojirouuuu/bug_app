import React, { useState } from 'react';
import { Platform, Alert, Text } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { AuthFormLayout, AuthFormField } from './components';

export default function ConfirmScreen() {
  const router = useRouter();
  const { confirmSignUp, loading, error } = useUserStore();

  const [code, setCode] = useState('');

  const handleConfirm = async () => {
    if (!code) {
      Platform.OS === 'web'
        ? window.alert('確認コードを入力してください')
        : Alert.alert('確認コードを入力してください');
      return;
    }
    await confirmSignUp(code);
    router.replace('/(auth)/login');
  };

  const helpText = (
    <>
      メールに送信された6桁の確認コードを入力してください
      {'\n'}
      メールが届かない場合：
      <Link
        href="/(auth)/signup"
        style={{ color: '#3DBA8E', textDecorationLine: 'underline' }}
      >
        <Text>もう一度サインアップ</Text>
      </Link>
    </>
  );

  return (
    <AuthFormLayout
      title="確認コードを入力"
      buttonText="確認する"
      onButtonPress={handleConfirm}
      loading={loading}
      error={error || undefined}
      helpText={helpText}
    >
      <AuthFormField
        label="確認コード"
        placeholder="確認コードを入力してください"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
    </AuthFormLayout>
  );
}
