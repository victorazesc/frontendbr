import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
    favorites: string[];
    showFavorites: boolean;
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    setShowFavorites: () => void;
};

export const useFavorites = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            showFavorites: false,
            toggleFavorite: (id: string) => {
                const { favorites } = get();
                const updated = favorites.includes(id)
                    ? favorites.filter(f => f !== id)
                    : [...favorites, id];
                set({ favorites: updated });
            },
            isFavorite: (id: string) => {
                return get().favorites.includes(id);
            },
            setShowFavorites: () => {
                const { showFavorites } = get();
                set({ showFavorites: !showFavorites });
            }
        }),
        {
            name: "favorite-vacancies", // chave do localStorage
        }
    )
);