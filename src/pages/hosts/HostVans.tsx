import PageTitle from "../../components/PageTitle";
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api/api";
import { requireAuth } from "../../utils/auth";

type VansType = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
}[];

export const loader = async () => {
  await requireAuth();
  return getHostVans(undefined);
};

const HostVans = () => {
  const vans = useLoaderData() as VansType;

  return (
    <main className="py-5">
      <PageTitle>Your listed vans</PageTitle>
      <div>
        {vans.length ? (
          vans.map((van) => (
            <Link
              className="flex flex-row gap-6 border rounded p-5 mb-2"
              to={van.id}
              key={van.id}
            >
              <img src={van.imageUrl} className="h-40 rounded" alt={van.name} />
              <div className="p-1">
                <h2 className="text-xl font-bold">{van.name}</h2>
                <p>{van.type}</p>
                <p>{van.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </main>
  );
};

export default HostVans;
