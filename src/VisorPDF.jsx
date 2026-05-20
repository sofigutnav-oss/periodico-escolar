import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function VisorPDF({ pdf }) {

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (

    <div className="bg-gray-900 p-6 rounded-3xl shadow-xl">

      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >

        {Array.from(new Array(numPages), (el, index) => (

          <div
            key={`page_${index + 1}`}
            className="mb-8 flex justify-center"
          >

            <Page
              pageNumber={index + 1}
              width={700}
            />

          </div>

        ))}

      </Document>

    </div>
  );
}