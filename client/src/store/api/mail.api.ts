import { globalApi } from "./global.api";

import { ContactLetter } from "../../types/mail.types";

export const mailApi = globalApi.injectEndpoints({
  endpoints: (build) => ({
    sendContactLetter: build.mutation<string, ContactLetter>({
      query: (letterData) => ({
        url: "send/letter",
        method: "POST",
        body: letterData,
      }),
    }),
  }),
});

export const { useSendContactLetterMutation } = mailApi;
