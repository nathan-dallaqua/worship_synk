/**
 * Mock Data for Worship Synk App
 * Simula dados do Supabase até que seja integrado
 */

import {
  Feedback,
  Instrument,
  Schedule,
  Service,
  SetlistItem,
  Song,
  Team,
  User,
} from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Carlos Silva",
    email: "carlos@igreja.com",
    phone: "(11) 98765-4321",
    roles: ["admin", "leader"],
    createdAt: "2024-01-15",
  },
  {
    id: "user-2",
    name: "Ana Santos",
    email: "ana@igreja.com",
    phone: "(11) 98765-4322",
    roles: ["leader", "member"],
    createdAt: "2024-02-20",
  },
  {
    id: "user-3",
    name: "Pedro Costa",
    email: "pedro@igreja.com",
    roles: ["member"],
    createdAt: "2024-03-10",
  },
  {
    id: "user-4",
    name: "Maria Oliveira",
    email: "maria@igreja.com",
    roles: ["member"],
    createdAt: "2024-03-15",
  },
  {
    id: "user-5",
    name: "João Teixeira",
    email: "joao@igreja.com",
    roles: ["member"],
    createdAt: "2024-03-20",
  },
  {
    id: "user-6",
    name: "Juliana Mendes",
    email: "juliana@igreja.com",
    roles: ["member"],
    createdAt: "2024-04-01",
  },
];

// Mock Instruments
export const mockInstruments: Instrument[] = [
  {
    id: "inst-1",
    name: "Guitarra",
    icon: "guitar",
    description: "Guitarra acústica/elétrica",
  },
  {
    id: "inst-2",
    name: "Bateria",
    icon: "drum",
    description: "Bateria",
  },
  {
    id: "inst-3",
    name: "Baixo",
    icon: "bass",
    description: "Guitarra baixo",
  },
  {
    id: "inst-4",
    name: "Teclado",
    icon: "keyboard",
    description: "Teclado/Piano",
  },
  {
    id: "inst-5",
    name: "Vocal Backing",
    icon: "microphone",
    description: "Vocal de apoio",
  },
  {
    id: "inst-6",
    name: "Vocal Principa",
    icon: "microphone-2",
    description: "Vocal principal",
  },
  {
    id: "inst-7",
    name: "Percussão",
    icon: "music",
    description: "Percussão diversos",
  },
];

// Mock Team
export const mockTeam: Team = {
  id: "team-1",
  name: "Equipe de Louvor - Igreja Central",
  description: "Equipe de adoração da Igreja Evangélica Central",
  adminId: "user-1",
  members: [
    {
      userId: "user-1",
      user: mockUsers[0],
      instruments: ["inst-1", "inst-5"],
      joinedAt: "2024-01-15",
    },
    {
      userId: "user-2",
      user: mockUsers[1],
      instruments: ["inst-5", "inst-6"],
      joinedAt: "2024-02-20",
    },
    {
      userId: "user-3",
      user: mockUsers[2],
      instruments: ["inst-1"],
      joinedAt: "2024-03-10",
    },
    {
      userId: "user-4",
      user: mockUsers[3],
      instruments: ["inst-2"],
      joinedAt: "2024-03-15",
    },
    {
      userId: "user-5",
      user: mockUsers[4],
      instruments: ["inst-3"],
      joinedAt: "2024-03-20",
    },
    {
      userId: "user-6",
      user: mockUsers[5],
      instruments: ["inst-4"],
      joinedAt: "2024-04-01",
    },
  ],
  instruments: mockInstruments,
  createdAt: "2024-01-10",
};

// Mock Songs
export const mockSongs: Song[] = [
  {
    id: "song-1",
    title: "Você é Digno",
    artist: "Fernandinho",
    key: "D",
    duration: 248,
    youtubeUrl: "https://youtube.com/watch?v=exemplo1",
  },
  {
    id: "song-2",
    title: "Graça Sem Limite",
    artist: "Aline Barros",
    key: "A",
    duration: 312,
    spotifyUrl: "https://open.spotify.com/track/exemplo2",
  },
  {
    id: "song-3",
    title: "Soberano Deus",
    artist: "Marquinhos Gomes",
    key: "E",
    duration: 280,
    youtubeUrl: "https://youtube.com/watch?v=exemplo3",
  },
  {
    id: "song-4",
    title: "Rendido Estou",
    artist: "Thalles Roberto",
    key: "Gm",
    duration: 256,
    spotifyUrl: "https://open.spotify.com/track/exemplo4",
  },
  {
    id: "song-5",
    title: "Jesus Te Ama",
    artist: "Comunidade Evangélica",
    key: "C",
    duration: 192,
    youtubeUrl: "https://youtube.com/watch?v=exemplo5",
  },
];

// Mock Services (Cultos)
export const mockServices: Service[] = [
  {
    id: "service-1",
    teamId: "team-1",
    title: "Culto Domingo - Manhã",
    date: "2026-04-19",
    time: "09:00",
    frequency: "weekly",
    description: "Culto dominical matutino",
    createdAt: "2026-04-10",
  },
  {
    id: "service-2",
    teamId: "team-1",
    title: "Culto Quarta-feira",
    date: "2026-04-22",
    time: "19:30",
    frequency: "weekly",
    description: "Estudo bíblico com louvor",
    createdAt: "2026-04-10",
  },
  {
    id: "service-3",
    teamId: "team-1",
    title: "Culto Especial - Páscoa",
    date: "2026-04-12",
    time: "18:00",
    frequency: "custom",
    description: "Celebração especial de Páscoa",
    createdAt: "2026-03-01",
  },
];

// Mock Setlist Items
export const mockSetlistItems: SetlistItem[] = [
  {
    id: "setlist-1",
    serviceId: "service-1",
    song: mockSongs[0],
    order: 1,
    notes: "Abertura - tom original",
  },
  {
    id: "setlist-2",
    serviceId: "service-1",
    song: mockSongs[1],
    order: 2,
    notes: "Tom caiu 1 tom",
  },
  {
    id: "setlist-3",
    serviceId: "service-1",
    song: mockSongs[2],
    order: 3,
    notes: "Participação de todos",
  },
  {
    id: "setlist-4",
    serviceId: "service-2",
    song: mockSongs[3],
    order: 1,
    notes: "Abertura",
  },
  {
    id: "setlist-5",
    serviceId: "service-2",
    song: mockSongs[4],
    order: 2,
    notes: "Tom original",
  },
];

// Mock Schedules (Escalas)
export const mockSchedules: Schedule[] = [
  {
    id: "schedule-1",
    serviceId: "service-1",
    userId: "user-1",
    instrumentId: "inst-1",
    confirmed: true,
    notes: "Levar guitarra nova",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-2",
    serviceId: "service-1",
    userId: "user-2",
    instrumentId: "inst-6",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-3",
    serviceId: "service-1",
    userId: "user-3",
    instrumentId: "inst-1",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-4",
    serviceId: "service-1",
    userId: "user-4",
    instrumentId: "inst-2",
    confirmed: false,
    notes: "Aguardando confirmação",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-5",
    serviceId: "service-1",
    userId: "user-5",
    instrumentId: "inst-3",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-6",
    serviceId: "service-1",
    userId: "user-6",
    instrumentId: "inst-4",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-15",
  },
  {
    id: "schedule-7",
    serviceId: "service-2",
    userId: "user-1",
    instrumentId: "inst-1",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-16",
  },
  {
    id: "schedule-8",
    serviceId: "service-2",
    userId: "user-2",
    instrumentId: "inst-5",
    confirmed: true,
    notes: "",
    createdAt: "2026-04-16",
  },
];

// Mock Feedbacks (Avaliações de Cultos Passados)
export const mockFeedbacks: Feedback[] = [
  {
    id: "feedback-1",
    serviceId: "service-1",
    userId: "user-1",
    rating: 5,
    comment: "Ótimo culto! Louvor abençoado",
    createdAt: "2024-04-14",
  },
  {
    id: "feedback-2",
    serviceId: "service-1",
    userId: "user-2",
    rating: 4,
    comment: "Bom, mas faltou mais tempo de louvor",
    createdAt: "2024-04-14",
  },
  {
    id: "feedback-3",
    serviceId: "service-2",
    userId: "user-3",
    rating: 5,
    comment: "Equipe muito comprometida",
    createdAt: "2024-04-17",
  },
];

// Mock Current User (será definido pelo login)
export const mockCurrentUser = mockUsers[0]; // Carlos Silva (Admin + Leader)
