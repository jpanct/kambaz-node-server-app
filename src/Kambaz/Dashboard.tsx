import { Link } from "react-router-dom";
import { Button, Card, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEnrollment, removeEnrollment } from "./Enrollments/reducer";

export default function Dashboard({ 
  courses, course, setCourse, addNewCourse,
  deleteCourse
}: {
  courses: any[]; 
  course: any; 
  setCourse: (course: any) => void;
  addNewCourse: () => void; 
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentReducer?.enrollments || []);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // Debug logs
  console.log("Current User:", currentUser);
  console.log("Enrollments:", enrollments);
  console.log("Show All Courses:", showAllCourses);
  
  const handleEnroll = (courseId: string) => {
    console.log("Enrolling in course:", courseId);
    const newEnrollment = {
      _id: `${currentUser._id}-${courseId}-${Date.now()}`,
      user: currentUser._id,
      course: courseId
    };
    dispatch(addEnrollment(newEnrollment));
  };
  
  const handleUnenroll = (courseId: string) => {
    console.log("Unenrolling from course:", courseId);
    dispatch(removeEnrollment({ userId: currentUser._id, courseId }));
  };
  
  const isEnrolled = (courseId: string) => {
    if (!enrollments || !Array.isArray(enrollments)) {
      console.log("Enrollments not available or not an array:", enrollments);
      return false;
    }
    return enrollments.some((e: any) => 
      e.user === currentUser?._id && e.course === courseId
    );
  };
  
  // Determine which courses to display
  const displayedCourses = showAllCourses || currentUser?.role === "FACULTY"
    ? courses 
    : courses.filter(course => isEnrolled(course._id));
  
  console.log("Displayed courses:", displayedCourses);
  console.log("Total courses:", courses.length);
  console.log("Show all courses:", showAllCourses);

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            console.log("Enrollments button clicked!");
            setShowAllCourses(!showAllCourses);
          }}
          style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px' }}
        >
          Enrollments
        </button>
      </div>
      <hr />

      {/* Only show course management for FACULTY */}
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            > 
              Add 
            </button>
          </h5>
          <br />
          <FormControl 
            value={course.name} 
            className="mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
          />
          <FormControl 
            as="textarea" 
            value={course.description} 
            rows={3}  
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2> 
      <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => {
            const enrolled = isEnrolled(course._id);
            
            return (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <div className="wd-dashboard-course">
                  <Card className="h-100">
                    <Card.Img 
                      src="/images/reactjs.jpg" 
                      variant="top" 
                      width="100%" 
                      height={160}
                      style={{ opacity: enrolled || currentUser?.role === "FACULTY" ? 1 : 0.5 }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden flex-grow-1" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        {/* Go button for enrolled courses or faculty */}
                        {(enrolled || currentUser?.role === "FACULTY") && (
                          <Link to={`/Kambaz/Courses/${course._id}/Home`} className="text-decoration-none">
                            <Button variant="primary">Go</Button>
                          </Link>
                        )}
                        
                        {/* Enroll/Unenroll buttons for students */}
                        {currentUser && currentUser.role === "STUDENT" && (
                          enrolled ? (
                            <Button 
                              variant="danger" 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </Button>
                          ) : (
                            <Button 
                              variant="success"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEnroll(course._id);
                              }}
                            >
                              Enroll
                            </Button>
                          )
                        )}
                        
                        {/* Faculty Edit/Delete buttons */}
                        {currentUser?.role === "FACULTY" && (
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
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                deleteCourse(course._id);
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