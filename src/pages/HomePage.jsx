import CategoryButtons from "../components/Category/index"
import HeroSection from "../components/HeroSelection/index"
import ProductList from "../components/ProductsList"
import NavBar from "../components/Navbar"
import Footer from '../components/Footer'
import styles from '../styles/HomePage.module.scss'

const HomePage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                < NavBar />  
                < HeroSection />
                < CategoryButtons />
                < ProductList />
                < Footer />
            </div>
        </div>
    )

}

export default HomePage