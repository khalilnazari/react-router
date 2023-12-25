import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { getHostVans } from "../../api/api";

type VanType = {
  description: string | undefined;
  id: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  type: string | undefined;
};

export const loader = async ({ params }: any) => {
  return getHostVans(params.vanId);
};

const HostVan = () => {
  const van = useLoaderData() as VanType;

  return (
    <main className="py-5">
      <div className="mb-2 px-2">
        <Link to=".." relative="path" className="hover:underline">
          &larr; Back to vans
        </Link>
      </div>
      <div className="flex gap-5">
        <img
          src={van?.imageUrl}
          alt={van?.name}
          className="w-[200px] rounded border"
        />
        <div className="p-4 ">
          <PageTitle>{van?.name}</PageTitle>
          <p className="font-bold text-2xl mb-1">${van?.price}</p>
          <p className="font-bold text-2xl mb-1">{van?.type}</p>
        </div>
      </div>

      <div className="py-5 flex gap-5">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Details
        </NavLink>
        <NavLink
          to={`pricing`}
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to={`photos`}
          className={({ isActive }) =>
            isActive ? "underline" : "hover:underline"
          }
        >
          Photos
        </NavLink>
      </div>
      <div>
        <Outlet context={{ van }} />
      </div>
    </main>
  );
};

export default HostVan;
