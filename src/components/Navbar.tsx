import { NavLink, Link } from "react-router-dom";
import Container from "./Container";

const Navbar = () => {
  return (
    <header className="bg-slate-800  py-3 mb-5">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-slate-100 text-2xl font-bold">
              #VANSLIFE
            </Link>
          </div>
          <nav className="flex items-center gap-3 text-slate-300">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-slate-50" : "hover:text-slate-50"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-slate-50" : "hover:text-slate-50"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/vans"
              className={({ isActive }) =>
                isActive ? "text-slate-50" : "hover:text-slate-50"
              }
            >
              Vans
            </NavLink>

            <NavLink
              to="/host"
              className={({ isActive }) =>
                isActive ? "text-slate-50" : "hover:text-slate-50"
              }
            >
              Host
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-slate-50" : "hover:text-slate-50"
              }
            >
              Login
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
