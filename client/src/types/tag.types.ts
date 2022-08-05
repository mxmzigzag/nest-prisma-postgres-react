export type Tag = {
  id: string;
  name: string;
};

type NewTagProperty = {
  isNew?: boolean;
};

export type NewTag = Tag & NewTagProperty;
