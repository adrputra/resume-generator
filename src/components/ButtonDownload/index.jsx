import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";

export function DownloadButton() {
  return (
    <Button
      size="md"
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
    >
      Download
    </Button>
  );
}
