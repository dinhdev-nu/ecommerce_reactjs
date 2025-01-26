import NavBar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"


const ProductDetail = () => {

    return(
        <div style={{ backgroundColor: '#EEEDF0' }}>
            <div style={{ width: '80%', margin: 'auto' }}>
                <NavBar />
                <ProductCard />
                <Footer />
            </div>
        </div>
    )
}

export default ProductDetail