import { redirect } from "react-router-dom";

export async function requireAuth(request: Request) {
  const loginVan = localStorage.getItem("loginVan");
  let isAuth;
  if (loginVan) {
    isAuth = JSON.parse(loginVan);
  }

  const pathname = new URL(request.url).pathname;

  if (!isAuth) {
    throw redirect(
      `/login?message=You must login to view your vans${
        pathname ? `&redirectTo=${pathname}` : ""
      }`
    );
  }

  return null;
}
