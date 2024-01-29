import { excuteQuery } from './utils'

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
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM main_user WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetEducationData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM educations WHERE user_id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM experiences WHERE user_id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetSkillData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM skills WHERE user_id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetWorkingExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM working_experiences WHERE user_id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetAllData = async (data) => {
  const user = await GetUserData(data)
  const edu = await GetEducationData(data)
  const exp = await GetExperienceData(data)
  const skill = await GetSkillData(data)
  const work = await GetWorkingExperienceData(data)

  return { user, edu, exp, skill, work }
}

export const InsertUserData = async (data) => {
    const query = {
        text: 'INSERT INTO main_user VALUES (?, ?, ?, ?, ?, ?, ?)',
        values: [data.id, data.name, data.address, data.phone_number, data.email, data.linkedin, data.portfolio]
      }
  
      return await excuteQuery(query)
}