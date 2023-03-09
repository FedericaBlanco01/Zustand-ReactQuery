import Home from './components/Home';
import CharactersList from './components/CharactersList';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import OneCharacter from './components/OneCharacter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FavouritsList from './components/FavouritsList';

function App() {
  const queryClient = new QueryClient()
  console.log('app')
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
          <div className='flex justify-between bg-zinc-900 p-5 text-green-500 font-medium text-md'>
            <div className='flex justify-start'>
              <div className='mr-4 text-green-300'>The Rick and Morty Page</div>
              <Link to="/" className='mx-4'>Home</Link>
              <Link to="/characters">Characters</Link>
            </div>
              <Link to="/favourites" className='text-red-400'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-400">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/characters" element={<CharactersList/>} />
          <Route path="/characters/:id" element={<OneCharacter/>} />
          <Route path="/favourites" element={<FavouritsList/>} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App