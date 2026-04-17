/**
 * Typography Components
 * Componentes de texto estilizados com hierarquia visual
 */

import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
}

const isDark = false; // TODO: usar hook de theme
const colors = isDark ? Colors.dark : Colors.light;

export const H1: React.FC<TextProps> = ({ children, style, numberOfLines }) => (
  <Text
    style={[styles.h1, { color: colors.text }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const H2: React.FC<TextProps> = ({ children, style, numberOfLines }) => (
  <Text
    style={[styles.h2, { color: colors.text }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const H3: React.FC<TextProps> = ({ children, style, numberOfLines }) => (
  <Text
    style={[styles.h3, { color: colors.text }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Body: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
}) => (
  <Text
    style={[styles.body, { color: colors.text }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Caption: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
}) => (
  <Text
    style={[styles.caption, { color: colors.textSecondary }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

export const Label: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
}) => (
  <Text
    style={[styles.label, { color: colors.textSecondary }, style]}
    numberOfLines={numberOfLines}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
