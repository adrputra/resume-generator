import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { Context } from "@/context";
import { useContext } from "react";

export function SaveButton(props) {
  const { context, updateContext } = useContext(Context);

  const handleSave = async () => {
    const data = context?.[props.action];
    const user_id = context?.profile?.id;
    const payload = {
      user_id, data
    }
    console.log(data);

    try {
      console.log(`REQ SAVE ${props.action.toUpperCase()}`, payload);
      const response = await fetch(props.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(`RES SAVE ${props.action.toUpperCase()}`, result);
      props.isError({msg: result.message, code: result.status, key: user_id})
    } catch (error) {
      console.error("Error hitting action:", error);
      props.isError({msg: error.message, code: "failure"})
    }
  };

  return (
    <Button
      className="h-auto mt-2 bg-blue-500 hover:bg-blue-700"
      size="md"
      isProcessing={props.processing || false}
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
      onClick={handleSave} // Pass the function reference directly
    >
      Save
    </Button>
  );
}
