import { useState } from 'react'
import './App.css'

import { Login } from './pages/Auth/Auth';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Books } from './pages/Books/Books';
import { Main } from './pages/Main/Main';
import { Register } from './pages/Register/Register';

export function App() {

  return (
    <>
      <div className="container">
        <Header />
        <body>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login />} />
            <Route path='/books' element={<Books/>}/>
            <Route path='/signup' element={<Register/>}/>
          </Routes>
        </body>
      </div>
    </>
  )
}
