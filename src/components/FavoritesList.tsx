import React from "react";
import { useNavigate } from "react-router-dom";

import { useFavoriteStore } from "../stores/FavoriteStore";
import { tw } from "../tw";

const FavoritesList = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoriteStore((state) => ({
    favorites: state.favorites,
  }));
  return (
    <div className="p-10">
      <div className="grid grid-cols-9 gap-4 justify-items-center">
        {favorites.map((character) => (
          <div
            key={character.id}
            className="w-36 h-36 transform transition rounded-md duration-500 hover:scale-125 hover:z-10 hover:shadow-green-500
                hover:shadow-lg flex justify-between font-medium text-lg drop-shadow-xl cursor-pointer"
            onClick={() => navigate(`/characters/${character.id}`)}
          >
            <img
              src={character.image}
              alt={character.name}
              className="h-full w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
