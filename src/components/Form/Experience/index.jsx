import { Button, TextInput, Label, Tooltip } from "flowbite-react";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { DynamicAdd } from "@/components/DynamicAdd";
import { CapitalizeEachLetter } from "@/service/formatter";
import { SaveButton } from "@/components/SaveButton";
import Datepicker from "react-tailwindcss-datepicker";

export function Experience({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const experienceData = context?.experience || [{ exp_information: [""] }];

  const handleAddExperience = () => {
    const updatedExperience = [...experienceData, { exp_information: [""] }];
    updateContext({ ...context, experience: updatedExperience });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experienceData];
    updatedExperience.splice(index, 1);
    updateContext({ ...context, experience: updatedExperience });
  };

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experienceData];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    updateContext({ ...context, experience: updatedExperience });
  };

  const handleErrorMessage = (error) => {
    showAlert(error.code, error.msg);
    setTimeout(() => {
      hideAlert();
    }, 10000);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-flow-col auto-cols-max gap-4 my-auto">
        <Button
          // pill
          onClick={handleAddExperience}
          className="h-auto w-25 mt-2 bg-blue-500 hover:bg-blue-700"
        >
          <MdAddCircleOutline className="h-6 w-6 mr-2" />
          Add More
        </Button>
        <SaveButton
          action="experience"
          url={process.env.NEXT_PUBLIC_INSERT_EXPERIENCE}
          isError={handleErrorMessage}
        />
      </div>
      <div className="grid grid-cols-4 gap-12">
        {experienceData.map((experience, index) => (
          <div
            className="grid grid-flow-row auto-rows-max mx-auto gap-4 my-4"
            key={index}
          >
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Experience Title" />
              </div>
              <TextInput
                label="Experience Title"
                id={`experience_${index}`}
                value={experience.title || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "title",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Experience Information" />
              </div>
              <TextInput
                label="Experience Information"
                id={`subtitle_${index}`}
                value={experience.subtitle || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "subtitle",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Position" />
              </div>
              <TextInput
                label="Position"
                id={`position_${index}`}
                value={experience.position || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "position",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="City" />
              </div>
              <TextInput
                label="City"
                id={`experience_city_${index}`}
                value={experience.city || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "city",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Country" />
              </div>
              <TextInput
                label="Country"
                id={`experience_country_${index}`}
                value={experience.country || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "country",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Start Date" />
              </div>
              <Datepicker
                asSingle={true}
                useRange={false}
                showShortcuts={true}
                id={`experience_start_date_${index}`}
                value={
                  {
                    startDate: experience.start_date,
                    endDate: experience.start_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "start_date", e.startDate)
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="grid grid-flow-col auto-cols-max gap-4 my-auto">
                <Label htmlFor="base" value="End Date" />
                <Tooltip content="If it's still in progress, leave this field blank (or set it same as start date)">
                  <FaQuestionCircle />
                </Tooltip>
              </div>
              <Datepicker
                asSingle={true}
                useRange={false}
                showShortcuts={true}
                id={`experience_end_date_${index}`}
                value={
                  {
                    startDate: experience.end_date,
                    endDate: experience.end_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "end_date", e.endDate)
                }
              />
            </div>
            <DynamicAdd
              label="Information"
              name="exp_information"
              id={`exp_information_${index}`}
              index={index}
              action="experience"
            />
            <Button
              pill
              onClick={() => handleRemoveExperience(index)}
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
