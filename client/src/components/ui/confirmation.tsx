import React from "react";
import ReactDOM from "react-dom";

import Button from "./button";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description: string;
  okText?: string;
  okCallback: () => void;
  okIsLoading?: boolean;
};

export default function Confirmation({
  isOpen,
  setIsOpen,
  title = "Are you sure?",
  description,
  okCallback,
  okText = "Accept",
  okIsLoading = false,
}: Props) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="confirmation">
      <div className="confirmation-wrapper">
        <h3 className="confirmation-title">{title}</h3>
        <p className="confirmation-description">{description}</p>
        <div className="confirmation-actions">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={() => okCallback()} isLoading={okIsLoading}>
            {okText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
