import { Button, TextInput, Label, Tooltip } from "flowbite-react";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircle,
  MdClear,
} from "react-icons/md";
import makeAnimated from "react-select/animated";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/context";
import { CapitalizeEachLetter } from "@/service/formatter";
import { SaveButton } from "@/components/SaveButton";
import { skillSet } from "@/../public/data";
import { Multiselect } from "react-widgets";
import "react-widgets/styles.css";

export function Skill({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const skillData = context?.skill || [{ skill_information: [""] }];

  const [skillList, setSkillList] = useState(skillSet);

  const handleCreate = (value) => {
    // const updatedSkill = [...skillData];
    // updatedSkill[index] = { ...updatedSkill[index], [field]: value };
    // updateContext({ ...context, skill: updatedSkill });

    setSkillList((data) => [{ label: value, value: value }, ...data]);
  };

  const handleAddSkill = () => {
    const updatedSkill = [...skillData, { skill_information: [""] }];
    updateContext({ ...context, skill: updatedSkill });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkill = [...skillData];
    updatedSkill.splice(index, 1);
    updateContext({ ...context, skill: updatedSkill });
  };

  const handleInputChange = (index, field, value) => {
    const updatedSkill = [...skillData];
    updatedSkill[index] = { ...updatedSkill[index], [field]: value };
    updateContext({ ...context, skill: updatedSkill });
  };

  const handleErrorMessage = (error) => {
    showAlert(error.code, error.msg);
    setTimeout(() => {
      hideAlert();
    }, 10000);
  };

  const filterSkill = (inputValue) => {
    return skillSet.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterSkill(inputValue));
      }, 1000);
    });

  const animatedComponents = makeAnimated();

  return (
    <div className="container mx-auto">
      <div className="grid grid-flow-col auto-cols-max gap-4 my-auto">
        <Button
          // pill
          onClick={handleAddSkill}
          className="h-auto w-25 mt-2 bg-blue-500 hover:bg-blue-700"
        >
          <MdAddCircleOutline className="h-6 w-6 mr-2" />
          Add More
        </Button>
        <SaveButton
          action="skill"
          url={process.env.NEXT_PUBLIC_INSERT_SKILL}
          isError={handleErrorMessage}
        />
        {/* <UploadParamButton
          action="skill"
          url={process.env.NEXT_PUBLIC_INSERT_PARAM_SKILL}
          isError={handleErrorMessage}
        /> */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {skillData.map((skill, index) => (
          <div
            className="grid grid-flow-row auto-rows-max w-full mx-auto gap-4 my-4"
            key={index}
          >
            <div className="flex flex-auto flex-col w-full gap-4">
              <div className="block">
                <Label htmlFor="base" value="Category" />
              </div>
              <TextInput
                label="Category"
                id={`category_${index}`}
                value={skill.category || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "category",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-full gap-4">
              <div className="block">
                <Label htmlFor="base" value="Skill" />
              </div>
              <Multiselect
                clearTagIcon={<MdClear />}
                allowCreate={true}
                id={`skill_${index}`}
                textField="label"
                dataKey="value"
                data={skillList}
                // filter="contains"
                value={skill.skill_information}
                onCreate={handleCreate}
                onChange={(e) =>
                  handleInputChange(index, "skill_information", e)
                }
              />
            </div>
            <Button
              pill
              onClick={() => handleRemoveSkill(index)}
              className="h-8 w-25 bg-red-500 mt-2 hover:bg-red-700"
            >
              <MdOutlineRemoveCircle className="h-6 w-6 mr-2" />
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
