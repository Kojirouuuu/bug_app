import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Colors } from '@/constants/colors';
import { Amplify } from 'aws-amplify';
import config from '../src/amplifyconfiguration.json';
// import 'react-native-get-random-values';

Amplify.configure(config);

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="capture" />
        <Stack.Screen name="result" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="detail" />
        <Stack.Screen name="achievement" />
        <Stack.Screen name="test" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" backgroundColor={Colors.background} />
    </View>
  );
}
