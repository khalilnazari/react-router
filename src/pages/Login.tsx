import { getAuth } from "../api/api";
import Container from "../components/Container";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

export const loader = async ({ request }: any) => {
  return new URL(request.url).searchParams.get("message");
};

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // call api request

  const pathname = new URL(request.url).searchParams.get("redirectTo");

  try {
    const user = await getAuth({ email, password });
    if (user) {
      localStorage.setItem("loginVan", "true");
      if (pathname) {
        throw redirect(pathname);
      }
      throw redirect("/host");
    } else {
      return { message: "Failed to login. User correct creditionasl" };
    }
  } catch (error) {
    return error;
  }
};

const Login = () => {
  const message = useLoaderData() as string;
  const error = useActionData() as { message: string };
  const navigation = useNavigation();

  return (
    <main>
      <Container>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Form
            method="post"
            replace
            className="w-[350px] bg-white p-8 rounded flex flex-col gap-5"
          >
            {message ? (
              <div className="px-3 py-2 rounded bg-red-300">{message}</div>
            ) : null}

            {error?.message ? (
              <div className="px-3 py-2 rounded bg-red-300">
                {error?.message}
              </div>
            ) : null}

            <input
              type="email"
              name="email"
              placeholder="enter email"
              className="border px-3 py-2 rounded outline-1 outline-slate-300"
              autoComplete="true"
            />

            <input
              type="password"
              name="password"
              placeholder="enter password "
              className="border px-3 py-2 rounded outline-1 outline-slate-300"
              autoComplete="true"
            />
            <button
              type="submit"
              className="bg-slate-700 hover:bg-slate-800 transition duration-300 ease-in-out text-slate-100 rounded border px-3 py-2 w-full"
              disabled={navigation.state === "submitting" ? true : false}
            >
              {navigation.state === "submitting" ? "Login..." : "Login"}
            </button>
          </Form>
        </div>
      </Container>
    </main>
  );
};

export default Login;
