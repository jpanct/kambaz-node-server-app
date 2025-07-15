import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();
  
  return (
    <div id="wd-account-navigation" className="wd-navigation">
      <Link 
        to="/Kambaz/Account/Signin" 
        className={`text-decoration-none d-block py-2 px-3 ${
          location.pathname === "/Kambaz/Account/Signin" 
            ? "text-black fw-bold border-start border-dark border-4" 
            : "text-danger"
        }`}
      >
        Signin
      </Link>
      <Link 
        to="/Kambaz/Account/Signup" 
        className={`text-decoration-none d-block py-2 px-3 ${
          location.pathname === "/Kambaz/Account/Signup" 
            ? "text-black fw-bold border-start border-dark border-4" 
            : "text-danger"
        }`}
      >
        Signup
      </Link>
      <Link 
        to="/Kambaz/Account/Profile" 
        className={`text-decoration-none d-block py-2 px-3 ${
          location.pathname === "/Kambaz/Account/Profile" 
            ? "text-black fw-bold border-start border-dark border-4" 
            : "text-danger"
        }`}
      >
        Profile
      </Link>
    </div>
  );
}