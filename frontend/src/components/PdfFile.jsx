import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfFile = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const width = window.innerWidth;

  const renderDownloadFile = () => (
    <a href={file} download className='app__flex'>
      Click to download the file
    </a>
  );

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div>
      {renderDownloadFile()}
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={width < 700 && width - 50} />
      </Document>
      <p className='app__flex bold-text p-text'>
        Page {pageNumber} of {numPages}
      </p>
      {renderDownloadFile()}
    </div>
  );
};

export default PdfFile;
