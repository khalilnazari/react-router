import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Link } from "react-router-dom";

type VansType = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
}[];

const HostVans = () => {
  const [vans, setVans] = useState<VansType>([]);
  const fetchData = async () => {
    const response = await fetch("/api/host/vans");
    const data = await response.json();
    setVans(data.vans);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="py-5">
      <PageTitle>Your listed vans</PageTitle>
      <div>
        {vans.length ? (
          vans.map((van) => (
            <Link
              className="flex flex-row gap-6 border rounded p-5 mb-2"
              to={`${van.id}`}
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
