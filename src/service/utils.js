import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: process.env.NEXT_PUBLIC_RESUME_GEN_DB_HOST,
    port: process.env.NEXT_PUBLIC_RESUME_GEN_DB_PORT,
    database: process.env.NEXT_PUBLIC_RESUME_GEN_DB_NAME,
    user: process.env.NEXT_PUBLIC_RESUME_GEN_DB_USER,
    password: process.env.NEXT_PUBLIC_RESUME_GEN_DB_PASSWORD,
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
