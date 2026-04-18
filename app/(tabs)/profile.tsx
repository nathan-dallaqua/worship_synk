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
        <View
          style={[
            styles.headerBoard,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.kicker, { color: colors.textSecondary }]}>
            PERFIL ATIVO
          </Text>
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
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text style={[styles.roleChipText, { color: colors.tintDark }]}>
                  {roleLabels[role] ?? role}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Equipe
          </Text>
          <View style={styles.metaGrid}>
            <View
              style={[
                styles.metaCell,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
                Nome
              </Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>
                {currentTeam?.name ?? "Equipe nao selecionada"}
              </Text>
            </View>
            <View
              style={[
                styles.metaCell,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
                Membros
              </Text>
              <Text style={[styles.metaValue, { color: colors.text }]}>
                {currentTeam?.members.length ?? 0}
              </Text>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Trocar visualizacao
          </Text>
          <Text style={[styles.helper, { color: colors.textSecondary }]}>
            Altere o perfil para navegar pelas visoes de admin, lider e
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
                      ? colors.tintLighter
                      : colors.surfaceSecondary,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {user.name}
                  </Text>
                  <Text
                    style={[styles.userMeta, { color: colors.textSecondary }]}
                  >
                    {user.roles.map((role) => roleLabels[role]).join(" | ")}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.switchLabel,
                    { color: selected ? colors.tintDark : colors.tint },
                  ]}
                >
                  {selected ? "ATIVO" : "ENTRAR"}
                </Text>
              </Pressable>
            );
          })}
        </GlassPanel>

        <Pressable
          onPress={() => setCurrentUser(null)}
          style={[
            styles.logoutButton,
            {
              borderColor: colors.error,
              backgroundColor: colors.surface,
            },
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 124,
    gap: Spacing.lg,
  },
  headerBoard: {
    borderWidth: 2,
    borderRadius: 24,
    borderStyle: "dashed",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: "800",
  },
  title: {
    marginTop: 4,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 2,
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
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleChipText: {
    fontSize: 12,
    fontWeight: "800",
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  metaGrid: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    gap: 8,
  },
  metaCell: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  metaValue: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "800",
  },
  helper: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
  userRow: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  userName: {
    fontSize: 15,
    fontWeight: "800",
  },
  userMeta: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
  switchLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  logoutButton: {
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
