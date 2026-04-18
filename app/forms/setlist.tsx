import { GlassPanel, LiquidBackground } from "@/components/ui";
import { Colors, Spacing } from "@/constants/theme";
import { useAppContext } from "@/context/AppContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const sanitizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function SetlistFormScreen() {
  const params = useLocalSearchParams<{ serviceId?: string | string[] }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const { addSetlistSong, getServiceById } = useAppContext();

  const serviceId = useMemo(() => {
    if (Array.isArray(params.serviceId)) {
      return params.serviceId[0];
    }
    return params.serviceId;
  }, [params.serviceId]);

  const service = serviceId ? getServiceById(serviceId) : undefined;

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [key, setKey] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!serviceId || !title.trim() || !key.trim()) {
      return;
    }

    addSetlistSong({
      serviceId,
      title,
      artist,
      key,
      spotifyUrl: sanitizeUrl(spotifyUrl),
      youtubeUrl: sanitizeUrl(youtubeUrl),
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
            ADICIONAR MUSICA
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            Setlist do culto
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {service
              ? `${service.title} - ${service.date} as ${service.time}`
              : "Selecione um culto valido"}
          </Text>
        </View>

        <GlassPanel>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Informacoes da musica
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titulo da musica"
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
            value={artist}
            onChangeText={setArtist}
            placeholder="Artista"
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
            value={key}
            onChangeText={setKey}
            placeholder="Tom (Ex: G, A#, F#m)"
            autoCapitalize="characters"
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
            Links e observacoes
          </Text>

          <TextInput
            value={spotifyUrl}
            onChangeText={setSpotifyUrl}
            placeholder="Link Spotify (opcional)"
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
            value={youtubeUrl}
            onChangeText={setYoutubeUrl}
            placeholder="Link YouTube (opcional)"
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
            value={notes}
            onChangeText={setNotes}
            placeholder="Observacoes para a equipe"
            multiline
            numberOfLines={4}
            placeholderTextColor={colors.iconSecondary}
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
            Salvar musica
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
