import React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCharacter } from "../services/CharacterService";
import { useFavouriteStore } from "../stores/FavouriteStore";
import { tw } from "../tw";
import HeartButton from "./HeartButton";

const OneCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favourites, addFavourite, removeFavourite } = useFavouriteStore((state) => ({
    favourites: state.favourites,
    addFavourite: state.addFavourite,
    removeFavourite: state.removeFavourite,
  }));

  if (id === "undefined") window.location.href = `/characters`;

  const { isLoading, isError, data } = useQuery("character", () => getCharacter(+id));
  if (isLoading) return <div className="flex justify-center text-green-500 font-medium text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="flex justify-center text-green-500 font-medium text-lg">
        Something went wrong, please try again later!
      </div>
    );

  const Message = () => {
    return (
      <div>
        <strong className="mb-4">{data?.name} was favourited</strong>
        <p>Check your favourites collection by clicking the heart on the top right corner.</p>
      </div>
    );
  };

  const notify = () => {
    toast(<Message />, {
      toastId: "user-created",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLike = (status: boolean) => {
    if (status && data) {
      addFavourite(data);
      notify();
    } else if (data) {
      removeFavourite(data.id);
    }
  };

  const isFavourite = () => {
    const character = favourites.find((character) => character.id === data?.id);
    return character == undefined ? false : true;
  };

  return (
    <div className="p-10">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="text-green-600 p-2 mb-4 border shadow-md rounded-full border-green-500 shadow-green-500/50
     hover:border-green-400 hover:shadow-green-400/50 hover:text-green-500"
      >
        Go back
      </button>
      <div className="flex justify-center">
        <div
          className={tw(
            " bg-zinc-700 border rounded-md py-10 w-1/2 shadow-xl",
            data?.status === "Dead" && "border-red-500 shadow-red-500",
            data?.status === "Alive" && "border-green-500 shadow-green-500",
            data?.status === "unknown" && "border-yellow-500 shadow-yellow-500"
          )}
        >
          <div className="flex justify-end mr-8 mb-4">
            <HeartButton like={isFavourite()} handleClick={(status: boolean) => handleLike(status)} />
          </div>
          <div className="text-lg grid grid-cols-1 gap-4 justify-items-center">
            <img
              src={data?.image}
              alt={data?.name}
              className={tw(
                "h-32 w-32 mb-8 rounded-full border-2  shadow-lg justify-self-center",
                data?.status === "Dead" && "border-red-500 shadow-red-500/50",
                data?.status === "Alive" && "border-green-500 shadow-green-500/50",
                data?.status === "unknown" && "border-yellow-500 shadow-yellow-500/50"
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                Name:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.name}</div>
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                Status:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.status}</div>
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                Specie:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.species}</div>
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                {" "}
                Gender:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.gender}</div>
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                {" "}
                Origin:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.origin.name}</div>
              <div
                className={tw(
                  data?.status === "Dead" && "text-red-500",
                  data?.status === "Alive" && "text-green-500",
                  data?.status === "unknown" && "text-yellow-500"
                )}
              >
                {" "}
                Location:{" "}
              </div>
              <div className="pl-2 text-white text-right">{data?.location.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneCharacter;
