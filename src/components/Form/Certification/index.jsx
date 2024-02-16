import { Button, TextInput, Label, Tooltip } from "flowbite-react";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "@/context";
import { DynamicAdd } from "@/components/DynamicAdd";
import { CapitalizeEachLetter } from "@/service/formatter";
import { SaveButton } from "@/components/SaveButton";
import Datepicker from "react-tailwindcss-datepicker";

export function Certification({ showAlert, hideAlert }) {
  const { context, updateContext } = useContext(Context);
  const certData = context?.certification || [{ cert_information: [""] }];

  const handleAddCert = () => {
    const updatedCert = [...certData, { cert_information: [""] }];
    updateContext({ ...context, certification: updatedCert });
  };

  const handleRemoveCert = (index) => {
    const updatedCert = [...certData];
    updatedCert.splice(index, 1);
    updateContext({ ...context, certification: updatedCert });
  };

  const handleInputChange = (index, field, value) => {
    const updatedCert = [...certData];
    updatedCert[index] = { ...updatedCert[index], [field]: value };
    updateContext({ ...context, certification: updatedCert });
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
          onClick={handleAddCert}
          className="h-auto w-25 mt-2 bg-blue-500 hover:bg-blue-700"
        >
          <MdAddCircleOutline className="h-6 w-6 mr-2" />
          Add More
        </Button>
        <SaveButton
          action="certification"
          url={process.env.NEXT_PUBLIC_RESUME_GEN_INSERT_CERTIFICATION}
          isError={handleErrorMessage}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {certData.map((cert, index) => (
          <div
            className="grid grid-flow-row auto-rows-max mx-auto gap-4 my-4"
            key={index}
          >
            <div className="flex flex-auto flex-col md:w-64 gap-4">
              <div className="block">
                <Label htmlFor="base" value="Certification Title" />
              </div>
              <TextInput
                label="Certification Title"
                id={`cert_${index}`}
                value={cert.title || ""}
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
                <Label htmlFor="base" value="Publisher" />
              </div>
              <TextInput
                label="Publisher"
                id={`publisher_${index}`}
                value={cert.subtitle || ""}
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
                <Label htmlFor="base" value="Start Date" />
              </div>
              <Datepicker
                asSingle={true}
                useRange={false}
                showShortcuts={true}
                id={`cert_start_date_${index}`}
                value={
                  {
                    startDate: cert.start_date,
                    endDate: cert.start_date,
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
                id={`cert_end_date_${index}`}
                value={
                  {
                    startDate: cert.end_date,
                    endDate: cert.end_date,
                  } || ""
                }
                onChange={(e) =>
                  handleInputChange(index, "end_date", e.endDate)
                }
              />
            </div>
            <DynamicAdd
              label="Information"
              name="cert_information"
              id={`cert_information_${index}`}
              index={index}
              action="certification"
            />
            <Button
              pill
              onClick={() => handleRemoveCert(index)}
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
