import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import { 
  removeEnrollmentsForCourse, 
  autoEnrollStudent 
} from "./Enrollments/reducer";
import { 
  addCourse as addCourseAction,
  deleteCourse as deleteCourseAction,
  updateCourse as updateCourseAction
} from "./Courses/reducer";

// Protected Course Route Component (inline)
function ProtectedCourseRoute({ children }: { children: React.ReactNode }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  
  // Faculty and Admin can access all courses
  if (currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") {
    return <>{children}</>;
  }
  
  // Check if student is enrolled
  const isEnrolled = enrollments.some((e: any) => 
    e.user === currentUser?._id && e.course === cid
  );
  
  if (!isEnrolled) {
    return <Navigate to="/Kambaz/Dashboard" replace />;
  }
  
  return <>{children}</>;
}

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  
  // Debug logs moved here
  console.log("=== KAMBAZ DEBUG ===");
  console.log("Current User:", currentUser);
  console.log("User Role:", currentUser?.role);
  console.log("Courses from Redux:", courses);
  console.log("Number of courses:", courses?.length);
  
  const [course, setCourse] = useState<any>({
    _id: "", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15", 
    description: "New Description",
  });
  
  // Auto-enroll new students when they first load
  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      dispatch(autoEnrollStudent({ userId: currentUser._id, courses }));
    }
  }, [currentUser, courses, dispatch]);
  
  const addNewCourse = () => {
    dispatch(addCourseAction(course));
    setCourse({
      _id: "", 
      name: "New Course", 
      number: "New Number",
      startDate: "2023-09-10", 
      endDate: "2023-12-15", 
      description: "New Description",
    });
  };
  
  const deleteCourse = (courseId: any) => {
    dispatch(deleteCourseAction(courseId));
    dispatch(removeEnrollmentsForCourse(courseId));
  };
  
  const updateCourse = () => {
    dispatch(updateCourseAction(course));
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />
            </ProtectedRoute>
          } />
          <Route path="Courses/:cid/*" element={
            <ProtectedRoute>
              <ProtectedCourseRoute>
                <Courses />
              </ProtectedCourseRoute>
            </ProtectedRoute>
          } />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}