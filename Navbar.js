import { useNavigate } from "react-router-dom";

function Navbar({ setShowPage }) {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setShowPage(false);
    navigate("/homepage");
  };

  const handleBackClick = () => {
    setShowPage(true);
    navigate("/");
  };

  const navButtonStyle = {
    display: "block",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    padding: "0.75rem",
    backgroundColor: "#ef4444",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={{ width: "256px", height: "100vh", backgroundColor: "#dc2626", padding: "1rem" }}>
      <div style={{
        width: "100%",
        height: "48px",
        backgroundColor: "#b91c1c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.125rem"
      }}>
        Menu
      </div>

      <ul style={{ marginTop: "2.5rem" }}>
        <li><button style={navButtonStyle} onClick={handleDashboardClick}>Dashboard</button></li>
        <li><button style={navButtonStyle}>User</button></li>
        <li><button style={navButtonStyle}>Settings</button></li>
        <li><button style={navButtonStyle} onClick={handleBackClick}>Back</button></li>
      </ul>
    </div>
  );
}

export default Navbar;
