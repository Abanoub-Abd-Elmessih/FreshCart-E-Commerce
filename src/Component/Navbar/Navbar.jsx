import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthenticationContext";
import { EmailContext } from "../../Contexts/EmailContext";
import { CartContext } from "../../Contexts/CartContext";

export default function Navbar() {
  const {setTheEmail} =useContext(EmailContext);
  const {cartItems}=useContext(CartContext)
  const {token , setToken} =useContext(AuthContext)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-10 transition-all duration-500 border-gray-200 shadow-sm bg-gray-50 md:px-7 lg:px-0">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-5 mx-auto">
        <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <FaCartShopping className="text-3xl text-green-600" />
          <span className="self-center text-2xl font-bold whitespace-nowrap">Fresh Cart</span>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden w-full lg:flex lg:items-center lg:w-auto lg:flex-grow" id="navbar-default">
        {token ? 
        <ul className="flex flex-col items-center w-full p-4 mt-4 font-light border border-gray-100 rounded-lg lg:flex-row lg:p-0 bg-gray-50 lg:mt-0 lg:border-0 lg:space-x-8 rtl:space-x-reverse lg:justify-between">
          <div className="flex flex-col items-center mx-auto lg:flex-row lg:space-x-8 rtl:space-x-reverse">

            <li>
              <NavLink to={'/'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Home</NavLink>
            </li>
            <li>
              <NavLink to={'cart'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Cart</NavLink>
            </li>
            <li>
              <NavLink to={'wishList'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Wish List</NavLink>
            </li>
            <li>
              <NavLink to={'Products'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Products</NavLink>
            </li>
            <li>
              <NavLink to={'/Categories'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Categories</NavLink>
            </li>
            <li>
              <NavLink to={'/Brands'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Brands</NavLink>
            </li>
          </div>
          <li className="flex items-center mt-4 lg:mt-0">
            <span className="relative mx-3 w-fit">
              <NavLink to={'cart'}>
            <FaCartShopping className="text-4xl transition-all duration-300 cursor-pointer text-zinc-600 hover:text-black"/>
              </NavLink>
            <span className="bg-green-600 rounded-lg font-semibold text-sm px-1.5 py-0.5 text-white absolute -top-2 -right-1">{cartItems}</span>
            </span>
            <Link to={'/Login'} onClick={()=>{setToken('') ,setTheEmail('') }} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">log out</Link>
          </li>
        </ul> : 
        <ul className="flex flex-col items-center justify-end w-full p-4 mt-4 font-medium border border-gray-100 rounded-lg lg:flex-row lg:p-0 bg-gray-50 lg:mt-0 lg:border-0 lg:space-x-8 rtl:space-x-reverse">
          <li>
          <NavLink to={'/Login'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Sign In</NavLink>
          </li>
          <li>
          <NavLink to={'/Register'} className="block px-3 py-2 text-gray-900 transition-all duration-300 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0">Register</NavLink>
          </li>
        </ul>}
        </div>
      </div>
    </nav>
  )
}