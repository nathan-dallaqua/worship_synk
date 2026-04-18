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

  const panelMeta = {
    members: `${currentTeam?.members.length ?? 0} membros cadastrados`,
    services: `${upcomingServices.length} cultos no horizonte`,
    instruments: `${currentTeam?.instruments.length ?? 0} funcoes ativas`,
  };

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
        <View
          style={[
            styles.headerBoard,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.kicker, { color: colors.textSecondary }]}>
            ADMIN
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Operacoes da equipe
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Controle de membros, cultos e instrumentos em uma central unica.
          </Text>
        </View>

        <GlassPanel>
          <View style={styles.segmentRail}>
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
                        ? colors.tintLighter
                        : colors.surfaceSecondary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      { color: selected ? colors.tintDark : colors.text },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={[styles.panelHint, { color: colors.textSecondary }]}>
            {panelMeta[activePanel]}
          </Text>
        </GlassPanel>

        {activePanel === "members" && (
          <GlassPanel>
            <View style={styles.headingRow}>
              <Text style={[styles.panelTitle, { color: colors.text }]}>
                Membros
              </Text>
              <Pressable
                onPress={() => router.push("/forms/member")}
                style={[styles.cta, { backgroundColor: colors.tint }]}
              >
                <Text style={[styles.ctaText, { color: colors.background }]}>
                  Adicionar
                </Text>
              </Pressable>
            </View>

            {currentTeam?.members.map((member) => (
              <View
                key={member.userId}
                style={[
                  styles.rowItem,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
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
                style={[styles.cta, { backgroundColor: colors.tint }]}
              >
                <Text style={[styles.ctaText, { color: colors.background }]}>
                  Novo
                </Text>
              </Pressable>
            </View>

            {upcomingServices.map((service) => (
              <View
                key={service.id}
                style={[
                  styles.rowItem,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
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
                style={[styles.cta, { backgroundColor: colors.tint }]}
              >
                <Text style={[styles.ctaText, { color: colors.background }]}>
                  Novo
                </Text>
              </Pressable>
            </View>

            {currentTeam?.instruments.map((instrument) => (
              <View
                key={instrument.id}
                style={[
                  styles.rowItem,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 124,
    gap: Spacing.lg,
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
    marginTop: 3,
    fontSize: 14,
    lineHeight: 19,
  },
  segmentRail: {
    flexDirection: "row",
    gap: 8,
  },
  segment: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  segmentText: {
    fontSize: 12,
    fontWeight: "800",
  },
  panelHint: {
    marginTop: Spacing.sm,
    fontSize: 12,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  cta: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: "800",
  },
  rowItem: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  itemMeta: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
  },
});
