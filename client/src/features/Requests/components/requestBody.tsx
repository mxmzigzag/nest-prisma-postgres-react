import React from "react";

import { User } from "../../../types/user.types";
import { RequestType } from "../../../types/request.types";

type Props = {
  type: RequestType;
  user: Partial<User>;
};

export default function RequestBody({ type, user }: Props) {
  return (
    <div className="flex flex-col flex-1 py-1.5 px-2 lg:py-5 lg:px-4">
      <span className="text-xs lg:text-base text-bGray mb-0.5 lg:mb-4">
        Request:
      </span>
      {type === RequestType.UPDATE_TO_CREATOR ? (
        <p className="text-xs sm:text-lg">
          Update role of {user.name} &quot;{user.username}
          &quot; {user.surname} to Creator
        </p>
      ) : type === RequestType.UPDATE_TO_ADMIN ? (
        <p className="text-xs sm:text-lg">
          Update role of {user.name} &quot;{user.username}
          &quot; {user.surname} to Admin
        </p>
      ) : type === RequestType.UNBAN ? (
        <p className="text-xs sm:text-lg">
          {user.name} &quot;{user.username}
          &quot; {user.surname} is asking for forgiveness and unban
        </p>
      ) : null}
    </div>
  );
}
