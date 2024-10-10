import { useState } from 'react'
import './App.css'

import { Login } from './pages/Auth/Auth';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Books } from './pages/Books/Books';

export function App() {

  return (
    <>
      <div className="container">
        <Header />
        <body>
          <Routes>
            {/* <Route path='/' element={<App/>}/> */}
            <Route path='/login' element={<Login />} />
            <Route path='books' element={<Books/>}/>
          </Routes>
        </body>
      </div>
    </>
  )
}
