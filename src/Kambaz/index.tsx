import { Navigate, Route, Routes, useParams } from "react-router-dom";
import "./styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  autoEnrollStudent 
} from "./Enrollments/reducer";
import { 
  setCourses,
  updateCourse as updateCourseAction
} from "./Courses/reducer";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client"; // ADD THIS IMPORT
import KambazNavigation from "./Navigation";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Courses from "./Courses";
import Dashboard from "./Dashboard";

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
  const [enrolling, setEnrolling] = useState<boolean>(false); // ADD THIS STATE
  
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
  
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  
  const deleteCourse = async (courseId: string) => {
    dispatch(setCourses(courses.filter((course: { _id: string; }) => course._id !== courseId)));
  };

  const updateCourse = () => {
    dispatch(updateCourseAction(course));
  };
 const findCoursesForUser = async () => {
   try {
     const courses = await userClient.findCoursesForUser(currentUser._id);
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };

  // ADD THIS NEW FUNCTION
  

 const updateEnrollment = async (courseId: string, enrolled: boolean) => {
   if (enrolled) {
     await userClient.enrollIntoCourse(currentUser._id, courseId);
   } else {
     await userClient.unenrollFromCourse(currentUser._id, courseId);
   }
   setCourses(
     courses.map((course: { _id: string; }) => {
       if (course._id === courseId) {
         return { ...course, enrolled: enrolled };
       } else {
         return course;
       }
     })
   );
 };


  const fetchCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  // Only run if currentUser exists
  if (!currentUser) return;
  
  if (enrolling) {
    fetchCourses();
  } else {
    findCoursesForUser();
  }
}, [currentUser, enrolling]);

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute>
              <Dashboard         course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                enrolling={enrolling}
                setEnrolling={setEnrolling}
                updateEnrollment={updateEnrollment}     />
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