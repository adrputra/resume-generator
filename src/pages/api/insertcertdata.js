import {
    InsertCertData,
    GetCertData,
    GetCertDataById,
    UpdateCertData,
    DeleteCertData,
  } from "@/service/action";
  import { ValidateInsertCertData } from "@/service/validator";
  import { v4 as uuidv4 } from "uuid";
  
  export default async function handler(req, res) {
    let dataNew = [];
  
    try {
      for (let index = 0; index < req.body.data.length; index++) {
        const item = req.body.data[index];
  
        const information = item.cert_information.join("|");
  
        const data = {
          id: item.id ? item.id : uuidv4(),
          user_id: req.body.user_id,
          name: item.title,
          publisher: item.subtitle,
          created_at: item?.start_date.split("T")[0],
          expired_at: item?.end_date ? item?.end_date.split("T")[0] : null,
          information: information ? information : null,
        };
  
        dataNew.push(data.id);
  
        const { error } = ValidateInsertCertData(data);
  
        if (error) {
          return res
            .status(400)
            .json({ status: "failure", message: error.message, result: null });
        }
  
        const exist = await GetCertDataById(data);
  
        if (exist.result.length > 0) {
          console.info("REQ UPDATE CERT DATA", data);
  
          const result = await UpdateCertData(data);
  
          console.info("RES UPDATE CERT DATA", result);
        } else {
          console.info("REQ INSERT CERT DATA", data);
  
          const result = await InsertCertData(data);
  
          console.info("RES INSERT CERT DATA", result);
        }
      }
  
      return res.status(200).json({
        status: "success",
        message: "Certification Data Saved Successfully",
      });
      
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failure", message: error.message, result: null });
    } finally {
      let dataDelete = [];
  
      console.info("REQ GET CERT DATA", req.body.user_id);
      const { result } = await GetCertData({ user_id: req.body.user_id });
      console.info("RES GET CERT DATA", result);
  
      if (result.length > dataNew.length) {
        result.forEach((item) => {
          if (!dataNew.includes(item.id)) {
            dataDelete.push(item.id);
          }
        });
        if (dataDelete.length > 0) {
          for (let index = 0; index < dataDelete.length; index++) {
            console.info("REQ DELETE CERT DATA", dataDelete[index]);
            const result = await DeleteCertData({ id: dataDelete[index] });
            console.info("RES DELETE CERT DATA", result);
          }
        }
      }
    }
  }
  