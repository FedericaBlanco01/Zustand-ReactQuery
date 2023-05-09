import React, { useEffect } from "react";
import {
  NavLink,
  Route,
  Routes,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { tw } from "../tw";
import CharactersList from "./CharactersList";
import MyCharacters from "./MyCharacters";
import OneCharacter from "./OneCharacter";

const Characters = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/characters/api");
  }, []);
  return (
    <React.Fragment>
      <div>
        <div>
          <CharacterMenu />
          <Routes>
            <Route path="/api" element={<CharactersList />} />
            <Route path="/custom" element={<MyCharacters />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

function CharacterMenu() {
  const location = useLocation();
  return (
    <nav>
      <div className="mx-auto px-2 sm:px-6 lg:px-8 border-b border-zinc-600">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/characters/api"
                className={tw(
                  "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-200",
                  location.pathname === "/characters/api" &&
                    "border-b-2 border-green-500 text-zinc-50 hover:border-green-500",
                )}
              >
                Characters
              </NavLink>
              <NavLink
                to="/characters/custom"
                className={tw(
                  "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-zinc-400 hover:border-zinc-300 hover:text-zinc-200",
                  location.pathname === "/characters/custom" &&
                    "border-b-2 border-green-500 text-zinc-50 hover:border-green-500",
                )}
              >
                My characters
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Characters;
