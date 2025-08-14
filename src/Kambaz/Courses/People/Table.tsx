import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PeopleTable({ users = []  }: { users?: any[]; fetchUsers?: () => void }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if current user can view details (only FACULTY and ADMIN)
  const canViewDetails = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  return (
    <div id="wd-people-table">
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
          {users.map((user: any) => (
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
              <td className="wd-login-id">{user.loginId || user.username}</td>
              <td className="wd-section">{user.section || "S101"}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || new Date().toLocaleDateString()}</td>
              <td className="wd-total-activity">{user.totalActivity || "0:00:00"}</td>
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
      {users.length === 0 && (
        <div className="text-center text-muted mt-4">
          No users enrolled in this course yet.
        </div>
      )}
    </div>
  );
}