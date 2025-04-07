import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesState = {
    favorites: number[];
    showFavorites: boolean;
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
    setShowFavorites: () => void;
};

export const useFavorites = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            showFavorites: false,
            toggleFavorite: (id: number) => {
                const { favorites } = get();
                const updated = favorites.includes(id)
                    ? favorites.filter(f => f !== id)
                    : [...favorites, id];
                set({ favorites: updated });
            },
            isFavorite: (id: number) => {
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