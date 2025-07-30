import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice'
import { addToCart } from '../utils/handleCart';

function ProductItem(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigate to custom route that uses product id
  const handleViewDetails = (productId) => {
    navigate(`product-details/${productId}`);
  }

  // function to dispatch action to reducer
  const handleAddToCart = (item) => {
      // dispatch(addItem(item));
      addToCart(item._id);
    }

  return (
    <div className='md:py-4'>

      <div className='flex flex-row'>
        <div className='basis-1/3'>
          <img src={props.item.thumbnail} alt='product-image' />
        </div>
        <div className='basis-2/3'>
          <p className='text-[#129990]'><strong>{props.item.title}</strong></p> 
          <p className='text-[#129990]'><span className='font-semibold'>Price: $</span>{parseFloat(props.item.price.$numberDecimal).toFixed(2)}</p>
          <br className='hidden lg:block' />
          <div className='px-px py-px lg:inline'>
          <button onClick={() => handleViewDetails(props.item._id)} className='border-2 border-[#129990] text-[#129990] px-2 py-2 rounded-md md:font-semibold hover:scale-105'>View Details</button>
          </div>
          <div className='px-2 py-2 lg:inline'>
          <button onClick={() => handleAddToCart(props.item)} className='border-2 bg-[#129990] border-[#129990] text-[#FAF9F6] px-2 py-2 rounded-md md:font-semibold hover:scale-105'>Add to Cart</button>
          </div>
        </div>
      </div>
              
    </div>
  )
}

export default ProductItem