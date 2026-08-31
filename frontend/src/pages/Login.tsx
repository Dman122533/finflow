import { useState } from "react";

type LoginProps = {
  onLogin: (token: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    setMessage("Login successful!");
    onLogin(data.access_token);
  } else {
    setMessage(data.detail || "Login failed.");
  }
};

  return (
    <div>
      <h1>Log in to Finflow</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">
          Log In
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;