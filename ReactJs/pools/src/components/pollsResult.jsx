import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PollsResult = () => {
  const { id } = useParams()
const navigate = useNavigate()
  const [pollData, setPollData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`http://127.0.0.1:8000/analytic/${id}`);
        setPollData(result.data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    }
   fetchData()
  }, [id]);



  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4">
            {pollData.pollsTitle}
          </h2>

          <div className="space-y-6">

            <div >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{pollData.option1name}</span>
                <span className="text-blue-600 font-bold">{pollData.option1percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${pollData.option1percentage}%` }}
                ></div>
              </div>
            </div>
             <div >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{pollData.option2name}</span>
                <span className="text-blue-600 font-bold">{pollData.option2percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${pollData.option2percentage}%` }}
                ></div>
              </div>
            </div>
             <div >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{pollData.option3name}</span>
                <span className="text-blue-600 font-bold">{pollData.option3percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${pollData.option3percentage}%` }}
                ></div>
              </div>
            </div>
             <div >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{pollData.option4name}</span>
                <span className="text-blue-600 font-bold">{pollData.option4percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${pollData.option4percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <button className="mt-10 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2" onClick={()=>navigate('/')}>
            ← Back to Polls list
          </button>
        </div>
      </div>
    </div>
  )
}

export default PollsResult
