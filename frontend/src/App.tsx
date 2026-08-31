import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);

  useEffect(() => {
  if (!accessToken) {
    return;
  }

  const fetchUser = async () => {
    const response = await fetch("http://localhost:8000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  fetchUser();
}, [accessToken]);
  return (
    <div>
      {showLogin ? (
        <Login onLogin={setAccessToken} />
      ) : (
        <Register />
      )}

      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin
          ? "Need an account? Register"
          : "Already have an account? Log in"}
      </button>
      {user && (
  <p>
    Logged in as: {user.email}
  </p>
)}
    </div>
  );
}

export default App;