import { Link, useNavigate, NavLink, Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from './AuthContext'

function Header() {
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();

  const allItems = useSelector((store) => (store.cart.items));

  let totalItems;
  if (allItems.length > 0) {
    totalItems = allItems.map(item => item.quantity).reduce((acc, quantity) => acc + quantity);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({isAuthenticated: false, user: null});
    navigate('/');
  }

  return (
    <div className='bg-[#FAF9F6] py-4'>
      <div className='py-2 px-4 flex flex-row bg-[#096B68] fixed top-0 w-full z-10'>

        <div className='py-2 basis-1/3 md:basis-1/4'>
          <NavLink to='/'>
            <h1 className='font-semibold font-[Kaushan_Script]  text-xl md:text-2xl text-[#FFFBDE]'>Shoppy Globe</h1>
          </NavLink>
        </div>

        <div className='basis-2/3 md:basis-3/4 py-2'>
          <ul className='flex justify-around'>

            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FFFBDE] underline font-bold" : "font-semibold text-[#FFFBDE]"}>
                Home
              </NavLink>
            </li>

            <li className='font-semibold text-[#FFFBDE]'>
              {auth.isAuthenticated ? (<span onClick={handleLogout}>Logout</span>) : (<Link to='/login'>Login</Link>)}
            </li>

            <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "text-[#FFFBDE] underline font-bold" : "font-semibold text-[#FFFBDE]"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='px-2 size-8 inline'>
                  {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                  <path fill="#FFFBDE" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                {totalItems ? totalItems : null}
              </NavLink>
            </li>

          </ul>
        </div>

      </div>

      {/* using outlet from react-router to display different components below the header according to the route */}
      <div className='md:pt-8 min-h-lvh'>
        <Outlet />
      </div>

    </div>
  )
}

export default Header