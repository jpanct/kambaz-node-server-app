import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Assignments() {
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
        <div className="col-auto">
          <button className="btn btn-secondary me-1" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </button>
          <button className="btn btn-danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
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
              <FaPlus className="me-3" />
              <FaEllipsisV />
            </div>
          </div>
          
          <ul className="list-group list-group-flush rounded-0">
            <li className="list-group-item d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-muted" />
              <IoDocumentTextOutline className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link to="/Kambaz/Courses/1234/Assignments/123"
                      className="text-decoration-none text-dark fw-bold">
                  A1 - ENV + HTML
                </Link>
                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |
                </div>
                <div className="small text-muted">
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV className="text-muted" />
              </div>
            </li>
            
            <li className="list-group-item d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-muted" />
              <IoDocumentTextOutline className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link to="/Kambaz/Courses/1234/Assignments/124"
                      className="text-decoration-none text-dark fw-bold">
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |
                </div>
                <div className="small text-muted">
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV className="text-muted" />
              </div>
            </li>
            
            <li className="list-group-item d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3 text-muted" />
              <IoDocumentTextOutline className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link to="/Kambaz/Courses/1234/Assignments/125"
                      className="text-decoration-none text-dark fw-bold">
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |
                </div>
                <div className="small text-muted">
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaEllipsisV className="text-muted" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}