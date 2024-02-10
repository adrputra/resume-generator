import { Button, TextInput, Label, Tooltip } from "flowbite-react";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context";
import { DynamicAdd } from "@/components/DynamicAdd";
import { CapitalizeEachLetter } from "@/service/formatter";
import { SaveButton } from "@/components/SaveButton";
import Datepicker from "react-tailwindcss-datepicker";

export function Education({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const educationData = context?.education || [
    { institution_information: [""] },
  ];

  const handleAddEducation = () => {
    const updatedEducation = [
      ...educationData,
      { institution_information: [""] },
    ];
    updateContext({ ...context, education: updatedEducation });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    updateContext({ ...context, education: updatedEducation });
  };

  const handleInputChange = (index, field, value) => {
    const updatedEducation = [...educationData];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    updateContext({ ...context, education: updatedEducation });
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
          onClick={handleAddEducation}
          className="h-auto w-25 mt-2 bg-blue-500 hover:bg-blue-700"
        >
          <MdAddCircleOutline className="h-6 w-6 mr-2" />
          Add More
        </Button>
        <SaveButton
          action="education"
          url={process.env.NEXT_PUBLIC_RESUME_GEN_INSERT_EDUCATION}
          isError={handleErrorMessage}
        />
      </div>
      <div className="grid grid-cols-4 gap-12">
        {educationData.map((education, index) => (
          <div
            className="grid grid-flow-row auto-rows-max mx-auto gap-4 my-4"
            key={index}
          >
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Institution" />
              </div>
              <TextInput
                label="Institution"
                id={`institution_${index}`}
                value={education.institution || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "institution",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Major" />
              </div>
              <TextInput
                label="Major"
                id={`major_${index}`}
                value={education.major || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "major",
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
                id={`institution_city_${index}`}
                value={education.city || ""}
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
                id={`institution_country_${index}`}
                value={education.country || ""}
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
                id={`institution_start_date_${index}`}
                value={
                  {
                    startDate: education.start_date,
                    endDate: education.start_date,
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
                id={`institution_end_date_${index}`}
                value={
                  {
                    startDate: education.end_date,
                    endDate: education.end_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "end_date", e.endDate)
                }
              />
            </div>
            <div className="flex flex-auto flex-col w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="GPA" />
              </div>
              <TextInput
                label="GPA"
                id={`grade_${index}`}
                value={education.grade || ""}
                onChange={(e) =>
                  handleInputChange(index, "grade", e.target.value)
                }
              />
            </div>
            <DynamicAdd
              label="Information"
              name="institution_information"
              id={`institution_information_${index}`}
              action={"education"}
              index={index}
            />
            <Button
              pill
              onClick={() => handleRemoveEducation(index)}
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
