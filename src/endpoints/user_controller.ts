import { sign } from "hono/jwt";
import { Client } from "@neondatabase/serverless";
const client = new Client(
  "postgresql://application_owner:ZWI8GVOo7Ybh@ep-broad-butterfly-a1tk0dfl.ap-southeast-1.aws.neon.tech/application?sslmode=require"
);

const registerController = async (c) => {
  console.log(client);

  try {
    const body = await c.req.json();
    const { username, email, password } = body;
    // await client.connect();
    const result = await client.query(
      `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)`,
      [username, email, password]
    );
    const userDetails = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    console.log(userDetails);
    const payload = {
      result: result,
      username: username,
      password: password,
      exp: Math.floor(Date.now() / 1000) + 60 * 6000,
    };
    const secret = "secret";
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
const loginController = async (c) => {
  try {
    // await client.connect();
    const body = await c.req.json();
    const { username, email, password } = body;
    // await client.connect();
    console.log(username);
    const userDetails = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    console.log(userDetails);
    const payload = {
      username: username,
      password: password,
      exp: Math.floor(Date.now() / 1000) + 60 * 6000,
    };
    const secret = "secret";
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

export { registerController, loginController };
