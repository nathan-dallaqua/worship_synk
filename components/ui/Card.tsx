/**
 * Card Component
 * Container minimalista corporativo para conteúdo
 */

import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "elevated" | "flat";
  padding?: keyof typeof Spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "flat",
  padding = "lg",
}) => {
  const isDark = false; // TODO: usar hook de theme
  const colors = isDark ? Colors.dark : Colors.light;

  const getPaddingValue = () => {
    return Spacing[padding];
  };

  const getBackground = () => {
    if (variant === "elevated") {
      return colors.surface;
    }
    return colors.background;
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackground(),
          borderColor: colors.border,
          padding: getPaddingValue(),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
});
