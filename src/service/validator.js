const Joi = require("joi");

const ValidateGetAllData = (data) => {
  const GetAllDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
  });
  return GetAllDataSchema.validate(data);
}

const ValidateInsertUserData = (data) => {
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

const ValidateInsertEducationData = (data) => {
  const InsertEducationDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    additional_name: Joi.string(),
    city: Joi.string(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string(),
    information: Joi.string(),
    grade: Joi.string(),
  });
  return InsertEducationDataSchema.validate(data);
};

const ValidateInsertExperienceData = (data) => {
  const InsertExperienceDataSchema = Joi.object({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    additional_name: Joi.string(),
    position: Joi.string(),
    city: Joi.string(),
    country: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string(),
    information: Joi.string(),
  });
  return InsertExperienceDataSchema.validate(data);
};

module.exports = {
  ValidateInsertUserData,
  ValidateInsertEducationData,
  ValidateGetAllData,
  ValidateInsertExperienceData,
};
