import { Button, TextInput, Label, Tooltip } from "flowbite-react";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "@/context";
import { DynamicAdd } from "@/components/DynamicAdd";
import { CapitalizeEachLetter } from "@/service/formatter";
import { SaveButton } from "@/components/SaveButton";
import Datepicker from "react-tailwindcss-datepicker";

export function Work({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const workData = context?.work || [{ work_information: [""] }];

  const handleAddWork = () => {
    const updatedWork = [...workData, { work_information: [""] }];
    updateContext({ ...context, work: updatedWork });
  };

  const handleRemoveWork = (index) => {
    const updatedWork = [...workData];
    updatedWork.splice(index, 1);
    updateContext({ ...context, work: updatedWork });
  };

  const handleInputChange = (index, field, value) => {
    const updatedWork = [...workData];
    updatedWork[index] = { ...updatedWork[index], [field]: value };
    updateContext({ ...context, work: updatedWork });
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
          onClick={handleAddWork}
          className="h-auto w-25 mt-2 bg-blue-500 hover:bg-blue-700"
        >
          <MdAddCircleOutline className="h-6 w-6 mr-2" />
          Add More
        </Button>
        <SaveButton
          action="work"
          url={process.env.NEXT_PUBLIC_RESUME_GEN_INSERT_WORK}
          isError={handleErrorMessage}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {workData.map((work, index) => (
          <div
            className="grid grid-flow-row auto-rows-max mx-auto gap-4 my-4"
            key={index}
          >
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Work Experience Title" />
              </div>
              <TextInput
                label="Work Experience Title"
                id={`work_${index}`}
                value={work.title || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "title",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Work Experience Information" />
              </div>
              <TextInput
                label="Work Experience Information"
                id={`subtitle_${index}`}
                value={work.subtitle || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "subtitle",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Position" />
              </div>
              <TextInput
                label="Position"
                id={`position_${index}`}
                value={work.position || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "position",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="City" />
              </div>
              <TextInput
                label="City"
                id={`work_city_${index}`}
                value={work.city || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "city",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Country" />
              </div>
              <TextInput
                label="Country"
                id={`work_country_${index}`}
                value={work.country || ""}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "country",
                    CapitalizeEachLetter(e.target.value)
                  )
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Start Date" />
              </div>
              <Datepicker
                asSingle={true}
                useRange={false}
                showShortcuts={true}
                id={`work_start_date_${index}`}
                value={
                  {
                    startDate: work.start_date,
                    endDate: work.start_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "start_date", e.startDate)
                }
              />
            </div>
            <div className="flex flex-auto flex-col md:w-64 gap-4">
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
                id={`work_end_date_${index}`}
                value={
                  {
                    startDate: work.end_date,
                    endDate: work.end_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "end_date", e.endDate)
                }
              />
            </div>
            <DynamicAdd
              label="Information"
              name="work_information"
              id={`work_information_${index}`}
              index={index}
              action="work"
            />
            <Button
              pill
              onClick={() => handleRemoveWork(index)}
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
