import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();
  const { cid } = useParams(); // Get course ID from params
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  const isActive = (path: string) => {
    return location.pathname.endsWith(path);
  };
  
  return (
    <div id="wd-course-navigation" className="wd-navigation" style={{ width: 150 }}>
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Courses/${cid}/${link}`}
          className={`text-decoration-none d-block py-2 px-3 ${
            isActive(`/${link}`)
              ? "text-black fw-bold border-start border-dark border-5"
              : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}