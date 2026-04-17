# Worship Synk 🎵

Um aplicativo moderno para gerenciar equipes de louvor em igrejas evangélicas.

**Status**: MVP com dados mockados - V1.0

## 🎯 O Que É?

Worship Synk é uma plataforma de gerenciamento para equipes de louvor que facilita:

- **👨‍💼 Administradores**: Gerenciar membros, instrumentos e configurações da equipe
- **🎤 Líderes**: Criar cultos, montar setlists, fazer escalas
- **🎸 Integrantes**: Visualizar suas apresentações, setlist e links de músicas

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor Expo
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📱 Visão Geral das Funcionalidades

### Dashboard

- Página inicial personalizada por papel do usuário
- Estatísticas e ações rápidas para admin
- Próximas apresentações para integrantes

### Admin - Gerenciar Equipa

- Adicionar/remover membros
- Configurar instrumentos
- Gerenciar configurações da equipe

### Líder - Cultos

- Criar e gerenciar cultos (semanais ou personalizados)
- Adicionar setlist com toms e links
- Criar escalas
- Enviar informações para equipe

### Integrante - Minha Escala

- Ver próximas apresentações
- Acessar setlist com toms
- Links diretos Spotify/YouTube
- Confirmar presença

### Perfil

- Visualizar informações pessoais
- Gerenciar preferências
- Logout

## 🏗️ Estrutura

```
app/(tabs)/
├── index.tsx              # Dashboard
├── profile.tsx            # Perfil
├── admin/teams.tsx        # Gerenciar equipe
├── leader/services.tsx    # Gerenciar cultos
└── member/schedule.tsx    # Minha escala
```

## 📚 Documentação

- [TECHNICAL_README.md](./TECHNICAL_README.md) - Documentação técnica completa
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Guia de componentes
- [SUPABASE_INTEGRATION_GUIDE.md](./SUPABASE_INTEGRATION_GUIDE.md) - Como integrar Supabase

## 🎨 Design

- **Tema**: Azul corporativo minimalista
- **Tipografia**: Hierarquia clara com 6 níveis
- **Componentes**: Button, Card, Typography (H1-3, Body, Caption, Label)

## 👤 Usuário de Teste

**Email**: carlos@igreja.com (Admin + Líder)

## 🔧 Tecnologias

- React Native + Expo
- TypeScript
- Expo Router
- Context API
- React Navigation

## 📝 Próximas Fases

1. Integração com Supabase
2. Autenticação real
3. Edição de dados
4. Notificações push
5. Histórico e avaliações

## 📄 Licença

MIT
