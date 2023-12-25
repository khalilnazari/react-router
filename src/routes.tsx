import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetails from "./pages/vans/VanDetails";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/hosts/Dashboard";
import Reviews from "./pages/hosts/Reviews";
import Income from "./pages/hosts/Income";
import HostVans from "./pages/hosts/HostVans";
import HostVan from "./pages/hosts/HostVan";
import Pricing from "./pages/hosts/Pricing";
import Photos from "./pages/hosts/Photos";
import NotFound from "./pages/NotFound";
import HostVanDetails from "./pages/hosts/VanDetails";
import Error from "./components/Error";
import Login from "./pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        loader={vansLoader}
        element={<Vans />}
        errorElement={<Error />}
      />
      <Route path="vans/:vanId" element={<VanDetails />} />
      <Route path="login" element={<Login />} />

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
  )
);
