import React from 'react';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Index from './Pages/Index';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<><Index/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
