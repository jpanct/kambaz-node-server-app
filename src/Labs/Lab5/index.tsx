import EnvironmentVariables from "./EnvironmentVariables";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
import PathParameters from "./PathParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div>
          <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">
           Welcome
           <EnvironmentVariables />
           <PathParameters />
           <WorkingWithObjects />
           <WorkingWithArrays />
        </a>
      </div><hr/>
    </div>
  );
}
