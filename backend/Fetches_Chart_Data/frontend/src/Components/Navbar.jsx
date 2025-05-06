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
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("name");
    window.location.href = "/";
  };

  const navButtonStyle = {
    display: "block",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    padding: "0.75rem",
    backgroundColor: "#5BEA90",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        width: "256px",
        height: "100vh",
        backgroundColor: "#2AEB71",
        padding: "1rem",
        position: "fixed",
      }}
    >
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <div
        style={{
          width: "100%",
          height: "48px",
          backgroundColor: "#1FA952",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.125rem",
        }}
      >
        Menu
      </div>

      <ul style={{ marginTop: "2.5rem" }}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                color: "white",
                fontWeight: "600",
                padding: "0.75rem",
                // backgroundColor: "#5BEA90",
                backgroundColor: item.link === pathname ? "#000000" : "#5BEA90",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate(item.link)}
            >
              {item.title}
            </button>
          </li>
        ))}
        <li>
          <button style={navButtonStyle} onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
{
  /* <ul style={{ marginTop: "2.5rem" }}>
  <li>
    <button style={navButtonStyle} onClick={handleDashboardClick}>
      Dashboard
    </button>
  </li>
  <li>
    <button style={navButtonStyle} onClick={() => navigate("/transactions")}>
      Transactions
    </button>
  </li>
  <li>
    <button
      style={navButtonStyle}
      onClick={() => navigate("/income-and-expense")}
    >
      Income and Expense
    </button>
  </li>
  <li>
    <button style={navButtonStyle} onClick={handleSignOut}>
      Sign Out
    </button>
  </li>
</ul>; */
}
