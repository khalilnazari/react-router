import { useEffect, useState } from "react";
import Container from "../../components/Container";
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

const Vans = () => {
  const [vans, setVans] = useState<VansType | []>([]);

  const fetchVans = async () => {
    try {
      const response = await fetch("/api/vans");
      const data = await response.json();
      setVans(data.vans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVans();
  }, []);

  return (
    <main>
      <Container>
        <PageTitle>Vans list</PageTitle>

        <section className="grid grid-cols-3 gap-4">
          {vans.length ? (
            vans.map((van) => (
              <Link to={`/vans/${van?.id}`} key={van.id} className="mb-2">
                <img src={van.imageUrl} className="w-full rounded border" />
                <div className="mt-2 flex justify-between p-1">
                  <span className="font-bold">{van.name}</span>
                  <span>{van.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div>No data found</div>
          )}
        </section>
      </Container>
    </main>
  );
};

export default Vans;
