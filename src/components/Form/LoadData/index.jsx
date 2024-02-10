import { LoadButton } from "@/components/ButtonLoad";
import { TextInput, Banner, Label } from "flowbite-react";
import { useState } from "react";
import { HiX } from "react-icons/hi";

export function LoadData({ showAlert, hideAlert }) {
  const [value, setValue] = useState();

  const handleErrorMessage = (error) => {
    showAlert(error.code, error.msg)
    setTimeout(() => {
      hideAlert()
    }, 8000);
  }

  return (
    <div className="mt-4">
      <Banner>
        <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h1 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
              Welcome,
            </h1>
            <p className="flex items-center text-sm font-normal text-gray-700 dark:text-gray-400">
              If you have been here before, you can continue your work by
              filling your unique key and loading your data below.
            </p>
            <br />
            <p className="flex items-center text-sm font-normal text-gray-700 dark:text-gray-400">
              If this is your first time, you'll need to at least fill the
              Profile Section to get your unique key.
            </p>
          </div>
          <div className="flex flex-shrink-0 items-start">
            <Banner.CollapseButton
              color="gray"
              className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
            >
              <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
          </div>
        </div>
      </Banner>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="container mx-auto">
          <div className="grid grid-flow-row auto-rows-max gap-4 my-4">
            <div className="block">
              <Label htmlFor="base" value="Your Unique Key" />
            </div>
            <TextInput
              id="load_data"
              type="text"
              sizing="md"
              value={value || ""}
              onChange={(e) => setValue(e.target.value)}
            />

            <LoadButton url={process.env.NEXT_PUBLIC_ALL_DATA} data={value} isError={handleErrorMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
}
