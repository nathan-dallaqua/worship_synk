/\*\*

- Guia de Integração - Como Conectar com Supabase
-
- Este arquivo demonstra como você pode expandir o AppContext
- para integrar com dados reais do Supabase
  \*/

// ===== EXEMPLO 1: Autenticação com Supabase =====
/\*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função de login
export const signInWithEmail = async (email: string, password: string) => {
const { data, error } = await supabase.auth.signInWithPassword({
email,
password,
});

if (error) throw error;
return data;
};

// Função de logout
export const signOut = async () => {
const { error } = await supabase.auth.signOut();
if (error) throw error;
};
\*/

// ===== EXEMPLO 2: Buscar Dados do Supabase =====
/\*
// Em AppContext.tsx, você pode fazer assim:

useEffect(() => {
loadTeamData();
}, [currentUser?.id]);

const loadTeamData = async () => {
// Buscar equipe do usuário
const { data: teamData, error: teamError } = await supabase
.from('teams')
.select('\*')
.eq('admin_id', currentUser?.id)
.single();

if (teamError) {
console.error('Erro ao buscar equipe:', teamError);
return;
}

// Buscar membros da equipe
const { data: membersData, error: membersError } = await supabase
.from('team_members')
.select('\*')
.eq('team_id', teamData.id);

if (membersError) {
console.error('Erro ao buscar membros:', membersError);
return;
}

// Buscar cultos
const { data: servicesData, error: servicesError } = await supabase
.from('services')
.select('\*')
.eq('team_id', teamData.id)
.gte('date', new Date().toISOString().split('T')[0]);

if (servicesError) {
console.error('Erro ao buscar cultos:', servicesError);
return;
}

setCurrentTeam({ ...teamData, members: membersData });
setServices(servicesData);
};
\*/

// ===== EXEMPLO 3: Criar Novo Culto =====
/\*
const createNewService = async (serviceData: ServiceInput) => {
const { data, error } = await supabase
.from('services')
.insert([
{
team_id: currentTeam?.id,
title: serviceData.title,
date: serviceData.date,
time: serviceData.time,
frequency: serviceData.frequency,
description: serviceData.description,
},
])
.select();

if (error) throw error;

setServices([...services, data[0]]);
return data[0];
};
\*/

// ===== EXEMPLO 4: Adicionar Membro à Equipe =====
/\*
const addTeamMember = async (userId: string, instruments: string[]) => {
const { data, error } = await supabase
.from('team_members')
.insert([
{
team_id: currentTeam?.id,
user_id: userId,
instruments: instruments,
},
])
.select();

if (error) throw error;

// Atualizar estado local
const user = mockUsers.find(u => u.id === userId);
if (user) {
const newMember = {
userId,
user,
instruments,
joinedAt: new Date().toISOString(),
};
setCurrentTeam({
...currentTeam!,
members: [...currentTeam!.members, newMember],
});
}

return data[0];
};
\*/

// ===== EXEMPLO 5: Atualizar Setlist =====
/\*
const updateSetlist = async (serviceId: string, songs: SetlistItemInput[]) => {
// Primeiro, deletar setlist anterior
const { error: deleteError } = await supabase
.from('setlist_items')
.delete()
.eq('service_id', serviceId);

if (deleteError) throw deleteError;

// Depois, inserir novas músicas
const { data, error } = await supabase
.from('setlist_items')
.insert(
songs.map((song, index) => ({
service_id: serviceId,
song_id: song.songId,
order: index + 1,
notes: song.notes,
}))
)
.select();

if (error) throw error;

// Atualizar estado local
const updatedSetlist = data.map(item => ({
...item,
song: mockSongs.find(s => s.id === item.song_id)!,
}));

setSetlistItems([
...setlistItems.filter(item => item.serviceId !== serviceId),
...updatedSetlist,
]);

return updatedSetlist;
};
\*/

// ===== EXEMPLO 6: Real-time Updates com Supabase =====
/_
useEffect(() => {
// Inscrever-se a mudanças em tempo real
const subscription = supabase
.channel('public:services')
.on(
'postgres_changes',
{ event: '_', schema: 'public', table: 'services' },
(payload) => {
// Atualizar estado quando houver mudanças
if (payload.eventType === 'INSERT') {
setServices([...services, payload.new]);
} else if (payload.eventType === 'UPDATE') {
setServices(
services.map(s => s.id === payload.new.id ? payload.new : s)
);
} else if (payload.eventType === 'DELETE') {
setServices(services.filter(s => s.id !== payload.old.id));
}
}
)
.subscribe();

return () => {
subscription.unsubscribe();
};
}, [services]);
\*/

// ===== EXEMPLO 7: Upload de Imagem de Perfil =====
/\*
const uploadProfileImage = async (userId: string, imageUri: string) => {
const formData = new FormData();
formData.append('file', {
uri: imageUri,
type: 'image/jpeg',
name: `profile-${userId}.jpg`,
} as any);

const { data, error } = await supabase.storage
.from('avatars')
.upload(`${userId}/profile.jpg`, formData);

if (error) throw error;

// Obter URL pública
const { data: urlData } = supabase.storage
.from('avatars')
.getPublicUrl(`${userId}/profile.jpg`);

return urlData.publicUrl;
};
\*/

// ===== EXEMPLO 8: Estrutura de Tabelas Supabase =====
/\*

-- Tabela: users
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
phone TEXT,
profile_image TEXT,
roles TEXT[] DEFAULT '{member}',
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: teams
CREATE TABLE teams (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
description TEXT,
admin_id UUID REFERENCES users(id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: team_members
CREATE TABLE team_members (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
instruments TEXT[],
joined_at TIMESTAMP DEFAULT NOW(),
UNIQUE(team_id, user_id)
);

-- Tabela: instruments
CREATE TABLE instruments (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
name TEXT NOT NULL,
icon TEXT,
description TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: services (cultos)
CREATE TABLE services (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
title TEXT NOT NULL,
date DATE NOT NULL,
time TIME NOT NULL,
frequency TEXT DEFAULT 'custom',
description TEXT,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: songs
CREATE TABLE songs (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title TEXT NOT NULL,
artist TEXT,
key TEXT,
duration INTEGER,
spotify_url TEXT,
youtube_url TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: setlist_items
CREATE TABLE setlist_items (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
service_id UUID REFERENCES services(id) ON DELETE CASCADE,
song_id UUID REFERENCES songs(id),
order INTEGER NOT NULL,
notes TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: schedules (escalas)
CREATE TABLE schedules (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
service_id UUID REFERENCES services(id) ON DELETE CASCADE,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
instrument_id UUID REFERENCES instruments(id),
confirmed BOOLEAN DEFAULT FALSE,
notes TEXT,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),
UNIQUE(service_id, user_id)
);

-- Tabela: feedbacks (avaliações)
CREATE TABLE feedbacks (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
service_id UUID REFERENCES services(id) ON DELETE CASCADE,
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
rating INTEGER CHECK (rating >= 1 AND rating <= 5),
comment TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_teams_admin ON teams(admin_id);
CREATE INDEX idx_members_team ON team_members(team_id);
CREATE INDEX idx_services_team ON services(team_id);
CREATE INDEX idx_schedules_service ON schedules(service_id);
CREATE INDEX idx_schedules_user ON schedules(user_id);

\*/

export {};
