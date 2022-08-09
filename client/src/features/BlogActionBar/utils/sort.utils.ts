import {
  ActionCreatorWithPayload,
  AnyAction,
  Dispatch,
} from "@reduxjs/toolkit";
import { SortType } from "../../../types/common.types";

type ChangeSortType = {
  sortData: SortType | undefined;
  setSortData: ActionCreatorWithPayload<SortType | undefined, string>;
  dispatch: Dispatch<AnyAction>;
};

export const changeSortMethod = ({
  sortData,
  setSortData,
  dispatch,
}: ChangeSortType) => {
  if (sortData === "desc") {
    dispatch(setSortData("asc"));
  } else if (sortData === "asc") {
    dispatch(setSortData(undefined));
  } else {
    dispatch(setSortData("desc"));
  }
};
