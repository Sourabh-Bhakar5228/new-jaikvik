import { FaDownload } from "react-icons/fa";

const BrochureButton = () => {
  return (
    <a
      href="/brochure"
      className="fixed bottom-[300px] right-[-46px] rotate-90 text-white bg-main-secondary px-4 py-2 font-light tracking-wide z-[999] flex items-center gap-2"
    >
      <FaDownload className="text-main-red" />
      Brochure
    </a>
  );
};

export default BrochureButton;
