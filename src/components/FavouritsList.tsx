import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavouriteStore } from "../stores/FavouriteStore";
import { tw } from "../tw";

const FavouritsList = () => {
  const navigate = useNavigate();
  const { favourites } = useFavouriteStore((state) => ({
    favourites: state.favourites,
  }));
  return (
    <div className="p-10">
      <div className="grid grid-cols-6 gap-4 justify-items-center">
        {favourites.map((character) => (
          <div
            key={character.id}
            className="w-36 h-36 transform transition rounded-md duration-500 hover:scale-125 hover:z-10 hover:shadow-cyan-300
                hover:shadow-lg flex justify-between font-medium text-lg drop-shadow-xl cursor-pointer"
            onClick={() => navigate(`/characters/${character.id}`)}
          >
            <img src={character.image} alt={character.name} className="h-full w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritsList;
