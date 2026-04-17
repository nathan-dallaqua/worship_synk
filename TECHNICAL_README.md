# Worship Synk 🎵

Um aplicativo moderno e minimalista para gerenciar equipes de louvor em igrejas evangélicas.

## 🎯 Visão Geral

Worship Synk é uma plataforma que facilita a organização de equipes de louvor com três visões distintas:

### 👨‍💼 **Admin**

Gerencia a estrutura completa da equipe:

- Adicionar/remover membros
- Configurar instrumentos disponíveis
- Gerenciar configurações da equipe

### 🎤 **Líder**

Controla os cultos e setlists:

- Criar e gerenciar cultos (semanais ou personalizados)
- Montar setlists com música, tom e links
- Criar escalas de quem toca/canta
- Enviar informações para a equipe

### 🎸 **Integrante**

Visualiza suas apresentações:

- Ver dias em que está escalado
- Conhecer seu papel (guitarra, bateria, vocal, etc)
- Acessar setlist com tons e links Spotify/YouTube
- Confirmar presença
- Avaliar cultos anteriores

## 🚀 Quick Start

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Expo CLI (opcional, mas recomendado)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/worship_synk.git
cd worship_synk

# Instale as dependências
npm install

# Inicie o servidor Expo
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

## 🏗️ Estrutura do Projeto

```
worship_synk/
├── app/                          # Telas (Expo Router)
│   ├── (tabs)/
│   │   ├── index.tsx            # Dashboard
│   │   ├── profile.tsx          # Perfil do usuário
│   │   ├── admin/
│   │   │   └── teams.tsx        # Gerenciar equipe
│   │   ├── leader/
│   │   │   └── services.tsx     # Gerenciar cultos
│   │   └── member/
│   │       └── schedule.tsx     # Minha escala
│   ├── _layout.tsx              # Layout raiz
│   └── modal.tsx                # Modal example
├── components/                  # Componentes reutilizáveis
│   ├── ui/                      # Componentes de UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Typography.tsx
│   │   └── index.ts
│   └── ...
├── constants/                   # Constantes e tema
│   ├── theme.ts                # Paleta de cores
│   └── mockData.ts             # Dados de exemplo
├── context/                     # Context API
│   └── AppContext.tsx          # Gerenciamento global de estado
├── types/                       # TypeScript types
│   └── index.ts                # Types e interfaces
└── hooks/                       # Custom hooks
    └── ...
```

## 🎨 Design System

### Cores

- **Primária**: `#0052CC` - Azul corporativo profundo
- **Primária Clara**: `#1A73E8` - Azul médio
- **Primária Muito Clara**: `#E8F0FE` - Azul muito claro
- **Primária Escura**: `#002E99` - Azul escuro

### Espaçamento

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px
- **xxl**: 32px

### Componentes

Todos os componentes suportam tema claro/escuro e têm estilos consistentes.

## 🔑 Funcionalidades Principais

### Dashboard

- Visão personalizada por papel do usuário
- Estatísticas rápidas para Admin
- Próximos eventos para Líder
- Próximas apresentações para Integrante

### Gerenciamento de Equipe (Admin)

- Lista de membros com instrumentos
- Adicionar/remover membros
- Gerenciar instrumentos disponíveis
- Configurações de equipe

### Gerenciamento de Cultos (Líder)

- Criar cultos semanais ou personalizados
- Adicionar músicas ao setlist
- Definir tons para cada música
- Adicionar links Spotify/YouTube
- Criar escalas de apresentações
- Enviar para a equipe

### Minha Escala (Integrante)

- Visualizar apresentações futuras
- Ver papel em cada apresentação
- Acessar setlist com tons
- Links diretos para Spotify/YouTube
- Confirmar presença
- Avaliar cultos anteriores

## 📊 Dados Mockados

No MVP, o aplicativo usa dados mockados. Você pode encontrar os dados em:

- **Usuários**: `constants/mockData.ts` - `mockUsers`
- **Equipe**: `constants/mockData.ts` - `mockTeam`
- **Cultos**: `constants/mockData.ts` - `mockServices`
- **Setlists**: `constants/mockData.ts` - `mockSetlistItems`
- **Escalas**: `constants/mockData.ts` - `mockSchedules`

### Usuário Padrão (Login)

O app inicia com **Carlos Silva** logado (Admin + Líder)

## 🔄 Dados com Supabase (Próxima Fase)

O aplicativo foi arquitetado para integração com Supabase:

- Context API pronto para conectar com backend real
- Tipos TypeScript definidos para todas as tabelas
- Funções helper para queries comuns

## 🎮 Como Usar

### Como Admin

1. Vá para aba "Gerenciar"
2. Visualize membros, instrumentos e configurações
3. Adicione novos membros ou instrumentos
4. Configure a equipe conforme necessário

### Como Líder

1. Vá para aba "Cultos"
2. Clique em um culto para expandir
3. Adicione ou edite o setlist
4. Configure a escala de instrumentistas
5. Envie para a equipe

### Como Integrante

1. Vá para aba "Escala"
2. Visualize suas próximas apresentações
3. Veja o setlist com tons
4. Acesse links Spotify/YouTube
5. Confirme sua presença

## 🧪 Testes

```bash
# Executar linter
npm run lint

# Executar testes (quando implementados)
npm test
```

## 📱 Suporte a Plataformas

- ✅ iOS (via Expo)
- ✅ Android (via Expo)
- ✅ Web (via Expo Web)

## 🛠️ Tecnologias

- **React Native** - Framework UI
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Navegação
- **TypeScript** - Type safety
- **Context API** - Gerenciamento de estado
- **React Navigation** - Navegação avançada

## 📝 Próximos Passos

1. Integrar com Supabase
2. Implementar autenticação real
3. Adicionar edição de dados
4. Implementar notificações push
5. Adicionar histórico de cultos
6. Implementar feedback/avaliações
7. Testes automatizados

## 🤝 Contribuindo

Este é um projeto de MVP. Para melhorias:

1. Abra uma issue descrevendo o recurso
2. Faça um fork do projeto
3. Crie uma branch para sua feature
4. Commit suas mudanças
5. Push e abra um pull request

## 📄 Licença

MIT License - Veja LICENSE.md para detalhes

## 📞 Suporte

Para suporte ou dúvidas sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

**Worship Synk** - Facilitando a adoração através da tecnologia 🙏
