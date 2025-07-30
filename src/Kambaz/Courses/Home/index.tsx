import { FaAlignJustify } from "react-icons/fa6";
import { useParams } from "react-router";
import { courses } from "../../Database";
export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}
      </h2>
    </div>
  );
}
