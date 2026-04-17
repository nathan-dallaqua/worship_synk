/**
 * Tabs Layout
 * Estrutura de abas baseada no papel do usuário (Admin, Líder, Integrante)
 */

import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentUser } = useAppContext();
  const palette = Colors[colorScheme ?? "light"];

  // Detecta quais abas mostrar baseado no papel do usuário
  const isAdmin = currentUser?.roles.includes("admin");
  const isLeader = currentUser?.roles.includes("leader");
  const isMember = currentUser?.roles.includes("member");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tint,
        tabBarInactiveTintColor: palette.icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView
            tint={colorScheme === "dark" ? "dark" : "light"}
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          left: Spacing.lg,
          right: Spacing.lg,
          bottom: Spacing.lg,
          borderTopColor: "transparent",
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: palette.glassBorder,
          backgroundColor: palette.glass,
          paddingBottom: Spacing.xs,
          paddingTop: Spacing.xs,
          height: 58 + Spacing.md,
          borderRadius: 18,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 0,
        },
      }}
    >
      {/* Tela Comum a Todos */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Telas de Admin */}
      {isAdmin && (
        <Tabs.Screen
          name="admin/teams"
          options={{
            title: "Gerenciar",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="person.3.fill" color={color} />
            ),
          }}
        />
      )}

      {/* Telas de Líder */}
      {isLeader && (
        <Tabs.Screen
          name="leader/services"
          options={{
            title: "Cultos",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="music.note.list" color={color} />
            ),
          }}
        />
      )}

      {/* Telas de Integrante */}
      {isMember && (
        <Tabs.Screen
          name="member/schedule"
          options={{
            title: "Escala",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="calendar" color={color} />
            ),
          }}
        />
      )}

      {/* Perfil - Disponível para Todos */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="person.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
