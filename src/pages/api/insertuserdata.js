import { InsertUserData, GetUserData, UpdateUserData } from "@/service/action";
import { ValidateInsertUserData } from "@/service/validator";

export default async function handler(req, res) {
  const request = req.body.data;
  const data = {
    id: request.id,
    name: request.name,
    address: `${request.city}, ${request.country}`,
    phone_number: request.phone_number,
    email: request.email,
    linkedin: request.linkedin,
    portfolio: request.portfolio,
  };

  try {
    const { error } = ValidateInsertUserData(data);

    if (error) {
      return res
        .status(400)
        .json({ status: "failure", message: error.message, result: null });
    }

    const exist = await GetUserData(data);

    if (exist.result.length > 0) {
      console.info("REQ UPDATE USER DATA", data);

      const result = await UpdateUserData(data);

      console.info("RES UPDATE USER DATA", result);
    } else {
      console.info("REQ INSERT USER DATA", data);

      const result = await InsertUserData(data);

      console.info("RES INSERT USER DATA", result);
    }

    return res.status(200).json({
      status: "success",
      message: "Your User Profile Data Saved Successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "failure", message: error.message, result: null });
  }
}
