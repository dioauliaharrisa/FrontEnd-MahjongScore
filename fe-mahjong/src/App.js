import { Routes, Route } from "react-router-dom";
// Link
import "./App.css";
// import PageHome from "./views/HomeViews"
import PageLogin from "./views/LoginViews";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PageHome />} /> */}
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </div>
  );
}

export default App;
