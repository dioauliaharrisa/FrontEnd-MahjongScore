import { Routes, Route } from "react-router-dom";
// Link
import "./App.css";
import PageHome from "./views/HomeView";
import PageLogin from "./views/LoginView";
import PageTable from "./views/TableView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/table" element={<PageTable />} />
      </Routes>
    </div>
  );
}

export default App;
