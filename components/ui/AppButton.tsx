// components/ui/AppButton.tsx
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

type AppButtonVariant = "primary" | "secondary" | "ghost";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  fullWidth = true,
  disabled,
  loading,
  style,
  textStyle,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={isDisabled ? undefined : onPress}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "ghost" && styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          style={[
            styles.textBase,
            variant === "secondary" && styles.textSecondary,
            variant === "ghost" && styles.textGhost,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  primary: {
    backgroundColor: "#7B3AED", // roxo principal
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#7B3AED",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.6,
  },
  textBase: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  textSecondary: {
    color: "#7B3AED",
  },
  textGhost: {
    color: "#7B3AED",
  },
});
