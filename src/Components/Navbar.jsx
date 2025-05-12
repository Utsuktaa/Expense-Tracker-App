import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const menuItems = [
  { id: 1, title: "Dashboard", link: "/" },
  { id: 2, title: "Transaction", link: "/transactions" },
  { id: 3, title: "Income and Expense", link: "/income-and-expense" },
];

function Navbar() {
  const navigate = useNavigate();
  const email = Cookies.get("email");
  const name = Cookies.get("name");
  const { pathname } = useLocation();
  const handleDashboardClick = () => {
    // setShowPage(false);
    navigate("/");
  };

  const handleSignOut = () => {
    // setShowPage(true);
    // Cookies.remove("email");
    // Cookies.remove("token");
    // Cookies.remove("name");
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.href = "/";
  };

  const navButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "48px",
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    backgroundColor: menuItems.link === pathname ? "#000000" : "#5BEA90", // Dark slate for inactive
    borderRadius: "0.375rem",
    marginBottom: "1rem",
    border: "1px solid #334155",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };
  const signUpButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "48px",
    textAlign: "left",
    color: "#ffffff",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    backgroundColor: "#EF4444",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
    border: "1px solid #334155",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const navButtonHoverStyle = {
    backgroundColor: "#334155",
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#0f172a", // darker slate
        padding: "20px",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontWeight: "600",
        }}
      >
        <p>{name}</p>
        <p>{email}</p>
      </div>

      <ul style={{ marginTop: "6rem" }}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`block w-full text-white font-semibold py-3 rounded-lg mb-4 border-none cursor-pointer ${
                item.link === pathname
                  ? "bg-[#5c6b99]"
                  : "bg-[#565C6C] hover:bg-[#3b4f7a]"
              }`}
              onClick={() => navigate(item.link)}
              // onMouseOver={(e) =>
              //   (e.currentTarget.style.backgroundColor = "#464B5A")
              // }
              // onMouseOut={(e) =>
              //   (e.currentTarget.style.backgroundColor = "#344876")
              // }
            >
              {item.title}
            </button>
          </li>
        ))}
        <li>
          <button style={signUpButtonStyle} onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
