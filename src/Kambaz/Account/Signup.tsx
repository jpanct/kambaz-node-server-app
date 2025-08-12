// src/Kambaz/Account/Signup.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, addUser } from "./reducer";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.accountReducer);
  
  const signup = () => {
    // Validation
    if (!credentials.username || !credentials.password || !credentials.firstName || 
        !credentials.lastName || !credentials.email) {
      setError("All fields are required");
      return;
    }
    
    // Check if username already exists
    const existingUser = users?.find((user: any) => 
      user.username === credentials.username || user.loginId === credentials.username
    );
    
    if (existingUser) {
      setError("Username already exists");
      return;
    }
    
    // Create new user
    const newUser = {
      _id: new Date().getTime().toString(),
      username: credentials.username,
      password: credentials.password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      role: credentials.role,
      loginId: credentials.username,
      section: "S101",
      lastActivity: new Date().toLocaleDateString(),
      totalActivity: "0:00:00"
    };
    
    // Add to Redux state (this will work now)
    dispatch(addUser(newUser));
    
    // Set as current user (log them in)
    dispatch(setCurrentUser(newUser));
    
    // Navigate to dashboard
    navigate("/Kambaz/Dashboard");
  };
  
  return (
    <div className="wd-signup-screen p-4">
      <h1>Sign up</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <input
        value={credentials.firstName}
        onChange={(e) => setCredentials({ ...credentials, firstName: e.target.value })}
        className="form-control mb-2"
        placeholder="First Name"
        id="wd-firstname"
      />
      <input
        value={credentials.lastName}
        onChange={(e) => setCredentials({ ...credentials, lastName: e.target.value })}
        className="form-control mb-2"
        placeholder="Last Name"
        id="wd-lastname"
      />
      <input
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        className="form-control mb-2"
        placeholder="Email"
        type="email"
        id="wd-email"
      />
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
      <select
        value={credentials.role}
        onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
        className="form-control mb-2"
        id="wd-role"
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button 
        onClick={signup} 
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
        type="button"
      >
        Sign up
      </button>
      <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
        Already have an account? Sign in
      </Link>
    </div>
  );
}