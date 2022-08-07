import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export type Errors = {
  [key: string]: string;
};

export type TokenResponse = {
  token: string;
};

export type Mutation<T, L> = MutationTrigger<
  MutationDefinition<
    T,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    never,
    L,
    "globalApi"
  >
>;

export type Limit = {
  limit: number;
};
