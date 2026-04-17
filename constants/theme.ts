/**
 * Worship Synk Theme - Liquid Material Palette
 */

import { Platform } from "react-native";

// Primary palette
const primary = "#4168F6";
const primaryLight = "#6F86FF";
const primaryLighter = "#E9EEFF";
const primaryDark = "#1E37A8";

// Neutral Colors
const neutral = {
  white: "#FFFFFF",
  black: "#000000",
  gray950: "#0A0E1E",
  gray900: "#131936",
  gray800: "#21294D",
  gray700: "#374065",
  gray600: "#525D84",
  gray500: "#747FA5",
  gray400: "#98A1C3",
  gray300: "#BCC2DC",
  gray200: "#DEE2F0",
  gray100: "#EEF1FA",
  gray50: "#F6F8FE",
};

// Semantic Colors
const semantic = {
  success: "#149351",
  warning: "#E39A21",
  error: "#D93452",
  info: "#4168F6",
};

export const Colors = {
  light: {
    // Text colors
    text: neutral.gray900,
    textSecondary: neutral.gray600,
    textTertiary: neutral.gray500,

    // Backgrounds
    background: "#EEF2FF",
    backgroundSecondary: "#F7F8FF",
    surface: "rgba(255, 255, 255, 0.76)",
    surfaceSecondary: "rgba(245, 248, 255, 0.82)",

    // Interactive
    tint: primary,
    tintLight: primaryLight,
    tintLighter: primaryLighter,
    tintDark: primaryDark,
    accent: "#2DD9C5",
    accentSoft: "#D7FFFA",

    // Icons
    icon: neutral.gray700,
    iconSecondary: neutral.gray400,
    tabIconDefault: neutral.gray400,
    tabIconSelected: primary,

    // Semantic
    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,

    // Borders
    border: "rgba(130, 146, 202, 0.34)",
    borderLight: "rgba(255, 255, 255, 0.72)",

    // Liquid glass
    glass: "rgba(255, 255, 255, 0.5)",
    glassStrong: "rgba(255, 255, 255, 0.7)",
    glassBorder: "rgba(255, 255, 255, 0.75)",
    gradientStart: "#DDE7FF",
    gradientEnd: "#EAFBFF",
    shadow: "rgba(79, 98, 173, 0.18)",

    // Overlays
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    // Text colors
    text: "#F3F6FF",
    textSecondary: neutral.gray300,
    textTertiary: neutral.gray400,

    // Backgrounds
    background: neutral.gray950,
    backgroundSecondary: "#101833",
    surface: "rgba(28, 35, 67, 0.78)",
    surfaceSecondary: "rgba(37, 46, 84, 0.82)",

    // Interactive
    tint: primaryLight,
    tintLight: primary,
    tintLighter: primaryLighter,
    tintDark: primaryDark,
    accent: "#2DD9C5",
    accentSoft: "rgba(45, 217, 197, 0.12)",

    // Icons
    icon: neutral.gray300,
    iconSecondary: neutral.gray400,
    tabIconDefault: neutral.gray400,
    tabIconSelected: primaryLight,

    // Semantic
    success: semantic.success,
    warning: semantic.warning,
    error: semantic.error,
    info: semantic.info,

    // Borders
    border: "rgba(148, 160, 209, 0.3)",
    borderLight: "rgba(148, 160, 209, 0.22)",

    // Liquid glass
    glass: "rgba(21, 29, 60, 0.52)",
    glassStrong: "rgba(30, 40, 74, 0.7)",
    glassBorder: "rgba(170, 187, 235, 0.26)",
    gradientStart: "#0D142C",
    gradientEnd: "#1A2548",
    shadow: "rgba(5, 8, 20, 0.5)",

    // Overlays
    overlay: "rgba(0, 0, 0, 0.8)",
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
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
