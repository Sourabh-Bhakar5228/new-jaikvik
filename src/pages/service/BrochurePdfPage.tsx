import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Brochure: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const brochureRef = useRef<HTMLDivElement>(null);

  // Random placeholder images from Unsplash
  const placeholderImages = {
    logo: "https://images.unsplash.com/photo-1567443024551-f3e3a7b9d41a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    webDev:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    digitalMarketing:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    filmProduction:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    office:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    techPattern:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePrint = useReactToPrint({
    contentRef: brochureRef,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        img {
          max-width: 100% !important;
        }
      }
    `,
  });

  const onPrintClick = () => {
    if (!brochureRef.current) {
      console.warn("Brochure content is not available for printing.");
      return;
    }
    handlePrint();
  };

  const togglePdfPreview = () => {
    setShowPdf(!showPdf);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* PDF Preview Modal */}
      {showPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto border border-red-600">
            <div className="flex justify-between items-center p-4 border-b border-red-600">
              <h2 className="text-xl font-bold text-red-500">PDF Preview</h2>
              <button
                onClick={togglePdfPreview}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <Document
                file="/path/to/your/brochure.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-viewer"
              >
                <Page pageNumber={pageNumber} width={800} />
              </Document>
              {numPages && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pageNumber <= 1}
                    className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 hover:bg-red-700 transition-colors"
                  >
                    Previous
                  </button>
                  <p className="text-gray-300">
                    Page {pageNumber} of {numPages}
                  </p>
                  <button
                    onClick={() =>
                      setPageNumber((prev) => Math.min(prev + 1, numPages))
                    }
                    disabled={pageNumber >= numPages}
                    className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 hover:bg-red-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={togglePdfPreview}
          className="p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          title="Preview PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
        <button
          onClick={onPrintClick}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center border border-red-600"
          title="Download PDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>

      {/* Brochure Content */}
      <div
        ref={brochureRef}
        className="max-w-6xl mx-auto p-6 bg-gray-900 text-gray-200"
      >
        {/* Cover Page with Logo */}
        <div className="bg-gradient-to-r from-red-900 to-black text-center py-16 px-4 mb-8 rounded-lg border border-red-600 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${placeholderImages.techPattern})`,
              backgroundRepeat: "repeat",
            }}
          ></div>
          <div className="relative z-10">
            <img
              src={placeholderImages.logo}
              alt="Jaikvik Technology Logo"
              className="mx-auto h-24 mb-6 rounded-lg object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">
              JAIKVIK TECHNOLOGY
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-4 text-white">
              Bridging Technology & Creativity
            </h2>
            <p className="text-xl text-gray-300">
              Software Development | Digital Marketing | Film Production
            </p>
          </div>
        </div>

        {/* About Us */}
        <div className="p-6 mb-8 bg-gray-800 rounded-lg border-l-4 border-red-600">
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-red-600 text-red-400">
            ABOUT US
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="mb-4 leading-relaxed">
                Jaikvik Technology India Private Limited creates a sweet harmony
                between technology and creativity. We synergize software
                development and digital marketing to build innovative solutions
                and deliver results-focused strategies that empower businesses
                to thrive in the digital age.
              </p>
              <p className="mb-4 leading-relaxed">
                Founded in 2016 with branches in Kolkata, Bangalore, and Noida
                (Head Office), we serve 600+ manufacturing clients across
                Software Development, Digital Marketing, and Film Production.
              </p>
              <p className="italic font-medium leading-relaxed text-red-400">
                Let's innovate, strategize, and grow together!
              </p>
            </div>
            <div className="flex-1">
              <img
                src={placeholderImages.office}
                alt="Office workspace"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Software Development */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-red-600 text-red-400">
            SOFTWARE DEVELOPMENT SOLUTIONS
          </h2>
          <div className="mb-6">
            <img
              src={placeholderImages.webDev}
              alt="Software Development"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="leading-relaxed">
              Custom-tailored end-to-end software development services that suit
              your business requirements. From responsive websites to intuitive
              mobile apps and robust CRM/ERP solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Website Development */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-400 mb-3">
                Website Development
              </h3>
              <p className="mb-3">
                SEO-optimized, user-friendly websites that elevate your online
                presence.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>E-Commerce Websites</li>
                <li>WooCommerce Websites</li>
                <li>Corporate Websites</li>
              </ul>
            </div>

            {/* CRM Solutions */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-400 mb-3">
                BrochurePdfPage.tsx CRM Solutions
              </h3>
              <p className="mb-3">
                Streamline operations and manage customer relations effectively.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sales CRM</li>
                <li>Inventory Management</li>
                <li>HRMS Solutions</li>
                <li>Tailored CRMs</li>
              </ul>
            </div>

            {/* Mobile App Development */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-400 mb-3">
                Mobile App Development
              </h3>
              <p className="mb-3">
                High-performing apps for iOS and Android platforms.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cross Platform Solutions</li>
                <li>User-Centric Design</li>
                <li>Bespoke Features</li>
                <li>Scalability</li>
              </ul>
            </div>

            {/* ERP Solutions */}
            <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-red-600">
              <h3 className="text-2xl font-bold text-red-400 mb-3">
                ERP Solutions
              </h3>
              <p className="mb-3">
                Comprehensive solutions to streamline business processes.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Finance & Accounting</li>
                <li>Supply Chain Management</li>
                <li>Human Resources</li>
                <li>Production & Manufacturing</li>
                <li>Sales & CRM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Digital Marketing */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-red-600 text-red-400">
            DIGITAL MARKETING SERVICES
          </h2>
          <div className="mb-6">
            <img
              src={placeholderImages.digitalMarketing}
              alt="Digital Marketing"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="leading-relaxed">
              Crafted strategies to maximize your brand's online visibility and
              engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Social Media Marketing",
                desc: "Grow your brand across major platforms with data-driven campaigns.",
              },
              {
                title: "Google SEO Services",
                desc: "Increase visibility and drive high-quality traffic to your website.",
              },
              {
                title: "PPC, Meta & YouTube Ads",
                desc: "Quick results with targeted advertising campaigns.",
              },
              {
                title: "Brand Promotion",
                desc: "Elevate your brand identity and market position.",
              },
              {
                title: "Content Creation & Blogging",
                desc: "Engaging content that builds authority and drives action.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-red-600 transition-colors"
              >
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  {service.title}
                </h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Film Production */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-red-600 text-red-400">
            FILM PRODUCTION
          </h2>
          <div className="mb-6">
            <img
              src={placeholderImages.filmProduction}
              alt="Film Production"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="leading-relaxed">
              Creative solutions to promote your brand and engage your audience
              through visual storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Corporate Video Presentation",
                desc: "Showcase your company's mission and values professionally.",
              },
              {
                title: "Product Explanation Video",
                desc: "Demonstrate product features in an engaging format.",
              },
              {
                title: "TV Commercial Ads",
                desc: "Reach mass audiences with compelling television ads.",
              },
              {
                title: "YouTube Ads",
                desc: "Targeted video advertising on the world's largest video platform.",
              },
              {
                title: "Photoshoots",
                desc: "High-quality imagery for all your marketing needs.",
              },
              {
                title: "Interviews",
                desc: "Professional corporate interviews to highlight your leadership.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg border border-red-600"
              >
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  {service.title}
                </h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Footer */}
        <div className="bg-gradient-to-r from-red-900 to-black text-center py-8 px-4 rounded-lg border border-red-600">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Let's Work Together
          </h3>
          <p className="mb-2">
            Head Office: Noida | Branches: Kolkata, Bangalore
          </p>
          <p className="mb-4">
            Contact us to discuss how we can help your business thrive.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              Contact Us
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded border border-red-600 hover:bg-gray-700 transition-colors">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
