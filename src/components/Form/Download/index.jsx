import { DownloadButton } from "@/components/ButtonDownload";
import { PDFViewer } from "@/components/PDFViewer";

export function Download({ showAlert, hideAlert }) {
  const handleErrorMessage = (error) => {
    showAlert(error.code, error.msg);
    setTimeout(() => {
      hideAlert();
    }, 10000);
  };
  return (
    <div className="container mx-auto">
      <DownloadButton
        url={process.env.NEXT_PUBLIC_GENERATE_PDF}
        isError={handleErrorMessage}
      />
      <div className="my-4">
        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
          Below is generated sample resume. You may refer to it.
        </h3>
        <PDFViewer />
      </div>
    </div>
  );
}
