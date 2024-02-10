import {
    InsertSkillData,
    GetSkillData,
    GetSkillDataById,
    UpdateSkillData,
    DeleteSkillData,
  } from "@/service/action";
  import { ValidateInsertSkillData } from "@/service/validator";
  import { v4 as uuidv4 } from "uuid";
  
  export default async function handler(req, res) {
    let dataNew = [];
  
    try {
      for (let index = 0; index < req.body.data.length; index++) {
        const item = req.body.data[index];
  
        const information = item.skill_information.map((e) => e.value).join("|");
  
        const data = {
          id: item.id ? item.id : uuidv4(),
          user_id: req.body.user_id,
          category: item.category,
          name: information,

        };
  
        dataNew.push(data.id);
  
        const { error } = ValidateInsertSkillData(data);
  
        if (error) {
          return res
            .status(400)
            .json({ status: "failure", message: error.message, result: null });
        }
  
        const exist = await GetSkillDataById(data);
  
        if (exist.result.length > 0) {
          console.info("REQ UPDATE SKILL DATA", data);
  
          const result = await UpdateSkillData(data);
  
          console.info("RES UPDATE SKILL DATA", result);
        } else {
          console.info("REQ INSERT SKILL DATA", data);
  
          const result = await InsertSkillData(data);
  
          console.info("RES INSERT SKILL DATA", result);
        }
      }
  
      return res.status(200).json({
        status: "success",
        message: "Skill Data Saved Successfully",
      });
      
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failure", message: error.message, result: null });
    } finally {
      let dataDelete = [];
  
      console.info("REQ GET SKILL DATA", req.body.user_id);
      const { result } = await GetSkillData({ user_id: req.body.user_id });
      console.info("RES GET SKILL DATA", result);
  
      if (result.length > dataNew.length) {
        result.forEach((item) => {
          if (!dataNew.includes(item.id)) {
            dataDelete.push(item.id);
          }
        });
        if (dataDelete.length > 0) {
          for (let index = 0; index < dataDelete.length; index++) {
            console.info("REQ DELETE SKILL DATA", dataDelete[index]);
            const result = await DeleteSkillData({ id: dataDelete[index] });
            console.info("RES DELETE SKILL DATA", result);
          }
        }
      }
    }
  }
  