import { createBrowserRouter } from "react-router-dom";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "vans",
        element: <Vans />,
        loader: vansLoader,
        errorElement: <Error />,
      },
      {
        path: "vans/:vanId",
        element: <VanDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "host",
        element: <HostLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "income",
            element: <Income />,
          },
          {
            path: "vans",
            element: <HostVans />,
          },

          {
            path: "vans/:vanId",
            element: <HostVan />,
            children: [
              {
                index: true,
                element: <HostVanDetails />,
              },
              {
                path: "pricing",
                element: <Pricing />,
              },
              {
                path: "photos",
                element: <Photos />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// export const routers = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<PageLayout />}>
//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />
//       <Route
//         path="vans"
//         loader={vansLoader}
//         element={<Vans />}
//         errorElement={<Error />}
//       />
//       <Route path="vans/:vanId" element={<VanDetails />} />
//       <Route path="login" element={<Login />} />

//       <Route path="host" element={<HostLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="reviews" element={<Reviews />} />
//         <Route path="income" element={<Income />} />
//         <Route path="vans" element={<HostVans />} />
//         <Route path="vans/:vanId" element={<HostVan />}>
//           <Route index element={<HostVanDetails />} />
//           <Route path="pricing" element={<Pricing />} />
//           <Route path="photos" element={<Photos />} />
//         </Route>
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// );
