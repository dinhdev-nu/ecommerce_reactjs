import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/HomePage'
import Access from '../components/Access'

const router = createBrowserRouter ([
    {
        path: '/',
        element: <App/>,
        children: [{
            path: '',
            element: <HomePage/>
        }]
    },
    {
        path: '/login',
        element: <Access/>
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }

])

export default router