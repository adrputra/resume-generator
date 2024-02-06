import { Label, Datepicker } from "flowbite-react";

export function DateInput(props) {
  return (
    <div className="flex flex-auto flex-col w-64 gap-4">
      <div className="block">
        <Label htmlFor="base" value={props.label} />
      </div>
      <Datepicker id={props.id}/>
    </div>
  );
}
