import { Link } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../utils/cartSlice'
import CartItem from './CartItem'
import CartCalculation from './CartCalculation'
import ScrollToTop from './ScrollToTop'
import { useState, useEffect } from 'react'
import { MoonLoader } from 'react-spinners'

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleRerender, setToggleRerender] = useState(false);

  // const triggeredByQuantityChange = useRef(false);
  console.log(toggleRerender);

  const dispatch = useDispatch();
  //accessing all items saved in cart in redux store
  const cartItems = useSelector((store) => (store.cart.items));

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/cart', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
        if (!res.ok) {
          if (res.status == 403) throw new Error('Session expired! Please login again.');
          else throw new Error('Failed to fetch cart items')
        };
        // else throw new Error('Internal error');

        const result = await res.json();
        setData(result);
        setError(null);
        // console.log(data);
        // console.log(data.cartItems[0].productId);
        // console.log(data.cartItems.length);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [loading, toggleRerender]);

  const handleClear = async () => {
    try {
      // const token = localStorage.getItem("token");
      let response = await fetch(`http://localhost:5000/api/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // fetchProducts();
        setLoading(true);
      } else {
        console.log(`Delete failed: ${data.message}`);
      }
      // const updatedItem = await increaseQuantity(id);
      // console.log(updatedItem);
    } catch (err) {
      console.error(`Clear Cart Error: ${err}`);
    }
  }

  // const handleQuantityChange = (updatedItem) => {
  // setData(prevItems =>
  //   prevItems.cartItems.map(item =>
  //     item._id === updatedItem._id ? updatedItem : item
  //   )
  // );
  //   setLoading(true);
  // };


  // loading spinner when product details are being fetched
  if (loading) return (
    <div className='px-8 lg:px-16 py-16 text-center'>
    <ScrollToTop />
      <div className='mx-auto text-justify inline-block'>
        <MoonLoader
          color='#129990'
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>
    </div>
  );

  if (error) {
    if (error && !data) {
      return (
        <div className='px-8 lg:px-16 py-16 lg:py-8'>
        <ScrollToTop />
          <p className='py-4 text-lg text-center'>Error1: {error}</p>
        </div>
      );
    } else {
      return (
        <div className='px-8 lg:px-16 py-16 lg:py-8'>
        <ScrollToTop />
          <p className='py-4 text-lg text-center'>Error: {error}</p>
        </div>
      );
    }
  }

  // if (error) return (
  //     <div className='px-8 lg:px-16 py-16 lg:py-8'>
  //       <p className='py-4 text-lg text-center'>Error: {error}</p>
  //     </div>
  //   );
  // display error details if product details cannot be fetched
  // if (error && !data) {
  //   return (
  //     <div className='px-8 lg:px-16 py-16 lg:py-8'>
  //       <p className='py-4 text-lg text-center'>Error1: {error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className='px-8 lg:px-16 py-16 lg:py-8'>
      <ScrollToTop />

      {/* ternary operator to conditionally render if cart is empty */}
      {data.cartItems.length > 0 ?
        <div className='md:px-4 lg:py-4'>
          <h3 className='text-center text-2xl md:text-3xl text-[#096B68] font-semibold py-4'>Your Cart</h3>

          <div className='md:flex md:pt-16 md:pb-8 gap-4'>
            <div className='md:basis-2/3'>
              <ul>
                {/* iterating over all the items and passing each of them as props to child component */}
                {data.cartItems.map((item) => (
                  <CartItem key={item._id} product={item} toggler={toggleRerender} onToggle={setToggleRerender} />
                )
                )}
              </ul>
            </div>

            <div className='py-4 md:py-0 md:basis-1/3'>
              {/* child component that calculates the value of cart items */}
              <CartCalculation toggler={toggleRerender} />

              <div className='text-center py-2'>
                <Link to='/checkout'>
                  <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105'>Proceed to Checkout</button>
                </Link>
              </div>

            </div>

          </div>

          {/* {console.log(totalPrice)} */}
          <button onClick={handleClear} className='px-4 py-2 rounded-md border-2 border-[#129990] font-semibold text-[#129990] shadow-xl hover:scale-105'>Clear Cart</button>
        </div>
        :
        <div className='px-4 py-4'>
          <h3 className='text-center text-2xl md:text-3xl text-[#096B68] font-semibold md:py-4'>Your Cart</h3>

          <div className='py-4'>
            <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2NtNWRnZHBxemQ0YW9lNW9uOXlyYXExbTV4aWd6b3JhODFlaGFzNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ez1QgBv3LAzwcYiGDK/giphy.gif' alt='error-image' className='mx-auto w-70' />
          </div>
          <div className='text-center'>
            <p className='py-4 text-lg text-center'>Looks like you've forgotten to add items to your cart.</p>
            <Link to='/'>
              <button className='px-4 py-2 rounded-md bg-[#129990] font-semibold text-[#FFFBDE] shadow-xl/30 hover:scale-105'>Back to Homepage</button>
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart