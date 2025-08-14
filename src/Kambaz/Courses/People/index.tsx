import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    if (cid) {
      try {
        setLoading(true);
        const enrolledUsers = await courseClient.findUsersForCourse(cid);
        console.log("Fetched users:", enrolledUsers);
        setUsers(enrolledUsers);
      } catch (error) {
        console.error("Error fetching course users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  console.log("Passing users to PeopleTable:", users);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}