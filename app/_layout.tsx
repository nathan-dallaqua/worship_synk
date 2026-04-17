/**
 * Root Layout
 * Estrutura principal da navegação com suporte a múltiplos roles
 */

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AppProvider } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="forms/member"
            options={{ presentation: "modal", title: "Novo Integrante" }}
          />
          <Stack.Screen
            name="forms/service"
            options={{ presentation: "modal", title: "Novo Culto" }}
          />
          <Stack.Screen
            name="forms/instrument"
            options={{ presentation: "modal", title: "Novo Instrumento" }}
          />
          <Stack.Screen
            name="forms/setlist"
            options={{ presentation: "modal", title: "Adicionar Musica" }}
          />
          <Stack.Screen
            name="forms/schedule"
            options={{ presentation: "modal", title: "Escalar Integrante" }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
