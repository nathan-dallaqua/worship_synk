/**
 * Authentication and Data Context
 * Gerencia usuário autenticado, equipe e dados
 */

import {
  mockCurrentUser,
  mockFeedbacks,
  mockSchedules,
  mockServices,
  mockSetlistItems,
  mockSongs,
  mockTeam,
  mockUsers,
} from "@/constants/mockData";
import {
  Feedback,
  Instrument,
  Schedule,
  Service,
  SetlistItem,
  Song,
  Team,
  User,
  UserRole,
} from "@/types";
import React, { createContext, useContext, useState } from "react";

type CreateServiceInput = {
  title: string;
  date: string;
  time: string;
  frequency: "weekly" | "custom";
  description?: string;
};

type AddMemberInput = {
  name: string;
  email: string;
  phone?: string;
  roles: UserRole[];
  instrumentIds: string[];
};

type AddInstrumentInput = {
  name: string;
  description?: string;
};

type AssignScheduleInput = {
  serviceId: string;
  userId: string;
  instrumentId: string;
  notes?: string;
};

type AddSetlistSongInput = {
  serviceId: string;
  title: string;
  artist?: string;
  key: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  notes?: string;
};

interface AppContextType {
  // Auth
  currentUser: User | null;
  currentTeam: Team | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  switchCurrentUser: (userId: string) => void;

  // Data
  services: Service[];
  schedules: Schedule[];
  feedbacks: Feedback[];
  setlistItems: SetlistItem[];
  songs: Song[];

  // Functions
  addMember: (input: AddMemberInput) => void;
  addInstrument: (input: AddInstrumentInput) => void;
  createService: (input: CreateServiceInput) => void;
  assignSchedule: (input: AssignScheduleInput) => void;
  toggleScheduleConfirmation: (scheduleId: string) => void;
  addSetlistSong: (input: AddSetlistSongInput) => void;
  getServiceById: (id: string) => Service | undefined;
  getSchedulesForService: (serviceId: string) => Schedule[];
  getSetlistForService: (serviceId: string) => SetlistItem[];
  getFeedbacksForService: (serviceId: string) => Feedback[];
  getScheduleForUser: (userId: string) => Schedule[];
  getSongById: (id: string) => Song | undefined;
  getUserById: (id: string) => User | undefined;
  getInstrumentById: (id: string) => Instrument | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUserId, setCurrentUserId] = useState<string>(
    mockCurrentUser.id,
  );
  const [currentTeam, setCurrentTeam] = useState<Team | null>(mockTeam);

  // Data state (normalmente viria do Supabase)
  const [services, setServices] = useState<Service[]>(mockServices);
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [feedbacks] = useState<Feedback[]>(mockFeedbacks);
  const [setlistItems, setSetlistItems] =
    useState<SetlistItem[]>(mockSetlistItems);
  const [songs, setSongs] = useState<Song[]>(mockSongs);

  const currentUser = users.find((user) => user.id === currentUserId) ?? null;

  const createId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const sortServicesByDate = (serviceList: Service[]) =>
    [...serviceList].sort((a, b) => {
      const firstDate = new Date(`${a.date}T${a.time}:00`).getTime();
      const secondDate = new Date(`${b.date}T${b.time}:00`).getTime();
      return firstDate - secondDate;
    });

  const setCurrentUser = (user: User | null) => {
    if (!user) {
      setCurrentUserId("");
      return;
    }

    setUsers((prevUsers) => {
      const alreadyExists = prevUsers.some(
        (prevUser) => prevUser.id === user.id,
      );
      return alreadyExists ? prevUsers : [...prevUsers, user];
    });
    setCurrentUserId(user.id);
  };

  const switchCurrentUser = (userId: string) => {
    const targetUser = users.find((user) => user.id === userId);
    if (targetUser) {
      setCurrentUserId(userId);
    }
  };

  const addMember = ({
    name,
    email,
    phone,
    roles,
    instrumentIds,
  }: AddMemberInput) => {
    const normalizedRoles =
      roles.length > 0 ? Array.from(new Set(roles)) : ["member"];

    const newUser: User = {
      id: createId("user"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      roles: normalizedRoles,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setCurrentTeam((prevTeam) => {
      if (!prevTeam) {
        return prevTeam;
      }

      return {
        ...prevTeam,
        members: [
          ...prevTeam.members,
          {
            userId: newUser.id,
            user: newUser,
            instruments: instrumentIds,
            joinedAt: new Date().toISOString().slice(0, 10),
          },
        ],
      };
    });
  };

  const addInstrument = ({ name, description }: AddInstrumentInput) => {
    const instrumentName = name.trim();
    if (!instrumentName) {
      return;
    }

    const newInstrument: Instrument = {
      id: createId("inst"),
      name: instrumentName,
      icon: "music-note",
      description: description?.trim(),
    };

    setCurrentTeam((prevTeam) => {
      if (!prevTeam) {
        return prevTeam;
      }

      return {
        ...prevTeam,
        instruments: [...prevTeam.instruments, newInstrument],
      };
    });
  };

  const createService = ({
    title,
    date,
    time,
    frequency,
    description,
  }: CreateServiceInput) => {
    if (!currentTeam) {
      return;
    }

    const newService: Service = {
      id: createId("service"),
      teamId: currentTeam.id,
      title: title.trim(),
      date,
      time,
      frequency,
      description: description?.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setServices((prevServices) =>
      sortServicesByDate([...prevServices, newService]),
    );
  };

  const assignSchedule = ({
    serviceId,
    userId,
    instrumentId,
    notes,
  }: AssignScheduleInput) => {
    setSchedules((prevSchedules) => {
      const existingIndex = prevSchedules.findIndex(
        (schedule) =>
          schedule.serviceId === serviceId && schedule.userId === userId,
      );

      if (existingIndex >= 0) {
        const updated = [...prevSchedules];
        updated[existingIndex] = {
          ...updated[existingIndex],
          instrumentId,
          notes,
        };
        return updated;
      }

      return [
        ...prevSchedules,
        {
          id: createId("schedule"),
          serviceId,
          userId,
          instrumentId,
          confirmed: false,
          notes,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ];
    });
  };

  const toggleScheduleConfirmation = (scheduleId: string) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, confirmed: !schedule.confirmed }
          : schedule,
      ),
    );
  };

  const addSetlistSong = ({
    serviceId,
    title,
    artist,
    key,
    spotifyUrl,
    youtubeUrl,
    notes,
  }: AddSetlistSongInput) => {
    const newSong: Song = {
      id: createId("song"),
      title: title.trim(),
      artist: artist?.trim(),
      key: key.trim(),
      spotifyUrl: spotifyUrl?.trim(),
      youtubeUrl: youtubeUrl?.trim(),
    };

    setSongs((prevSongs) => [...prevSongs, newSong]);

    setSetlistItems((prevItems) => {
      const serviceItems = prevItems.filter(
        (item) => item.serviceId === serviceId,
      );
      const nextOrder = serviceItems.length + 1;

      return [
        ...prevItems,
        {
          id: createId("setlist"),
          serviceId,
          song: newSong,
          order: nextOrder,
          notes: notes?.trim(),
        },
      ];
    });
  };

  // Helper functions
  const getServiceById = (id: string) => services.find((s) => s.id === id);

  const getSchedulesForService = (serviceId: string) =>
    schedules.filter((s) => s.serviceId === serviceId);

  const getSetlistForService = (serviceId: string) =>
    setlistItems
      .filter((s) => s.serviceId === serviceId)
      .sort((a, b) => a.order - b.order);

  const getFeedbacksForService = (serviceId: string) =>
    feedbacks.filter((f) => f.serviceId === serviceId);

  const getScheduleForUser = (userId: string) =>
    schedules.filter((s) => s.userId === userId);

  const getSongById = (id: string) => songs.find((s) => s.id === id);

  const getUserById = (id: string) => users.find((user) => user.id === id);

  const getInstrumentById = (id: string) =>
    currentTeam?.instruments.find((instrument) => instrument.id === id);

  const value: AppContextType = {
    currentUser,
    currentTeam,
    users,
    setCurrentUser,
    switchCurrentUser,
    services,
    schedules,
    feedbacks,
    setlistItems,
    songs,
    addMember,
    addInstrument,
    createService,
    assignSchedule,
    toggleScheduleConfirmation,
    addSetlistSong,
    getServiceById,
    getSchedulesForService,
    getSetlistForService,
    getFeedbacksForService,
    getScheduleForUser,
    getSongById,
    getUserById,
    getInstrumentById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
