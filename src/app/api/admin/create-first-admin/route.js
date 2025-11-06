import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { secret } = await request.json();

    // Simple secret check - you can change this secret
    if (secret !== "CREATE_FIRST_ADMIN_2024") {
      return Response.json({ error: "Invalid secret" }, { status: 403 });
    }

    // Check if any admin already exists
    const existingAdmins = await sql`
      SELECT id FROM auth_users WHERE role = 'admin' LIMIT 1
    `;

    if (existingAdmins.length > 0) {
      return Response.json(
        {
          error: "Admin already exists. Remove this endpoint for security.",
        },
        { status: 400 },
      );
    }

    // Make current user an admin
    const result = await sql`
      UPDATE auth_users 
      SET role = 'admin' 
      WHERE id = ${userId} 
      RETURNING id, name, email, role
    `;

    const updatedUser = result[0];

    return Response.json({
      message: "First admin created successfully! Please delete this endpoint.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("POST /api/admin/create-first-admin error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
