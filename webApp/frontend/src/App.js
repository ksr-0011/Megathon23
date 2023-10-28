import 'bulma/css/bulma.min.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoadAll from './components/LoadAll';
import LoadRecents from './components/LoadRecents';
import ChatWindow from './components/ChatWindow';
function App() {
  return (
    <>
      <Routes>
        
        
        <Route exact path="/" element={<ChatWindow />} />
      </Routes>
    </>
  );
}

export default App;
