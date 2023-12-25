import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/Container";

const innputInit = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<typeof innputInit>(innputInit);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    console.log(formData);
  };

  return (
    <main>
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-[350px] bg-white p-8 rounded flex flex-col gap-5"
          >
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
            >
              Login
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Login;
