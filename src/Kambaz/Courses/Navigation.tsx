import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();
  const { cid } = useParams(); // Get course ID from params
  
  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };
  
  return (
    <div id="wd-course-navigation" className="wd-navigation" style={{ width: 150 }}>
      <Link 
        to={`/Kambaz/Courses/${cid}/Home`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Home") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Home
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Modules`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Modules") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Modules
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Piazza`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Piazza") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Piazza
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Zoom`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Zoom") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Zoom
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Assignments`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Assignments")
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Assignments
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Quizzes`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Quizzes") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Quizzes
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/Grades`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/Grades") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        Grades
      </Link>
      
      <Link 
        to={`/Kambaz/Courses/${cid}/People`}
        className={`text-decoration-none d-block py-2 px-3 ${
          isActive("/People") 
            ? "text-black fw-bold border-start border-dark border-5" 
            : "text-danger"
        }`}
      >
        People
      </Link>
    </div>
  );
}