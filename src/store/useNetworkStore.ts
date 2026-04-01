// useNetworkStore.ts
import { create } from 'zustand';

type NetworkQuality = 'online' | 'slow' | 'offline';

type NetworkState = {
  status: NetworkQuality;
  showOnlineChip: boolean;
  initialized: boolean;

  setStatus: (status: NetworkQuality) => void;
  markInitialized: () => void;
};

export const useNetworkStore = create<NetworkState>((set, get) => ({
  status: navigator.onLine ? 'online' : 'offline',
  showOnlineChip: false,
  initialized: false,

  setStatus: (status) => {
    const { initialized } = get();
    const prev = get().status;

    set({ status });

    // Show "Back Online" only when recovering
    if (initialized && prev === 'offline' && status === 'online') {
      set({ showOnlineChip: true });

      setTimeout(() => {
        set({ showOnlineChip: false });
      }, 10000);
    }
  },

  markInitialized: () => set({ initialized: true }),
}));
