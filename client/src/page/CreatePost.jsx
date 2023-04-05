import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import {getRandomDescription} from "../utils"
import {Form, Loader} from "../components"

const handleSubmit = () =>{
  
}
const handleChange = (e) =>{

}
const handleSurpriseMe = () =>{

}

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name : '',
    prompt : '',
    image : '',
  })

  const [makingImg, setMakingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create Your own Image</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an image by entering a text and image described by text will be generated.</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Form
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Aniket Mishra"
            value={form.name}
            handleChange={handleChange}
          />

          <Form
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Ex., An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          
        </div>
      </form>
    </div>
  )
}

export default CreatePost