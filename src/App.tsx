import Home from './components/Home';
import Converter from './components/Converter';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-zinc-800 w-86 h-screen font-mono">
      <nav>
        <div className='flex justify-start bg-zinc-900 p-5 text-green-500 font-medium text-lg'>
          <Link to="/" className='mx-4'>Home</Link>
          <Link to="/converter">Characters</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </div>
  )
}

export default App