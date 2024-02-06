import { Alert } from "flowbite-react";

export function FloatingAlert(props) {
  return (
    <div className="transition-all ease-in-out duration-300 delay-300">
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 ">
        <Alert color={props.color} withBorderAccent>
          <span>
            <span className="font-medium">
              {props.color === "success" ? "Yeayy!" : "Oops!"}
            </span>
            {"  " + props.info}
          </span>
        </Alert>
      </div>
    </div>
  );
}
