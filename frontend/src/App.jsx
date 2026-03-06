import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Record from "./pages/Record";
import Library from "./pages/Library";
import ScrollToTop from "./components/layout/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/record" element={<Record />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
