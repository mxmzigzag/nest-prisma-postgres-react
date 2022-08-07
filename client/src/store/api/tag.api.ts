import { globalApi } from "./global.api";

import { Tag } from "../../types/tag.types";

export const tagApi = globalApi
  .enhanceEndpoints({ addTagTypes: ["Tag"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllTags: build.query<Tag[], void>({
        query: () => ({
          url: `tags`,
          method: "GET",
        }),
        providesTags: ["Tag"],
      }),
      createTag: build.mutation<Tag, Tag>({
        query: (tag) => {
          return {
            url: `tag`,
            method: "POST",
            body: tag,
          };
        },
        invalidatesTags: ["Tag"],
      }),
    }),
  });

export const { useGetAllTagsQuery, useCreateTagMutation } = tagApi;
