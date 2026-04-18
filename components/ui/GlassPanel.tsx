import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type GlassPanelProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function GlassPanel({ children, style }: GlassPanelProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.wrapper, { shadowColor: colors.shadow }, style]}>
      <View
        style={[
          styles.offsetLayer,
          {
            borderColor: colors.border,
            backgroundColor: colors.tintLighter,
          },
        ]}
      />
      <View
        style={[
          styles.panel,
          {
            borderColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        <View
          style={[
            styles.pulse,
            {
              backgroundColor: colors.accent,
              borderColor: colors.border,
            },
          ]}
        />
        <View style={styles.inner}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  offsetLayer: {
    position: "absolute",
    top: 7,
    left: 7,
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderRadius: 20,
  },
  panel: {
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
  },
  pulse: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 999,
    marginTop: 12,
    marginLeft: 12,
  },
  inner: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
  },
});
