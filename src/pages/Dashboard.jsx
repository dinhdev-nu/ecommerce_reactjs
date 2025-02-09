import { ToastContainer } from "react-toastify";
import ShopManagerDashboard from "../components/Dashboard";


const DashboardPage = () => {
    return (
        <>
            <ShopManagerDashboard />
            < ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
            />
        </>
    );
}

export default DashboardPage;