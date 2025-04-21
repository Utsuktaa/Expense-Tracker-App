// Importing BrowserRouter to handle routing in the app
import { BrowserRouter } from "react-router-dom";

// Importing js-cookie to manage browser cookies
import Cookies from "js-cookie";

// Importing route components for public and protected routes
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {
  // Retrieving the authentication token from browser cookies
  const token = Cookies.get("token");

  return (
    <BrowserRouter>
      {/* 
        If the token exists, render ProtectedRoutes (authenticated user).
        If the token does not exist, render PublicRoutes (guest user).
      */}
      {token ? <ProtectedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
