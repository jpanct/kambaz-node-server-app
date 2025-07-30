import { FaTrash} from "react-icons/fa";
import { BsPlus, BsPencil } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";


export default function ModuleControlButtons({ module, moduleId, deleteModule, editModule, updateModule, addLesson }: {
  module: any;
  moduleId: string; 
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  updateModule: (module: any) => void;
  addLesson: (moduleId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      {!module.editing && (
        <BsPencil 
          onClick={() => editModule(moduleId)} 
          className="text-primary me-2" 
          style={{ cursor: "pointer", fontSize: "16px" }}
          title="Edit Module"
        />
      )}
      <FaTrash 
        onClick={() => deleteModule(moduleId)} 
        className="text-danger me-2" 
        style={{ cursor: "pointer", fontSize: "16px" }}
        title="Delete Module"
      />
      <GreenCheckmark module={module} updateModule={updateModule} />
      <BsPlus 
        className="fs-2 ms-1" 
        onClick={() => addLesson(moduleId)}
        style={{ cursor: "pointer" }}
        title="Add Lesson"
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}