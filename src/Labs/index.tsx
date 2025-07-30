import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC/TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import store from "./store";
import { Provider } from "react-redux";
export default function Labs() {
  return (
        <Provider store={store}>

    <div>
      <h1>Jamie Pan</h1>
      <h1>Labs</h1>
      <a 
        id="wd-github" 
        href="https://github.com/jpanct/kambaz-react-web-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub Repository
      </a>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
      </Routes>
    </div>
    </Provider>
  );
}