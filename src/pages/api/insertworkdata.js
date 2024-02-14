import {
    InsertWorkData,
    GetWorkData,
    GetWorkDataById,
    UpdateWorkData,
    DeleteWorkData,
  } from "@/service/action";
  import { ValidateInsertWorkData } from "@/service/validator";
  import { v4 as uuidv4 } from "uuid";
  
  export default async function handler(req, res) {
    let dataNew = [];
  
    try {
      for (let index = 0; index < req.body.data.length; index++) {
        const item = req.body.data[index];
  
        const information = item.work_information.join("|");
  
        const data = {
          id: item.id ? item.id : uuidv4(),
          user_id: req.body.user_id,
          name: item.title,
          additional_name: item.subtitle,
          position: item.position,
          city: item.city,
          country: item.country,
          start_date: item?.start_date.split("T")[0],
          end_date: item?.end_date ? item?.end_date.split("T")[0] : null,
          information: information,
        };
  
        dataNew.push(data.id);
  
        const { error } = ValidateInsertWorkData(data);
  
        if (error) {
          return res
            .status(400)
            .json({ status: "failure", message: error.message, result: null });
        }
  
        const exist = await GetWorkDataById(data);
  
        if (exist.result.length > 0) {
          console.info("REQ UPDATE WORK DATA", data);
  
          const result = await UpdateWorkData(data);
  
          console.info("RES UPDATE WORK DATA", result);
        } else {
          console.info("REQ INSERT WORK DATA", data);
  
          const result = await InsertWorkData(data);
  
          console.info("RES INSERT WORK DATA", result);
        }
      }
  
      return res.status(200).json({
        status: "success",
        message: "Work Experience Data Saved Successfully",
      });
      
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failure", message: error.message, result: null });
    } finally {
      let dataDelete = [];
  
      console.info("REQ GET WORK DATA", req.body.user_id);
      const { result } = await GetWorkData({ user_id: req.body.user_id });
      console.info("RES GET WORK DATA", result);
  
      if (result.length > dataNew.length) {
        result.forEach((item) => {
          if (!dataNew.includes(item.id)) {
            dataDelete.push(item.id);
          }
        });
        if (dataDelete.length > 0) {
          for (let index = 0; index < dataDelete.length; index++) {
            console.info("REQ DELETE WORK DATA", dataDelete[index]);
            const result = await DeleteWorkData({ id: dataDelete[index] });
            console.info("RES DELETE WORK DATA", result);
          }
        }
      }
    }
  }
  