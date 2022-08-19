type Pluralize = {
  text: string;
  count: number;
  suffix?: string;
};

export const pluralize = ({ text, count, suffix = "s" }: Pluralize) =>
  `${text}${count > 1 ? suffix : ""}`;
