import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

type Data = {
  name: string
  email: string
  message: string
}

export default function Home() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function sending() {
    
    setSubmitted(true)

    // input data object
    const data: Data = {
      name: name,
      email: email,
      message: message
    }

    //using axios lib
    axios.post('/api/contact', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setSubmitted(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      <h1 className='font-bold text-lg text-slate-700'>Test Form for sending data</h1>
      <input onChange={(e) => { setName(e.target.value) }} name='name' type="text" className='border-2 border-slate-400 rounded p-4' placeholder='Name' />
      <input onChange={(e) => { setEmail(e.target.value) }} name='email' type="email" className='border-2 border-slate-400 rounded p-4' placeholder='Email' />
      <input onChange={(e) => { setMessage(e.target.value) }} name='message' type="text" className='border-2 border-slate-400 rounded p-4' placeholder='Message' />
      <button onClick={() => sending()} disabled={submitted} className='bg-green-400 rounded p-4 font-bold text-white text-xl w-[225px]'>Send</button>
    </div>
  )
}
