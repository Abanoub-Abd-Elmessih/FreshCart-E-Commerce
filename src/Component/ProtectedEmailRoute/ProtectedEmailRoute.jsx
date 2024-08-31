import { useContext } from "react";
import { EmailContext } from "../../Contexts/EmailContext";
import { Navigate } from "react-router-dom";

export default function ProtectedEmailRoute({children}) {
  const { theEmail } = useContext(EmailContext);
  return theEmail ? children : <Navigate to={"/forgetPassword"} />;
}
