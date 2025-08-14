import Labs from "./Labs";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCourses } from "./Kambaz/Courses/reducer";

export default function App() {
  // In your App or Dashboard component
  const dispatch = useDispatch<any>(); // Use 'any' to bypass type issues
  
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <HashRouter>
            <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />

        </Routes>
      </div>
            </Provider>

    </HashRouter>
);}


