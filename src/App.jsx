import { Outlet } from 'react-router-dom'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <NavBar />
      <main style={{ marginTop: '7rem '}}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
