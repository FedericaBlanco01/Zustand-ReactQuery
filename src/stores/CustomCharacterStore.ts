import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware'
import { CustomCharacter } from '../types/CustomCharacters';

export interface CustomCharacterStore {
    characters: CustomCharacter[];
    addCharacter: (character: CustomCharacter) => void;
}

type MyPersist = (
    config: StateCreator<CustomCharacterStore>,                                            
    options: PersistOptions<CustomCharacterStore>                                          
  ) => StateCreator<CustomCharacterStore>     


export const useCustomCharacterStore = create<CustomCharacterStore>(
    (persist as MyPersist) ((set) => ({
        characters: [],
        addCharacter: (character) => {
        set((state) => ({
            characters: [...state.characters, character],
        }));
    },
    }),
    {
      name: 'custom-characters-storage',
    }
));
