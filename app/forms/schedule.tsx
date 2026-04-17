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
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Escalar integrante
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {service
              ? `${service.title} - ${service.date} as ${service.time}`
              : "Selecione um culto valido"}
          </Text>

          <Text style={[styles.label, { color: colors.textSecondary }]}>
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
                        ? colors.accentSoft
                        : "transparent",
                    },
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }]}>
                    {member.user.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={[styles.label, { color: colors.textSecondary }]}>
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
                        ? colors.accentSoft
                        : "transparent",
                    },
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }]}>
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
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          <Pressable
            disabled={!serviceId}
            onPress={handleSave}
            style={[
              styles.cta,
              {
                backgroundColor: serviceId ? colors.tint : colors.iconSecondary,
                opacity: serviceId ? 1 : 0.55,
              },
            ]}
          >
            <Text style={[styles.ctaText, { color: colors.background }]}>
              Salvar escala
            </Text>
          </Pressable>
        </GlassPanel>
      </ScrollView>
    </LiquidBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.34)",
  },
  cta: {
    marginTop: Spacing.lg,
    borderRadius: 16,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
