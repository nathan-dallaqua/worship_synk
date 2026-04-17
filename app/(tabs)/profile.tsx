import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  leader: "Lider",
  member: "Integrante",
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { currentUser, users, switchCurrentUser, setCurrentUser, currentTeam } =
    useAppContext();

  return (
    <LiquidBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            {currentUser?.name ?? "Sem sessao"}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {currentUser?.email ??
              "Selecione um usuario para simular os papeis"}
          </Text>

          <View style={styles.rolesRow}>
            {currentUser?.roles.map((role) => (
              <View
                key={role}
                style={[
                  styles.roleChip,
                  {
                    borderColor: colors.border,
                    backgroundColor: "transparent",
                  },
                ]}
              >
                <Text style={[styles.roleChipText, { color: colors.tint }]}>
                  {roleLabels[role] ?? role}
                </Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Equipe
          </Text>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            {currentTeam?.name ?? "Equipe nao selecionada"}
          </Text>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            Membros: {currentTeam?.members.length ?? 0}
          </Text>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Trocar visualizacao
          </Text>
          <Text style={[styles.metaText, { color: colors.textSecondary }]}>
            Selecione um perfil para testar as visoes de admin, lider e
            integrante.
          </Text>

          {users.map((user) => {
            const selected = user.id === currentUser?.id;
            return (
              <Pressable
                key={user.id}
                onPress={() => switchCurrentUser(user.id)}
                style={[
                  styles.userRow,
                  {
                    borderColor: selected ? colors.tint : colors.border,
                    backgroundColor: selected
                      ? colors.accentSoft
                      : "transparent",
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {user.name}
                  </Text>
                  <Text
                    style={[styles.metaText, { color: colors.textSecondary }]}
                  >
                    {user.roles.map((role) => roleLabels[role]).join(" | ")}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.switchLabel,
                    { color: selected ? colors.tint : colors.textSecondary },
                  ]}
                >
                  {selected ? "Ativo" : "Entrar"}
                </Text>
              </Pressable>
            );
          })}
        </GlassPanel>

        <Pressable
          onPress={() => setCurrentUser(null)}
          style={[
            styles.logoutButton,
            { borderColor: colors.error, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Encerrar sessao
          </Text>
        </Pressable>
      </ScrollView>
    </LiquidBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: 110,
    gap: Spacing.md,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
  },
  rolesRow: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  roleChip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: "700",
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  metaText: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
  },
  userRow: {
    borderWidth: 1,
    borderRadius: 10,
    padding: Spacing.sm,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: Spacing.sm,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
