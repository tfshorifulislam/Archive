import { headers } from "next/headers";

export async function currentUser() {
  const headersList = await headers();
  const cookie = headersList.get("cookie");

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/session`,
    {
      headers: {
        cookie: cookie ?? "",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}