import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '@/constants/colors';

interface AuthCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  linkText?: string;
  onLinkPress?: () => void;
}

export default function AuthCheckbox({
  checked,
  onToggle,
  label,
  linkText,
  onLinkPress,
}: AuthCheckboxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={styles.label}>
          {label}
          {linkText && (
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={styles.linkText}>{linkText}</Text>
            </TouchableOpacity>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: Typography.small,
    color: Colors.darkGray,
    flex: 1,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
