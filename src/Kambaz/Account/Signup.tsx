import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as db from "../Database";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    verifyPassword: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = () => {
    // Validation
    if (!credentials.username || !credentials.password) {
      setError("Username and password are required");
      return;
    }

    if (credentials.password !== credentials.verifyPassword) {
      setError("Passwords don't match");
      return;
    }

    // Check if username already exists
    const existingUser = db.users.find((u: any) => u.username === credentials.username);
    if (existingUser) {
      setError("Username already exists");
      return;
    }

    // Create new user
    const newUser = {
      _id: `user_${Date.now()}`,
      username: credentials.username,
      password: credentials.password,
      firstName: credentials.username,
      lastName: "User",
      email: `${credentials.username}@kambaz.com`,
      dob: "2000-01-01",
      role: credentials.role,
      loginId: `00${Date.now()}`,
      section: "S101",
      lastActivity: new Date().toISOString(),
      totalActivity: "0:00:00"
    };

    // Add to database
    db.users.push(newUser);

    // If student, enroll in first course
    if (newUser.role === "STUDENT" && db.courses.length > 0) {
      db.enrollments.push({
        _id: `enroll_${Date.now()}`,
        user: newUser._id,
        course: db.courses[0]._id
      });
    }

    // Auto login the new user
    dispatch(setCurrentUser(newUser));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="mb-4 text-center">Sign up</h3>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="mb-3">
            <input 
              placeholder="username" 
              className="form-control wd-username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          
          <div className="mb-3">
            <input 
              placeholder="password" 
              type="password" 
              className="form-control wd-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          
          <div className="mb-3">
            <input 
              placeholder="verify password"
              type="password" 
              className="form-control wd-password-verify"
              value={credentials.verifyPassword}
              onChange={(e) => setCredentials({ ...credentials, verifyPassword: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <select 
              className="form-select"
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          
          <div className="d-grid mb-3">
            <button 
              className="btn btn-primary"
              onClick={signup}
            >
              Sign up
            </button>
          </div>
          
          <div className="text-center">
            <Link 
              to="/Kambaz/Account/Signin"
              className="text-decoration-none"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}