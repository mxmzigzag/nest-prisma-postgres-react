import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { RequestType } from "../../types/request.types";

import { useAuth } from "../../hooks/useAuth";
import { useCreateRequestMutation } from "../../store/api/request.api";

import { successToast } from "../../components/ui/toast";
import Modal from "../../components/ui/modal";
import Button from "../../components/ui/button";
import Spinner from "../../assets/svg/spinner";

export default function BannedNotification() {
  const { user } = useAuth();
  const isWatched = localStorage.getItem("bannedNotificationWatched");
  const [isOpen, setIsOpen] = useState<boolean>(
    Boolean(user?.banned) && !isWatched
  );

  const [createRequest, { isLoading }] = useCreateRequestMutation();

  const sendRequest = async (userId: string) => {
    try {
      const res = await createRequest({
        userId,
        type: RequestType.UNBAN,
      }).unwrap();

      if (res.status) {
        setIsOpen(false);
        localStorage.setItem("bannedNotificationWatched", "true");
        successToast("Request is sent!");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      customWrapperClass="w-full max-w-[600px] mx-auto bg-white rounded-lg overflow-hidden p-5 text-center relative"
      onClose={() => localStorage.setItem("bannedNotificationWatched", "true")}
    >
      <h2 className="text-3xl mb-4">You has been banned!</h2>
      <p className="mb-1">
        If you are thinking that this is a mistake you can{" "}
        <NavLink to="/contact" className="color-bBrown">
          contact us
        </NavLink>
      </p>
      <p className="mb-1">--- or ---</p>
      {user?.id ? (
        <Button
          onClick={() => sendRequest(user.id)}
          isLoading={isLoading}
          className="mt-1 w-auto py-3 px-9"
        >
          Send an unban request
        </Button>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
}
