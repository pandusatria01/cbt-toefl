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

    // Get all test results with user information
    const results = await sql`
      SELECT 
        tr.id,
        tr.session_id,
        tr.user_id,
        tr.listening_score,
        tr.structure_score,
        tr.reading_score,
        tr.total_score,
        tr.scaled_score,
        tr.completed_at,
        u.name as user_name,
        u.email as user_email
      FROM test_results tr
      LEFT JOIN auth_users u ON tr.user_id = u.id
      ORDER BY tr.completed_at DESC
    `;

    return Response.json({
      results: results,
      count: results.length,
    });
  } catch (err) {
    console.error("GET /api/admin/results error", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
