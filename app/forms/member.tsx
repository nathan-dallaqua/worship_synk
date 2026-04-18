import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { UserRole } from "@/types";
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

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  leader: "Lider",
  member: "Integrante",
};

export default function MemberFormScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { addMember, currentTeam } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(["member"]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  const toggleRole = (role: UserRole) => {
    setSelectedRoles((prev) => {
      if (prev.includes(role)) {
        const updated = prev.filter((item) => item !== role);
        return updated.length ? updated : ["member"];
      }
      return [...prev, role];
    });
  };

  const toggleInstrument = (instrumentId: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrumentId)
        ? prev.filter((item) => item !== instrumentId)
        : [...prev, instrumentId],
    );
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      return;
    }

    addMember({
      name,
      email,
      phone,
      roles: selectedRoles,
      instrumentIds: selectedInstruments,
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
            NOVO MEMBRO
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Cadastro de integrante
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Defina dados, papeis e ministerios em um unico fluxo.
          </Text>
        </View>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Dados basicos
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome completo"
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
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
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
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefone (opcional)"
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

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Papeis
          </Text>
          <View style={styles.chips}>
            {(Object.keys(roleLabels) as UserRole[]).map((role) => {
              const selected = selectedRoles.includes(role);
              return (
                <Pressable
                  key={role}
                  onPress={() => toggleRole(role)}
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
                    {roleLabels[role]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassPanel>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Instrumentos / ministerios
          </Text>
          <View style={styles.chips}>
            {currentTeam?.instruments.map((instrument) => {
              const selected = selectedInstruments.includes(instrument.id);
              return (
                <Pressable
                  key={instrument.id}
                  onPress={() => toggleInstrument(instrument.id)}
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
            Salvar integrante
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
