import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Contexts/CartContext"
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
const {getLoggedUserCart , updateCartItemCount , deleteProductItem , clearCart , setCartItems}= useContext(CartContext);
const [cartDetails, setCartDetails] = useState(null);
async function getCartItems(){
  const response = await getLoggedUserCart()
  setCartDetails(response?.data?.data);
  
}
async function updateCount(productId , count){
  const response = await updateCartItemCount(productId , count)
  console.log(response?.data?.data);
  setCartDetails(response?.data?.data);
  setCartItems(response.data.numOfCartItems || 0)
}
async function deleteProduct(productId){
  const response = await deleteProductItem(productId)
  setCartDetails(response?.data?.data);
  setCartItems(response.data.numOfCartItems || 0)
  
  toast.success('Removed successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });
}
async function clearAllCart(){
  const response = await clearCart()
  console.log(response?.data?.data);
  setCartDetails(response?.data?.data);
  setCartItems(response.data.numOfCartItems || 0)
  toast.success('Cleared successfully', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });
}
useEffect(()=>{
  getCartItems()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div className="container px-14 py-28">
        <Helmet>
  <title>
    Cart
  </title>
</Helmet>
        <h2 className="py-5 text-3xl font-semibold text-center text-green-600">Shopping Cart</h2>
        <h3 className="pb-5 font-mono text-center text-green-400">Total Cart Price : {cartDetails?.totalCartPrice} EGP</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map((product)=>
            <tr key={product.product.id} className="duration-300 bg-white border-b hover:bg-gray-50 ">
              <td className="p-4">
                <img src={product.product.imageCover} className="w-16 max-w-full max-h-full md:w-32" alt={product.product.title} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 ">
                {product.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={()=> updateCount(product.product.id , product.count-1)} className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 duration-300 bg-white border border-gray-300 rounded-full me-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                      <span>{product.count}</span>
                  </div>
                  <button onClick={()=> updateCount(product.product.id , product.count+1)} className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full ms-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 ">
                {product.price} EGP
              </td>
              <td className="px-6 py-4">
                <button onClick={()=> deleteProduct(product.product.id)} className="text-red-600 hover:underline" >Remove</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
        <button 
  onClick={()=>clearAllCart()} 
  className={`text-red-600 py-5 text-center w-full hover:underline disabled:text-gray-700 disabled:no-underline`} 
  disabled={cartDetails?.products.length== 0 || cartDetails == null}>
Clear all
</button>
      </div>
        <Link to={'/shippingAddress/' + cartDetails?.cartOwner} 
  className={`rounded-lg my-5 text-white block text-2xl font-semibold py-5 text-center w-full hover:underline bg-green-400 disabled:text-gray-700 disabled:no-underline`} 
  disabled={cartDetails?.products.length== 0 || cartDetails == null}>
  CheckOut Now 
</Link>
    </div>
  )
}
