import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CharactersList from "./components/CharactersList";
import Home from "./components/Home";
import OneCharacter from "./components/OneCharacter";
import "react-toastify/dist/ReactToastify.css";
import FavoritesList from "./components/FavoritesList";
import Places from "./components/Places";
import { tw } from "./tw";

function App() {
  const queryClient = new QueryClient();
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-zinc-800 w-86 min-h-screen font-mono">
        <nav>
          <div className="flex justify-between bg-zinc-900 p-5 text-white font-medium text-md items-center">
            <div className="flex justify-start items-center">
              <div className="mr-4 text-green-500 flex justify-around items-center">
                <img src="/logo.webp" className="h-12 w-12 mr-2" />
                Rick and Morty Page
              </div>
              <Link
                to="/"
                className={tw(
                  "mx-4",
                  location.pathname === "/" && "text-green-500",
                )}
              >
                Home
              </Link>
              <Link
                to="/characters"
                className={tw(
                  "mr-4",
                  location.pathname === "/characters" && "text-green-500",
                )}
              >
                Characters
              </Link>
              <Link
                to="/places"
                className={tw(
                  location.pathname === "/places" && "text-green-500",
                )}
              >
                Places
              </Link>
            </div>
            <Link to="/favorites">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={tw(
                  "w-6 h-6 text-red-400",
                  location.pathname === "/favorites" && "text-red-500",
                )}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/:id" element={<OneCharacter />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
