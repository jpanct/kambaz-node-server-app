import { FaCheckCircle } from "react-icons/fa";

export default function GreenCheckmark({ module, updateModule }: {
  module?: any;
  updateModule?: (module: any) => void;
}) {
  const handleClick = () => {
    if (module && module.editing && updateModule) {
      // Save the module with editing set to false
      updateModule({ ...module, editing: false });
    }
  };

  return (
    <FaCheckCircle 
      className="text-success me-2" 
      style={{ 
        fontSize: "20px",
        cursor: module?.editing ? "pointer" : "default"
      }}
      onClick={handleClick}
      title={module?.editing ? "Save Module" : "Published"}
    />
  );
}