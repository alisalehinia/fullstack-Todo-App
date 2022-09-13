import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <div className='flex justify-center p-4 m-2 flex-col'>
            <Header />
            {children}
            <Footer />
        </div >
    );
}

export default Layout;