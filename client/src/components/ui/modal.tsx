import React from "react";
import ReactDOM from "react-dom";

import RejectIcon from "../../assets/svg/reject";

type Props = {
  title?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customWrapperClass?: string;
  onClose?: () => void;
  children: JSX.Element | JSX.Element[];
};

const modalCloseStyles =
  "absolute top-5 right-4 cursor-pointer -translate-y-1/2";
export const baseModalFormStyles = "p-5 max-h-[68vh] overflow-y-auto";

export default function Modal({
  title = "",
  isOpen,
  setIsOpen,
  customWrapperClass,
  onClose,
  children,
}: Props) {
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="flex items-center justify-center fixed inset-0 z-[12345] bg-bModalBack">
      <div
        className={`${
          customWrapperClass ||
          " w-full max-w-[660px] h-[80vh] mx-auto bg-white rounded-xl overflow-hidden"
        }`}
      >
        {title ? (
          <div className="relative text-xl text-center p-4 border-b-[1px] border-b-solid border-b-black">
            {title}
            <RejectIcon className={modalCloseStyles} onClick={handleClose} />
          </div>
        ) : (
          <RejectIcon className={modalCloseStyles} onClick={handleClose} />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
