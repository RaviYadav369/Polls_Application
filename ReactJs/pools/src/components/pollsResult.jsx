import axios from 'axios'
import React, { useState,useEffect } from 'react'

const PollsResult = () => {
  const [pollData,setPollData] = useState([])
    useEffect(()=>{
   async function fetchData(){
    const result = await axios.get('https://polls-application-gold.vercel.app/')
    if(result){
      setPollData(result.data)
    }
   } 

   fetchData()
  },[])
  return (
    <div>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
          {pollData.pollsTitle}
        </h2>

        <div className="space-y-6">
          {pollData.options.map((opt, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{opt.name}</span>
                <span className="text-blue-600 font-bold">{opt.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${opt.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          ← Back to Polls list
        </button>
      </div>
    </div>
    </div>
  )
}

export default PollsResult
