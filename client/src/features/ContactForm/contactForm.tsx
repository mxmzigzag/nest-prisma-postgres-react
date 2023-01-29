import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./contactForm.schema";

import { useAuth } from "../../hooks/useAuth";
import { useSendContactLetterMutation } from "../../store/api/mail.api";

import { errorToast, successToast } from "../../components/ui/toast";
import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";

type ContactForm = {
  name: string;
  email: string;
  body: string;
};

export default function ContactForm() {
  const { user } = useAuth();

  const [sendLetter, { isLoading }] = useSendContactLetterMutation();

  const defaultValues = {
    name: user ? `${user.name} ${user.surname}` : "",
    email: user ? user.email : "",
    body: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: ContactForm) => {
    try {
      await sendLetter(formData);
      successToast("Letter is sent!");
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        register={register}
        error={errors.name?.message}
      />
      <InputGroup
        label="Email"
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message}
      />
      <InputGroup
        label="Message"
        name="body"
        type="textarea"
        placeholder="Message"
        register={register}
        error={errors.body?.message}
      />
      <Button type="submit" isLoading={isLoading}>
        Send
      </Button>
    </form>
  );
}
