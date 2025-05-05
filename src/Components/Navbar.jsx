import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();
  const email = Cookies.get("email");
  const name = Cookies.get("name");

  const handleDashboardClick = () => {
    navigate("/");
  };

  const handleSignOut = () => {
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("name");
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
    backgroundColor: "#1E293B", // Dark slate for inactive
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
        justifyContent: "space-between",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 10,
      }}
    >
      <div>
        <div
          style={{
            height: "48px",
            backgroundColor: "#1FA952",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.375rem",
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Menu
        </div>
        <ul>
          <li>
            <button
              style={navButtonStyle}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = "#334155")
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = "#1E293B")
              }
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              style={navButtonStyle}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = "#334155")
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = "#1E293B")
              }
              onClick={() => navigate("/transactions")}
            >
              Transactions
            </button>
          </li>
          <li>
            <button
              style={navButtonStyle}
              onMouseOver={e =>
                (e.currentTarget.style.backgroundColor = "#334155")
              }
              onMouseOut={e =>
                (e.currentTarget.style.backgroundColor = "#1E293B")
              }
              onClick={() => navigate("/income-and-expense")}
            >
              Income and Expense
            </button>
          </li>
        </ul>
      </div>
      <div>
        <button
          style={{ ...navButtonStyle, backgroundColor: "#EF4444" }}
          onMouseOver={e =>
            (e.currentTarget.style.backgroundColor = "#dc2626")
          }
          onMouseOut={e =>
            (e.currentTarget.style.backgroundColor = "#EF4444")
          }
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
