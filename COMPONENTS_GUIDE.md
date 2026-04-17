/\*\*

- Guia de Componentes - Components Showcase
-
- Este arquivo demonstra como usar os componentes disponíveis
  \*/

/\*
=== BUTTON COMPONENT ===

Variações de Button:

- primary (padrão) - Botão principal azul
- secondary - Botão com fundo claro
- outline - Botão com apenas borda
- danger - Botão destrutivo (vermelho)

Tamanhos:

- small (8px vertical, 12px horizontal)
- medium (padrão - 12px vertical, 16px horizontal)
- large (16px vertical, 24px horizontal)

Exemplo de Uso:
\*/

import { Button } from '@/components/ui';

// Botão primário padrão
<Button
title="Confirmar"
onPress={() => console.log('Clicado')}
/>

// Botão secundário pequeno
<Button
title="Cancelar"
onPress={() => {}}
variant="secondary"
size="small"
/>

// Botão de contorno
<Button
title="Compartilhar"
onPress={() => {}}
variant="outline"
/>

// Botão com carregamento
<Button
title="Salvando..."
onPress={() => {}}
loading={true}
disabled={true}
/>

// Botão destrutivo
<Button
title="Deletar"
onPress={() => {}}
variant="danger"
/>

/\*
=== CARD COMPONENT ===

Variações:

- flat (padrão) - Fundo branco com borda sutil
- elevated - Fundo cinza claro

Padding:

- xs (4px)
- sm (8px)
- md (12px)
- lg (padrão - 16px)
- xl (24px)
- xxl (32px)

Exemplo de Uso:
\*/

import { Card } from '@/components/ui';

// Card básico
<Card>
<Text>Conteúdo do card</Text>
</Card>

// Card com padding customizado
<Card padding="xl">
<Text>Conteúdo com mais espaço</Text>
</Card>

// Card com estilo elevated
<Card variant="elevated">
<Text>Card elevado</Text>
</Card>

// Card com estilo customizado
<Card style={{ marginBottom: 16 }}>
<Text>Card com margin</Text>
</Card>

/\*
=== TYPOGRAPHY COMPONENTS ===

Hierarquia de Texto:

- H1 (28px, bold) - Títulos principais
- H2 (24px, bold) - Títulos secundários
- H3 (18px, semibold) - Subtítulos
- Body (14px) - Texto padrão
- Caption (12px) - Texto pequeno
- Label (12px uppercase, semibold) - Labels e tags

Propriedades:

- numberOfLines: limita número de linhas
- style: estilo customizado

Exemplo de Uso:
\*/

import { H1, H2, H3, Body, Caption, Label } from '@/components/ui';

// Título principal

<H1>Bem-vindo ao Worship Synk</H1>

// Subtítulo

<H3 style={{ marginTop: 8 }}>Gerenciar sua equipe de louvor</H3>

// Texto padrão

<Body>Este é um texto padrão com informações importantes</Body>

// Label para campos
<Label>Nome do Culto</Label>

// Caption (pequeno)

<Caption>Criado por Carlos Silva</Caption>

// Com limite de linhas

<Body numberOfLines={2}>
  Este é um texto que será truncado após 2 linhas...
</Body>

/\*
=== PADRÕES DE LAYOUT ===

Layout com Cards:
\*/

import { View, StyleSheet, ScrollView } from 'react-native';
import { Spacing, Colors } from '@/constants/theme';

const Layout = () => (
<ScrollView style={{ backgroundColor: Colors.light.background }}>
<View style={{ padding: Spacing.lg }}>
{/_ Seção com título _/}
<Label>Minha Seção</Label>

      {/* Card de conteúdo */}
      <Card style={{ marginTop: Spacing.md }}>
        <H3>Título do Card</H3>
        <Body style={{ marginTop: Spacing.sm, color: Colors.light.textSecondary }}>
          Descrição ou conteúdo do card
        </Body>
      </Card>

      {/* Botão de ação */}
      <Button
        title="Ação"
        onPress={() => {}}
        style={{ marginTop: Spacing.md }}
      />
    </View>

  </ScrollView>
);

/\*
=== EXEMPLOS DE COMPONENTES COMPLEXOS ===

Status Badge:
\*/

const StatusBadge = ({ status }: { status: 'confirmed' | 'pending' }) => {
const colors = Colors.light;
const backgroundColor = status === 'confirmed'
? 'rgba(13, 124, 38, 0.1)'
: 'rgba(232, 184, 31, 0.1)';
const color = status === 'confirmed'
? colors.success
: colors.warning;

return (
<Card
style={{
        backgroundColor,
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: 999
      }} >

<Caption style={{ color, fontWeight: '600' }}>
{status === 'confirmed' ? '✓ Confirmado' : '⏳ Pendente'}
</Caption>
</Card>
);
};

/\*
=== LISTA DE CARDS ===

Exemplo de lista com múltiplos cards:
\*/

const ServicesList = ({ services }: any) => (
<View>
{services.map((service: any) => (
<Card key={service.id} style={{ marginBottom: Spacing.lg }}>
<View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
<View style={{ flex: 1 }}>

<H3>{service.title}</H3>
<Body style={{
              color: Colors.light.textSecondary,
              marginTop: Spacing.xs
            }}>
{service.date} às {service.time}
</Body>
</View>
<TouchableOpacity>
<Caption>→</Caption>
</TouchableOpacity>
</View>
</Card>
))}
</View>
);

/\*
=== FORM COM LABELS ===

Exemplo de formulário simples:
\*/

const FormExample = () => (
<View style={{ padding: Spacing.lg }}>
<Label>Nome do Culto</Label>
<Card style={{ marginTop: Spacing.sm, padding: Spacing.md }}>

<Body>Culto Domingo - Manhã</Body>
</Card>

    <Label style={{ marginTop: Spacing.lg }}>Data</Label>
    <Card style={{ marginTop: Spacing.sm, padding: Spacing.md }}>
      <Body>21/04/2024</Body>
    </Card>

    <Label style={{ marginTop: Spacing.lg }}>Hora</Label>
    <Card style={{ marginTop: Spacing.sm, padding: Spacing.md }}>
      <Body>09:00</Body>
    </Card>

    <Button
      title="Salvar"
      onPress={() => {}}
      style={{ marginTop: Spacing.xl }}
    />

  </View>
);

/\*
=== COLOR PALETTE ===

Usando as cores do tema:
\*/

import { Colors } from '@/constants/theme';

// Cores disponíveis (Light Mode)
Colors.light.text // Texto principal
Colors.light.textSecondary // Texto secundário
Colors.light.textTertiary // Texto terciário
Colors.light.background // Fundo principal
Colors.light.surface // Fundo secundário
Colors.light.tint // Cor primária
Colors.light.tintLight // Cor primária clara
Colors.light.tintLighter // Cor primária mais clara
Colors.light.tintDark // Cor primária escura
Colors.light.border // Bordas
Colors.light.success // Verde (sucesso)
Colors.light.warning // Amarelo (aviso)
Colors.light.error // Vermelho (erro)

/\*
=== SPACING CONSTANTS ===

Espaçamentos padrão:
\*/

import { Spacing } from '@/constants/theme';

Spacing.xs // 4px
Spacing.sm // 8px
Spacing.md // 12px
Spacing.lg // 16px
Spacing.xl // 24px
Spacing.xxl // 32px

export {};
