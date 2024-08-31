import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useProducts() {
    const response = useQuery({
        queryKey:['products'],
        queryFn:()=> axios.get('https://ecommerce.routemisr.com/api/v1/products'),
        select:(data)=> data.data.data,
        })
  return response
}
