/**
 * Enums and Types for Worship Synk App
 */

export type UserRole = "admin" | "leader" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  roles: UserRole[];
  createdAt: string;
}

export interface Instrument {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  adminId: string;
  members: TeamMember[];
  instruments: Instrument[];
  createdAt: string;
}

export interface TeamMember {
  userId: string;
  user: User;
  instruments: string[]; // instrument ids
  joinedAt: string;
}

export interface Service {
  id: string;
  teamId: string;
  title: string;
  date: string; // ISO 8601 format
  time: string; // HH:MM format
  frequency?: "weekly" | "custom"; // para saber se é semanal ou esporádico
  description?: string;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist?: string;
  key: string; // Tom da música (ex: "C", "G#m", etc)
  duration?: number; // em segundos
  spotifyUrl?: string;
  youtubeUrl?: string;
}

export interface SetlistItem {
  id: string;
  serviceId: string;
  song: Song;
  order: number;
  notes?: string;
}

export interface Schedule {
  id: string;
  serviceId: string;
  userId: string;
  instrumentId: string;
  confirmed: boolean;
  notes?: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  serviceId: string;
  userId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

export interface ServiceHistory {
  id: string;
  teamId: string;
  service: Service;
  schedules: Schedule[];
  setlist: SetlistItem[];
  feedbacks: Feedback[];
}
