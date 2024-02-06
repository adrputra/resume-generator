import { Label, TextInput } from "flowbite-react";
export function Input(props) {
  return (
    <div className="flex flex-auto flex-col w-64 gap-4">
      <div className="block">
        <Label htmlFor="base" value={props.label} />
      </div>
      <TextInput
        id={props.id}
        type="text"
        sizing="md"
        value={props.formatter ? props.formatter(props.value) : props.value}
        onChange={(e) => props.onChange(props.id, props.formatter ? props.formatter(e.target.value) : e.target.value)}
      />
    </div>
  );
}
