import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Polling from './components/polling';
import PollsCreate from './components/pollsCreate';
import PollsResult from './components/pollsResult';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PollsCreate />} />
          <Route path='/polling' element={<Polling />} />
          <Route path='/pollsresult' element={<PollsResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
