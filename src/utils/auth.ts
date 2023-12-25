import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isAuth = false;

  if (!isAuth) {
    throw redirect("/login");
  }

  return null;
}
