import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DB_RESUME_GEN,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
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
