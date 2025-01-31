import { Outlet } from 'react-router-dom'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'

function App() {


  return (
    <div>
      <NavBar />
      <main style={{ marginTop: '7rem '}}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
