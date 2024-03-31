import { Hono } from "hono";
import { registerController } from "endpoints/user_controller";
import { Pool } from "@neondatabase/serverless";

interface Env {
  DATABASE_URL: string;
}
const app = new Hono();
const pool = new Pool({
  connectionString:
    "postgresql://application_owner:ZWI8GVOo7Ybh@ep-broad-butterfly-a1tk0dfl.ap-southeast-1.aws.neon.tech/application?sslmode=require",
});
app.post("/register", registerController);
const fetch = async (request: Request, env: Env, ctx: ExecutionContext) => {
  const client = await pool.connect();
  await client.release();

  const response = app.request(request);

  return response;
};
export default {
  fetch,
};
