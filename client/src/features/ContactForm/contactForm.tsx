import React, { ChangeEvent, FormEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";
import { useSendContactLetterMutation } from "../../store/api/mail.api";
import { errorToast, successToast } from "../../components/ui/toast";

export default function ContactForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user ? `${user.name} ${user.surname}` : "",
    email: user ? user.email : "",
    body: "",
  });

  const [sendLetter, { isLoading }] = useSendContactLetterMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendLetter(formData);
      successToast("Letter is sent!");
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <InputGroup
        label="Name"
        name="name"
        placeholder="Name"
        value={formData.name || ""}
        onChange={onChange}
      />
      <InputGroup
        label="Email"
        name="emal"
        placeholder="Email"
        value={formData.email || ""}
        onChange={onChange}
      />
      <InputGroup
        label="Message"
        name="body"
        type="textarea"
        placeholder="Message"
        value={formData.body || ""}
        onChange={onChange}
      />
      <Button type="submit" isLoading={isLoading}>
        Send
      </Button>
    </form>
  );
}
