import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const signin = () => {
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password
    );
    
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    
    setError("");
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      signin();
    }
  };
  
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="mb-4 text-center">Sign in</h3>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          <div className="mb-3">
            <input 
              className="form-control"
              placeholder="username"
              id="wd-username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="mb-3">
            <input 
              className="form-control"
              placeholder="password"
              type="password"
              id="wd-password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="d-grid mb-3">
            <button 
              onClick={signin} 
              id="wd-signin-btn" 
              className="btn btn-primary"
            > 
              Sign in 
            </button>
          </div>
          
          <div className="text-center">
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}