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
    <div className="modal">
      <div className={`${customWrapperClass || "modal-wrapper"}`}>
        {title ? (
          <div className="modal-header">
            {title}
            <RejectIcon className="modal-close" onClick={handleClose} />
          </div>
        ) : (
          <RejectIcon className="modal-close" onClick={handleClose} />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
