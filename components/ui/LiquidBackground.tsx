import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type LiquidBackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function LiquidBackground({ children, style }: LiquidBackgroundProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const isDark = colorScheme === "dark";

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View
        pointerEvents="none"
        style={[
          styles.heroBand,
          {
            backgroundColor: isDark
              ? "rgba(12, 99, 246, 0.2)"
              : "rgba(12, 99, 246, 0.16)",
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.accentBlock,
          {
            backgroundColor: isDark
              ? "rgba(255, 106, 61, 0.18)"
              : "rgba(255, 106, 61, 0.2)",
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.gridLine,
          styles.gridLineOne,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(12, 99, 246, 0.1)",
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.gridLine,
          styles.gridLineTwo,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(12, 99, 246, 0.07)",
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.gridLine,
          styles.gridLineThree,
          {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(12, 99, 246, 0.05)",
          },
        ]}
      />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  accentBlock: {
    position: "absolute",
    width: 170,
    height: 170,
    right: -46,
    top: 108,
    borderRadius: 24,
    transform: [{ rotate: "14deg" }],
  },
  gridLine: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 1,
  },
  gridLineOne: {
    top: 106,
  },
  gridLineTwo: {
    top: 146,
  },
  gridLineThree: {
    top: 186,
  },
});
