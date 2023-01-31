import React from "react";

import UploadIcon from "../../assets/svg/upload";
import { ErrorText } from "./errorText";

type Props = {
  label: string;
  name: string;
  value: string | undefined;
  setValue: (file: File) => void;
  error?: string;
};

export default function Upload({ label, name, value, setValue, error }: Props) {
  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    setValue(file);
  };

  return (
    <>
      <div className="mb-1">
        <label htmlFor={name}>{label}</label>
        <div className="flex items-center justify-between py-2.5">
          <p className="text-lg">
            {value ? `File is uploaded (${value})` : "Choose a file"}
          </p>
          <label
            htmlFor={name}
            className={`flex border-2 border-solid border-black rounded-xl p-1 cursor-pointer ${
              value && "border-bGreen"
            }`}
          >
            <UploadIcon className={value && "fill-bGreen"} />
          </label>
        </div>
        <input
          type="file"
          id={name}
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      {error && <ErrorText text={error} />}
    </>
  );
}
