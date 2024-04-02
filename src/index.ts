import { Hono } from "hono";
import { registerController, xyzController } from "endpoints/user_controller";
import { Pool } from "@neondatabase/serverless";
import { verifyToken } from "middleware/token_verification";

interface Env {
  DATABASE_URL: string;
}
const app = new Hono();
const pool = new Pool({
  connectionString:
    "postgresql://application_owner:ZWI8GVOo7Ybh@ep-broad-butterfly-a1tk0dfl.ap-southeast-1.aws.neon.tech/application?sslmode=require",
});
app.post("/register", registerController);
app.use("/xyz", verifyToken);
app.post("/xyz", xyzController);
const fetch = async (request: Request, env: Env, ctx: ExecutionContext) => {
  // const client = await pool.connect();
  // await client.release();

  const response = app.request(request);

  return response;
};
export default {
  fetch,
};
