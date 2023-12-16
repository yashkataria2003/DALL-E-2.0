import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../Utils'
import { FormField, Loader } from '../Components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:4000/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })  

        // console.log("Fetch Done")

        const data = await response.json();


        // console.log("Data retrive Done")

        setForm({...form, photo: data.photo})
      } 
      
      catch (error) {
        alert(error)
      }

      finally {
        setGeneratingImg(false);
      }
    }

    else {
      alert('Please enter a Prompt');
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:4000/api/v1/post', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: form.name, prompt: form.prompt, photo:form.photo}),
        });

        await response.json();   
        navigate('/');
      } 
      
      catch (error) {
        alert(error);
      }

      finally {
        setLoading(false);
      }
    }

    else {
      alert('Please enter a prompt to generate an image')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }

  return (
    <section className='flex flex-col justify-start items-start gap-y-[2vh] max-w-[80vw] mx-auto py-[2vh]'>
      <div className='flex flex-col justify-start items-start gap-y-[1vh]'>
        <h1 className='font-extrabold text-[#222328] text-[1.7rem]'>Create</h1>
        <p className='text-[#666e75] text-[0.9rem] max-w-[60vw]'>
          Create imaginative and visually stunning images through DALL-E AI
        </p>
      </div>

      <form className='flex flex-col justify-start items-start gap-y-[1.2vh]' onSubmit={handleSubmit}>
        <FormField
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="Yash Kumar"
          value={form.name}
          handleChange={(e) => handleChange(e)}
        />

        <FormField
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
          value={form.prompt}
          handleChange={(e) => handleChange(e)}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
        />

        <div className="relative flex justify-center items-center bg-gray-50 px-[0.2vw] py-[0.2vh] h-[12rem] w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 ">
          {
            form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-cover'
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className='w-[10rem] h-[10rem] object-contain opacity-40'
              />
            )
          }

          {
            generatingImg && (
              <div className="absolute flex justify-center items-center bg-[rgba(0,0,0,0.5)] inset-0 z-0 rounded-lg">
                <Loader />
              </div>
            )
          }
        </div>

        <div className="flex justify-start items-center w-[100%]">
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-[2vw] py-[0.9vh] text-center'
          >
            {generatingImg ? 'Generting ...' : 'Generate'}
          </button>
        </div>

        <div className='flex flex-col justify-start items-start gap-y-[1vh] w-[100%]'>
          <p className='text-[#666e75] text-[0.8rem] max-w-[60vw]'>
            Once you have created the image you want, you can share it with others in the Community
          </p>
          <button 
            type="submit"
            className='text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-[2vw] py-[0.9vh] text-center'
          >
            {loading ? 'Sharing ...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
