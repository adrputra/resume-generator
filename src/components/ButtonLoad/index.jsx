import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { useContext } from "react";
import { Context } from "@/context";

export function LoadButton(props) {
  const { context, updateContext } = useContext(Context);

  const handleSave = async () => {
    const data = {
      id: props.data,
      user_id: props.data,
    };

    try {
      console.log(`REQ LOAD ALL DATA`, data);
      const response = await fetch(props.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(`RES LOAD ALL DATA`, result);

      const { user, edu, exp, skill, work, cert } = result.result;

      const newProfile = {
        id: user[0].id,
        name: user[0].name,
        city: user[0].address.split(",")[0],
        country: user[0].address.split(",")[1],
        phone_number: user[0].phone_number,
        email: user[0].email,
        linkedin: user[0].linkedin,
        portfolio: user[0].portfolio,
      };

      const newEducation = [];
      edu.forEach((item) => {
        const temp = {
          id: item.id,
          user_id: item.user_id,
          institution: item.name,
          major: item.additional_name,
          city: item.city,
          country: item.country,
          start_date: item.start_date,
          end_date: item.end_date ? item.end_date : "",
          institution_information: item.information
            ? item.information.split("|")
            : [""],
          grade: item.grade,
        };

        newEducation.push(temp);
      });

      const newExperience = [];
      exp.forEach((item) => {
        const temp = {
          id: item.id,
          user_id: item.user_id,
          title: item.name,
          subtitle: item.additional_name,
          position: item.position,
          city: item.city,
          country: item.country,
          start_date: item.start_date,
          end_date: item.end_date ? item.end_date : "",
          exp_information: item.information
            ? item.information.split("|")
            : [""],
        };

        newExperience.push(temp);
      });

      const newWork = [];
      work.forEach((item) => {
        const temp = {
          id: item.id,
          user_id: item.user_id,
          title: item.name,
          subtitle: item.additional_name,
          position: item.position,
          city: item.city,
          country: item.country,
          start_date: item.start_date,
          end_date: item.end_date ? item.end_date : "",
          work_information: item.information
            ? item.information.split("|")
            : [""],
        };

        newWork.push(temp);
      });

      const newCert = [];
      cert.forEach((item) => {
        const temp = {
          id: item.id,
          user_id: item.user_id,
          title: item.name,
          subtitle: item.publisher,
          start_date: item.created_at,
          end_date: item.expired_at ? item.expired_at : "",
          cert_information: item.information
            ? item.information.split("|")
            : [""],
        };

        newCert.push(temp);
      });

      const newSkill = [];
      skill.forEach((item) => {
        const temp = {
          id: item.id,
          user_id: item.user_id,
          category: item.category,
          skill_information: item.name
            ? item.name.split("|").map((item) => ({
                value: item,
                label: item,
              }))
            : null,
        };

        newSkill.push(temp);
      });

      const newContext = {
        profile: newProfile,
        education:
          newEducation.length > 0
            ? newEducation
            : [{ institution_information: [""] }],
        experience:
          newExperience.length > 0
            ? newExperience
            : [{ exp_information: [""] }],
        skill: newSkill.length > 0 ? newSkill : [{ skill_information: [""] }],
        work: newWork.length > 0 ? newWork : [{ work_information: [""] }],
        certification:
          newCert.length > 0 ? newCert : [{ cert_information: [""] }],
      };

      console.log('NEW CONTEXT', newContext);
      updateContext(newContext);
      
      props.isError({ msg: result.message, code: "success" });
    } catch (error) {
      console.error("Error hitting action:", error);
      props.isError({ msg: error.message, code: "failure" });
    }
  };

  return (
    <div>
      <Button
        size="md"
        processingSpinner={
          <AiOutlineLoading className="h-6 w-6 animate-spin" />
        }
        onClick={handleSave}
      >
        Load Data
      </Button>
    </div>
  );
}
