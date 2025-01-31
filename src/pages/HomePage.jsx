import PromotionalBanners from "../components/Banner";
import Categories from "../components/Category";
import HeroSelection from "../components/HeroSelection";
import ListProduct from "../components/ProductsList";


const HomePage = () => {

    return (
        <div>
            <HeroSelection />
            <Categories />
            <ListProduct />
            <PromotionalBanners />
        </div>
    );
}

export default HomePage;