import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MoonLoader } from 'react-spinners'

function CartCalculation(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [calculatedTax, setCalculatedTax] = useState(0);
    const [calculatedTotalCost, setCalculatedTotalCost] = useState(0);
    const [calculatedTotalItems, setCalculatedTotalItems] = useState(0);

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
                console.log(result);
                setData(result);
                setError(null);
                console.log(data);
                console.log(data.cartItems[0].productId);
                console.log(data.cartItems.length);

                // item.productId.price
                const allItems = result.cartItems;
                console.log(allItems);
                const totalPrice = parseFloat((allItems.reduce((acc, item) => acc + parseFloat(item.productId.price.$numberDecimal).toFixed(2) * item.quantity, 0)).toFixed(2));
                // console.log(totalPrice);
                const totalTax = parseFloat((totalPrice * (12 / 100)).toFixed(2));
                console.log(totalTax);
                const totalCost = parseFloat((totalPrice + totalTax).toFixed(2));
                setCalculatedPrice(totalPrice);
                setCalculatedTax(totalTax);
                setCalculatedTotalCost(totalCost);
                let totalItems;
                if (data.cartItems.length > 0) {
                    totalItems = allItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity);
                } else {
                    totalItems = 0;
                }
                setCalculatedTotalItems(totalItems);
            } catch (err) {
                setError(err.message);
            } finally {
                // const allItems = await data.cartItems;
                // const totalPrice = parseFloat((await allItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2));
                // const totalTax = parseFloat((totalPrice * (12 / 100)).toFixed(2));
                // const totalCost = parseFloat((totalPrice + totalTax).toFixed(2));
                // setCalculatedPrice(totalPrice);
                // setCalculatedTax(totalTax);
                // setCalculatedTotalCost(totalCost);
                // let totalItems;
                // if (data.cartItems.length > 0) {
                //     totalItems = allItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity);
                // } else {
                //     totalItems = 0;
                // }
                // setCalculatedTotalItems(totalItems);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [loading, props.toggler]);

    // const cartItems = useSelector((store) => (store.cart.items));

    // const totalPrice = parseFloat((cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2));
    // const totalTax = parseFloat((totalPrice * (12 / 100)).toFixed(2));
    // const totalCost = parseFloat((totalPrice + totalTax).toFixed(2));
    // let totalItems;
    // if (cartItems.length > 0) {
    //     totalItems = cartItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity);
    // }

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
    if (error && !data) { return (
      <div className='px-8 lg:px-16 py-16 lg:py-8'>
        <p className='py-4 text-lg text-center'>Error: {error}</p>
      </div>
    );
  } if (error) return (
      <div className='px-8 lg:px-16 py-16 lg:py-8'>
        <p className='py-4 text-lg text-center'>Error: {error}</p>
      </div>
    );

    return (
        <div>

            <h4 className='text-center font-semibold text-xl text-[#129990]'>PRICE DETAILS</h4>
            <br />

            <div className='flex flex-row px-4'>

                <div className='basis-1/2'>
                    <p className='py-2'>Price({calculatedTotalItems} items):</p>
                    <p className='py-2'>Tax(12%):</p>
                    <hr />
                    <p className='py-2 font-semibold text-lg'>Total Amount</p>
                </div>

                <div className='basis-1/2 text-right'>
                    <p className='py-2'>${calculatedPrice}</p>
                    <p className='py-2'>${calculatedTax}</p>
                    <hr />
                    <p className='py-2 font-semibold text-lg'>${calculatedTotalCost}</p>
                </div>

            </div>

        </div>
    )
}

export default CartCalculation