import { auth } from "auth"

export const GET = auth((req) => {
  console.log(req.auth);

  if (req.auth) {
    return Response.json(req.auth);
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any // TODO: Fix `auth()` return type