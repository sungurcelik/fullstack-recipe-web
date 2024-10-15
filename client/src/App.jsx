import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Undefined from "./pages/Undefined";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200 p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarif/:id" element={<Detail />} />
            <Route path="/ekle" element={<Create />} />
            <Route path="/düzenle" element={<Update />} />
            <Route path="/*" element={<Undefined />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
