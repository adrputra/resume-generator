import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
export async function excuteQuery({ text, values }) {
  console.log("EXE", text, values);
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(text, values, (err, res) => {
        if (err) {
          // console.log('CB ERR', err.message)
          reject(err);
        }
        // console.log('CB RES', res)
        resolve(res);
      });
    });
    // console.log('RES SERVICE', result)
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
}
