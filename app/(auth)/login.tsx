import React, { useState } from 'react';
import { Platform, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { Link } from 'expo-router';
import { AuthFormLayout, AuthFormField } from './components';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading, error, cognitoIdVerrification, isAuthenticated } =
    useUserStore();

  const [email, setEmail] = useState('bugappuser@example.com');
  const [password, setPassword] = useState('12345678');

  const handleLogin = async () => {
    if (!email || !password) {
      Platform.OS === 'web'
        ? window.alert('メールアドレスとパスワードを入力してください')
        : Alert.alert('メールアドレスとパスワードを入力してください');
      return;
    }
    await login(email, password, cognitoIdVerrification);
    router.replace('/(tabs)/profile');
  };

  const helpText = (
    <>
      <Text style={{ fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 8 }}>
        アカウントをお持ちでない方：
        <Link
          href="/(auth)/signup"
          style={{ color: '#3DBA8E', textDecorationLine: 'underline' }}
        >
          <Text>新規登録（無料）</Text>
        </Link>
      </Text>
      <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
        パスワードを忘れた方：
        <Link
          href="/(auth)/forgot"
          style={{ color: '#3DBA8E', textDecorationLine: 'underline' }}
        >
          <Text>パスワードを再発行</Text>
        </Link>
      </Text>
    </>
  );

  return (
    <AuthFormLayout
      title="ログイン"
      buttonText="ログイン"
      onButtonPress={handleLogin}
      loading={loading}
      error={error || undefined}
      helpText={helpText}
      children={
        <>
          <AuthFormField
            label="メールアドレス"
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthFormField
            label="パスワード"
            placeholder="パスワードを入力"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </>
      }
    />
  );
}
