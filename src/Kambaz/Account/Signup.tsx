import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="mb-4 text-center">Sign up</h3>
          
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
          
          <div className="mb-3">
            <input 
              placeholder="verify password"
              type="password" 
              className="form-control wd-password-verify" 
            />
          </div>
          
          <div className="d-grid mb-3">
            <Link 
              to="/Kambaz/Account/Profile"
              className="btn btn-primary"
            >
              Sign up
            </Link>
          </div>
          
          <div className="text-center">
            <Link 
              to="/Kambaz/Account/Signin"
              className="text-decoration-none"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}