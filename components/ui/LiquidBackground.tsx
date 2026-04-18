import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

type LiquidBackgroundProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function LiquidBackground({ children, style }: LiquidBackgroundProps) {
  return (
    <LinearGradient
      colors={["#02040A", "#071026", "#0A1B3F"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
