/**
 * Worship Synk Theme - Pulse Board UI
 */

import { Platform } from "react-native";

const primary = "#0C63F6";
const primaryLight = "#4D8EFF";
const primaryLighter = "#DBE9FF";
const primaryDark = "#083B96";

const neutral = {
  white: "#FFFFFF",
  black: "#000000",
  gray950: "#10131A",
  gray900: "#181F2B",
  gray800: "#253046",
  gray700: "#364766",
  gray600: "#4D5F80",
  gray500: "#6E7F9F",
  gray400: "#97A4BD",
  gray300: "#C1CBE0",
  gray200: "#DEE4F0",
  gray100: "#EFF3FA",
  gray50: "#F8FAFE",
};

const semantic = {
  success: "#118043",
  warning: "#A15B06",
  error: "#CF2D4E",
  info: primary,
};

export const Colors = {
  light: {
    white: neutral.white,

    text: neutral.gray900,
    textSecondary: neutral.gray700,
    textTertiary: neutral.gray500,

    background: "#F4F7FF",
    backgroundSecondary: "#E9F0FF",
    surface: "#FFFFFF",
    surfaceSecondary: "#EEF4FF",

    tint: primary,
    tintLight: primaryLight,
    tintLighter: primaryLighter,
    tintDark: primaryDark,
    accent: "#FF6A3D",
    accentSoft: "#FFE8DF",

    icon: neutral.gray700,
    iconSecondary: neutral.gray400,
    tabIconDefault: neutral.gray400,
    tabIconSelected: primary,

    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,

    border: "#BFD1EE",
    borderLight: "#D8E3F6",

    // Legacy compatibility keys
    glass: "#FFFFFF",
    glassStrong: "#FFFFFF",
    glassBorder: "#BFD1EE",
    gradientStart: "#E3EDFF",
    gradientEnd: "#F8FAFE",
    shadow: "rgba(17, 29, 55, 0.16)",

    overlay: "rgba(0, 0, 0, 0.52)",
  },
  dark: {
    white: neutral.white,

    text: "#F5F8FF",
    textSecondary: neutral.gray300,
    textTertiary: neutral.gray400,

    background: "#0D111A",
    backgroundSecondary: "#121927",
    surface: "#1A2436",
    surfaceSecondary: "#23314A",

    tint: primaryLight,
    tintLight: primary,
    tintLighter: "#294B8B",
    tintDark: "#7DB0FF",
    accent: "#FF875E",
    accentSoft: "rgba(255, 135, 94, 0.18)",

    icon: neutral.gray300,
    iconSecondary: neutral.gray400,
    tabIconDefault: neutral.gray500,
    tabIconSelected: primaryLight,

    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,

    border: "#334664",
    borderLight: "#2A3B58",

    // Legacy compatibility keys
    glass: "#1A2436",
    glassStrong: "#1A2436",
    glassBorder: "#334664",
    gradientStart: "#121D30",
    gradientEnd: "#0D131E",
    shadow: "rgba(0, 0, 0, 0.6)",

    overlay: "rgba(0, 0, 0, 0.82)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const Fonts = Platform.select({
  ios: {
    sans: "Avenir Next",
    serif: "Georgia",
    rounded: "Trebuchet MS",
    mono: "Menlo",
  },
  default: {
    sans: "sans-serif-condensed",
    serif: "serif",
    rounded: "sans-serif-medium",
    mono: "monospace",
  },
  web: {
    sans: "'Sora', 'Avenir Next', 'Trebuchet MS', 'Segoe UI', sans-serif",
    serif: "'Merriweather', Georgia, serif",
    rounded: "'Manrope', 'Nunito Sans', Verdana, sans-serif",
    mono: "'JetBrains Mono', 'IBM Plex Mono', Menlo, Monaco, monospace",
  },
});
