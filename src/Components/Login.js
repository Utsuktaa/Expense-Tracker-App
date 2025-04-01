import { useState } from "react";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User Logged In!\nEmail: ${email}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-green-500 text-white py-2 rounded">Login</button>
          <button type="button" className="text-red-500 mt-2" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
