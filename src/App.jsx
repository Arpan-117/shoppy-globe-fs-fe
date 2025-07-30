import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Header from './components/Header'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
// import Cart from './components/Cart'
// import ProductDetail from './components/ProductDetail'
import NotFound from './pages/NotFound'
// import Checkout from './pages/Checkout'
// import Payment from './pages/Payment'
import { MoonLoader } from 'react-spinners'

//Lazy loading components that are not required as soon as the app launches
const Cart = lazy(() => import('./components/Cart'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));

function App() {

  return (
    // Using react-router to implement routes for pages/components
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Homepage />} />
          <Route path='product-details/:productId' element={<Suspense fallback=
            <div className='px-8 lg:px-16 py-16 text-center'>
              <div className='mx-auto text-justify inline-block'>
                <MoonLoader
                  color='#129990'
                  size={60}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
              </div>
            </div>
          > <ProductDetail /> </Suspense>} />
          <Route path='cart' element={<Suspense fallback=
            <div className='px-8 lg:px-16 py-16 text-center'>
              <div className='mx-auto text-justify inline-block'>
                <MoonLoader
                  color='#129990'
                  size={60}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
              </div>
            </div>
          > <Cart /> </Suspense>} />
          <Route path='checkout' element={<Suspense fallback=
            <div className='px-8 lg:px-16 py-16 text-center'>
              <div className='mx-auto text-justify inline-block'>
                <MoonLoader
                  color='#129990'
                  size={60}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
              </div>
            </div>
          > <Checkout /> </Suspense>} />
          <Route path='payment' element={<Suspense fallback=
            <div className='px-8 lg:px-16 py-16 text-center'>
              <div className='mx-auto text-justify inline-block'>
                <MoonLoader
                  color='#129990'
                  size={60}
                  aria-label="Loading Spinner"
                  data-testid="loader" />
              </div>
            </div>
          > <Payment /> </Suspense>} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
