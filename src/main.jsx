import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './global.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < RouterProvider router={ router } />
  </StrictMode>,
)
