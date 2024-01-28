import { db } from './utils'

const DB = async (query) => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query.text, query.values, (err, res) => {
          if (err) {
            // console.log('CB ERR', err.message)
            reject(err)
          }
          // console.log('CB RES', res)
          resolve(res)
        })
      })
      // console.log('RES SERVICE', result)
      return { result, err: null }
    } catch (error) {
      // console.log('ERR SERVICE', error.sqlMessage)
      return { result: null, err: error }
    }
  }

export const GetUserData = async (data) => {
  const query = {
    text: 'SELECT u.*,e.*,s.*,ex.*,we.*,c.* FROM users u LEFT JOIN educations e ON u.user_id = e.user_id LEFT JOIN skills s ON u.user_id = s.user_id LEFT JOIN experiences ex ON u.user_id = ex.user_id LEFT JOIN working_experiences we ON u.user_id = we.user_id LEFT JOIN certifications c ON u.user_id = c.user_id WHERE u.user_id = ?',
    values: [data.id]
  }

  return await DB(query)
}

export const InsertUserData = async (data) => {
    const query = {
        text: 'INSERT INTO main_user VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [data.id, data.name, data.address, data.phone_number, data.email, data.linkedin, data.portfolio]
      }
  
      return await DB(query)
}