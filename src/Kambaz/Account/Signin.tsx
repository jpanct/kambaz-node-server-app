import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="mb-4 text-center">Sign in</h3>
          
          <div className="mb-3">
            <input 
              placeholder="username" 
              className="form-control wd-username" 
            />
          </div>
          
          <div className="mb-3">
            <input 
              placeholder="password" 
              type="password" 
              className="form-control wd-password" 
            />
          </div>
          
          <div className="d-grid mb-3">
            <Link 
              id="wd-signin-btn" 
              to="/Kambaz/Dashboard"
              className="btn btn-primary"
            >
              Sign in
            </Link>
          </div>
          
          <div className="text-center">
            <Link 
              to="/Kambaz/Account/Signup" 
              id="wd-signup-link"
              className="text-decoration-none"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}