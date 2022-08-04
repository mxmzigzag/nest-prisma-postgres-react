import React, { ChangeEvent, useState } from "react";

import { CreatePost } from "../../types/post.types";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";
import Upload from "../../components/forms/upload";

export default function PostForm() {
  const [formData, setFormData] = useState<Partial<CreatePost>>({});

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (err: any) {
      errorToast(err.data.message);
    }
  };

  return (
    <form className="modal-form" onSubmit={onSubmit}>
      <InputGroup
        label="Title"
        name="title"
        placeholder="Title"
        value={formData.title || ""}
        onChange={onChange}
      />
      <InputGroup
        label="Description"
        name="description"
        placeholder="Description"
        value={formData.description || ""}
        onChange={onChange}
      />
      <InputGroup
        label="Body"
        name="body"
        type="textarea"
        placeholder="Body"
        value={formData.body || ""}
        onChange={onChange}
      />
      <Upload
        label="Image"
        name="image"
        setValue={(value) => setFormData((prev) => ({ ...prev, image: value }))}
      />
      <p>select author id</p>
      <p>select category id</p>
      <p>tags</p>
      <Button type="submit">Create</Button>
    </form>
  );
}
