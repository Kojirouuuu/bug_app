import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/colors';

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode
  buttonText: string;
  onButtonPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: React.ReactNode;
  
}

export default function AuthFormLayout({
  title,
  children,
  buttonText,
  onButtonPress,
  loading = false,
  disabled = false,
  error,
  helpText,
}: AuthFormLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{title}</Text>

        {children}

        <TouchableOpacity
          style={[
            styles.formButton,
            (loading || disabled) && styles.formButtonDisabled,
          ]}
          onPress={onButtonPress}
          disabled={loading || disabled}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text style={styles.formButtonText}>{buttonText}</Text>
          )}
        </TouchableOpacity>

        {helpText && <View style={styles.formHelpTextContainer}>{helpText}</View>}

        {error && <Text style={styles.formError}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  formButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.small,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formButtonDisabled: {
    backgroundColor: Colors.gray,
  },
  formButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: '600',
  },
  formHelpText: {
    fontSize: Typography.small,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  formHelpTextContainer: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  formError: {
    color: Colors.error,
    fontSize: Typography.small,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
