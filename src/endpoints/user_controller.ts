import { decode, sign, verify } from "hono/jwt";
import { jwt } from "hono/jwt";
import { Client } from "@neondatabase/serverless";
// import { sql } from "../index";
const client = new Client(
  "postgresql://application_owner:ZWI8GVOo7Ybh@ep-broad-butterfly-a1tk0dfl.ap-southeast-1.aws.neon.tech/application?sslmode=require"
);

const registerController = async (c) => {
  const body = await c.req.json();
  const { username, email, password } = body;
  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)`,
      [username, email, password]
    );
    const payload = {
      username: username,
      password: password,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    };
    const secret = "mySecretKey";
    const token = await sign(payload, secret);
    return c.json({
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export { registerController };
