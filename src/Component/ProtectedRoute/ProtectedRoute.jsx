import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthenticationContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({children}) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to={"/Login"} />;
}
