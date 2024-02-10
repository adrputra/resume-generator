const Joi = require("joi");

export const ValidateGetAllData = (data) => {
  const GetAllDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
  });
  return GetAllDataSchema.validate(data);
}

export const ValidateInsertUserData = (data) => {
  const InsertUserDataSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone_number: Joi.string(),
    email: Joi.string().required(),
    linkedin: Joi.string(),
    portfolio: Joi.string(),
  });
  return InsertUserDataSchema.validate(data);
};

export const ValidateInsertEducationData = (data) => {
  const InsertEducationDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    additional_name: Joi.string(),
    city: Joi.string(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.any(),
    information: Joi.string(),
    grade: Joi.string(),
  });
  return InsertEducationDataSchema.validate(data);
};

export const ValidateInsertExperienceData = (data) => {
  const InsertExperienceDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    additional_name: Joi.string(),
    position: Joi.string(),
    city: Joi.string(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.any(),
    information: Joi.string(),
  });
  return InsertExperienceDataSchema.validate(data);
};

export const ValidateInsertWorkData = (data) => {
  const InsertWorkDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    additional_name: Joi.string(),
    position: Joi.string(),
    city: Joi.string(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.any(),
    information: Joi.string(),
  });
  return InsertWorkDataSchema.validate(data);
};

export const ValidateInsertCertData = (data) => {
  const InsertCertDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    publisher: Joi.string(),
    created_at: Joi.string().required(),
    expired_at: Joi.any(),
    information: Joi.any(),
  });
  return InsertCertDataSchema.validate(data);
};

export const ValidateInsertSkillData = (data) => {
  const InsertSkillDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    category: Joi.string().required(),
    name: Joi.string().required(),
  });
  return InsertSkillDataSchema.validate(data);
};