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
        .slice(0, 3),
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

  return (
    <LiquidBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Equipe em sintonia
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {currentTeam?.name ?? "Configure sua equipe"}
          </Text>
          <View style={styles.roleRow}>
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
                  {roleLabels[role] ?? role.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Radar da equipe
          </Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {currentTeam?.members.length ?? 0}
              </Text>
              <Text
                style={[styles.metricLabel, { color: colors.textSecondary }]}
              >
                Membros
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {services.length}
              </Text>
              <Text
                style={[styles.metricLabel, { color: colors.textSecondary }]}
              >
                Cultos
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: colors.text }]}>
                {schedules.length}
              </Text>
              <Text
                style={[styles.metricLabel, { color: colors.textSecondary }]}
              >
                Escalas
              </Text>
            </View>
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Proximos cultos
          </Text>
          {upcomingServices.length ? (
            upcomingServices.map((service) => (
              <View
                key={service.id}
                style={[styles.lineRow, { borderColor: colors.borderLight }]}
              >
                <View style={[styles.dot, { backgroundColor: colors.tint }]} />
                <Text style={[styles.lineText, { color: colors.text }]}>
                  {service.title}
                </Text>
                <Text
                  style={[styles.lineMeta, { color: colors.textSecondary }]}
                >
                  {formatServiceDate(service.date, service.time)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              Nenhum culto futuro encontrado.
            </Text>
          )}
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Meu proximo compromisso
          </Text>
          {nextService && nextRole ? (
            <>
              <Text style={[styles.highlight, { color: colors.text }]}>
                {nextService.title}
              </Text>
              <Text style={[styles.paragraph, { color: colors.tint }]}>
                Funcao: {nextRole}
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                {formatServiceDate(nextService.date, nextService.time)}
              </Text>
            </>
          ) : (
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
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
    padding: Spacing.lg,
    paddingBottom: 110,
    gap: Spacing.md,
  },
  title: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: Spacing.sm,
    fontSize: 14,
    lineHeight: 20,
  },
  roleRow: {
    marginTop: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  roleChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  roleChipText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  metricsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  metricLabel: {
    marginTop: 2,
    fontSize: 12,
  },
  lineRow: {
    borderBottomWidth: 1,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  lineText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  lineMeta: {
    fontSize: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlight: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },
});
