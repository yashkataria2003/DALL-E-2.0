import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div className='flex flex-col justify-start items-start w-[80vw] py-[1vh] gap-y-[0.5vh]'>
      <div className="flex justify-start items-center gap-x-[1vw]">
        <label
          htmlFor="name"
          className='flex text-sm font-medium text-gray-900
        '>
          {labelName}
        </label>
        {
          isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className='font-semibold text-xs bg-[#ECECF1] py-[1vh] px-[1vw] rounded-[0.3rem] text-black'
            >
              Surprise Me
            </button>
          )
        }
      </div>

      <input 
        type={type} 
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='flex justify-start items-center w-full px-[1vw] py-[0.7vh] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none'
      />
    </div>
  )
}

export default FormField
