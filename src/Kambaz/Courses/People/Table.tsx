import { FaUserCircle, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from "../../Account/reducer";
import { addEnrollment } from "../../Enrollments/reducer";

export default function PeopleTable({ users = [], fetchUsers }: { users?: any[]; fetchUsers?: () => void }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    section: "S101"
  });
  
  // Check if current user can view details (only FACULTY and ADMIN)
  const canViewDetails = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const canAddUsers = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const createUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      alert("Please fill in all fields");
      return;
    }
    
    const username = `${newUser.firstName.toLowerCase()}${newUser.lastName.toLowerCase()}${Date.now()}`;
    const createdUser = {
      _id: Date.now().toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      username: username,
      loginId: username,
      password: "password123",
      role: newUser.role,
      section: newUser.section,
      lastActivity: new Date().toLocaleDateString(),
      totalActivity: "0:00:00"
    };
    
    // Add user to Redux
    dispatch(addUser(createdUser));
    
    // If adding a student, enroll them in the current course
    if (createdUser.role === "STUDENT" && cid) {
      const enrollment = {
        _id: `${createdUser._id}-${cid}`,
        user: createdUser._id,
        course: cid
      };
      dispatch(addEnrollment(enrollment));
    }
    
    // Reset form
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "STUDENT",
      section: "S101"
    });
    setShowAddUser(false);
    
    // Refresh the table
    if (fetchUsers) fetchUsers();
  };
  
  return (
    <div id="wd-people-table">
      {canAddUsers && (
        <div className="mb-3">
          <button 
            className="btn btn-danger float-end"
            onClick={() => setShowAddUser(!showAddUser)}
          >
            <FaPlus className="me-2" />
            Add User
          </button>
        </div>
      )}
      
      {showAddUser && canAddUsers && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>Add New User</h5>
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="First Name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Last Name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                />
              </div>
            </div>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <div className="row">
              <div className="col-md-6">
                <select
                  className="form-control mb-2"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="STUDENT">Student</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Section"
                  value={newUser.section}
                  onChange={(e) => setNewUser({...newUser, section: e.target.value})}
                />
              </div>
            </div>
            <button 
              className="btn btn-success me-2"
              onClick={createUser}
            >
              Create User
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddUser(false)}
            >
              Cancel
            </button>
            <small className="text-muted d-block mt-2">
              Default password: password123
            </small>
          </div>
        </div>
      )}
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {canViewDetails && <th></th>}
          </tr>
        </thead>
        <tbody>
          {users
            .map((user: any) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  {canViewDetails ? (
                    <Link to={`/Kambaz/Courses/${cid}/People/${user._id}`} className="text-decoration-none text-dark">
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  ) : (
                    <>
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName}</span>{" "}
                      <span className="wd-last-name">{user.lastName}</span>
                    </>
                  )}
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                {canViewDetails && (
                  <td className="text-end">
                    <Link 
                      to={`/Kambaz/Courses/${cid}/People/${user._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </Link>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}