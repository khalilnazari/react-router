import { Link, useLoaderData, useLocation } from "react-router-dom";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { getVans } from "../../api/api";

type VanType = {
  description: string | undefined;
  id: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  price: number | undefined;
  type: string | undefined;
};

export const loader = async ({ params }: any) => {
  return getVans(params?.vanId);
};

const VanDetails = () => {
  const location = useLocation();
  const searchParams = location.state?.search || "";
  const filterStr = location.state?.filterStr || "all";

  const van = useLoaderData() as VanType;
  return (
    <main>
      <Container>
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
      </Container>
    </main>
  );
};

export default VanDetails;
