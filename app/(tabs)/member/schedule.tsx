import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const openExternalLink = async (url?: string) => {
  if (!url) {
    return;
  }

  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("Link invalido", "Nao foi possivel abrir este link.");
  }
};

const formatDate = (date: string, time: string) => {
  const value = new Date(`${date}T${time}:00`);
  return value.toLocaleString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MemberScheduleScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const {
    currentUser,
    getScheduleForUser,
    getServiceById,
    getSetlistForService,
    getInstrumentById,
    toggleScheduleConfirmation,
  } = useAppContext();

  const isMember = currentUser?.roles.includes("member");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const schedules = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return getScheduleForUser(currentUser.id)
      .map((schedule) => ({
        schedule,
        service: getServiceById(schedule.serviceId),
      }))
      .filter((item) => item.service)
      .sort((a, b) => {
        const first = new Date(
          `${a.service?.date}T${a.service?.time}:00`,
        ).getTime();
        const second = new Date(
          `${b.service?.date}T${b.service?.time}:00`,
        ).getTime();
        return first - second;
      });
  }, [currentUser, getScheduleForUser, getServiceById]);

  if (!isMember) {
    return (
      <LiquidBackground>
        <View style={styles.denied}>
          <Text style={[styles.deniedTitle, { color: colors.text }]}>
            Sem escala de integrante
          </Text>
          <Text style={[styles.deniedText, { color: colors.textSecondary }]}>
            Este usuario nao possui o papel de integrante na equipe.
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
            INTEGRANTE
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Minha timeline
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Abra cada culto para ver repertorio e confirmar presenca.
          </Text>
        </View>

        {schedules.length === 0 ? (
          <GlassPanel>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Nada por enquanto
            </Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Quando voce for escalado, os detalhes aparecerao aqui
              automaticamente.
            </Text>
          </GlassPanel>
        ) : (
          schedules.map(({ schedule, service }, index) => {
            const expanded = expandedId === schedule.id;
            const setlist = service ? getSetlistForService(service.id) : [];
            const roleName =
              getInstrumentById(schedule.instrumentId)?.name ?? "Funcao";

            return (
              <View key={schedule.id} style={styles.timelineRow}>
                <View style={styles.timelineRail}>
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: colors.tint },
                    ]}
                  />
                  {index < schedules.length - 1 ? (
                    <View
                      style={[
                        styles.timelineLine,
                        { backgroundColor: colors.border },
                      ]}
                    />
                  ) : null}
                </View>

                <GlassPanel style={styles.timelinePanel}>
                  <Pressable
                    onPress={() => setExpandedId(expanded ? null : schedule.id)}
                    style={styles.headerRow}
                  >
                    <View style={styles.headerMain}>
                      <Text style={[styles.itemTitle, { color: colors.text }]}>
                        {service?.title}
                      </Text>
                      <Text
                        style={[
                          styles.itemMeta,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {service
                          ? formatDate(service.date, service.time)
                          : "Data nao encontrada"}
                      </Text>
                      <Text style={[styles.itemRole, { color: colors.accent }]}>
                        Papel: {roleName}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        {
                          borderColor: schedule.confirmed
                            ? colors.success
                            : colors.warning,
                          backgroundColor: schedule.confirmed
                            ? "rgba(17, 128, 67, 0.16)"
                            : "rgba(161, 91, 6, 0.18)",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: schedule.confirmed
                              ? colors.success
                              : colors.warning,
                          },
                        ]}
                      >
                        {schedule.confirmed ? "Confirmado" : "Pendente"}
                      </Text>
                    </View>
                  </Pressable>

                  {expanded ? (
                    <View style={styles.expanded}>
                      <Text
                        style={[styles.sectionTitle, { color: colors.text }]}
                      >
                        Setlist
                      </Text>
                      {setlist.length ? (
                        setlist.map((item) => (
                          <View
                            key={item.id}
                            style={[
                              styles.songRow,
                              {
                                borderColor: colors.border,
                                backgroundColor: colors.surfaceSecondary,
                              },
                            ]}
                          >
                            <View
                              style={[
                                styles.orderBadge,
                                { backgroundColor: colors.tint },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.orderText,
                                  { color: colors.background },
                                ]}
                              >
                                {item.order}
                              </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text
                                style={[
                                  styles.songTitle,
                                  { color: colors.text },
                                ]}
                              >
                                {item.song.title}
                              </Text>
                              <Text
                                style={[
                                  styles.songMeta,
                                  { color: colors.textSecondary },
                                ]}
                              >
                                {item.song.artist || "Artista nao informado"}
                              </Text>
                              <Text
                                style={[
                                  styles.songKey,
                                  { color: colors.accent },
                                ]}
                              >
                                Tom: {item.song.key}
                              </Text>
                              <View style={styles.linkRow}>
                                {item.song.spotifyUrl ? (
                                  <Pressable
                                    onPress={() =>
                                      openExternalLink(item.song.spotifyUrl)
                                    }
                                    style={[
                                      styles.linkButton,
                                      { borderColor: colors.border },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.linkText,
                                        { color: colors.text },
                                      ]}
                                    >
                                      Spotify
                                    </Text>
                                  </Pressable>
                                ) : null}
                                {item.song.youtubeUrl ? (
                                  <Pressable
                                    onPress={() =>
                                      openExternalLink(item.song.youtubeUrl)
                                    }
                                    style={[
                                      styles.linkButton,
                                      { borderColor: colors.border },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.linkText,
                                        { color: colors.text },
                                      ]}
                                    >
                                      YouTube
                                    </Text>
                                  </Pressable>
                                ) : null}
                              </View>
                            </View>
                          </View>
                        ))
                      ) : (
                        <Text
                          style={[
                            styles.emptyText,
                            { color: colors.textSecondary },
                          ]}
                        >
                          O lider ainda nao publicou o setlist deste culto.
                        </Text>
                      )}

                      <Pressable
                        onPress={() => toggleScheduleConfirmation(schedule.id)}
                        style={[
                          styles.confirmButton,
                          {
                            backgroundColor: schedule.confirmed
                              ? colors.surfaceSecondary
                              : colors.tint,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.confirmButtonText,
                            {
                              color: schedule.confirmed
                                ? colors.text
                                : colors.background,
                            },
                          ]}
                        >
                          {schedule.confirmed
                            ? "Marcar como pendente"
                            : "Confirmar minha presenca"}
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </GlassPanel>
              </View>
            );
          })
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
    textAlign: "center",
    fontSize: 14,
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 18,
  },
  timelineRow: {
    flexDirection: "row",
    gap: 8,
  },
  timelineRail: {
    width: 16,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginTop: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: -8,
  },
  timelinePanel: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    alignItems: "center",
  },
  headerMain: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  itemMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  itemRole: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 3,
  },
  statusPill: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  expanded: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  songRow: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 8,
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: 7,
  },
  orderBadge: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderText: {
    fontSize: 12,
    fontWeight: "900",
  },
  songTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  songMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  songKey: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  linkRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  linkButton: {
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  linkText: {
    fontSize: 11,
    fontWeight: "800",
  },
  confirmButton: {
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 9,
    marginTop: 4,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
