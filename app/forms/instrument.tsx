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
} from "react-native";

export default function InstrumentFormScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { addInstrument } = useAppContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }

    addInstrument({ name, description });
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
            Novo instrumento
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Cadastre funcoes como guitarrista, back vocal, baterista e outras.
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome do instrumento"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descricao"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          <Pressable
            onPress={handleSave}
            style={[styles.cta, { backgroundColor: colors.tint }]}
          >
            <Text style={[styles.ctaText, { color: colors.background }]}>
              Salvar instrumento
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
