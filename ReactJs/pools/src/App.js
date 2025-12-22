import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Polling from './components/polling';
import PollsCreate from './components/pollsCreate';
import PollsResult from './components/pollsResult';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <header className="mb-8 w-4/5 pl-16 mx-auto align-middle">
      <h1 className="text-3xl font-bold text-gray-900">Polls Details</h1>
      <p className="text-gray-500 mt-2">Create a new poll for your audience</p>
    </header>
        <Routes>
          <Route path="/" element={<Navigate to="/polling" />} />
          <Route path='/pollcreate' element={<PollsCreate />} />
          <Route path='/polling' element={<Polling />} />
          <Route path='/pollsresult/:id' element={<PollsResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
