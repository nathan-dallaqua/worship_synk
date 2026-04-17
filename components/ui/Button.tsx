/**
 * Common Button Component
 * Minimalista com estilo corporativo
 */

import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
}) => {
  const isDark = false; // TODO: usar hook de theme
  const colors = isDark ? Colors.dark : Colors.light;

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    switch (variant) {
      case "primary":
        return colors.tint;
      case "secondary":
        return colors.surface;
      case "outline":
        return "transparent";
      case "danger":
        return colors.error;
      default:
        return colors.tint;
    }
  };

  const getTextColor = () => {
    if (variant === "secondary") return colors.text;
    if (variant === "outline") return colors.tint;
    return colors.white;
  };

  const getPadding = () => {
    switch (size) {
      case "small":
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md };
      case "medium":
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg };
      case "large":
        return { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl };
      default:
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg };
    }
  };

  const borderWidth = variant === "outline" ? 1 : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth,
          borderColor: colors.tint,
        },
        getPadding(),
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
