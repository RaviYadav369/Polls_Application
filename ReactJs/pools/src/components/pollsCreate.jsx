import React, { useState } from 'react'
import axios from 'axios'

const PollsCreate = () => {

  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(question, option1, option2, option3, option4)
    const pollData = {
      pollsTitle: question,
      option1name: option1,
      option2name: option2,
      option3name: option3,
      option4name: option4,
    }
    console.log("polls data",pollData)
    try {
      const data = await axios.post(`${process.env.Backend_Url}`, pollData)
      console.log(data.data)
        alert('Polls created Succcessfully')
      
    } catch (error) {
      alert('Error in Submitting Polls Data')
    }

    setQuestion("");
    setOption1("");
    setOption2('');
    setOption3('');
    setOption4('');
  }


  return (
    <div className='p-5 mx-auto w-2/5'>
      <h1 className='text-xl font-bold text-center'>Polls Details</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='py-1'>
         <label className="block text-lg font-semibold text-gray-700 mb-2">Poll Title</label>
          <input type='text' value={question} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm" onChange={(e) => setQuestion(e.target.value)} placeholder='Enter the polls tittle..' />
        </div>
        <div className='pt-2'>
          <label className="block text-lg font-semibold text-gray-700 mb-3">Options</label>
          <div className='py-1'>

          <div className="grid py-2 grid-cols-1 md:grid-cols-2 gap-4">
            <input type='text' value={option1} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition" onChange={(e) => setOption1(e.target.value)} placeholder='Enter the polls options..' />
            <input type='text' value={option2} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition" onChange={(e) => setOption2(e.target.value)} placeholder='Enter the polls options..' />
          </div>
          <div className="grid py-2 grid-cols-1 md:grid-cols-2 gap-4">
            <input type='text' value={option3} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition" onChange={(e) => setOption3(e.target.value)} placeholder='Enter the polls options..' />
            <input type='text' value={option4} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none transition" onChange={(e) => setOption4(e.target.value)} placeholder='Enter the polls options..' />
          </div>
          </div>
        </div>
        <div className='py-2'>
          <button type='submit'  className="bg-blue-600 text-center hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md w-full" >Submit Polls</button>
        </div>
      </form>
    </div>
  )
}

export default PollsCreate
