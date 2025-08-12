// src/Kambaz/Courses/People/Details.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeEnrollment } from "../../Enrollments/reducer";
import { updateUser as updateUserAction, deleteUser as deleteUserAction } from "../../Account/reducer";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, cid } = useParams();
  const { currentUser, users } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  
  // State for each editable field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  
  // Find user from Redux state
  const user = users?.find((u: any) => u._id === uid);

  useEffect(() => {
    // Check if user has permission to view details
    if (currentUser?.role === "STUDENT") {
      // Redirect students back to the People list
      navigate(`/Kambaz/Courses/${cid}/People`);
      return;
    }
    
    // Set initial values when user is found
    if (user) {
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [uid, currentUser, navigate, cid, user]);

  const saveUserName = () => {
    if (!user || !name.trim()) return;
    
    // Clean up the name and split properly
    const cleanedName = name.trim().replace(/\s+/g, ' ');
    const nameParts = cleanedName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const updatedUser = { 
      ...user, 
      firstName, 
      lastName 
    };
    
    // Update user in Redux (this will update it globally)
    dispatch(updateUserAction(updatedUser));
    setEditingName(false);
  };

  const saveUserEmail = () => {
    if (!user || !email.trim()) return;
    
    const updatedUser = { 
      ...user, 
      email: email.trim()
    };
    
    dispatch(updateUserAction(updatedUser));
    setEditingEmail(false);
  };

  const saveUserRole = () => {
    if (!user) return;
    
    const updatedUser = { 
      ...user, 
      role
    };
    
    dispatch(updateUserAction(updatedUser));
    setEditingRole(false);
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Delete user from Redux
      dispatch(deleteUserAction(userId));
      
      // Remove user's enrollments
      const userEnrollments = enrollments.filter((e: any) => e.user === userId);
      userEnrollments.forEach((enrollment: any) => {
        dispatch(removeEnrollment({ userId, courseId: enrollment.course }));
      });
      
      // Navigate back to the people list
      navigate(`/Kambaz/Courses/${cid}/People`);
    }
  };
  
  if (!user) {
    return <div className="p-4">User not found</div>;
  }
  
  // Check if current user can edit/delete (only FACULTY and ADMIN)
  const canModify = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  return (
    <div className="p-4">
      <h3>User Details</h3>
      
      <div className="mb-3">
        <strong>User ID:</strong> {user._id}
      </div>
      
      {/* Name Field */}
      <div className="mb-3">
        <strong>Name:</strong>
        {!editingName && canModify && (
          <FaPencil 
            onClick={() => setEditingName(true)}
            className="float-end fs-5 mt-2 wd-edit" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {editingName && (
          <FaCheck 
            onClick={() => saveUserName()}
            className="float-end fs-5 mt-2 me-2 wd-save" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {!editingName && (
          <div 
            className="wd-name"
            onClick={() => canModify && setEditingName(true)}
            style={{ cursor: canModify ? 'pointer' : 'default' }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {editingName && (
          <FormControl 
            className="w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { 
                saveUserName(); 
              }
            }}
          />
        )}
      </div>
      
      {/* Email Field */}
      <div className="mb-3">
        <strong>Email:</strong>
        {!editingEmail && canModify && (
          <FaPencil 
            onClick={() => setEditingEmail(true)}
            className="float-end fs-5 mt-2 wd-edit" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {editingEmail && (
          <FaCheck 
            onClick={() => saveUserEmail()}
            className="float-end fs-5 mt-2 me-2 wd-save" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {!editingEmail && (
          <div className="wd-email">
            {user.email}
          </div>
        )}
        {editingEmail && (
          <FormControl 
            type="email"
            className="w-50 wd-edit-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { 
                saveUserEmail(); 
              }
            }}
          />
        )}
      </div>
      
      <div className="mb-3">
        <strong>Login ID:</strong> {user.loginId || user.username}
      </div>
      
      {/* Role Field */}
      <div className="mb-3">
        <strong>Role:</strong>
        {!editingRole && canModify && (
          <FaPencil 
            onClick={() => setEditingRole(true)}
            className="float-end fs-5 mt-2 wd-edit" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {editingRole && (
          <FaCheck 
            onClick={() => saveUserRole()}
            className="float-end fs-5 mt-2 me-2 wd-save" 
            style={{ cursor: 'pointer' }}
          />
        )}
        {!editingRole && (
          <div className="wd-role">
            {user.role}
          </div>
        )}
        {editingRole && (
          <FormControl 
            as="select"
            className="w-50 wd-edit-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { 
                saveUserRole(); 
              }
            }}
          >
            <option value="STUDENT">STUDENT</option>
            <option value="FACULTY">FACULTY</option>
            <option value="ADMIN">ADMIN</option>
          </FormControl>
        )}
      </div>
      
      <div className="mb-3">
        <strong>Section:</strong> {user.section || "S101"}
      </div>
      
      <hr />
      
      {canModify && (
        <button 
          onClick={() => deleteUser(uid!)} 
          className="btn btn-danger float-end wd-delete"
        >
          Delete
        </button>
      )}
      
      <button 
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}