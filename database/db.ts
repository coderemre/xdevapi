var mysqlx = require("@mysql/xdevapi");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 33060,
  connectTimeout: 10000, //10 sec
};

const connection: any = {};
const client = mysqlx.getClient(config, {
  pooling: {
    enabled: true,
    maxSize: 25,
  },
});

connection.getInstance = async (DBName: string) => {
  try {
    const session = await client.getSession();
    const schema = await session.getSchema(DBName);
    return [session, schema];
  } catch (error) {
    console.log("#### DB connection getInstance line ####");
    console.log(error);
    return error;
  }
};

connection.close = async () => {
  try {
    return await client.close();
  } catch (error) {
    console.log("#### DB connection closed line ####");
    console.log(error);
    return error;
  }
};

module.exports = connection;
