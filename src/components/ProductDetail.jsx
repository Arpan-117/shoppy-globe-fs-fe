import React, { useEffect, useState } from 'react'
import useProducts from '../utils/useProducts'
import { useParams, useNavigate, Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice'
import { MoonLoader } from 'react-spinners'
import ScrollToTop from './ScrollToTop'
import { addToCart } from '../utils/handleCart'

function ProductDetail() {
  const [product, setProduct] = useState(null);

  // Accessing the params from react-router to keep track of product id from custom route param
  const productId = useParams();
  // console.log(productId);

  // Destruction the result from the custom hook to fetch product details by passing product id
  const { data, loading, error } = useProducts(productId.productId);
  // using dispatch from react-redux to dispatch actions to the reducer
  const dispatch = useDispatch();

  // re-rendering the component to display the details when data has been fetched
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const handleAddToCart = (item) => {
    // dispatch(addItem(item));
    // const userId = localStorage.getItem("id");
    // console.log(item);
    // const token = localStorage.getItem("token");
    // let response = fetch('http://localhost:5000/api/cart', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `JWT ${token}`,
    //             },
    //             body: JSON.stringify({
    //                 productId: productId.productId,
    //                 quantity: 1
    //             })
    //         })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Could not add to cart");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data);
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.error(`Login Error: ${err}`);
    //         })
    addToCart(productId.productId);
  }

  // console.log(product);

  // loading spinner when product details are being fetched
  if (loading) return (
    <div className='px-8 lg:px-16 py-16 text-center'>
      <div className='mx-auto text-justify inline-block'>
        <MoonLoader
          color='#129990'
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>
    </div>
  );
  // display error details if product details cannot be fetched
  if (error) return (
    <div className='px-8 lg:px-16 py-16 lg:py-8'>
      <p className='py-4 text-lg text-center'>Error: {error}</p>
    </div>
  );

  return (
    <div className='px-8 lg:px-16 py-16'>
    <ScrollToTop />

      <div className='md:px-4 md:py-4'>
        <Link to='/'>
          <button className='border border-[#129990] text-[#129990] rounded-full hover:scale-105'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='px-2 size-8 inline'>
            {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
            <path fill="#129990" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
          </button>
        </Link>

        <div className='md:flex md:py-16 gap-8'>

          <div className='py-4 md:py-0 md:basis-1/3'>
            <img src={product.thumbnail} alt='image' />
            <div className='mx-auto'>
              <button onClick={() => handleAddToCart(product)} className='w-full md:w-80 py-2 bg-[#129990] font-semibold text-[#FAF9F6] shadow-xl/20 hover:scale-105'>Add to Cart</button>
            </div>
          </div>

          <div className='py-4 md:py-0 md:basis-2/3'>
            <h3 className='font-bold text-3xl text-[#096B68] underline'>{product.title}</h3>
            { product.rating != null && <p className='text-sm'>Rating - { parseFloat(product.rating.$numberDecimal).toFixed(2)}⭐</p> }
            {/* <p className='text-sm'>Rating - { parseFloat(product.rating.$numberDecimal).toFixed(2)}⭐</p> */}
            {/* <p className='text-sm'>Rating - {parseFloat(product.price.$numberDecimal).toFixed(2)}⭐</p> */}
            <br />
            <div className='pt-2'>
            { product.price != null && <p className='font-bold text-2xl md:py-4'>$ {parseFloat(product.price.$numberDecimal).toFixed(2)}</p> }
              {/* <p className='font-bold text-2xl md:py-4'>$ {parseFloat(product.price.$numberDecimal).toFixed(2)}</p> */}
              <h4 className='font-semibold text-2xl text-[#129990]'>Product Description</h4>
              <p className='py-2'>{product.description}</p>
            </div>
            <div className='pt-2'>

              {/* Check if brand exists */}
              { product.brand && <p className='py-4 text-xl'><span className='text-[#129990] font-semibold text-2xl'>Brand:</span> {product.brand}</p> }

              {/* <h4 className='font-semibold text-2xl text-[#129990]'>Product Dimensions</h4> */}

              {/* Check if dimensions for product has been fetched */}
              { product.dimensions != null && <p className='pt-2'><span className='font-semibold text-lg'>Width:</span> {product.dimensions.width}</p> }
              { product.dimensions != null && <p className=''><span className='font-semibold text-lg'>Height:</span> {product.dimensions.height}</p> }
              { product.dimensions != null && <p className='pb-2'><span className='font-semibold text-lg'>Depth:</span> {product.dimensions.depth}</p> }
            </div>
            <div className='pt-2'>
              <p className='pt-2'><span className='font-semibold text-lg'>Warranty Info:</span> {product.warrantyInformation}</p>
              <p className=''><span className='font-semibold text-lg'>Shipping Info:</span> {product.shippingInformation}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail