import { NavLink, Outlet } from "react-router-dom";
import Container from "./Container";

const HostLayout = () => {
  const normalLinkStyle = "py-1 px-3 rounded border border-slate-200";
  const activeLinkStyle =
    "bg-slate-300 py-1 px-3 border rounded border-slate-200";

  return (
    <main>
      <Container>
        <div className="flex gap-3 my-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : normalLinkStyle
            }
            to=""
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : normalLinkStyle
            }
            to="income"
          >
            Income
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : normalLinkStyle
            }
            to="vans"
          >
            Vans
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? activeLinkStyle : normalLinkStyle
            }
            to="reviews"
          >
            Reviews
          </NavLink>
        </div>
        <Outlet />
      </Container>
    </main>
  );
};

export default HostLayout;
