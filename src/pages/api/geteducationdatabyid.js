import { GetEducationDataById } from "@/service/action";
export default async function handler(req, res) {
  try {
    console.log(req.body);
    const result = await GetEducationDataById(req.body);
    console.log(result);
    return res
      .status(200)
      .json({ status: "success", result, message: "Get Education Data Successfully" });
  } catch (error) {
    console.error(error);
    return res
        .status(500)
        .json({ status: "failure", message: error.message, result: null });
  }
}
