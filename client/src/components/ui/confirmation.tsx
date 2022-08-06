import React from "react";
import ReactDOM from "react-dom";

import Button from "./button";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description: string;
  okCallback: () => void;
  okIsLoading?: boolean;
};

export default function Confirmation({
  isOpen,
  setIsOpen,
  title = "Are you sure?",
  description,
  okCallback,
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
            Accept
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
