import React from "react";
import ReactDOM from "react-dom";
import RejectIcon from "../../assets/svg/reject";

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  customWrapperClass?: string;
  children: JSX.Element;
};

export default function Modal({
  title,
  isOpen,
  setIsOpen,
  customWrapperClass,
  children,
}: Props) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className={`${customWrapperClass || "modal-wrapper"}`}>
        <div className="modal-header">
          {title}
          <RejectIcon
            className="modal-close"
            onClick={() => setIsOpen(false)}
          />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
