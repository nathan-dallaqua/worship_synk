import { BorderRadius, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

type GlassPanelProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function GlassPanel({ children, style }: GlassPanelProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.shadowWrap, { shadowColor: colors.shadow }, style]}>
      <LinearGradient
        colors={[colors.glass, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BlurView
          tint={colorScheme === "dark" ? "dark" : "light"}
          intensity={36}
          experimentalBlurMethod={
            Platform.OS === "android" ? "dimezisBlurView" : undefined
          }
          style={styles.blur}
        >
          <View style={[styles.inner, { borderColor: colors.glassBorder }]}>
            {children}
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: BorderRadius.xl,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 1,
  },
  gradient: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
  blur: {
    borderRadius: BorderRadius.xl,
  },
  inner: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: 14,
  },
});
