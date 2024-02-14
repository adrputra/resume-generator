import {
  InsertEducationData,
  GetEducationData,
  GetEducationDataById,
  UpdateEducationData,
  DeleteEducationData,
} from "@/service/action";
import { ValidateInsertEducationData } from "@/service/validator";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  let dataNew = [];

  try {
    for (let index = 0; index < req.body.data.length; index++) {
      const item = req.body.data[index];

      const information = item.institution_information.join("|");

      const data = {
        id: item.id ? item.id : uuidv4(),
        user_id: req.body.user_id,
        name: item.institution,
        additional_name: item.major,
        city: item.city,
        country: item.country,
        start_date: item.start_date.split("T")[0],
        end_date: item?.end_date ? item?.end_date.split("T")[0] : null,
        information: information,
        grade: item.grade,
      };

      dataNew.push(data.id);

      const { error } = ValidateInsertEducationData(data);

      if (error) {
        return res
          .status(400)
          .json({ status: "failure", message: error.message, result: null });
      }

      const exist = await GetEducationDataById(data);

      if (exist.result.length > 0) {
        console.info("REQ UPDATE EDUCATION DATA", data);

        const result = await UpdateEducationData(data);

        console.info("RES UPDATE EDUCATION DATA", result);
      } else {
        console.info("REQ INSERT EDUCATION DATA", data);

        const result = await InsertEducationData(data);

        console.info("RES INSERT EDUCATION DATA", result);
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Education Data Saved Successfully",
    });
    
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failure", message: error.message, result: null });
  } finally {
    let dataDelete = [];

    console.info("REQ GET EDUCATION DATA", req.body.user_id);
    const { result } = await GetEducationData({ user_id: req.body.user_id });
    console.info("RES GET EDUCATION DATA", result);

    if (result.length > dataNew.length) {
      result.forEach((item) => {
        if (!dataNew.includes(item.id)) {
          dataDelete.push(item.id);
        }
      });
      if (dataDelete.length > 0) {
        for (let index = 0; index < dataDelete.length; index++) {
          console.info("REQ DELETE EDUCATION DATA", dataDelete[index]);
          const result = await DeleteEducationData({ id: dataDelete[index] });
          console.info("RES DELETE EDUCATION DATA", result);
        }
      }
    }
  }
}
