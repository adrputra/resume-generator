import { Button, Label, TextInput, Tooltip, Textarea } from "flowbite-react";
import { FaQuestionCircle } from "react-icons/fa";
import { MdAddCircleOutline, MdOutlineRemoveCircle } from "react-icons/md";
import { useContext } from "react";
import { Context } from "@/context";

export function DynamicAdd(props) {
  const { context, updateContext } = useContext(Context);
  const initialData = context?.[props.action] || {
    ...context,
    [props.action]: [{ [props.name]: [""] }],
  };

  const handleAddButton = () => {
    const updatedData = [...initialData];
    updatedData[props.index][props.name].push(""); // Push empty object to the specified array
    updateContext({ ...context, [props.action]: updatedData });
  };

  const handleRemoveButton = (index) => {
    const updatedData = [...initialData];
    updatedData[props.index][props.name].splice(index, 1);
    updateContext({ ...context, [props.action]: updatedData });
  };

  const handleInputChange = (index, value) => {
    const updatedData = [...initialData];
    updatedData[props.index][props.name][index] = value;
    updateContext({ ...context, [props.action]: updatedData });
  };

  return (
    <div className="container">
      <div className="inline-grid grid-cols-2 gap-4">
        <div className="grid grid-flow-col auto-cols-max gap-4 my-auto">
          <Label htmlFor="base" value={props.label} />
          <Tooltip content="Write down about your study (Study Focus, Project, etc.)">
            <FaQuestionCircle />
          </Tooltip>
        </div>
        <Button
          pill
          onClick={handleAddButton}
          className="h-6 w-6 rounded-full bg-blue-500"
        >
          <MdAddCircleOutline className="h-6 w-6" />
        </Button>
      </div>
      {initialData[props.index]?.[props.name].map((item, index) => (
        <div className="grid grid-cols-6 gap-4" key={index}>
          <Button
            pill
            onClick={() => handleRemoveButton(index)}
            className="h-6 w-6 rounded-full bg-blue-500 col-span-1 my-auto"
          >
            <MdOutlineRemoveCircle className="h-6 w-6" />
          </Button>
          <div className="grid grid-flow-row auto-rows-max my-2 col-span-5">
            <Textarea
              type="text"
              sizing="md"
              id={`${props.name}_${props.index}_${index}`}
              value={
                initialData[props.index]?.[props.name][index] || ""
              } // Use the value of the current input field
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
