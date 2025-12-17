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

    try {
      const data = await axios.post('http://localhost:8000', pollData)
      
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
      <h1>Polls Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Polls Title</h4>
          <input type='text' value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Enter the polls tittle..' />
        </div>
        <div>
          <div className='flex justify-between'>
            <input type='text' value={option1} onChange={(e) => setOption1(e.target.value)} placeholder='Enter the polls options..' />
            <input type='text' value={option2} onChange={(e) => setOption2(e.target.value)} placeholder='Enter the polls options..' />
          </div>
          <div>
            <input type='text' value={option3} onChange={(e) => setOption3(e.target.value)} placeholder='Enter the polls options..' />
            <input type='text' value={option4} onChange={(e) => setOption4(e.target.value)} placeholder='Enter the polls options..' />
          </div>
        </div>
        <div>
          <button type='submit' >Submit Polls</button>
        </div>
      </form>
    </div>
  )
}

export default PollsCreate
