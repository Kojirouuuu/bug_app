import React, { useState } from 'react';
import { Platform, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { Link } from 'expo-router';
import { AuthFormLayout, AuthFormField } from './components';

export default function ForgotScreen() {
  const router = useRouter();
  const { resetPassword, confirmResetPassword, loading, error } =
    useUserStore();
  const [isReset, setIsReset] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('admin@example.com');

  const handleResetPassword = async () => {
    if (!email) {
      Platform.OS === 'web'
        ? window.alert('メールアドレスを入力してください')
        : Alert.alert('メールアドレスを入力してください');
      return;
    }
    await resetPassword(email);
    setIsReset(true);
  };

  const handleConfirmResetPassword = async () => {
    if (!newPassword || !confirmationCode) {
      Platform.OS === 'web'
        ? window.alert('新規パスワードと確認コードを入力してください')
        : Alert.alert('新規パスワードと確認コードを入力してください');
      return;
    }
    await confirmResetPassword(email, newPassword, confirmationCode);
    router.replace('/(auth)/login');
  };

  const helpText = !isReset ? (
    <>
      アカウントをお持ちでない方：
      <Link
        href="/(auth)/signup"
        style={{ color: '#3DBA8E', textDecorationLine: 'underline' }}
      >
        <Text>新規登録（無料）</Text>
      </Link>
    </>
  ) : undefined;

  if (!isReset) {
    return (
      <AuthFormLayout
        title="パスワードを再発行"
        buttonText="再発行"
        onButtonPress={handleResetPassword}
        loading={loading}
        error={error || undefined}
        helpText={helpText}
      >
        <AuthFormField
          label="メールアドレス"
          placeholder="example@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </AuthFormLayout>
    );
  }

  return (
    <AuthFormLayout
      title="パスワードを再発行"
      buttonText="確認する"
      onButtonPress={handleConfirmResetPassword}
      loading={loading}
      error={error || undefined}
    >
      <AuthFormField
        label="確認コード"
        placeholder="確認コードを入力してください"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <AuthFormField
        label="新規パスワード"
        placeholder="新規パスワードを入力してください"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
    </AuthFormLayout>
  );
}
