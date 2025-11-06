import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminCheck = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;

    if (!adminCheck[0] || adminCheck[0].role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    // Get all users with their test statistics
    const users = await sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        u."emailVerified",
        u.image,
        COUNT(ts.id) as total_tests,
        COUNT(tr.id) as completed_tests,
        AVG(tr.scaled_score) as avg_score,
        MAX(tr.scaled_score) as best_score
      FROM auth_users u
      LEFT JOIN test_sessions ts ON u.id = ts.user_id
      LEFT JOIN test_results tr ON ts.id = tr.session_id
      GROUP BY u.id, u.name, u.email, u.role, u."emailVerified", u.image
      ORDER BY u.role DESC, u.name ASC
    `;

    return Response.json({
      users: users,
      count: users.length,
    });
  } catch (err) {
    console.error("GET /api/admin/users error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const adminCheck = await sql`
      SELECT role FROM auth_users WHERE id = ${session.user.id}
    `;

    if (!adminCheck[0] || adminCheck[0].role !== "admin") {
      return Response.json({ error: "Admin access required" }, { status: 403 });
    }

    const { userId, role } = await request.json();

    if (!userId || !role) {
      return Response.json(
        { error: "User ID and role are required" },
        { status: 400 },
      );
    }

    if (!["user", "admin"].includes(role)) {
      return Response.json(
        { error: "Invalid role. Must be 'user' or 'admin'" },
        { status: 400 },
      );
    }

    // Don't let admin demote themselves
    if (userId == session.user.id && role !== "admin") {
      return Response.json(
        { error: "You cannot change your own admin role" },
        { status: 400 },
      );
    }

    // Update user role
    const result = await sql`
      UPDATE auth_users 
      SET role = ${role}
      WHERE id = ${userId}
      RETURNING id, name, email, role
    `;

    if (result.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      message: `User role updated to ${role}`,
      user: result[0],
    });
  } catch (err) {
    console.error("PUT /api/admin/users error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
