import React from 'react'
import { download } from '../assets'
import { downloadImage } from '../Utils'
import { handleDelete } from '../Pages/Home.jsx'
import delete_logo from '../assets/delete_logo.png'

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl flex justify-center items-center group relative shadow-card hover:shadow-cardhover card'>
      <img
        src={photo}
        alt={prompt}
        className='w-full h-auto object-cover rounded-xl'
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className='text-white text-md overflow-y-auto prompt'>
          {prompt}
        </p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-7 h-7 rounded-full text-white text-xs font-bold object-cover bg-green-700">
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>

          <div className="flex justify-between items-center gap-x-[1vw] h-auto w-auto px-[0.5vw]">
            <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
              <img src={download} alt="download" className='w-6 h-6 object-contain invert' />
            </button>
            <button type='button' onClick={() => handleDelete(_id)} className='outline-none bg-transparent border-none'>
              <img src={delete_logo} alt="delete" className='w-10 object-contain' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
