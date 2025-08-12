// src/Kambaz/Account/Signin.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.accountReducer);
  
  const signin = () => {
    if (!credentials.username || !credentials.password) {
      setError("Please enter username and password");
      return;
    }
    
    // First check Redux state
    let user = users?.find((u: any) => 
      (u.username === credentials.username || u.loginId === credentials.username) && 
      u.password === credentials.password
    );
    
    // If not in Redux, check database directly
    if (!user) {
      user = db.users.find((u: any) => 
        (u.username === credentials.username || u.loginId === credentials.username) && 
        u.password === credentials.password
      );
    }
    
    if (user) {
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  
  return (
    <div className="wd-signin-screen p-4">
      <h1>Sign in</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <input
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="Username"
        id="wd-username"
      />
      <input
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="Password"
        type="password"
        id="wd-password"
      />
      <button 
        onClick={signin} 
        className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </button>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}