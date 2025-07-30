import { Link } from 'react-router'

function NotFound() {

  return (
    <div className='px-16 py-16'>
      <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExemg5cnVuazV5cnkwNWhvNWtmeWlhMG9kZjRxamkyaGttaGs2eHljaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UoeaPqYrimha6rdTFV/giphy.gif' alt='404-error' className='mx-auto' />
      <div className='p-4 text-center'>
      <p className='font-semibold'>The page you are looking for doesn't exist.</p>
      <Link to='/'>
        <p className='text-[#129990]'>Click here to go back to homepage {'>>'} </p>
      </Link>
      </div>

    </div>
  )
}

export default NotFound