import { BrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import PublicRoutes from "./Routes/PublicRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {
  const token = Cookies.get("token");

  return (
    <BrowserRouter>
      {token ? <ProtectedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
