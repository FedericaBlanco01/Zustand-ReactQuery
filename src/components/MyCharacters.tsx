import React from "react";

import { useCustomCharacterStore } from "../stores/CustomCharacterStore";

const MyCharacters = () => {
  const { characters } = useCustomCharacterStore((state) => ({
    characters: state.characters,
  }));
  return (
    <div className="grid grid-cols-1 gap-4 p-10 flex-grow">
      <div className="grid grid-cols-4 gap-4">
        {characters.map((character) => (
          <div
            className="text-white w-full transform transition duration-500 min-h-[160px]
       hover:scale-125 hover:z-10 hover:bg-zinc-600 hover:shadow-zinc-500 hover:shadow-lg 
       p-4 font-medium text-lg bg-zinc-700 rounded-lg drop-shadow-xl"
          >
            <h2 className="text-xl text-green-500 font-bold">
              {character.name}
            </h2>
            <p className="text-sm">Type: {character.status}</p>
            <p className="text-sm">Dimension: {character.specie}</p>
            <p className="text-sm">Created at: {character.gender}</p>
            <p className="text-sm">Created at: {character.origin}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCharacters;
