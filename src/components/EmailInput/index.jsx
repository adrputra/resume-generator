import { Label, TextInput } from "flowbite-react";
import { useState } from "react";

export function EmailInput(props) {
    const [email, setEmail] = useState();
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setEmail((prev) => ({
          ...prev,
          [event.target.id]: event.target.value,
        }));
      };

    const handleInput = (event) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(event.target.value)) {
            setError(true)
            console.log(error);
        } else {
            setError(false)
        }
    }

    return (
        <div className="flex flex-col w-64 gap-4">
            <div className="block">
                <Label htmlFor="base" value={props.label} />
            </div>
            <TextInput
                id={props.id}
                type="email"
                sizing="md"
                value={props.value}
                placeholder="example@email.com"
                onChange={(e) => props.onChange(props.id, e.target.value)}
                onInput={handleInput}
                // helperText={error && "Please enter a valid email"}
            />
            <p className="text-red-500 text-sm -mt-4 ml-2">{error && "Please enter a valid email"}</p>
        </div>
    );
}