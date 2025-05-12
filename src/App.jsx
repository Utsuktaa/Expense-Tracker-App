import { BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import AdminRoutes from "./Routes/AdminRoutes";

function App() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  return (
    <BrowserRouter>
      {token ? (
        role === "admin" ? (
          <AdminRoutes />
        ) : (
          <ProtectedRoutes />
        )
      ) : (
        <PublicRoutes />
      )}
    </BrowserRouter>
  );
}

export default App;
