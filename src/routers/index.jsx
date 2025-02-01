import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/HomePage'
import Access from '../components/Access'
import ProductDetail from '../pages/ProductDetail'
import ProductForm from '../components/ProductForm'

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
        path: '/signup',
        element: <Access/>
    },
    {
        path: 'product',
        element: <ProductDetail/>
    },
    {
        path: 'product/new',
        element: <ProductForm/>
    },
    {
        path: '*',
        element: <NotFoundPage/>
    }

])

export default router