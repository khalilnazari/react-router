import { Link, useLocation, useParams } from "react-router-dom";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

type VanType = {
  description: string | undefined;
  id: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  type: string | undefined;
};

const VanDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [van, setVan] = useState<VanType>({
    description: undefined,
    id: undefined,
    imageUrl: undefined,
    name: undefined,
    price: undefined,
    type: undefined,
  });

  const params = useParams();
  const location = useLocation();
  const searchParams = location.state?.search || "";
  const filterStr = location.state?.filterStr || "all";

  const fetchVans = async () => {
    try {
      const response = await fetch(`/api/vans/${params.vanId}`);
      if (!response.ok) {
        setError(true);
        setLoading(false);
      }
      const data = await response.json();
      setVan(data.vans);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchVans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error>An error occured. Try again!</Error>;
  }

  return (
    <main>
      <Container>
        {!loading ? (
          <>
            <div className="mb-2 px-2">
              <Link
                to={`..${searchParams}`}
                relative="path"
                className="hover:underline"
              >
                &larr; Back to {filterStr} vans
              </Link>
            </div>

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
          </>
        ) : null}
      </Container>
    </main>
  );
};

export default VanDetails;
