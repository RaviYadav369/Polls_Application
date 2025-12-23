import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Polling = () => {

  const [polldata, setPollData] = useState([])
  const [isVoteId, setIsVoteId] = useState()
  const [isVote, setIsVote] = useState(false)
  const navigate = useNavigate()
  

  const handleIsVote = (id) => {
    setIsVoteId(id)

    polldata.forEach((poll) => {
      if (poll._id === id) {
        setIsVote(true)
      }
    })
    if (isVoteId === id && isVote) {
      setIsVote(false)
    }
  }
  const handleVoteOption = async (id, option) => {
    console.log(id,option)
    const result = await axios.put(`${process.env.Backend_Url}/${id}`, { option: option })
    console.log(result.data)
    alert("You have vote for the Pole")
  }

   function fetchPollResult(id){
    navigate(`/pollsresult/${id}`)
  
   } 

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://127.0.0.1:8000/')
      if (result) {
        setPollData(result.data)
      }
    }

    fetchData()
  }, [])
  return (

    <div className="min-h-screen bg-gray-50 py-12 px-4 no-scrollbar overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Active Polls</h1>
            <p className="text-slate-500">Select a poll to participate or view live standings.</p>
          </div>
          <button onClick={() => navigate('/pollcreate')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2">
            <span className="text-xl">+</span> Create New Poll
          </button>
        </div>

        {/* Polls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-scrollbar overflow-y-auto">
          {polldata.map((poll) => (
            <div
              key={poll._id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-around"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">
                    Active
                  </span>
                  <span className="text-slate-400 text-xs">{poll.totalVotes} votes cast</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 line-clamp-2">
                  {poll.pollsTitle}
                </h3>
              </div>
              {isVoteId ? !(poll._id === isVoteId) && isVote && (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis molestias voluptatibus optio veritatis itaque eveniet ex, iure maxime sint, dolor placeat dolorem at nemo. Omnis ea, voluptatum eveniet tempora explicabo maiores minima quos quia sapiente provident corporis eligendi nesciunt numquam repellendus vero veritatis eum dolore.
                </p>
              ) :
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis molestias voluptatibus optio veritatis itaque eveniet ex, iure maxime sint, dolor placeat dolorem at nemo. Omnis ea, voluptatum eveniet tempora explicabo maiores minima quos quia sapiente provident corporis eligendi nesciunt numquam repellendus vero veritatis eum dolore.
                </p>
              }
              <div className="flex gap-3">
                <button onClick={()=>fetchPollResult(poll._id)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg transition-colors">
                  View Results
                </button>
                <button onClick={() => handleIsVote(poll._id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors">
                  Vote Now
                </button>
              </div>
              {(poll._id === isVoteId) && isVote && (
                <div className='p-3'>
                  <div className='py-1'>
                    <button className=" w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors" onClick={() => handleVoteOption(poll._id, 'option1name')}>{poll.option1name}</button>
                  </div>
                  <div className='py-1'>
                    <button className=" w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors" onClick={() => handleVoteOption(poll._id, 'option2name')}>{poll.option2name}</button>
                  </div>
                  <div className='py-1'>
                    <button className=" w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors" onClick={() => handleVoteOption(poll._id, 'option3name')}>{poll.option3name}</button>
                  </div>
                  <div className='py-1'>
                    <button className=" w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors" onClick={() => handleVoteOption(poll._id, 'option4name')}>{poll.option4name}</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State (Optional) */}
        {polldata.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">No polls found. Why not create one?</p>
          </div>
        )}
      </div>
    </div>

  )
}

export default Polling
