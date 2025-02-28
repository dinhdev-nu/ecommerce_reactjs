import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import NotFoundPage from '../pages/NotFoundPage'
import HomePage from '../pages/HomePage'
import Access from '../components/Access'
import ProductDetail from '../pages/ProductDetail'
import ProductForm from '../components/ProductForm'
import ListProduct from '../components/ProductsList/index'
import EditProductForm from '../components/ProductForm/edit'
import ShopManagerDashboard from '../components/Dashboard'
import DashboardPage from '../pages/Dashboard'
import InventoryDashboard from '../components/Inventory'
import DiscountManagement from '../components/Discount'
import CartPage from '../components/Cart'
import Order from '../components/Order'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            path: '',
            element: <HomePage />
        }]
    },
    {
        path: '/login',
        element: <Access />

    },
    {
        path: '/signup',
        element: <Access />
    },
    {
        path: '/inventory',
        element: <InventoryDashboard />

    },
    {
        path: '/discounts',
        element: <DiscountManagement />

    },
    {
        path: '/dashboard',
        element: <ShopManagerDashboard />
    },
    {
        path: '/products',
        element: <ListProduct />
    },
    {
        path: '/order',
        element: <Order />
    },
    {
        path: '/product/:id?',
        element: <ProductDetail />
    },
    {
        path: 'product/new',
        element: <ProductForm />
    },
    {
        path: 'product/edit',
        element: <EditProductForm />
    },
    {
        path: 'cart',
        element: <CartPage />
    },
    {
        path: '/404',
        element: <NotFoundPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }

])

export default router