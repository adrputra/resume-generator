import { useState } from 'react';
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export function PDFViewer() {
  const [fileUrl, setFileUrl] = useState("https://eventarry.com/static-vault/resume-generator/sample.pdf");

  const reloadViewer = () => {
    // Append a query parameter with a unique value to force a reload
    const newFileUrl = `https://eventarry.com/static-vault/resume-generator/sample.pdf`;
    setFileUrl(newFileUrl);
  };

  return (
    <>
      {/* <button onClick={reloadViewer}>Reload PDF</button> */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} />
      </Worker>
    </>
  );
}
