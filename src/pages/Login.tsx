import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/Container";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getAuth } from "../api/api";

const innputInit = {
  email: "",
  password: "",
};

export const loader = async ({ request }: any) => {
  return new URL(request.url).searchParams.get("message");
};

const Login = () => {
  const message = useLoaderData() as string;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<typeof innputInit>(innputInit);
  const [state, setState] = useState("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    setState("loading");
    getAuth(formData)
      .then((data) => {
        console.log("login success", data);
        navigate("/host", { replace: true });
      })
      .catch()
      .finally(() => {
        setState("idle");
      });
  };

  return (
    <main>
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-[350px] bg-white p-8 rounded flex flex-col gap-5"
          >
            {message ? (
              <div className="px-3 py-2 rounded bg-red-300">{message}</div>
            ) : null}

            <input
              type="email"
              name="email"
              placeholder="enter email"
              className="border px-3 py-2 rounded outline-1 outline-slate-300"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="true"
            />

            <input
              type="password"
              name="password"
              placeholder="enter password "
              className="border px-3 py-2 rounded outline-1 outline-slate-300"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="true"
            />
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 transition duration-300 ease-in-out text-slate-100 rounded border px-3 py-2 w-full"
              disabled={state === "loading" ? true : false}
            >
              {state === "loading" ? "Login..." : "Login"}
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Login;
