import React, { useState } from 'react';
import { Platform, Alert, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { Link } from 'expo-router';
import { AuthFormLayout, AuthFormField, AuthCheckbox } from './components';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading, error } = useUserStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345678');
  const [confirmPassword, setConfirmPassword] = useState('12345678');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Platform.OS === 'web'
        ? window.alert('お名前、メールアドレス、パスワードを入力してください')
        : Alert.alert('お名前、メールアドレス、パスワードを入力してください');
      return;
    }

    if (!agreeToTerms) {
      Platform.OS === 'web'
        ? window.alert('利用規約に同意してください')
        : Alert.alert('利用規約に同意してください');
      return;
    }

    if (!agreeToPrivacy) {
      Platform.OS === 'web'
        ? window.alert('プライバシーポリシーに同意してください')
        : Alert.alert('プライバシーポリシーに同意してください');
      return;
    }

    await signUp(name, email, password);
    router.push('/(auth)/confirm');
  };

  const helpText = (
    <>
      すでにアカウントをお持ちの方：
      <Link
        href="/(auth)/login"
        style={{ color: '#3DBA8E', textDecorationLine: 'underline' }}
      >
        <Text>ログイン</Text>
      </Link>
    </>
  );

  return (
    <AuthFormLayout
      title="新規登録"
      buttonText="登録する"
      onButtonPress={handleSignUp}
      loading={loading}
      error={error || undefined}
      helpText={helpText}
    >
      <AuthFormField
        label="お名前"
        placeholder="表示名を入力してください"
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
      />
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
        placeholder="8文字以上で入力してください"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AuthFormField
        label="パスワード（確認）"
        placeholder="パスワードを再入力"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <AuthCheckbox
        checked={agreeToTerms}
        onToggle={() => setAgreeToTerms(!agreeToTerms)}
        label="利用規約に同意します"
        linkText="（利用規約を確認）"
        onLinkPress={() =>
          Alert.alert('利用規約', '利用規約ページは準備中です')
        }
      />
      <AuthCheckbox
        checked={agreeToPrivacy}
        onToggle={() => setAgreeToPrivacy(!agreeToPrivacy)}
        label="プライバシーポリシーに同意します"
        linkText="（プライバシーポリシーを確認）"
        onLinkPress={() =>
          Alert.alert(
            'プライバシーポリシー',
            'プライバシーポリシーページは準備中です'
          )
        }
      />
    </AuthFormLayout>
  );
}
