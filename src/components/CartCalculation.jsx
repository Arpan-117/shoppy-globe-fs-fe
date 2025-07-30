import { useSelector } from 'react-redux'

function CartCalculation() {

    const cartItems = useSelector((store) => (store.cart.items));

    const totalPrice = parseFloat((cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2));
    const totalTax = parseFloat((totalPrice * (12 / 100)).toFixed(2));
    const totalCost = parseFloat((totalPrice + totalTax).toFixed(2));
    let totalItems;
    if (cartItems.length > 0) {
        totalItems = cartItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity);
    }

    return (
        <div>

            <h4 className='text-center font-semibold text-xl text-[#129990]'>PRICE DETAILS</h4>
            <br />

            <div className='flex flex-row px-4'>

                <div className='basis-1/2'>
                    <p className='py-2'>Price({totalItems} items):</p>
                    <p className='py-2'>Tax(12%):</p>
                    <hr />
                    <p className='py-2 font-semibold text-lg'>Total Amount</p>
                </div>

                <div className='basis-1/2 text-right'>
                    <p className='py-2'>${totalPrice}</p>
                    <p className='py-2'>${totalTax}</p>
                    <hr />
                    <p className='py-2 font-semibold text-lg'>${totalCost}</p>
                </div>

            </div>

        </div>
    )
}

export default CartCalculation