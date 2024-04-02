import { decode, verify } from "hono/jwt";
const verifyToken = async (c, next) => {
  console.log(c.req.header("authorization"));

  const bearerAuthorizationHeader = c.req.header("authorization");

  const tokenToVerifyAndDecode = bearerAuthorizationHeader.split("")[1];
  const secretKey = "secret";

  const decodedPayload = await verify(tokenToVerifyAndDecode, secretKey);
  console.log(decodedPayload);

  const { header, payload } = decode(tokenToVerifyAndDecode);
  console.log("Decoded Header:", header);
  console.log("Decoded Payload:", payload);
  c.req.payload = payload;
  await next();
};
export { verifyToken };
