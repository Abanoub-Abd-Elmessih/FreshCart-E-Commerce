import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./Contexts/AuthenticationContext";
import ForgetPassword from "./Component/forgetPassword/forgetPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./Component/products/products";
import Layout from "./Component/Layout/Layout";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Brands from "./Component/Brands/Brands";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import WishList from "./Component/wishList/wishList";
import VerifyCode from "./Component/verifyCode/verifyCode";
import EmailContextProvider from "./Contexts/EmailContext";
import ProtectedEmailRoute from "./Component/ProtectedEmailRoute/ProtectedEmailRoute";
import ResetAccount from "./Component/ResetAccount/ResetAccount";
import Categories from "./Component/Categories/Categories";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import CartContextProvider from "./Contexts/CartContext";
import { ToastContainer } from "react-toastify";
import WishListContextProvider from "./Contexts/WishListContext";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress";
import Orders from "./Component/orders/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShippingAddress />
            </ProtectedRoute>
          ),
        },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        {
          path: "VerifyCode",
          element: (
            <ProtectedEmailRoute>
              <VerifyCode />
            </ProtectedEmailRoute>
          ),
        },
        {
          path: "ResetAccount",
          element: (
            <ProtectedEmailRoute>
              <ResetAccount />
            </ProtectedEmailRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedEmailRoute>
              <Orders />
            </ProtectedEmailRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const myClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20 * 1000,
        refetchIntervalInBackground: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <EmailContextProvider>
                <RouterProvider router={router}></RouterProvider>
                <ToastContainer />
              </EmailContextProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
