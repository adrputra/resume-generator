import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { Context } from "@/context";
import { useContext } from "react";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("@/pages/api/generatepdf"), {ssr: false});
export function DownloadButton(props) {
  const { context } = useContext(Context);

  return (
    <Button
      size="md"
      processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
    >
      <GeneratePDF data={context} />
    </Button>
  );
}
