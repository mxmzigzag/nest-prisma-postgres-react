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
    <div className="flex items-center justify-center fixed inset-0 z-[12345] bg-bModalBack">
      <div className="flex flex-col items-center w-full max-w-[450px] mx-auto p-5 bg-white rounded-lg">
        <h3 className="text-xl text-center mb-6">{title}</h3>
        <p className="text-lg text-center mb-6">{description}</p>
        <div className="flex items-center justify-between w-full">
          <Button onClick={() => setIsOpen(false)} className="mx-2.5">
            Cancel
          </Button>
          <Button
            onClick={() => okCallback()}
            isLoading={okIsLoading}
            className="mx-2.5"
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
