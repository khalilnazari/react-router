import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";

type VanType = {
  description: string | undefined;
  id: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  type: string | undefined;
};

const VanDetails = () => {
  const [van, setVan] = useState<VanType>({
    description: undefined,
    id: undefined,
    imageUrl: undefined,
    name: undefined,
    price: undefined,
    type: undefined,
  });

  const params = useParams();

  const fetchVans = async () => {
    try {
      const response = await fetch("/api/vans");
      const data = await response.json();
      const van = data.vans.find((van: VanType) => van.id === params.vanId);
      setVan(van);
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
        <PageTitle>{van.name}</PageTitle>
        <div className="flex gap-5">
          <img
            src={van?.imageUrl}
            alt={van?.name}
            className="max-w-[400px] rounded"
          />
          <div className="p-4 ">
            <p className="text-xl mb-2">{van?.description}</p>
            <p className="font-bold text-2xl mb-1">${van.price}</p>
            <p className="font-bold text-2xl mb-1">{van.type}</p>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default VanDetails;
