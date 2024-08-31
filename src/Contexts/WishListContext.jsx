import axios from "axios";
import { createContext } from "react";

export const WishContext =createContext()
export default function WishListContextProvider(props){
    let headers = {token : localStorage.getItem('token')};
    function getLoggedUserWishList(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    function addProductToWishList(productId){
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
            productId
        },{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    function deleteWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((response)=> response)
        .catch((err)=> err)
    }
    return <WishContext.Provider value={{getLoggedUserWishList , addProductToWishList , deleteWishListItem}}>
        {props.children}
    </WishContext.Provider>
}