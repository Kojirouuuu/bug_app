import { Slot } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Slot /> {/* ← ここが"ログイン画面"の中身 */}
      </View>
    </View>
  );
}
