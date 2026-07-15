import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "admin" | "moderator" | "user";
export type UserStatus = "active" | "banned" | "inactive";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  listingCount: number;
  joinedAt: string;
  lastActiveAt: string;
  avatarInitial: string;
  password?: string;
}

// ── Seed Data ───────────────────────────────────────────────────────────────
const MOCK_USERS: AppUser[] = [
  { id: "user-1", name: "Ahmet Yılmaz", email: "ahmet@example.com", phone: "+90 532 111 2233", role: "user", status: "active", listingCount: 3, joinedAt: "2025-01-15T10:00:00Z", lastActiveAt: new Date().toISOString(), avatarInitial: "A" },
  { id: "user-2", name: "Elif Kaya", email: "elif@example.com", phone: "+90 533 222 3344", role: "moderator", status: "active", listingCount: 8, joinedAt: "2025-02-20T10:00:00Z", lastActiveAt: new Date(Date.now() - 3600000).toISOString(), avatarInitial: "E" },
  { id: "user-3", name: "Mert Demir", email: "mert@example.com", phone: "+90 534 333 4455", role: "user", status: "active", listingCount: 2, joinedAt: "2025-03-10T10:00:00Z", lastActiveAt: new Date(Date.now() - 86400000).toISOString(), avatarInitial: "M" },
  { id: "user-4", name: "Selin Arslan", email: "selin@example.com", phone: "+90 535 444 5566", role: "user", status: "banned", listingCount: 0, joinedAt: "2025-03-25T10:00:00Z", lastActiveAt: new Date(Date.now() - 7 * 86400000).toISOString(), avatarInitial: "S" },
  { id: "user-5", name: "Burak Şahin", email: "burak@example.com", phone: "+90 536 555 6677", role: "user", status: "active", listingCount: 5, joinedAt: "2025-04-05T10:00:00Z", lastActiveAt: new Date(Date.now() - 2 * 86400000).toISOString(), avatarInitial: "B" },
  { id: "admin-1", name: "Admin Kullanıcı", email: "admin@emlakplatform.com", phone: "+90 212 555 0123", role: "admin", status: "active", listingCount: 0, joinedAt: "2024-12-01T10:00:00Z", lastActiveAt: new Date().toISOString(), avatarInitial: "A" },
];

// ── Store Interface ──────────────────────────────────────────────────────────
interface UserState {
  users: AppUser[];

  addUser: (data: Omit<AppUser, "id" | "listingCount" | "joinedAt" | "lastActiveAt" | "avatarInitial">) => void;
  updateUser: (id: string, data: Partial<Omit<AppUser, "id">>) => void;
  deleteUser: (id: string) => void;
  toggleBan: (id: string) => void;
  setRole: (id: string, role: UserRole) => void;
  getUserById: (id: string) => AppUser | undefined;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: MOCK_USERS,

      addUser: (data) => {
        const newUser: AppUser = {
          ...data,
          id: `user-${Date.now()}`,
          listingCount: 0,
          joinedAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          avatarInitial: data.name.charAt(0).toUpperCase(),
        };
        set((state) => ({ users: [newUser, ...state.users] }));
      },

      updateUser: (id, data) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id
              ? {
                  ...u,
                  ...data,
                  avatarInitial: data.name ? data.name.charAt(0).toUpperCase() : u.avatarInitial,
                }
              : u
          ),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({ users: state.users.filter((u) => u.id !== id) }));
      },

      toggleBan: (id) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id
              ? { ...u, status: u.status === "banned" ? "active" : "banned" }
              : u
          ),
        }));
      },

      setRole: (id, role) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, role } : u)),
        }));
      },

      getUserById: (id) => get().users.find((u) => u.id === id),
    }),
    { 
      name: "emlak-user-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
