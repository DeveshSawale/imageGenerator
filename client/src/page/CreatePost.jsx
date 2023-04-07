import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import {getRandomDescription} from "../utils"
import {Form, Loader} from "../components"


const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name : '',
    prompt : '',
    image : '',
  })

  const [makingImg, setMakingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () =>{
    if (form.prompt) {
      try {
        setMakingImg(true);
        const response = await fetch('http://localhost:8080/api/img',{
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, image: `data:image/jpeg;base64,${data.image}`});
        // console.log(form.image);

      } catch (err) {
        alert(err);
      } finally {
        setMakingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(form.prompt && form.image){
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/post',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/')
      } catch (error) {
        alert(error)
      }finally{
        setLoading(false)
      }
    }else{
      alert("Plese enter a prompt to generate an image")
    }
  }
  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSurpriseMe = () =>{
    const randomPrompt = getRandomDescription(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }

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

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.image ? (
              <img src = {form.image} alt={form.prompt} className='w-full h-full object-contain'/>
            ) : (
              <img src = {preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40'/>
            )}

            {makingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>

          
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className= "text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {makingImg ? 'Creating...' : 'Create'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">After you create an image you want, you can post it so that other user can also see it..</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Posting...' : 'Post the image'}
          </button>
        </div>



      </form>
    </div>
  )
}

export default CreatePost