import { create, StateCreator } from 'zustand';
import { Character } from '../types/characters';
import { persist, PersistOptions } from 'zustand/middleware'

export interface FavouriteStore {
    favourites: Character[];
    addFavourite: (character: Character) => void;
    removeFavourite: (characterId: number) => void;
}

type MyPersist = (
    config: StateCreator<FavouriteStore>,                                            
    options: PersistOptions<FavouriteStore>                                          
  ) => StateCreator<FavouriteStore>     


export const useFavouriteStore = create<FavouriteStore>(
    (persist as MyPersist) ((set) => ({
    favourites: [],
    addFavourite: (character) => {
        set((state) => ({
            favourites: [...state.favourites, character],
        }));
    },
    removeFavourite: (characterId) => {
        set((state) => ({
            favourites: state.favourites.filter((character) => character.id !== characterId),
        }));
    }
    }),
    {
      name: 'favourite-storage',
    }
));
