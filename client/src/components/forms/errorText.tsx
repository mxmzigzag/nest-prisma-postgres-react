import React from "react";

type Props = {
  text: string;
};

export const ErrorText = ({ text }: Props) => {
  return (
    <div className="form-error-wrap">
      <p className="form-error-text">{text}</p>
    </div>
  );
};
