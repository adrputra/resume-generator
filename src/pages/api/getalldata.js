import {
  GetUserData,
  GetEducationData,
  GetExperienceData,
  GetSkillData,
  GetWorkData,
  GetCertData,
} from "@/service/action";
import { ValidateGetAllData } from "@/service/validator";

export default async function handler(req, res) {
  try {
    console.info("REQ GET ALL DATA", req.body);

    const { error } = ValidateGetAllData(req.body);

    if (error) {
      return res
        .status(400)
        .json({ status: "failure", message: error.message, result: null });
    }

    let user = await GetUserData(req.body);
    let edu = await GetEducationData(req.body);
    let exp = await GetExperienceData(req.body);
    let skill = await GetSkillData(req.body);
    let work = await GetWorkData(req.body);
    let cert = await GetCertData(req.body);

    user = user?.result || user?.error;
    edu = edu?.result || edu?.error;
    exp = exp?.result || exp?.error;
    skill = skill?.result || skill?.error;
    work = work?.result || work?.error;
    cert = cert?.result || cert?.error;

    const result = {
      user,
      edu,
      exp,
      skill,
      work,
      cert,
    };
    console.info("RES GET ALL DATA", result);

    return res
      .status(200)
      .json({ status: "success", result, message: "Data Loaded Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failure", message: error.message, result: null });
  }
}
