import ProductList from '../components/ProductList'
import ScrollToTop from '../components/ScrollToTop'

function Homepage() {
    return (
        <>
            {/* Component that helps to display the page from the top */}
            <ScrollToTop />

            {/* Hero Section */}
            <div>
                <div className="bg-[url('src/assets/banner-mobile.png')] md:bg-[url('src/assets/banner-tablet.png')] lg:bg-[url('src/assets/banner.png')] bg-cover md:bg-cover h-[250px] md:h-[250px] lg:h-[500px] md:w-full"></div>
            </div>

            {/* Products Section */}
            <div className='px-16 pt-16'>
                <ProductList />
            </div>
        </>
    )
}

export default Homepage