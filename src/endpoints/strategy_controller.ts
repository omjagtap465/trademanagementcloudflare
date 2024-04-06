import { Client } from "@neondatabase/serverless";
const addStrategyController = async (c) => {
  function dbConnection() {
    const client = new Client(
      "postgresql://application_owner:ZWI8GVOo7Ybh@ep-broad-butterfly-a1tk0dfl.ap-southeast-1.aws.neon.tech/application?sslmode=require"
    );
    return client;
  }

  try {
    const body = await c.req.json();
    const { strategy_name, user_id } = body;
    const result = await dbConnection().query(
      `INSERT INTO strategies (strategy_name
,user_id)
        VALUES ($1, $2)`,
      [strategy_name, user_id]
    );
    const strategyResult = await dbConnection().query(
      "SELECT * FROM strategies WHERE strategy_name = $1",
      [strategy_name]
    );
    return c.json({
      data: {
        strategyDetail: strategyResult,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export { addStrategyController };
