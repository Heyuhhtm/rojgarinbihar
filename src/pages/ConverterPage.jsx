import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

function MergePdfTool({ onBack }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setStatus(`${e.target.files.length} PDF(s) selected.`);
    }
  };

  const handleConvert = async () => {
    if (files.length < 2) {
      setStatus('Please select at least two PDF files to merge.');
      return;
    }

    setStatus('Merging PDFs...');
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'rojgarinbihar_merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus('Merge successful! Your download should start automatically.');
      setFiles([]);

    } catch (err) {
      console.error(err);
      setStatus('An error occurred during merging. Please ensure you are selecting valid PDF files.');
    }
  };

  return (
    <div className="tool-interface">
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <h3>Merge PDF Tool</h3>
      <p style={{ fontSize: '14px', color: '#666', maxWidth: '400px', margin: '0 auto 20px' }}>
        Combine multiple PDF files into a single document. The files will be merged in the order you select them.
      </p>
      <label htmlFor="file-input-merge" className="file-input-label">
        Select PDFs to Merge
      </label>
      <input id="file-input-merge" type="file" multiple accept="application/pdf" onChange={handleFileChange} className="file-input" />
      <div className="tool-status">{status}</div>
      <button onClick={handleConvert} disabled={files.length < 2} className="btn-convert">Merge PDFs</button>
    </div>
  );
}

function JpgToPdfTool({ onBack }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setStatus(`${e.target.files.length} image(s) selected.`);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setStatus('Please select images first.');
      return;
    }

    setStatus('Converting...');
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const page = pdfDoc.addPage();
        const bytes = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(bytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(bytes);
        } else {
          console.warn(`Unsupported file type: ${file.type}. Skipping.`);
          continue;
        }

        const { width, height } = image.scale(1);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        const widthRatio = pageWidth / width;
        const heightRatio = pageHeight / height;
        const ratio = Math.min(widthRatio, heightRatio, 1);

        const scaledWidth = width * ratio;
        const scaledHeight = height * ratio;

        page.drawImage(image, {
          x: (pageWidth - scaledWidth) / 2,
          y: (pageHeight - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'rojgarinbihar_converted.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus('Conversion successful! Your download should start automatically.');
      setFiles([]);

    } catch (err) {
      console.error(err);
      setStatus('An error occurred during conversion. Please check the console.');
    }
  };

  return (
    <div className="tool-interface">
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <h3>JPG to PDF Converter</h3>
      <p style={{ fontSize: '14px', color: '#666', maxWidth: '400px', margin: '0 auto 20px' }}>
        Convert JPG or PNG images into a single PDF file, perfect for sharing or archiving.
      </p>
      <label htmlFor="file-input" className="file-input-label">
        Select Images
      </label>
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="tool-status">{status}</div>
      <button onClick={handleConvert} disabled={files.length === 0} className="btn-convert">
        Convert to PDF
      </button>
    </div>
  );
}

function SplitPdfTool({ onBack }) {
  const [file, setFile] = useState(null);
  const [pagesInput, setPagesInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("");

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setStatus("Loading PDF details...");
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();
        setTotalPages(pageCount);
        setStatus(`PDF loaded. Pages: ${pageCount}. Enter page numbers or ranges to extract (e.g., 1-3, 5).`);
      } catch (err) {
        console.error(err);
        setStatus("Error loading PDF details.");
        setFile(null);
        setTotalPages(0);
      }
    }
  };

  const handleSplit = async () => {
    if (!file || !pagesInput.trim()) {
      setStatus("Please select a file and enter page numbers.");
      return;
    }

    setStatus("Splitting PDF...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const splitPdf = await PDFDocument.create();

      const pagesToCopy = [];
      const parts = pagesInput.split(",");
      for (const part of parts) {
        const range = part.trim().split("-");
        if (range.length === 2) {
          const start = parseInt(range[0].trim(), 10);
          const end = parseInt(range[1].trim(), 10);
          if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
            throw new Error(`Invalid range: ${part}`);
          }
          for (let i = start; i <= end; i++) {
            pagesToCopy.push(i - 1);
          }
        } else if (range.length === 1) {
          const val = parseInt(range[0].trim(), 10);
          if (isNaN(val) || val < 1 || val > totalPages) {
            throw new Error(`Invalid page: ${part}`);
          }
          pagesToCopy.push(val - 1);
        }
      }

      if (pagesToCopy.length === 0) {
        throw new Error("No pages specified.");
      }

      const copiedPages = await splitPdf.copyPages(srcPdf, pagesToCopy);
      copiedPages.forEach((page) => {
        splitPdf.addPage(page);
      });

      const pdfBytes = await splitPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `split_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("PDF split successfully! Download started.");
    } catch (err) {
      console.error(err);
      setStatus(`Error splitting PDF: ${err.message || err}`);
    }
  };

  return (
    <div className="tool-interface">
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <h3>Split PDF Tool</h3>
      <p style={{ fontSize: '14px', color: '#666', maxWidth: '400px', margin: '0 auto 20px' }}>
        Extract specific pages or page ranges from a PDF document to form a new PDF file.
      </p>
      <label htmlFor="file-input-split" className="file-input-label">
        Select PDF to Split
      </label>
      <input id="file-input-split" type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
      
      {file && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>File: {file.name} ({totalPages} pages)</p>
          <div style={{ margin: '15px 0' }}>
            <label htmlFor="pages-input" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
              Pages to extract (e.g. 1-3, 5):
            </label>
            <input 
              id="pages-input" 
              type="text" 
              value={pagesInput} 
              onChange={e => setPagesInput(e.target.value)} 
              placeholder="e.g. 1-3, 5"
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                width: '200px',
                textAlign: 'center'
              }}
            />
          </div>
        </div>
      )}

      <div className="tool-status">{status}</div>
      <button onClick={handleSplit} disabled={!file || !pagesInput.trim()} className="btn-convert">Split PDF</button>
    </div>
  );
}

function SignPdfTool({ onBack }) {
  const [file, setFile] = useState(null);
  const [signText, setSignText] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("PDF selected. Enter signature text below.");
    }
  };

  const handleSign = async () => {
    if (!file || !signText.trim()) {
      setStatus("Please select a file and enter signature text.");
      return;
    }

    setStatus("Signing PDF...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        
        page.drawText(signText, {
          x: width - 180,
          y: 35,
          size: 14,
          color: rgb(0.15, 0.38, 0.96),
        });
        
        page.drawText("Digitally Signed", {
          x: width - 180,
          y: 50,
          size: 8,
          color: rgb(0.4, 0.4, 0.4),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `signed_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus("Signature added successfully! Download started.");
    } catch (err) {
      console.error(err);
      setStatus("Error signing PDF. Please make sure the file is valid.");
    }
  };

  return (
    <div className="tool-interface">
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <h3>Sign PDF Tool</h3>
      <p style={{ fontSize: '14px', color: '#666', maxWidth: '400px', margin: '0 auto 20px' }}>
        Sign PDF documents with a digital text signature in seconds.
      </p>
      <label htmlFor="file-input-sign" className="file-input-label">
        Select PDF to Sign
      </label>
      <input id="file-input-sign" type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
      
      {file && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold' }}>File: {file.name}</p>
          <div style={{ margin: '15px 0' }}>
            <label htmlFor="sign-text" style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
              Your Name / Signature Text:
            </label>
            <input 
              id="sign-text" 
              type="text" 
              value={signText} 
              onChange={e => setSignText(e.target.value)} 
              placeholder="e.g. Suraj Kumar Gupta"
              style={{
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                width: '240px',
                textAlign: 'center'
              }}
            />
          </div>
        </div>
      )}

      <div className="tool-status">{status}</div>
      <button onClick={handleSign} disabled={!file || !signText.trim()} className="btn-convert">Sign PDF</button>
    </div>
  );
}

function CloudFallbackTool({ toolName, onBack }) {
  return (
    <div className="tool-interface" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚙️</div>
      <h3>{toolName} Tool Notice</h3>
      <div style={{
        textAlign: 'left',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        marginTop: '20px',
        lineHeight: '1.6',
        fontSize: '14px',
        color: '#475569'
      }}>
        <p style={{ marginBottom: '12px', fontWeight: '700', color: '#1e293b' }}>
          Why is this tool processing differently?
        </p>
        <p style={{ marginBottom: '12px' }}>
          Office document types (Word .docx, Excel .xlsx, PowerPoint .pptx) are heavy proprietary formats requiring server-side rendering. To ensure absolute privacy and security of your documents, we perform PDF Merges, Splits, Signings, and JPG creations locally inside your browser without uploading your files.
        </p>
        <p style={{ marginBottom: '12px' }}>
          For quick, offline file conversions, we recommend:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          <li>Using Microsoft Word/Excel's **Save As PDF** offline menu.</li>
          <li>Opening documents in Google Docs/Sheets and choosing **File > Download > PDF**.</li>
        </ul>
        <p style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          💡 We are developing a secure offline converter api to implement direct conversions in a future release!
        </p>
      </div>
      <button onClick={onBack} className="btn-convert" style={{ background: '#64748b', marginTop: '24px' }}>
        Return to Tools
      </button>
    </div>
  );
}

export default function ConverterPage() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { name: 'Merge PDF', icon: '📄+📄', description: 'Combine PDFs in the order you want.' },
    { name: 'Split PDF', icon: '✂️', description: 'Separate one page or a whole set for easy conversion.' },
    { name: 'Compress PDF', icon: '🗜️', description: 'Reduce file size while optimizing for maximal PDF quality.' },
    { name: 'PDF to Word', icon: '📄»📝', description: 'Easily convert your PDF files into editable DOCX documents.' },
    { name: 'PDF to PowerPoint', icon: '📄»📊', description: 'Turn your PDF files into easy-to-edit PPTX slideshows.' },
    { name: 'PDF to Excel', icon: '📄»📈', description: 'Pull data straight from PDFs into Excel spreadsheets.' },
    { name: 'Word to PDF', icon: '📝»📄', description: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
    { name: 'PowerPoint to PDF', icon: '📊»📄', description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.' },
    { name: 'Excel to PDF', icon: '📈»📄', description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.' },
    { name: 'PDF to JPG', icon: '📄»🖼️', description: 'Extract all images from a PDF or convert each page into a JPG.' },
    { name: 'JPG to PDF', icon: '🖼️»📄', description: 'Convert JPG images to PDF in seconds.' },
    { name: 'Sign PDF', icon: '✍️', description: 'Sign yourself or request electronic signatures from others.' },
  ];

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);
  };

  return (
    <div className="section-box" style={{ position: 'relative' }}>
      <style>{`
        .converter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .tool-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .tool-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        .tool-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .tool-name {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }
        .tool-description {
          font-size: 13px;
          color: #777;
          line-height: 1.5;
        }
        .tool-interface { padding: 20px; text-align: center; }
        .tool-interface h3 { font-size: 22px; color: #333; margin-bottom: 10px; }
        .file-input-label {
          display: inline-block;
          padding: 12px 25px;
          background: #1565c0;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .file-input-label:hover { background: #0d47a1; }
        .file-input { display: none; }
        .tool-status { margin-top: 20px; font-size: 14px; color: #555; min-height: 20px; }
        .btn-convert {
          margin-top: 20px;
          padding: 12px 30px;
          font-size: 16px;
          font-weight: bold;
          background: #2e7d32;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-convert:disabled { background: #aaa; cursor: not-allowed; }
        .btn-convert:hover:not(:disabled) { background: #1b5e20; }
        .btn-back-tool {
            position: absolute;
            top: 15px;
            left: 15px;
            background: #757575;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn-back-tool:hover { background: #616161; }
      `}</style>
      {activeTool ? (
        activeTool === 'JPG to PDF' ? <JpgToPdfTool onBack={() => setActiveTool(null)} />
          : activeTool === 'Merge PDF' ? <MergePdfTool onBack={() => setActiveTool(null)} />
            : activeTool === 'Split PDF' ? <SplitPdfTool onBack={() => setActiveTool(null)} />
              : activeTool === 'Sign PDF' ? <SignPdfTool onBack={() => setActiveTool(null)} />
                : <CloudFallbackTool toolName={activeTool} onBack={() => setActiveTool(null)} />
      ) : (
        <>
          <div className="section-header" style={{ background: "#673ab7" }}>
            🔄 File Converter Tools
          </div>
          <div className="converter-grid">
            {tools.map(tool => (
              <div key={tool.name} className="tool-card" onClick={() => handleToolClick(tool.name)}>
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-description">{tool.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
