import React, { ChangeEvent, useState } from "react";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast, successToast } from "../../components/ui/toast";
import { useFetch } from "../../hooks/useFetch";
import { ProfileFormData, User } from "../../types/user.types";

type Props = {
  userData: User;
};

export default function ProfileForm({ userData }: Props) {
  const { request } = useFetch();
  const [formData, setFormData] = useState<ProfileFormData>(userData);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    try {
      const res = await request(`user/${userData.id}`, "PUT", formData);
      console.log("updated", res);
      successToast("User data updated");
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  return (
    <>
      <div className="profile-form">
        <InputGroup
          label="Name"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Surname"
          name="surname"
          placeholder="Surname"
          value={formData.surname || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Username"
          name="username"
          placeholder="Username"
          value={formData.userName || ""}
          onChange={onChange}
          fullWidth={false}
        />
        <InputGroup
          label="Email"
          name="email"
          placeholder="E-mail"
          value={formData.email || ""}
          onChange={onChange}
          fullWidth={false}
        />
      </div>
      <button className="btn profile-form-btn" onClick={onSubmit}>
        Save
      </button>
    </>
  );
}
