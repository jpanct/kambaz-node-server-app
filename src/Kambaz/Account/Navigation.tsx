import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
   const { currentUser } = useSelector((state: any) => state.accountReducer);
 const { pathname } = useLocation();
 const active = (path: string) => (pathname.includes(path) ? "active" : "");
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
           {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}