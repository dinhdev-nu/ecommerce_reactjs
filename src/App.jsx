import { Outlet } from 'react-router-dom'
import styles from './styles/App.module.scss'
import NavBar from './components/Navbar'

function App() {

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
