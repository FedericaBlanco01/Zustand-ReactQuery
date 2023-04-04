import { create, StateCreator } from 'zustand';
import { Character } from '../types/characters';
import { persist, PersistOptions } from 'zustand/middleware'

export interface FavoriteStore {
    favorites: Character[];
    addFavorite: (character: Character) => void;
    removeFavorite: (characterId: number) => void;
}

type MyPersist = (
    config: StateCreator<FavoriteStore>,                                            
    options: PersistOptions<FavoriteStore>                                          
  ) => StateCreator<FavoriteStore>     


export const useFavoriteStore = create<FavoriteStore>(
    (persist as MyPersist) ((set) => ({
    favorites: [],
    addFavorite: (character) => {
        set((state) => ({
            favorites: [...state.favorites, character],
        }));
    },
    removeFavorite: (characterId) => {
        set((state) => ({
            favorites: state.favorites.filter((character) => character.id !== characterId),
        }));
    }
    }),
    {
      name: 'favorite-storage',
    }
));
