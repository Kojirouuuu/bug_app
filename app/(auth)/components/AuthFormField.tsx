import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

interface AuthFormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function AuthFormField({
  label,
  error,
  style,
  ...props
}: AuthFormFieldProps) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.formLabel}>{label}</Text>
      <TextInput
        style={[styles.formInput, error && styles.formInputError, style]}
        placeholderTextColor={Colors.gray}
        {...props}
      />
      {error && <Text style={styles.fieldError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: Spacing.lg,
  },
  formLabel: {
    fontSize: Typography.medium,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: Spacing.sm,
  },
  formInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.medium,
    color: Colors.darkGray,
  },
  formInputError: {
    borderColor: Colors.error,
  },
  fieldError: {
    color: Colors.error,
    fontSize: Typography.small,
    marginTop: Spacing.xs,
  },
});
