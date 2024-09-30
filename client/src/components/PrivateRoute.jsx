import { useContext } from "react";
import AuthContext from "../context/AuthContext"


export default function PrivateRoute({ children }) {
    // consume the context
    const { isLoggedIn } = useContext(AuthContext);
  
    // if the user is logged in, render the children
    // otherwise, redirect to the login page
  
    return isLoggedIn ? children : <Navigate to="/login" />;
}