import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ScheduleFormScreen() {
  const params = useLocalSearchParams<{ serviceId?: string | string[] }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { currentTeam, assignSchedule, getServiceById } = useAppContext();

  const serviceId = useMemo(() => {
    if (Array.isArray(params.serviceId)) {
      return params.serviceId[0];
    }
    return params.serviceId;
  }, [params.serviceId]);

  const service = serviceId ? getServiceById(serviceId) : undefined;
  const members = useMemo(() => currentTeam?.members ?? [], [currentTeam]);
  const instruments = useMemo(
    () => currentTeam?.instruments ?? [],
    [currentTeam],
  );

  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedInstrumentId, setSelectedInstrumentId] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!selectedMemberId && members.length) {
      setSelectedMemberId(members[0].userId);
    }
  }, [members, selectedMemberId]);

  useEffect(() => {
    if (!selectedInstrumentId && instruments.length) {
      setSelectedInstrumentId(instruments[0].id);
    }
  }, [instruments, selectedInstrumentId]);

  const handleSave = () => {
    if (!serviceId || !selectedMemberId || !selectedInstrumentId) {
      return;
    }

    assignSchedule({
      serviceId,
      userId: selectedMemberId,
      instrumentId: selectedInstrumentId,
      notes,
    });

    router.back();
  };

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
            NOVA ESCALA
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Designar integrante
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {service
              ? `${service.title} - ${service.date} as ${service.time}`
              : "Selecione um culto valido"}
          </Text>
        </View>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Integrante
          </Text>
          <View style={styles.chips}>
            {members.map((member) => {
              const selected = selectedMemberId === member.userId;
              return (
                <Pressable
                  key={member.userId}
                  onPress={() => setSelectedMemberId(member.userId)}
                  style={[
                    styles.chip,
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
                      styles.chipText,
                      { color: selected ? colors.tintDark : colors.text },
                    ]}
                  >
                    {member.user.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Funcao
          </Text>
          <View style={styles.chips}>
            {instruments.map((instrument) => {
              const selected = selectedInstrumentId === instrument.id;
              return (
                <Pressable
                  key={instrument.id}
                  onPress={() => setSelectedInstrumentId(instrument.id)}
                  style={[
                    styles.chip,
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
                      styles.chipText,
                      { color: selected ? colors.tintDark : colors.text },
                    ]}
                  >
                    {instrument.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Observacoes da escala"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.surfaceSecondary,
              },
            ]}
          />
        </GlassPanel>

        <Pressable
          disabled={!serviceId}
          onPress={handleSave}
          style={[
            styles.cta,
            {
              backgroundColor: serviceId ? colors.tint : colors.iconSecondary,
              borderColor: colors.border,
              opacity: serviceId ? 1 : 0.55,
            },
          ]}
        >
          <Text style={[styles.ctaText, { color: colors.background }]}>
            Salvar escala
          </Text>
        </Pressable>
      </ScrollView>
    </LiquidBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
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
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 19,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: Spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  chip: {
    borderWidth: 2,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "800",
  },
  input: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  cta: {
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
