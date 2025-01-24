import CategoryButtons from "../components/Category/index"
import HeroSection from "../components/HeroSelection/index"
import NavBar from "../components/Navbar/index"
import ProductList from "../components/ProductsList"
import styles from '../styles/HomePage.module.scss'

const HomePage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                < NavBar />
                < HeroSection />
                < CategoryButtons />
                < ProductList />
            </div>
        </div>
    )

}

export default HomePage