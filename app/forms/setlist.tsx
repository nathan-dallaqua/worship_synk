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
      >
        <GlassPanel>
          <Text style={[styles.title, { color: colors.text }]}>
            Adicionar musica
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {service
              ? `${service.title} - ${service.date} as ${service.time}`
              : "Selecione um culto valido"}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titulo da musica"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
            ]}
          />
          <TextInput
            value={artist}
            onChangeText={setArtist}
            placeholder="Artista"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
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
              { borderColor: colors.border, color: colors.text },
            ]}
          />
          <TextInput
            value={spotifyUrl}
            onChangeText={setSpotifyUrl}
            placeholder="Link Spotify (opcional)"
            autoCapitalize="none"
            placeholderTextColor={colors.iconSecondary}
            style={[
              styles.input,
              { borderColor: colors.border, color: colors.text },
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
              { borderColor: colors.border, color: colors.text },
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
              Salvar musica
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
