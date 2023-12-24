import { useEffect, useState } from "react";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const nameFilter = searchParams.get("name");

  const fetchVans = async () => {
    try {
      const response = await fetch("/api/vans");
      if (!response.ok) {
        setLoading(false);
        setError(true);
        throw Error("Fetch failed!!");
      }
      const data = await response.json();

      const vans = nameFilter
        ? data.vans.filter((van: any) =>
            van.name.toLowerCase().includes(nameFilter)
          )
        : typeFilter
        ? data.vans.filter((van: any) => van.type.toLowerCase() === typeFilter)
        : data.vans;

      setVans(vans);
      setLoading(false);
    } catch (error) {
      console.log("Error from miraj: ");
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
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
  // const generateSearchParamStr = (key: string, value: string | null) => {
  //   const sp = new URLSearchParams(searchParams);
  //   if (!value) {
  //     sp.delete(key);
  //   } else {
  //     sp.set(key, value);
  //   }
  //   return `?${sp.toString()}`;
  // };

  if (loading) return <Loading />;
  if (error) return <Error>An error occured! Contact Product team.</Error>;

  return (
    <main>
      <Container>
        {vans.length ? (
          <>
            <div className="flex justify-between mb-2">
              <PageTitle>Vans list</PageTitle>

              <div className="flex gap-3 items-center">
                <div className="flex gap-3">
                  {/* <Link to={generateSearchParamStr("type", "luxury")}>Luxury</Link>
                <Link to={generateSearchParamStr("type", "rugged")}>Rugged</Link>
                <Link to={generateSearchParamStr("type", "simple")}>Simple</Link>
                <Link to={generateSearchParamStr("type", null)}>Clear</Link> */}
                </div>
                <div className="border rounded text-slate-700">
                  <input
                    type="search"
                    className="px-3 py-2 outline-0 border-0 rounded "
                    placeholder="Search vans"
                    name="name"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                  <button
                    onClick={() => setSearchParamStr("name", search)}
                    className="px-3 p-2 bg-slate-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-7">
              <aside className="w-1/5">
                <button
                  className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                    typeFilter === "simple"
                      ? "bg-slate-500 text-slate-50"
                      : null
                  }`}
                  onClick={() => setSearchParamStr("type", "simple")}
                >
                  Simple
                </button>
                <button
                  className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                    typeFilter === "rugged"
                      ? "bg-slate-500 text-slate-50"
                      : null
                  }`}
                  onClick={() => setSearchParamStr("type", "rugged")}
                >
                  Rugged
                </button>
                <button
                  className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                    typeFilter === "luxury"
                      ? "bg-slate-500 text-slate-50"
                      : null
                  }`}
                  onClick={() => setSearchParamStr("type", "luxury")}
                >
                  Luxury
                </button>

                <button
                  className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-200`}
                  onClick={() => setSearchParamStr("type", null)}
                >
                  clear
                </button>
              </aside>
              <section className="grid grid-cols-3 gap-4 w-4/5">
                {vans.map((van) => (
                  <Link
                    to={van?.id}
                    state={{
                      search: `?${searchParams.toString()}`,
                      filterStr: typeFilter,
                    }}
                    key={van.id}
                    className="mb-2"
                  >
                    <img src={van.imageUrl} className="w-full rounded border" />
                    <div className="mt-2 flex justify-between p-1">
                      <div>
                        <p className="font-bold mb-2">{van.name}</p>
                        <span className="border py-1 rounded px-3">
                          {van.type}
                        </span>
                      </div>
                      <span>{van.price}</span>
                    </div>
                  </Link>
                ))}
              </section>
            </div>
          </>
        ) : null}
      </Container>
    </main>
  );
};

export default Vans;
