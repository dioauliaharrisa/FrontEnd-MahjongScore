import { Routes, Route } from "react-router-dom";
// Link
import "./App.css";
import PageHome from "./views/HomeView";
import PageLogin from "./views/LoginView";
import PageTable from "./views/TableView";
import PageBarChart from "./views/BarChartView";
import PageRadar from "./views/RadarView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/table" element={<PageTable />} />\
        <Route path="/bar-chart" element={<PageBarChart />} />
        <Route path="/radar" element={<PageRadar />} />
      </Routes>
    </div>
  );
}

export default App;
