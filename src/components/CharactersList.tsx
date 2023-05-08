import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { getCharacters } from "../services/CharacterService";
import { tw } from "../tw";
import { Character } from "../types/characters";
import PaginationNumbers from "./PaginationNumbers";
import Spinner from "./Spinner";

function CharactersList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalAmountOfPages = 42;
  const fetchCharacters = (page: number) => getCharacters(page);

  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery(
    ["characters", currentPage],
    () => fetchCharacters(currentPage),
    { keepPreviousData: true },
  );

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="flex justify-center text-green-500 font-medium text-lg">
        Something went wrong, please try again later!
      </div>
    );

  return (
    <div className="p-10">
      <div className="grid grid-cols-4 gap-8 justify-items-center mb-8">
        {data?.results.map((character: Character) => (
          <div
            key={character.id}
            className="w-full transform transition duration-500 hover:scale-125 hover:z-10 hover:bg-zinc-600 hover:shadow-zinc-500 
                    hover:shadow-lg flex justify-between py-4 font-medium text-lg bg-zinc-700 rounded-lg drop-shadow-xl cursor-pointer"
            onClick={() => {
              navigate(`/characters/api/${character.id}`);
            }}
          >
            <div className="flex justify-center pl-2">
              <img
                src={character.image}
                alt={character.name}
                className={tw(
                  "h-32 w-32 rounded-full border-2  shadow-lg",
                  character.status === "Dead" &&
                    "border-red-500 shadow-red-500/50",
                  character.status === "Alive" &&
                    "border-green-500 shadow-green-500/50",
                  character.status === "unknown" &&
                    "border-yellow-500 shadow-yellow-500/50",
                )}
              />
            </div>
            <div className="flex flex-col justify-top text-right items-end pr-3">
              <div
                className={tw(
                  "text-md",
                  character.status === "Dead" && "text-red-500",
                  character.status === "Alive" && "text-green-500",
                  character.status === "unknown" && "text-yellow-500",
                )}
              >
                {" "}
                {character.name.length > 18
                  ? character.name.slice(0, 8) + "..."
                  : character.name}
              </div>
              <div className="text-white text-sm">
                {" "}
                specie: {character.species}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationNumbers
        pages={totalAmountOfPages}
        disable={isPreviousData || isFetching}
        currentPage={currentPage}
        totalDisplaying={data?.results.length}
        handleNext={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo(0, 0);
        }}
        handlePrev={() => {
          setCurrentPage(currentPage - 1);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}

export default CharactersList;
