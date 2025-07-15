import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="mb-4">Profile</h3>
          
          <div className="mb-3">
            <input 
              defaultValue="alice" 
              placeholder="username" 
              className="form-control wd-username"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="123" 
              placeholder="password" 
              type="password"
              className="form-control wd-password" 
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="Alice" 
              placeholder="First Name" 
              id="wd-firstname" 
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="Wonderland" 
              placeholder="Last Name" 
              id="wd-lastname" 
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="2000-01-01" 
              type="date" 
              id="wd-dob" 
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <input 
              defaultValue="alice@wonderland" 
              type="email" 
              id="wd-email" 
              className="form-control"
            />
          </div>
          
          <div className="mb-4">
            <select 
              defaultValue="FACULTY" 
              id="wd-role"
              className="form-select"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
          
          <div className="d-grid">
            <Link 
              to="/Kambaz/Account/Signin" 
              className="btn btn-danger"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}