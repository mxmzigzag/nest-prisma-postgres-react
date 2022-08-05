import React, { ChangeEvent, useState } from "react";

import { CreatePost } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import { useGetAllTagsQuery } from "../../store/api/tag.api";

import InputGroup from "../../components/forms/inputGroup";
import { errorToast } from "../../components/ui/toast";
import Button from "../../components/ui/button";
import Upload from "../../components/forms/upload";
import Select from "../../components/forms/select";
import Tags from "../../components/forms/tags";

export default function PostForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<CreatePost>>({
    authorId: user?.id,
  });

  const { data: categories = [] } = useGetAllCategoriesQuery();
  const { data: tags = [] } = useGetAllTagsQuery();

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
      <div className="input-group">
        <label className="label">Category</label>
        <Select
          defaultText="Select a category"
          items={categories}
          setItem={(item) =>
            setFormData((prev) => ({ ...prev, categoryId: item }))
          }
        />
      </div>
      <div className="input-group">
        <label htmlFor="tags" className="label">
          Tags
        </label>
        <Tags
          name="tags"
          formTags={formData.tags}
          existingTags={tags}
          setTag={(tag) =>
            setFormData((prev) => ({
              ...prev,
              tags: [...(prev.tags || []), tag],
            }))
          }
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
