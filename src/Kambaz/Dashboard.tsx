import { Link } from "react-router-dom";
import { Button, Card, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, deleteCourseThunk, createCourseThunk, updateCourseThunk } from "./Courses/reducer";

export default function Dashboard({ 
  course: propCourse,
  setCourse: propSetCourse,
  addNewCourse: propAddNewCourse,
  deleteCourse: propDeleteCourse,
  updateCourse: propUpdateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: {
  course?: any;
  setCourse?: (course: any) => void;
  addNewCourse?: () => void;
  deleteCourse?: (courseId: string) => void;
  updateCourse?: () => void;
  enrolling?: boolean;
  setEnrolling?: (enrolling: boolean) => void;
  updateEnrollment?: (courseId: string, enrolled: boolean) => void;
} = {}) {
  const dispatch = useDispatch<any>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, loading, error } = useSelector((state: any) => state.coursesReducer);
  const enrollments = useSelector((state: any) => state.enrollmentReducer?.enrollments || []);

  // Use prop course if provided, otherwise use local state
  const [localCourse, setLocalCourse] = useState<{
    _id?: string;
    name: string;
    description: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    image?: string;
  }>({
    name: "",
    description: "",
    number: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    department: "D101",
    credits: 3,
  });

  // Use prop values if provided, otherwise use local values
  const course = propCourse || localCourse;
  const setCourse = propSetCourse || setLocalCourse;

  // Load courses when component mounts
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const isEnrolled = (courseId: string) => {
    if (!enrollments || !Array.isArray(enrollments)) {
      return false;
    }
    return enrollments.some((e: any) => 
      e.user === currentUser?._id && e.course === courseId
    );
  };

  const addNewCourse = async () => {
    if (propAddNewCourse) {
      await propAddNewCourse();
    } else {
      if (course.name) {
        await dispatch(createCourseThunk(course));
        // Reset form
        setCourse({
          name: "",
          description: "",
          number: "",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          department: "D101",
          credits: 3,
        });
      }
    }
  };
  
  const updateCourse = async () => {
    if (propUpdateCourse) {
      await propUpdateCourse();
    } else {
      // Only call update if _id exists
      if (course._id && course.name) {
        await dispatch(updateCourseThunk({
          ...course,
          _id: course._id  // TypeScript now knows _id is defined here
        } as any));  // Use 'as any' to bypass strict typing
        
        // Reset form after update
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setCourse({
      name: "",
      description: "",
      number: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      department: "D101",
      credits: 3,
    });
  };
  
  // Add enrolled property to courses
  const coursesWithEnrollment = courses.map((c: any) => ({
    ...c,
    enrolled: isEnrolled(c._id)
  }));

  // Determine which courses to display based on enrolling mode
  const displayedCourses = enrolling || currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN"
    ? coursesWithEnrollment 
    : coursesWithEnrollment.filter((course: any) => course.enrolled);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses: {error}</div>;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {setEnrolling && (
          <button 
            onClick={() => setEnrolling(!enrolling)} 
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>
      <hr />

      {/* Show course management for FACULTY and ADMIN */}
      {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
        <>
          <h5>
            {course._id ? "Update Course" : "New Course"}
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={course._id ? updateCourse : addNewCourse}
            > 
              {course._id ? "Update" : "Add"}
            </button>
            {course._id && (
              <button 
                className="btn btn-secondary float-end me-2"
                onClick={resetForm}
              > 
                Cancel
              </button>
            )}
          </h5>
          <br />
          <FormControl 
            value={course.name} 
            className="mb-2" 
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
          />
          <FormControl 
            value={course.number || ""} 
            className="mb-2" 
            placeholder="Course Number (e.g., CS101)"
            onChange={(e) => setCourse({ ...course, number: e.target.value })} 
          />
          <FormControl 
            as="textarea" 
            value={course.description} 
            rows={3}
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2> 
      <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course: any) => {
            return (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <div className="wd-dashboard-course">
                  <Card className="h-100">
                    <Card.Img 
                      src={course.image || "/images/reactjs.jpg"} 
                      variant="top" 
                      width="100%" 
                      height={160}
                      style={{ opacity: course.enrolled || currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN" ? 1 : 0.5 }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="wd-dashboard-course-title">
                        {enrolling && updateEnrollment && (
                          <button 
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                            className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {course.name}
                      </Card.Title>
                      <p className="text-muted small">{course.number}</p>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden flex-grow-1" style={{ height: "80px" }}>
                        {course.description}
                      </Card.Text>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        {/* Go button for enrolled courses, faculty, or admin */}
                        {(course.enrolled || currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
                          <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none">
                            <Button variant="primary">Go</Button>
                          </Link>
                        )}
                        
                        {/* Faculty and Admin Edit/Delete buttons */}
                        {(currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN") && (
                          <div className="ms-auto">
                            <button 
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={async (event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
                                  if (propDeleteCourse) {
                                    await propDeleteCourse(course._id);
                                  } else {
                                    dispatch(deleteCourseThunk(course._id));
                                  }
                                }
                              }} 
                              className="btn btn-danger"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}