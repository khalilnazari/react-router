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

      const vans = nameFilter
        ? data.vans.filter((van: any) =>
            van.name.toLowerCase().includes(nameFilter)
          )
        : typeFilter
        ? data.vans.filter((van: any) => van.type.toLowerCase() === typeFilter)
        : data.vans;

      setVans(vans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVans();
  }, [typeFilter, nameFilter]);

  // Generate search params for buttons
  const setSearchParamStr = (key: string, value: string | null) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  // Generate search params for links
  const generateSearchParamStr = (key: string, value: string | null) => {
    const sp = new URLSearchParams(searchParams);
    if (!value) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  };

  return (
    <main>
      <Container>
        <div className="flex justify-between mb-2">
          <PageTitle>Vans list</PageTitle>

          <div className="flex gap-3 items-center">
            <div className="flex gap-3">
              <button
                className={`border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                  typeFilter === "simple" ? "bg-slate-500 text-slate-50" : null
                }`}
                onClick={() => setSearchParamStr("type", "simple")}
              >
                Simple
              </button>
              <button
                className={`border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                  typeFilter === "rugged" ? "bg-slate-500 text-slate-50" : null
                }`}
                onClick={() => setSearchParamStr("type", "rugged")}
              >
                Rugged
              </button>
              <button
                className={`border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                  typeFilter === "luxury" ? "bg-slate-500 text-slate-50" : null
                }`}
                onClick={() => setSearchParamStr("type", "luxury")}
              >
                Luxury
              </button>

              <button
                className={`border bourded px-3 py-1 hover:bg-slate-200`}
                onClick={() => setSearchParamStr("type", null)}
              >
                clear
              </button>

              {/* <Link to={generateSearchParamStr("type", "luxury")}>Luxury</Link>
              <Link to={generateSearchParamStr("type", "rugged")}>Rugged</Link>
              <Link to={generateSearchParamStr("type", "simple")}>Simple</Link>
              <Link to={generateSearchParamStr("type", null)}>Clear</Link> */}
            </div>
            <div>
              <input
                type="search"
                className="p-2 border outline-0"
                placeholder="Search vans"
                name="name"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                onClick={() => setSearchParamStr("name", search)}
                className="p-2 border"
              >
                Search
              </button>
            </div>
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
