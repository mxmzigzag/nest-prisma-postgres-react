import React, { useState } from "react";

import UploadIcon from "../../assets/svg/upload";

type Props = {
  label: string;
  name: string;
  setValue: (file: File) => void;
};

export default function Upload({ label, name, setValue }: Props) {
  const [fileName, setFileName] = useState<string>("");

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setValue(file);
  };

  return (
    <div className="upload-margin">
      <label htmlFor={name}>{label}</label>
      <div className="upload-wrap">
        <p className="upload-text">
          {fileName ? `File is uploaded (${fileName})` : "Choose a file"}
        </p>
        <label
          htmlFor={name}
          className={`upload-icon ${fileName && "upload-uploaded"}`}
        >
          <UploadIcon />
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
  );
}
