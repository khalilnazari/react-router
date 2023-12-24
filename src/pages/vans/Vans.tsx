import { useState } from "react";
import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../api/api";

type VansType = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  type: string;
}[];

export const loader = async () => await getVans();

const Vans = () => {
  const vansList = useLoaderData() as VansType;

  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const nameFilter = searchParams.get("name");

  const vans = nameFilter
    ? vansList.filter((van: any) => van.name.toLowerCase().includes(nameFilter))
    : typeFilter
    ? vansList.filter((van: any) => van.type.toLowerCase() === typeFilter)
    : vansList;

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

  return (
    <main>
      {Array.isArray(vans) ? (
        <Container>
          <div className="flex justify-between mb-2">
            <PageTitle>Vans list</PageTitle>
            <div className="flex gap-3 items-center">
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
                  typeFilter === "simple" ? "bg-slate-500 text-slate-50" : null
                }`}
                onClick={() => setSearchParamStr("type", "simple")}
              >
                Simple
              </button>
              <button
                className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                  typeFilter === "rugged" ? "bg-slate-500 text-slate-50" : null
                }`}
                onClick={() => setSearchParamStr("type", "rugged")}
              >
                Rugged
              </button>
              <button
                className={`w-full text-left mb-2 border bourded px-3 py-1 hover:bg-slate-500 rounded hover:text-slate-50 ${
                  typeFilter === "luxury" ? "bg-slate-500 text-slate-50" : null
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
              {vans?.map((van) => (
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
            {/* ) : (
            <h1 className="w-full flex items-center justify-center bg-slate-100">
              No van found!
            </h1>
          )} */}
          </div>
        </Container>
      ) : (
        <Container>Notfound</Container>
      )}
    </main>
  );
};

export default Vans;
