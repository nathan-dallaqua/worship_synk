import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserRole } from "@/types";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Panel = "members" | "services" | "instruments";

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  leader: "Lider",
  member: "Integrante",
};

export default function AdminTeamsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { currentUser, currentTeam, services, getInstrumentById } =
    useAppContext();
  const [activePanel, setActivePanel] = useState<Panel>("members");

  const isAdmin = currentUser?.roles.includes("admin");

  const upcomingServices = useMemo(
    () =>
      services
        .filter(
          (service) =>
            new Date(`${service.date}T${service.time}:00`).getTime() >=
            Date.now(),
        )
        .slice(0, 8),
    [services],
  );

  if (!isAdmin) {
    return (
      <LiquidBackground>
        <View style={styles.denied}>
          <Text style={[styles.deniedTitle, { color: colors.text }]}>
            Acesso restrito
          </Text>
          <Text style={[styles.deniedText, { color: colors.textSecondary }]}>
            Esta area e exclusiva para administradores da equipe.
          </Text>
        </View>
      </LiquidBackground>
    );
  }

  return (
    <LiquidBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Gestao da equipe
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Organize pessoas, cultos e funcoes da equipe em um painel unico.
          </Text>
        </GlassPanel>

        <View style={styles.segmentedRow}>
          {[
            { key: "members", label: "Membros" },
            { key: "services", label: "Cultos" },
            { key: "instruments", label: "Instrumentos" },
          ].map((item) => {
            const selected = activePanel === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setActivePanel(item.key as Panel)}
                style={[
                  styles.segment,
                  {
                    borderColor: selected ? colors.tint : colors.border,
                    backgroundColor: selected
                      ? colors.accentSoft
                      : colors.surface,
                  },
                ]}
              >
                <Text style={[styles.segmentText, { color: colors.text }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {activePanel === "members" && (
          <GlassPanel>
            <View style={styles.headingRow}>
              <Text style={[styles.panelTitle, { color: colors.text }]}>
                Membros
              </Text>
              <Pressable
                onPress={() => router.push("/forms/member")}
                style={[styles.ctaSmall, { backgroundColor: colors.tint }]}
              >
                <Text
                  style={[styles.ctaSmallText, { color: colors.background }]}
                >
                  Adicionar
                </Text>
              </Pressable>
            </View>

            {currentTeam?.members.map((member) => (
              <View
                key={member.userId}
                style={[styles.rowItem, { borderColor: colors.borderLight }]}
              >
                <Text style={[styles.itemTitle, { color: colors.text }]}>
                  {member.user.name}
                </Text>
                <Text
                  style={[styles.itemMeta, { color: colors.textSecondary }]}
                >
                  {member.user.roles
                    .map((role) => roleLabels[role])
                    .join(" | ")}
                </Text>
                <Text
                  style={[styles.itemMeta, { color: colors.textSecondary }]}
                >
                  {member.instruments
                    .map(
                      (instrumentId) => getInstrumentById(instrumentId)?.name,
                    )
                    .filter(Boolean)
                    .join(" | ") || "Sem funcao definida"}
                </Text>
              </View>
            ))}
          </GlassPanel>
        )}

        {activePanel === "services" && (
          <GlassPanel>
            <View style={styles.headingRow}>
              <Text style={[styles.panelTitle, { color: colors.text }]}>
                Cultos
              </Text>
              <Pressable
                onPress={() => router.push("/forms/service")}
                style={[styles.ctaSmall, { backgroundColor: colors.tint }]}
              >
                <Text
                  style={[styles.ctaSmallText, { color: colors.background }]}
                >
                  Novo
                </Text>
              </Pressable>
            </View>

            {upcomingServices.map((service) => (
              <View
                key={service.id}
                style={[styles.rowItem, { borderColor: colors.borderLight }]}
              >
                <Text style={[styles.itemTitle, { color: colors.text }]}>
                  {service.title}
                </Text>
                <Text
                  style={[styles.itemMeta, { color: colors.textSecondary }]}
                >
                  {service.date} as {service.time} |{" "}
                  {service.frequency === "weekly" ? "Semanal" : "Especial"}
                </Text>
              </View>
            ))}
          </GlassPanel>
        )}

        {activePanel === "instruments" && (
          <GlassPanel>
            <View style={styles.headingRow}>
              <Text style={[styles.panelTitle, { color: colors.text }]}>
                Instrumentos
              </Text>
              <Pressable
                onPress={() => router.push("/forms/instrument")}
                style={[styles.ctaSmall, { backgroundColor: colors.tint }]}
              >
                <Text
                  style={[styles.ctaSmallText, { color: colors.background }]}
                >
                  Novo
                </Text>
              </Pressable>
            </View>

            {currentTeam?.instruments.map((instrument) => (
              <View
                key={instrument.id}
                style={[styles.rowItem, { borderColor: colors.borderLight }]}
              >
                <Text style={[styles.itemTitle, { color: colors.text }]}>
                  {instrument.name}
                </Text>
                {instrument.description ? (
                  <Text
                    style={[styles.itemMeta, { color: colors.textSecondary }]}
                  >
                    {instrument.description}
                  </Text>
                ) : null}
              </View>
            ))}
          </GlassPanel>
        )}
      </ScrollView>
    </LiquidBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: Spacing.lg,
    paddingBottom: 110,
    gap: Spacing.md,
  },
  denied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  deniedTitle: {
    fontSize: 24,
    fontWeight: "800",
  },
  deniedText: {
    marginTop: Spacing.sm,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
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
  segmentedRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  segment: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: Spacing.sm,
    alignItems: "center",
  },
  segmentText: {
    fontSize: 11,
    fontWeight: "700",
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  ctaSmall: {
    borderRadius: 10,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  ctaSmallText: {
    fontSize: 12,
    fontWeight: "700",
  },
  rowItem: {
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  itemMeta: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
});
