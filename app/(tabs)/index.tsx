import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const roleLabels: Record<string, string> = {
  admin: "ADMIN",
  leader: "LIDER",
  member: "INTEGRANTE",
};

const formatServiceDate = (date: string, time: string) => {
  const value = new Date(`${date}T${time}:00`);
  return value.toLocaleString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const {
    currentUser,
    currentTeam,
    services,
    schedules,
    getScheduleForUser,
    getServiceById,
    getInstrumentById,
  } = useAppContext();

  const upcomingServices = useMemo(
    () =>
      services
        .filter(
          (service) =>
            new Date(`${service.date}T${service.time}:00`).getTime() >=
            Date.now(),
        )
        .slice(0, 4),
    [services],
  );

  const mySchedules = useMemo(
    () =>
      currentUser
        ? getScheduleForUser(currentUser.id).sort((a, b) => {
            const first = getServiceById(a.serviceId);
            const second = getServiceById(b.serviceId);
            if (!first || !second) {
              return 0;
            }
            return (
              new Date(`${first.date}T${first.time}:00`).getTime() -
              new Date(`${second.date}T${second.time}:00`).getTime()
            );
          })
        : [],
    [currentUser, getScheduleForUser, getServiceById],
  );

  const nextAssignment = mySchedules[0];
  const nextService = nextAssignment
    ? getServiceById(nextAssignment.serviceId)
    : undefined;
  const nextRole = nextAssignment
    ? getInstrumentById(nextAssignment.instrumentId)?.name
    : undefined;

  const greetingName = currentUser?.name?.split(" ")[0] ?? "Equipe";

  return (
    <LiquidBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.heroBlock,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.heroKicker, { color: colors.textSecondary }]}>
            WORSHIP SYNK
          </Text>
          <Text style={[styles.heroTitle, { color: colors.text }]}>
            Painel de controle
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Ola, {greetingName}. Hoje voce gerencia a equipe{" "}
            {currentTeam?.name ?? "sem nome"}.
          </Text>

          <View style={styles.roleRow}>
            {currentUser?.roles.map((role) => (
              <View
                key={role}
                style={[
                  styles.roleTag,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text style={[styles.roleTagText, { color: colors.tintDark }]}>
                  {roleLabels[role] ?? role.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Indicadores
          </Text>
          <View style={styles.kpiGrid}>
            <View style={[styles.kpiCard, { borderColor: colors.border }]}>
              <Text style={[styles.kpiValue, { color: colors.text }]}>
                {currentTeam?.members.length ?? 0}
              </Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
                Membros
              </Text>
            </View>
            <View style={[styles.kpiCard, { borderColor: colors.border }]}>
              <Text style={[styles.kpiValue, { color: colors.text }]}>
                {services.length}
              </Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
                Cultos
              </Text>
            </View>
            <View style={[styles.kpiCard, { borderColor: colors.border }]}>
              <Text style={[styles.kpiValue, { color: colors.text }]}>
                {schedules.length}
              </Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
                Escalas
              </Text>
            </View>
            <View style={[styles.kpiCard, { borderColor: colors.border }]}>
              <Text style={[styles.kpiValue, { color: colors.text }]}>
                {mySchedules.length}
              </Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>
                Minhas
              </Text>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Linha do tempo dos proximos cultos
          </Text>
          {upcomingServices.length ? (
            upcomingServices.map((service, index) => (
              <View key={service.id} style={styles.timelineRow}>
                <View style={styles.timelineRail}>
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: colors.tint },
                    ]}
                  />
                  {index < upcomingServices.length - 1 ? (
                    <View
                      style={[
                        styles.timelineLine,
                        { backgroundColor: colors.border },
                      ]}
                    />
                  ) : null}
                </View>
                <View
                  style={[
                    styles.eventCard,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.surfaceSecondary,
                    },
                  ]}
                >
                  <Text style={[styles.eventTitle, { color: colors.text }]}>
                    {service.title}
                  </Text>
                  <Text
                    style={[styles.eventMeta, { color: colors.textSecondary }]}
                  >
                    {formatServiceDate(service.date, service.time)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum culto futuro encontrado.
            </Text>
          )}
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Meu proximo compromisso
          </Text>
          {nextService && nextRole ? (
            <View
              style={[
                styles.nextCard,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <Text style={[styles.nextTitle, { color: colors.text }]}>
                {nextService.title}
              </Text>
              <Text style={[styles.nextRole, { color: colors.accent }]}>
                Funcao: {nextRole}
              </Text>
              <Text style={[styles.nextMeta, { color: colors.textSecondary }]}>
                {formatServiceDate(nextService.date, nextService.time)}
              </Text>
            </View>
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Voce ainda nao foi escalado para os proximos cultos.
            </Text>
          )}
        </GlassPanel>
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
  heroBlock: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 2,
    borderStyle: "dashed",
  },
  heroKicker: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  heroTitle: {
    marginTop: 4,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "900",
  },
  heroSubtitle: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 19,
  },
  roleRow: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roleTag: {
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  roleTagText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  kpiGrid: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  kpiCard: {
    width: "48.7%",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  kpiValue: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "900",
  },
  kpiLabel: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },
  timelineRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  timelineRail: {
    width: 16,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -8,
  },
  eventCard: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "800",
  },
  eventMeta: {
    marginTop: 2,
    fontSize: 12,
  },
  nextCard: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  nextTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  nextRole: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "800",
  },
  nextMeta: {
    marginTop: 2,
    fontSize: 12,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 18,
  },
});
