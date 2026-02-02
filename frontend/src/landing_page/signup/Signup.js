import React, { useState } from "react";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3002/api/auth/login"
      : "http://localhost:3002/api/auth/signup";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : formData
        ),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ redirect to DASHBOARD APP (CHANGE PORT IF NEEDED)
        window.location.href = "http://localhost:3000";
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h2 className="text-center mb-4">
        {isLogin ? "Login" : "Signup"}
      </h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="text-center mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          style={{ color: "#0d6efd", cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Signup;