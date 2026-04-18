import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentUser } = useAppContext();
  const palette = Colors[colorScheme ?? "light"];

  const isAdmin = currentUser?.roles.includes("admin");
  const isLeader = currentUser?.roles.includes("leader");
  const isMember = currentUser?.roles.includes("member");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tint,
        tabBarInactiveTintColor: palette.iconSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
          left: Spacing.md,
          right: Spacing.md,
          bottom: 12,
          borderTopWidth: 2,
          borderWidth: 2,
          borderColor: palette.border,
          backgroundColor: palette.surface,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          borderRadius: 18,
          shadowColor: palette.shadow,
          shadowOpacity: 0.16,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 5,
        },
        tabBarItemStyle: {
          borderRadius: 12,
          marginHorizontal: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "800",
          marginTop: 1,
          letterSpacing: 0.2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={23} name="house.fill" color={color} />
          ),
        }}
      />

      {isAdmin && (
        <Tabs.Screen
          name="admin/teams"
          options={{
            title: "Equipe",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={23} name="person.3.fill" color={color} />
            ),
          }}
        />
      )}

      {isLeader && (
        <Tabs.Screen
          name="leader/services"
          options={{
            title: "Planejar",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={23} name="music.note.list" color={color} />
            ),
          }}
        />
      )}

      {isMember && (
        <Tabs.Screen
          name="member/schedule"
          options={{
            title: "Agenda",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={23} name="calendar" color={color} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={23} name="person.fill" color={color} />
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
