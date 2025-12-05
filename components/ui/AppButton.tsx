import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "solid" | "outline";
  style?: ViewStyle;
};

export function AppButton({
  title,
  onPress,
  variant = "solid",
  style,
}: AppButtonProps) {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.solidButton,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isOutline ? styles.outlineText : styles.solidText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // --- Solid (roxo padrão) ---
  solidButton: {
    backgroundColor: "#4C1D95",
  },
  solidText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  // --- Outline (visível de verdade) ---
  outlineButton: {
    backgroundColor: "#FFFFFF",       // fundo branco — agora aparece!
    borderWidth: 2,
    borderColor: "#4C1D95",
  },
  outlineText: {
    color: "#4C1D95",
    fontWeight: "600",
    fontSize: 16,
  },
});
