import { Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/vans/Vans";
import VanDetails from "./pages/vans/VanDetails";
import Dashboard from "./pages/hosts/Dashboard";
import Reviews from "./pages/hosts/Reviews";
import Income from "./pages/hosts/Income";
import HostLayout from "./components/HostLayout";
import NotFound from "./pages/NotFound";
import HostVan from "./pages/hosts/HostVan";
import HostVans from "./pages/hosts/HostVans";
import Pricing from "./pages/hosts/Pricing";
import Photos from "./pages/hosts/Photos";
import HostVanDetails from "./pages/hosts/VanDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="vans/:vanId" element={<VanDetails />} />

        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" element={<HostVans />} />
          <Route path="vans/:vanId" element={<HostVan />}>
            <Route index element={<HostVanDetails />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="photos" element={<Photos />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
