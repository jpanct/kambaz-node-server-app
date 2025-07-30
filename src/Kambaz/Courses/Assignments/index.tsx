import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle, FaEllipsisV, FaTrash } from "react-icons/fa";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };
  
  return (
    <div id="wd-assignments" className="container-fluid">
      <div className="row mb-4">
        <div className="col">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
            <input 
              type="text"
              className="form-control border-start-0"
              placeholder="Search for Assignments"
              id="wd-search-assignment" 
            />
          </div>
        </div>
        {currentUser?.role === "FACULTY" && (
          <div className="col-auto">
            <button className="btn btn-secondary me-1" id="wd-add-assignment-group">
              <FaPlus className="me-1" /> Group
            </button>
            <button 
              className="btn btn-danger" 
              id="wd-add-assignment"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="me-1" /> Assignment
            </button>
          </div>
        )}
      </div>

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 border-gray">
          <div className="p-3 bg-light border-start border-5 border-success d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <strong>ASSIGNMENTS</strong>
              <span className="ms-3 badge rounded-pill bg-secondary">40% of Total</span>
            </div>
            <div>
              <FaCheckCircle className="text-success me-3" />
              {currentUser?.role === "FACULTY" && (
                <>
                  <FaPlus className="me-3" />
                  <FaEllipsisV />
                </>
              )}
            </div>
          </div>
          
          <ul className="list-group list-group-flush rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li key={assignment._id} className="list-group-item d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3 text-muted" />
                  <IoDocumentTextOutline className="me-3 fs-3 text-success" />
                  <div className="flex-grow-1">
                    {currentUser?.role === "FACULTY" ? (
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`);
                        }}
                        className="text-decoration-none text-dark fw-bold"
                        style={{ cursor: "pointer" }}
                      >
                        {assignment.title}
                      </a>
                    ) : (
                      <span className="text-dark fw-bold">{assignment.title}</span>
                    )}
                    <div className="small text-muted">
                      <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> {
                        assignment.availableFrom ? new Date(assignment.availableFrom).toLocaleDateString() : "May 6"
                      } at {
                        assignment.availableFrom ? new Date(assignment.availableFrom).toLocaleTimeString() : "12:00am"
                      } |
                    </div>
                    <div className="small text-muted">
                      <strong>Due</strong> {
                        assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "May 13"
                      } at {
                        assignment.dueDate ? new Date(assignment.dueDate).toLocaleTimeString() : "11:59pm"
                      } | {assignment.points || 100} pts
                    </div>
                  </div>
                  <div className="ms-auto d-flex align-items-center">
                    <FaCheckCircle className="text-success me-2" />
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`)}
                        >
                          Edit
                        </button>
                        <FaTrash 
                          className="text-danger me-2" 
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteAssignment(assignment._id)}
                        />
                      </>
                    )}
                    <FaEllipsisV className="text-muted" />
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}