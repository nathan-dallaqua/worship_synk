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
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Novo integrante
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Cadastre dados basicos, papeis e funcoes na equipe.
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome completo"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
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
              { borderColor: colors.border, color: colors.text },
            ]}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Telefone (opcional)"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>
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
                        ? colors.accentSoft
                        : "transparent",
                    },
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.text }]}>
                    {roleLabels[role]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={[styles.label, { color: colors.textSecondary }]}>
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

          <Pressable
            onPress={handleSave}
            style={[styles.cta, { backgroundColor: colors.tint }]}
          >
            <Text style={[styles.ctaText, { color: colors.background }]}>
              Salvar integrante
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
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
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
