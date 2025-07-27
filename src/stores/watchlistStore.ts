import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PopularMovie } from '@/types/tmdb';

interface WatchlistStore {
  watchlist: PopularMovie[];
  addWatchlist: (movie: any) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
  getWatchlistCount: () => number;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addWatchlist: movie => {
        set(state => {
          const exists = state.watchlist.some(m => m.id === movie.id);
          if (exists) return state;

          return {
            watchlist: [...state.watchlist, { ...movie }],
          };
        });
      },

      removeFromWatchlist: movieId => {
        set(state => ({
          watchlist: state.watchlist.filter(m => m.id !== movieId),
        }));
      },

      isInWatchlist: movieId => {
        return get().watchlist.some(m => m.id === movieId);
      },

      clearWatchlist: () => {
        set({ watchlist: [] });
      },

      getWatchlistCount: () => {
        return get().watchlist.length;
      },
    }),
    {
      name: 'watchlist-storage', // localStorage key
    },
  ),
);
