"use server"
import { excuteQuery } from './utils'

export const GetUserData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM main_user WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const UpdateUserData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE main_user SET name = ?, address = ?, phone_number = ?, email = ?, linkedin = ?, portfolio = ? WHERE id = ?',
    values: [data.name, data.address, data.phone_number, data.email, data.linkedin, data.portfolio, data.id]
  }

  return await excuteQuery(query)
}

export const InsertUserData = async (data) => {
  const query = {
      text: 'INSERT INTO main_user VALUES (?, ?, ?, ?, ?, ?, ?)',
      values: [data.id, data.name, data.address, data.phone_number, data.email, data.linkedin, data.portfolio]
    }

    return await excuteQuery(query)
}

export const GetEducationData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM educations WHERE user_id = ?',
    values: [data.user_id]
  }

  return await excuteQuery(query)
}

export const GetEducationDataById = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM educations WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const InsertEducationData = async (data) => {
  const query = {
      text: 'INSERT INTO educations (id, user_id, name, additional_name, city, country, start_date, end_date, information, grade) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [data.id, data.user_id, data.name, data.additional_name, data.city, data.country, data.start_date, data.end_date, data.information, data.grade]
    }

    return await excuteQuery(query)
}

export const UpdateEducationData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE educations SET user_id = ? , name = ?, additional_name = ?, city = ?, country = ?, start_date = ?, end_date = ?, information = ?, grade = ? WHERE id = ?',
    values: [data.user_id, data.name, data.additional_name, data.city, data.country, data.start_date, data.end_date, data.information, data.grade, data.id]
  }

  return await excuteQuery(query)
}

export const DeleteEducationData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'DELETE FROM educations WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM experiences WHERE user_id = ?',
    values: [data.user_id]
  }

  return await excuteQuery(query)
}

export const GetExperienceDataById = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM experiences WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const InsertExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'INSERT INTO experiences (id, user_id, name, additional_name, position, city, country, start_date, end_date, information) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    values: [data.id, data.user_id, data.name, data.additional_name, data.position, data.city, data.country, data.start_date, data.end_date, data.information]
  }

  return await excuteQuery(query)
}

export const UpdateExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE experiences SET user_id = ? , name = ?, additional_name = ?, position = ?, city = ?, country = ?, start_date = ?, end_date = ?, information = ? WHERE id = ?',
    values: [data.user_id, data.name, data.additional_name, data.position, data.city, data.country, data.start_date, data.end_date, data.information, data.id]
  }

  return await excuteQuery(query)
}

export const DeleteExperienceData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'DELETE FROM experiences WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetSkillData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM skills WHERE user_id = ?',
    values: [data.user_id]
  }

  return await excuteQuery(query)
}

export const GetSkillDataById = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM skills WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const InsertSkillData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'INSERT INTO skills (id, user_id, category, name) VALUES( ?, ?, ?, ?)',
    values: [data.id, data.user_id, data.category, data.name]
  }

  return await excuteQuery(query)
}

export const UpdateSkillData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE skills SET user_id= ?, category= ?, name= ? WHERE id= ?',
    values: [data.user_id, data.category, data.name, data.id]
  }

  return await excuteQuery(query)
}

export const DeleteSkillData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'DELETE FROM skills WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetWorkData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM working_experiences WHERE user_id = ?',
    values: [data.user_id]
  }

  return await excuteQuery(query)
}

export const GetWorkDataById = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM educations WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const InsertWorkData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'INSERT INTO working_experiences (id, user_id, name, additional_name, position, city, country, start_date, end_date, information) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    values: [data.id, data.user_id, data.name, data.additional_name, data.position, data.city, data.country, data.start_date, data.end_date, data.information]
  }

  return await excuteQuery(query)
}

export const UpdateWorkData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE working_experiences SET user_id = ? , name = ?, additional_name = ?, position = ?, city = ?, country = ?, start_date = ?, end_date = ?, information = ? WHERE id = ?',
    values: [data.user_id, data.name, data.additional_name, data.position, data.city, data.country, data.start_date, data.end_date, data.information, data.id]
  }

  return await excuteQuery(query)
}

export const DeleteWorkData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'DELETE FROM working_experiences WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const GetCertData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM certifications WHERE user_id = ?',
    values: [data.user_id]
  }

  return await excuteQuery(query)
}

export const GetCertDataById = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'SELECT * FROM certifications WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}

export const InsertCertData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'INSERT INTO certifications (id, user_id, name, publisher, created_at, expired_at, information) VALUES( ?, ?, ?, ?, ?, ?, ?)',
    values: [data.id, data.user_id, data.name, data.publisher, data.created_at, data.expired_at, data.information]
  }

  return await excuteQuery(query)
}

export const UpdateCertData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'UPDATE certifications SET user_id= ?, name= ?, publisher= ?, created_at= ?, expired_at= ?, information= ? WHERE id= ?',
    values: [data.user_id, data.name, data.publisher, data.created_at, data.expired_at, data.information, data.id]
  }

  return await excuteQuery(query)
}

export const DeleteCertData = async (data) => {
  console.log('DATA',data);
  const query = {
    text: 'DELETE FROM certifications WHERE id = ?',
    values: [data.id]
  }

  return await excuteQuery(query)
}