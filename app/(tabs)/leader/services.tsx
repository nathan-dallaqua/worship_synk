import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
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
    Alert.alert("Link invalido", "Nao foi possivel abrir o link informado.");
  }
};

export default function LeaderServicesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const {
    currentUser,
    services,
    getSetlistForService,
    getSchedulesForService,
    getUserById,
    getInstrumentById,
    toggleScheduleConfirmation,
  } = useAppContext();

  const isLeader = currentUser?.roles.includes("leader");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    services[0]?.id ?? null,
  );

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  );

  const currentSetlist = useMemo(
    () => (selectedServiceId ? getSetlistForService(selectedServiceId) : []),
    [selectedServiceId, getSetlistForService],
  );

  const currentSchedule = useMemo(
    () => (selectedServiceId ? getSchedulesForService(selectedServiceId) : []),
    [selectedServiceId, getSchedulesForService],
  );

  if (!isLeader) {
    return (
      <LiquidBackground>
        <View style={styles.denied}>
          <Text style={[styles.deniedTitle, { color: colors.text }]}>
            Acesso restrito
          </Text>
          <Text style={[styles.deniedText, { color: colors.textSecondary }]}>
            Esta area e destinada a lideres da equipe de louvor.
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
            LIDERANCA
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Estacao de planejamento
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Monte setlist e escala do culto com uma visao operacional unica.
          </Text>
        </View>

        <GlassPanel>
          <Text style={[styles.panelTitle, { color: colors.text }]}>
            Escolha o culto
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalRow}
          >
            {services.map((service) => {
              const selected = service.id === selectedServiceId;
              return (
                <Pressable
                  key={service.id}
                  onPress={() => setSelectedServiceId(service.id)}
                  style={[
                    styles.serviceCard,
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
                      styles.serviceCardTitle,
                      { color: selected ? colors.tintDark : colors.text },
                    ]}
                  >
                    {service.title}
                  </Text>
                  <Text
                    style={[
                      styles.serviceCardMeta,
                      {
                        color: selected
                          ? colors.tintDark
                          : colors.textSecondary,
                        opacity: selected ? 0.88 : 1,
                      },
                    ]}
                  >
                    {service.date} as {service.time}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </GlassPanel>

        <GlassPanel>
          <View style={styles.headingRow}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>
              Setlist
            </Text>
            <Pressable
              disabled={!selectedService}
              onPress={() =>
                selectedService
                  ? router.push({
                      pathname: "/forms/setlist",
                      params: { serviceId: selectedService.id },
                    })
                  : undefined
              }
              style={[
                styles.cta,
                {
                  backgroundColor: selectedService
                    ? colors.tint
                    : colors.iconSecondary,
                },
              ]}
            >
              <Text style={[styles.ctaText, { color: colors.background }]}>
                Adicionar musica
              </Text>
            </Pressable>
          </View>

          {currentSetlist.length ? (
            currentSetlist.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.rowCard,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <View
                  style={[styles.orderBadge, { backgroundColor: colors.tint }]}
                >
                  <Text
                    style={[styles.orderText, { color: colors.background }]}
                  >
                    {item.order}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>
                    {item.song.title}
                  </Text>
                  <Text
                    style={[styles.itemMeta, { color: colors.textSecondary }]}
                  >
                    {item.song.artist || "Artista nao informado"}
                  </Text>
                  <Text style={[styles.keyText, { color: colors.accent }]}>
                    Tom: {item.song.key}
                  </Text>
                  <View style={styles.links}>
                    {item.song.spotifyUrl ? (
                      <Pressable
                        onPress={() => openExternalLink(item.song.spotifyUrl)}
                        style={[
                          styles.linkButton,
                          { borderColor: colors.border },
                        ]}
                      >
                        <Text style={[styles.linkText, { color: colors.text }]}>
                          Spotify
                        </Text>
                      </Pressable>
                    ) : null}
                    {item.song.youtubeUrl ? (
                      <Pressable
                        onPress={() => openExternalLink(item.song.youtubeUrl)}
                        style={[
                          styles.linkButton,
                          { borderColor: colors.border },
                        ]}
                      >
                        <Text style={[styles.linkText, { color: colors.text }]}>
                          YouTube
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhuma musica adicionada para este culto.
            </Text>
          )}
        </GlassPanel>

        <GlassPanel>
          <View style={styles.headingRow}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>
              Escala da equipe
            </Text>
            <Pressable
              disabled={!selectedService}
              onPress={() =>
                selectedService
                  ? router.push({
                      pathname: "/forms/schedule",
                      params: { serviceId: selectedService.id },
                    })
                  : undefined
              }
              style={[
                styles.cta,
                {
                  backgroundColor: selectedService
                    ? colors.tint
                    : colors.iconSecondary,
                },
              ]}
            >
              <Text style={[styles.ctaText, { color: colors.background }]}>
                Escalar
              </Text>
            </Pressable>
          </View>

          {currentSchedule.length ? (
            currentSchedule.map((schedule) => {
              const user = getUserById(schedule.userId);
              const instrument = getInstrumentById(schedule.instrumentId);
              return (
                <Pressable
                  key={schedule.id}
                  onPress={() => toggleScheduleConfirmation(schedule.id)}
                  style={[
                    styles.rowCard,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.surfaceSecondary,
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.itemTitle, { color: colors.text }]}>
                      {user?.name ?? "Integrante"}
                    </Text>
                    <Text
                      style={[styles.itemMeta, { color: colors.textSecondary }]}
                    >
                      {instrument?.name ?? "Funcao"}
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
              );
            })
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum integrante escalado ate o momento.
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
    lineHeight: 20,
    textAlign: "center",
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
  panelTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  horizontalRow: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  serviceCard: {
    borderWidth: 2,
    minWidth: 210,
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  serviceCardTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  serviceCardMeta: {
    marginTop: 2,
    fontSize: 12,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
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
  rowCard: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  orderBadge: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  orderText: {
    fontSize: 13,
    fontWeight: "800",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  itemMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  keyText: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  links: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  linkButton: {
    borderWidth: 2,
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  linkText: {
    fontSize: 11,
    fontWeight: "800",
  },
  statusPill: {
    borderWidth: 2,
    borderRadius: 9,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
