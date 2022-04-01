import { useState } from "react";
import axios from "axios";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/users/signup", {
      email,
      password,
    });

    console.log(response.data);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default signup;
