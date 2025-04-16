import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-5 right-5">
      <ul className="flex space-x-6">
        <li>
        <Link to="/" className="text-black hover:text-black-500">Home</Link>

        </li>
        <li>
          <Link to="/login" className="text-black hover:text-black-500">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="text-black hover:text-black-500">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
