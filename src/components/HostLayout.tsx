import { NavLink, Outlet } from "react-router-dom";
import Container from "./Container";

const HostLayout = () => {
  return (
    <main>
      <Container>
        <div className="flex gap-3 my-2">
          <NavLink to="">Dashboard</NavLink>
          <NavLink to="income">Income</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </div>
        <Outlet />
      </Container>
    </main>
  );
};

export default HostLayout;
