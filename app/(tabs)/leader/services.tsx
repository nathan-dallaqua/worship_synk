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
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Planejamento do culto
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Defina setlist, tom e distribuicao de papeis por culto.
          </Text>
        </GlassPanel>

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
                    styles.tag,
                    {
                      borderColor: selected ? colors.tint : colors.border,
                      backgroundColor: selected
                        ? colors.accentSoft
                        : colors.surface,
                    },
                  ]}
                >
                  <Text style={[styles.tagTitle, { color: colors.text }]}>
                    {service.title}
                  </Text>
                  <Text
                    style={[styles.tagMeta, { color: colors.textSecondary }]}
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
                style={[styles.listRow, { borderColor: colors.borderLight }]}
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
                  <Text style={[styles.keyText, { color: colors.tint }]}>
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
                  style={[styles.listRow, { borderColor: colors.borderLight }]}
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
                          ? "rgba(20, 147, 81, 0.16)"
                          : "rgba(227, 154, 33, 0.18)",
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
    lineHeight: 20,
    textAlign: "center",
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
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  horizontalRow: {
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  tag: {
    borderWidth: 1,
    minWidth: 190,
    borderRadius: 10,
    padding: Spacing.sm,
    gap: 2,
  },
  tagTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  tagMeta: {
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
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: "700",
  },
  listRow: {
    borderBottomWidth: 1,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  orderBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  orderText: {
    fontSize: 13,
    fontWeight: "700",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  itemMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  keyText: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  links: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  linkButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: Spacing.sm,
  },
  linkText: {
    fontSize: 11,
    fontWeight: "700",
  },
  statusPill: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
