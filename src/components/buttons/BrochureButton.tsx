import { FaDownload } from 'react-icons/fa';

const BrochureButton = () => {
  return (
    <a
      href="#"
      className="fixed bottom-[150px] right-[-46px] rotate-90 text-white bg-main-secondary px-4 py-2 font-light tracking-wide z-[999] flex items-center gap-2"
    >
      <FaDownload className="text-main-red" />
      Brochure
    </a>
  );
};

export default BrochureButton;