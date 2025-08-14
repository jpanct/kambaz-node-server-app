// src/Kambaz/Users/index.tsx
import {  useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";
import { setUsers, addUser } from "../Account/reducer";

export default function Users() {
  const { users } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  const fetchUsers = async () => {
    try {
      // Try to fetch from backend
      const fetchedUsers = await client.findAllUsers();
      dispatch(setUsers(fetchedUsers));
    } catch (error) {
      console.error("Error fetching users:", error);
      // Users are already in Redux from initial state
    }
  };
  
  const createUser = async () => {
    const newUser = {
      _id: Date.now().toString(),
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
      loginId: `newuser${Date.now()}`,
      lastActivity: new Date().toLocaleDateString(),
      totalActivity: "0:00:00"
    };
    
    try {
      // Try to create on backend
      const createdUser = await client.createUser(newUser);
      dispatch(addUser(createdUser));
    } catch (error) {
      console.error("Error creating user:", error);
      // Add to Redux anyway for frontend-only operation
      dispatch(addUser(newUser));
    }
  };
  
  const deleteUser = async (userId: string) => {
    try {
      await client.deleteUser(userId);
      // You'll need to dispatch a delete action here
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="p-4">
      <h3>Users Management</h3>
      <button 
        onClick={createUser} 
        className="float-end btn btn-danger wd-add-people mb-3"
      >
        <FaPlus className="me-2" />
        Add User
      </button>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}