import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export default function CartContextProvider(props){
    let headers = {token : localStorage.getItem('token')}
    function getLoggedUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart' ,{
            headers
        }).then((response)=> response)
            .catch((err)=> err)
    }

    function addProductToCart(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        },{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    function updateCartItemCount(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count
        },{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    function deleteProductItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    const [cartItems, setCartItems] = useState(0)
    async function getCart(){
        const response = await getLoggedUserCart()
        if(response.data.status== "success"){
            setCartItems(response.data.numOfCartItems)
        }
    }
    useEffect(()=>{
        getCart()
    },[])
    return <CartContext.Provider value={ { cartItems,setCartItems, getLoggedUserCart , addProductToCart , updateCartItemCount , deleteProductItem , clearCart} }>
        {props.children}
    </CartContext.Provider>
}