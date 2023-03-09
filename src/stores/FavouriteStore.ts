import { create } from 'zustand';
import { Character } from '../types/characters';

export interface FavouriteStore {
    favourites: Character[];
    addFavourite: (character: Character) => void;
    removeFavourite: (characterId: number) => void;
}


export const useFavouriteStore = create<FavouriteStore>(
   (set) => ({
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
    }
));
