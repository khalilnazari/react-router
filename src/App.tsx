import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetails from "./pages/VanDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="vans/:vanId" element={<VanDetails />} />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};

export default App;
