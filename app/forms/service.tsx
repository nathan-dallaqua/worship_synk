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
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>Novo culto</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Crie uma nova data de culto para organizar escala e setlist.
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titulo do culto"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
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
                { borderColor: colors.border, color: colors.text },
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
                { borderColor: colors.border, color: colors.text },
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
                        ? colors.accentSoft
                        : "transparent",
                    },
                  ]}
                >
                  <Text style={[styles.frequencyText, { color: colors.text }]}>
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
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          <Pressable
            onPress={handleSave}
            style={[styles.cta, { backgroundColor: colors.tint }]}
          >
            <Text style={[styles.ctaText, { color: colors.background }]}>
              Salvar culto
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
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: "rgba(255,255,255,0.34)",
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
    borderWidth: 1,
    borderRadius: 999,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: "700",
  },
  textarea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  cta: {
    marginTop: Spacing.md,
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
