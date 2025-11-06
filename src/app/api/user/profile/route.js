import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const rows = await sql`
      SELECT id, name, email, image, role 
      FROM auth_users 
      WHERE id = ${userId} 
      LIMIT 1
    `;

    const user = rows?.[0] || null;
    return Response.json({ user });
  } catch (err) {
    console.error("GET /api/user/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { role, name, image } = body || {};

    const setClauses = [];
    const values = [];

    if (typeof role === "string" && (role === "user" || role === "admin")) {
      setClauses.push("role = $" + (values.length + 1));
      values.push(role);
    }

    if (typeof name === "string" && name.trim().length > 0) {
      setClauses.push("name = $" + (values.length + 1));
      values.push(name.trim());
    }

    if (typeof image === "string") {
      setClauses.push("image = $" + (values.length + 1));
      values.push(image);
    }

    if (setClauses.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    const finalQuery = `
      UPDATE auth_users 
      SET ${setClauses.join(", ")} 
      WHERE id = $${values.length + 1} 
      RETURNING id, name, email, image, role
    `;

    const result = await sql(finalQuery, [...values, userId]);
    const updated = result?.[0] || null;

    return Response.json({ user: updated });
  } catch (err) {
    console.error("PUT /api/user/profile error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
