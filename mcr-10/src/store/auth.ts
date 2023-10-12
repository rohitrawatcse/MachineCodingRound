import { create } from 'zustand';

import { persist } from 'zustand/middleware';

const swastikId = 1;

interface AuthState {
  mainUserId: number | null;
  updateMainUserId: (id: number) => void;
  removeMainUserId: () => void;
}

const authStore = (set): AuthState => ({
  mainUserId: swastikId,
  updateMainUserId: (id: number) => {
    set(() => ({ mainUserId: id }));
  },
  removeMainUserId: () => {
    set(() => ({ mainUserId: null }));
  },
});

export const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: 'auth',
  })
);
