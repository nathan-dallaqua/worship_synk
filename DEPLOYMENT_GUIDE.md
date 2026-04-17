/\*\*

- Guia de Deployment e Próximas Etapas
-
- Este arquivo descreve como fazer deploy do Worship Synk
- e melhorias planejadas para próximas versões
  \*/

/\*
=== DEPLOYMENT NO EXPO ===

1. Fazer build para iOS
   eas build --platform ios

2. Fazer build para Android
   eas build --platform android

3. Configurar variáveis de ambiente (.env)
   EXPO_PUBLIC_SUPABASE_URL=seu_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_key

4. Publicar nas lojas
   - App Store (iOS)
   - Google Play (Android)

=== SETUP DO SUPABASE (Próxima Fase) ===

1. Criar conta em supabase.com
2. Criar novo projeto
3. Copiar URL e ANON_KEY
4. Criar tabelas (ver SUPABASE_INTEGRATION_GUIDE.md)
5. Habilitar real-time para cada tabela
6. Apagar dados mockados
7. Integrar autenticação

=== INTEGRAÇÃO NO REACT NATIVE ===

npm install @supabase/supabase-js @supabase/supabase-react-native

=== EXEMPLO DE PRÓXIMAS FEATURES ===

1. Autenticação
   - Login com email/senha
   - Magic link
   - Google Sign-In
   - Apple Sign-In

2. Notificações
   - Push notifications com Expo Notifications
   - Notificar quando escalado
   - Reminder do culto

3. Funcionalidades Avançadas
   - Histórico de cultos
   - Avaliações e feedback
   - Chat com a equipe
   - Biblioteca de músicas
   - Repetição de escalas (padrões semanais)

4. Otimizações
   - Caching local com AsyncStorage
   - Sincronização offline
   - Animações e transições
   - Testes unitários
   - Testes E2E

5. Analytics
   - Rastrear uso do app
   - Métricas de engagement
   - Feedback de usuários

=== MELHORIAS DE DESIGN ===

1. Adicionar ícones customizados
2. Implementar modo escuro completo
3. Adicionar mascotes/branding
4. Melhorar acessibilidade
5. Localização (pt-BR, en-US, etc)

=== ESTRUTURA PARA ADICIONAR SUPABASE ===

nova estrutura de pastas:
├── services/
│ ├── supabase.ts
│ ├── auth.service.ts
│ ├── team.service.ts
│ ├── service.service.ts
│ └── schedule.service.ts
├── hooks/
│ ├── useAuth.ts
│ ├── useTeam.ts
│ └── useServices.ts

=== EXEMPLO DE HOOK PARA SUPABASE ===

// hooks/useServices.ts

import { useEffect, useState } from 'react';
import { Service } from '@/types';
import { supabase } from '@/services/supabase';

export const useServices = (teamId: string) => {
const [services, setServices] = useState<Service[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

useEffect(() => {
const loadServices = async () => {
try {
const { data, error } = await supabase
.from('services')
.select('\*')
.eq('team_id', teamId)
.gte('date', new Date().toISOString().split('T')[0]);

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();

    // Real-time subscription
    const subscription = supabase
      .channel(`services:${teamId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services',
          filter: `team_id=eq.${teamId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setServices((prev) => [...prev, payload.new]);
          } else if (payload.eventType === 'UPDATE') {
            setServices((prev) =>
              prev.map((s) => (s.id === payload.new.id ? payload.new : s))
            );
          } else if (payload.eventType === 'DELETE') {
            setServices((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };

}, [teamId]);

return { services, loading, error };
};

=== USANDO O HOOK ===

import { useServices } from '@/hooks/useServices';

export default function ServicesScreen() {
const { services, loading, error } = useServices('team-1');

if (loading) return <ActivityIndicator />;
if (error) return <ErrorComponent error={error} />;

return (
<FlatList
data={services}
renderItem={({ item }) => <ServiceCard service={item} />}
/>
);
}

=== CHECKLIST PARA PRÓXIMA VERSÃO ===

MVP Fase 2 (com Supabase):

- [ ] Setup Supabase
- [ ] Criar tabelas
- [ ] Integrar autenticação
- [ ] Criar hooks para dados
- [ ] Real-time updates
- [ ] Remover dados mockados
- [ ] Testar fluxos
- [ ] Deploy beta

MVP Fase 3 (Features Expandidas):

- [ ] Histórico de cultos
- [ ] Feedback de cultos
- [ ] Notificações push
- [ ] Chat
- [ ] Biblioteca de músicas

=== RECURSOS ÚTEIS ===

- Expo: https://docs.expo.dev
- Supabase: https://supabase.com/docs
- React Navigation: https://reactnavigation.org/docs
- TypeScript: https://www.typescriptlang.org/docs
- React Native: https://reactnative.dev/docs

\*/

export {};
