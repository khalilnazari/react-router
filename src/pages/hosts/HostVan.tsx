import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

type VanType = {
  description: string | undefined;
  id: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  type: string | undefined;
};

const HostVan = () => {
  const params = useParams();

  const [van, setVan] = useState<VanType>();

  const fetchData = async () => {
    const response = await fetch(`/api/host/vans/${params.vanId}`);
    const data = await response.json();
    setVan(data.vans);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="py-5">
      {van ? (
        <>
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
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </main>
  );
};

export default HostVan;
