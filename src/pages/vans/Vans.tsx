import { useEffect, useState } from "react";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { Link, useSearchParams } from "react-router-dom";

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
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const nameFilter = searchParams.get("name");

  const fetchVans = async () => {
    try {
      const response = await fetch("/api/vans");
      const data = await response.json();

      const vans = typeFilter
        ? data.vans.filter((van) => van.type.toLowerCase() === typeFilter)
        : nameFilter
        ? data.vans.filter((van) => van.name.toLowerCase().includes(nameFilter))
        : data.vans;

      setVans(vans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVans();
  }, [typeFilter, nameFilter]);

  const handleSearch = () => {
    setSearchParams({ name: search });
  };

  return (
    <main>
      <Container>
        <div className="flex justify-between mb-2">
          <PageTitle>Vans list</PageTitle>

          <div>
            <div className="flex gap-3">
              {/* <button onClick={() => setSearchParams({ type: "simple" })}>
                Simple
              </button>
              <button onClick={() => setSearchParams({ type: "rugged" })}>
                Rugged
              </button>
              <button onClick={() => setSearchParams({ type: "luxury" })}>
                Luxury
              </button>
              <button onClick={() => setSearchParams({})}>Clear</button> */}
              {/* <Link to="?type=luxury">Simple</Link>
              <Link to="?type=rugged">Rugged</Link>
              <Link to="?type=simple">Simple</Link>
              <Link to=".">Clear</Link> */}
            </div>
            <input
              type="search"
              className="p-2 border outline-0"
              placeholder="Search vans"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button onClick={handleSearch} className="p-2 border">
              Search
            </button>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-4">
          {vans.length ? (
            vans.map((van) => (
              <Link to={`/vans/${van?.id}`} key={van.id} className="mb-2">
                <img src={van.imageUrl} className="w-full rounded border" />
                <div className="mt-2 flex justify-between p-1">
                  <div>
                    <p className="font-bold mb-2">{van.name}</p>
                    <span className="border py-1 rounded px-3">{van.type}</span>
                  </div>
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
