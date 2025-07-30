import React, { useEffect, useState } from 'react'
import useProducts from '../utils/useProducts'
import ProductItem from './ProductItem'
import { MoonLoader } from 'react-spinners'

function ProductList() {
  //State variables for fetched products, filtered products from search and search value input
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  //Destructing the value returned from custom hook to fetch data
  const { data, loading, error } = useProducts();

  //using this hook to populate state variables on fetching data and re-rendering if there is any change in fetched data
  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
      setFilteredProducts(data.products);
    }
  }, [data]);

  //function to update filterd products for user search query
  const handleSearch = () => {
    const items = products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue.toLowerCase()) || product.brand?.toLowerCase().includes(searchValue.toLowerCase())
    });
    setFilteredProducts(items);
  }

  //function to clear search input field and update filtered products to contain all the products
  const handleClear = () => {
    setSearchValue('');
    setFilteredProducts(products);
  }

  //loading spinner when products are still being fetched
  if (loading) return (
    <div className='text-center'>
      <div className='mx-auto text-justify inline-block'>
        <MoonLoader
          color='#129990'
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>
    </div>
  );

  //display the error if there is error in fetching products
  if (error) return (
    <div className='px-8 lg:px-16 py-16 lg:py-8'>
      <p className='py-4 text-lg text-center'>Error: {error}</p>
    </div>
  );

  return (
    <div>
      <h2 className='text-center text-2xl md:text-3xl text-[#096B68] font-semibold py-4'>Choose from a wide variety of products...</h2>

      <div className='text-center py-4'>
        <input type="text"
          name="search"
          value={searchValue}
          placeholder="Search by product name or brand..."
          className='border border-[#096B68] rounded-md w-full md:w-80 md:py-2'
          onChange={(e) => setSearchValue(e.target.value)} />
          <div className='block py-4 md:py-0 md:inline'>
        <span className='px-4'>
          <button onClick={handleSearch} className='border-2 border-[#096B68] bg-[#096B68] text-[#FAF9F6] md:font-semibold rounded-md px-4 py-1 md:py-2 shadow-xl/30 hover:scale-105'>Find</button>
        </span>
        <span className=''>
          <button onClick={handleClear} className='border-2 border-[#096B68] text-[#096B68] md:font-semibold rounded-md px-4 py-1 md:py-2 shadow-xl/30 hover:scale-105'>Clear</button>
        </span>
        </div>
      </div>

      <div className='py-4'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.map(product => (
            <li key={product._id} className='rounded-md shadow-xl/20 bg-white hover:scale-105'>

              <ProductItem item={product} />
              {/* <strong>{product.title}</strong>: ${product.price}
              <br />
              <button onClick={() => handleViewDetails(product.id)}>View Details</button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProductList