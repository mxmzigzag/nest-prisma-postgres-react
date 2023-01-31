import React from "react";

import { User } from "../../../types/user.types";
import { RequestType } from "../../../types/request.types";

type Props = {
  type: RequestType;
  user: Partial<User>;
};

export default function RequestBody({ type, user }: Props) {
  return (
    <div className="flex flex-col flex-1 py-5 px-4">
      <span className="text-bGray mb-4">Request:</span>
      {type === RequestType.UPDATE_TO_CREATOR ? (
        <p className="text-lg">
          Update role of {user.name} &quot;{user.username}
          &quot; {user.surname} to Creator
        </p>
      ) : type === RequestType.UPDATE_TO_ADMIN ? (
        <p className="text-lg">
          Update role of {user.name} &quot;{user.username}
          &quot; {user.surname} to Admin
        </p>
      ) : type === RequestType.UNBAN ? (
        <p className="text-lg">
          {user.name} &quot;{user.username}
          &quot; {user.surname} is asking for forgiveness and unban
        </p>
      ) : null}
    </div>
  );
}
