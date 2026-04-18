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
        showsVerticalScrollIndicator={false}
      >
        <ViewHeader colors={colors} />

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Dados do instrumento
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome do instrumento"
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
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descricao"
            placeholderTextColor={colors.iconSecondary}
            multiline
            numberOfLines={3}
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
            Salvar instrumento
          </Text>
        </Pressable>
      </ScrollView>
    </LiquidBackground>
  );
}

function ViewHeader({ colors }: { colors: (typeof Colors)["light"] }) {
  return (
    <GlassPanel>
      <Text style={[styles.kicker, { color: colors.textSecondary }]}>
        NOVO INSTRUMENTO
      </Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Criar funcao musical
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Cadastre funcoes como guitarrista, back vocal, bateria e outras.
      </Text>
    </GlassPanel>
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
  textarea: {
    minHeight: 90,
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
