import {
    InsertExperienceData,
    GetExperienceData,
    GetExperienceDataById,
    UpdateExperienceData,
    DeleteExperienceData,
  } from "@/service/action";
  import { ValidateInsertExperienceData } from "@/service/validator";
  import { v4 as uuidv4 } from "uuid";
  
  export default async function handler(req, res) {
    let dataNew = [];
  
    try {
      for (let index = 0; index < req.body.data.length; index++) {
        const item = req.body.data[index];
  
        const information = item.exp_information.join("|");
  
        const data = {
          id: item.id ? item.id : uuidv4(),
          user_id: req.body.user_id,
          name: item.title,
          additional_name: item.subtitle,
          position: item.position,
          city: item.city,
          country: item.country,
          start_date: item?.start_date.split("T")[0],
          end_date: item?.end_date.split("T")[0],
          information: information,
        };
  
        dataNew.push(data.id);
  
        const { error } = ValidateInsertExperienceData(data);
  
        if (error) {
          return res
            .status(400)
            .json({ status: "failure", message: error.message, result: null });
        }
  
        const exist = await GetExperienceDataById(data);
  
        if (exist.result.length > 0) {
          console.info("REQ UPDATE EXPERIENCE DATA", data);
  
          const result = await UpdateExperienceData(data);
  
          console.info("RES UPDATE EXPERIENCE DATA", result);
        } else {
          console.info("REQ INSERT EXPERIENCE DATA", data);
  
          const result = await InsertExperienceData(data);
  
          console.info("RES INSERT EXPERIENCE DATA", result);
        }
      }
  
      return res.status(200).json({
        status: "success",
        message: "Experience Data Saved Successfully",
      });
      
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failure", message: error.message, result: null });
    } finally {
      let dataDelete = [];
  
      console.info("REQ GET EXPERIENCE DATA", req.body.user_id);
      const { result } = await GetExperienceData({ user_id: req.body.user_id });
      console.info("RES GET EXPERIENCE DATA", result);
  
      if (result.length > dataNew.length) {
        result.forEach((item) => {
          if (!dataNew.includes(item.id)) {
            dataDelete.push(item.id);
          }
        });
        if (dataDelete.length > 0) {
          for (let index = 0; index < dataDelete.length; index++) {
            console.info("REQ DELETE EXPERIENCE DATA", dataDelete[index]);
            const result = await DeleteExperienceData({ id: dataDelete[index] });
            console.info("RES DELETE EXPERIENCE DATA", result);
          }
        }
      }
    }
  }
  