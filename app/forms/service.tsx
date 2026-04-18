import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ServiceFormScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { createService } = useAppContext();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "custom">("weekly");

  const handleSave = () => {
    if (!title.trim() || !date.trim() || !time.trim()) {
      return;
    }

    createService({
      title,
      date,
      time,
      frequency,
      description,
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
            NOVO CULTO
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Criar evento
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Defina data, horario e formato para iniciar o planejamento.
          </Text>
        </View>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Informacoes
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titulo do culto"
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

          <View style={styles.row}>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="Data AAAA-MM-DD"
              placeholderTextColor={colors.iconSecondary}
              style={[
                styles.input,
                styles.half,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            />
            <TextInput
              value={time}
              onChangeText={setTime}
              placeholder="Hora HH:MM"
              placeholderTextColor={colors.iconSecondary}
              style={[
                styles.input,
                styles.half,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            />
          </View>

          <View style={styles.row}>
            {[
              { key: "weekly", label: "Semanal" },
              { key: "custom", label: "Especial" },
            ].map((item) => {
              const selected = frequency === item.key;
              return (
                <Pressable
                  key={item.key}
                  onPress={() => setFrequency(item.key as "weekly" | "custom")}
                  style={[
                    styles.frequency,
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
                      styles.frequencyText,
                      { color: selected ? colors.tintDark : colors.text },
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descricao do culto"
            placeholderTextColor={colors.iconSecondary}
            multiline
            numberOfLines={4}
            style={[
              styles.input,
              styles.textarea,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.surfaceSecondary,
              },
            ]}
          />
        </GlassPanel>

        <Pressable
          onPress={handleSave}
          style={[
            styles.cta,
            {
              backgroundColor: colors.tint,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.ctaText, { color: colors.background }]}>
            Salvar culto
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
  input: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  half: {
    flex: 1,
  },
  frequency: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 999,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: "800",
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: "top",
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
