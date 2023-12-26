import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isAuth = JSON.parse(localStorage.getItem("loginVan") || "false");

  if (!isAuth) {
    throw redirect("/login?message=You must login to view your vans");
  }

  return null;
}
