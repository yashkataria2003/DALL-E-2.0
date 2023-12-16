import './App.css'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import { logo } from './assets'
import { CreatePost, Home }from './Pages'

function App() {
  return (
    <BrowserRouter>
      <header className='flex justify-between items-center w-full bg-white border-b border-b-[#e6ebf4] px-[2vw] py-[1vh] sm:px-[3vw] sm:py-[2vh]'>
        <Link to="/">
          <img src={logo} alt="logo" className='w-28 object-contain' />
        </Link>

        <Link to='/create-post' className='flex justify-center items-center text-white bg-[#6469ff] px-[1vw] py-[1vh] rounded-md sm:w-[10vw]'>
          Create
        </Link>
      </header>
      
      <main className=' bg-[#f9fafe] min-h-[80vh] px-[1vw] py-[2vh] sm:py-[1vh] sm:px-[2vw]'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
