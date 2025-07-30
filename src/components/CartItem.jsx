import { useDispatch } from 'react-redux'
import { increaseQuantity } from '../utils/handleCart';
import { useEffect, useState } from 'react';
// import { increaseQuantity, decreaseQuantity, removeItem } from '../utils/cartSlice'
{/* <p>Title: {item.productId.title}</p> */}

function CartItem(props) {
  const [trackQuantity, setTrackQuantity] = useState(props.product.quantity);

  // accessing dispatch from react-redux to dispatch actions for operations on cart slice
  const dispatch = useDispatch();

  const handleIncrease = async (id) => {
    try {
      const token = localStorage.getItem("token");
      let response = fetch(`http://localhost:5000/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify({
          quantity: 1
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not add more");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setTrackQuantity(data.quantity);
          // return data;
        })
        .catch((err) => {
          console.error(`Login Error: ${err}`);
        })
      // const updatedItem = await increaseQuantity(id);
      // console.log(updatedItem);
    } catch (err) {
      console.error(`Handle Increase Error: ${err}`);
    }
    //   finally {
    //   const token = localStorage.getItem("token");
    //   try {
    //     const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `JWT ${token}`,
    //         },
    //       });
    //       if (!res.ok) throw new Error('Failed to fetch cart items');
    //       const result = await res.json();
    //       // console.log(result);
    //       if (result) {
    //         console.log(result);
    //         if (result.cartItem) {
    //           console.log(result.cartItem);
    //           if (result.cartItem.quantity) {
    //             console.log(result.cartItem.quantity);
    //             // setTrackQuantity(result.cartItem.quantity);
    //           }
    //         }
    //       }
    //       // result.CartItem.quantity != null ? console.log(result.CartItem.quantity) : console.log(result.CartItem);
    //       // console.log(result.CartItem?.quantity);
    //   } catch(err) {
    //     console.error(err);
    //   }
    // }
  }

  const handleDecrease = async (id) => {
    try {
      if (trackQuantity > 1) {
        const token = localStorage.getItem("token");
        let response = fetch(`http://localhost:5000/api/cart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            quantity: -1
          })
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Could not add more");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setTrackQuantity(data.quantity);
            // return data;
          })
          .catch((err) => {
            console.error(`Login Error: ${err}`);
          })
        // const updatedItem = await increaseQuantity(id);
        // console.log(updatedItem);
      }
      else {
        return alert('Cannot place order for 0 items! Please remove from cart.');
      }
    } catch (err) {
      console.error(`Handle Increase Error: ${err}`);
    }
  }

  const handleRemove = async (id) => {
    try {
        const token = localStorage.getItem("token");
        let response = fetch(`http://localhost:5000/api/cart/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Could not remove from cart");
            }
            response.json();
          })
          .then((data) => {
            props.onToggle(!props.toggler);
          })
          .catch((err) => {
            console.error(`Login Error: ${err}`);
          })
        // const updatedItem = await increaseQuantity(id);
        // console.log(updatedItem);
    } catch (err) {
      console.error(`Handle Increase Error: ${err}`);
    }
  }

  // <button onClick={() => dispatch(increaseQuantity(props.product.productId._id))} className='inline py-2 px-4 rounded-r-md border-[#129990] bg-[#129990] font-semibold text-[#FFFBDE]'>+</button>

  return (
    <div className='my-4 rounded-md shadow-xl bg-white'>
      <div className='flex flex-row w-full gap-6'>

        <div className='basis-1/3'>

          <img src={props.product.productId.thumbnail} alt='product-image' />
        </div>

        {/* { console.log(props) }
      { console.log(props.product.quantity) } */}
        <div className='basis-2/3'>

          <div className='py-4'>
            <h3 className='py-2 font-semibold text-xl text-[#129990] underline'>{props.product.productId.title}</h3>
            {/* <p className='md:py-4 font-semibold text-lg'>$ {props.product.price}</p> */}
            <div className='py-2'>
              <button onClick={() => {handleDecrease(props.product._id)}} className='inline py-2 px-4 rounded-l-md  border-[#129990] bg-[#129990] font-semibold text-[#FFFBDE]'>-</button>
              {console.log(props.product.quantity)}
              <p className='inline py-2 px-4 border border-[#129990] font-semibold text-[#129990]'>{trackQuantity}</p>
              <button onClick={() => {handleIncrease(props.product._id)}} className='inline py-2 px-4 rounded-r-md border-[#129990] bg-[#129990] font-semibold text-[#FFFBDE]'>+</button>
            </div>
            <button onClick={() => {handleRemove(props.product._id)}} className='px-4 py-2 rounded-md border-2 border-[#129990] font-semibold text-[#129990] hover:scale-105'>Remove</button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CartItem