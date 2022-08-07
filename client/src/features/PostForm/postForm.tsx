import React, { ChangeEvent, useState } from "react";

import { CreatePost } from "../../types/post.types";

import { useAuth } from "../../hooks/useAuth";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import { useCreatePostMutation } from "../../store/api/post.api";
import {
  useCreateTagMutation,
  useGetAllTagsQuery,
} from "../../store/api/tag.api";

import { errorToast, successToast } from "../../components/ui/toast";
import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";
import Upload from "../../components/forms/upload";
import Select from "../../components/forms/select";
import Tags from "../../components/forms/tags";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostForm({ setIsOpen }: Props) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<CreatePost>>({
    authorId: user?.id,
  });

  const { data: categoriesData } = useGetAllCategoriesQuery({});

  const { data: tags = [] } = useGetAllTagsQuery();
  const [createTag] = useCreateTagMutation();
  const [createPost, { isLoading: isCreateLoading }] = useCreatePostMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTags = formData.tags?.filter((tag) => tag.isNew) || [];
      const tagIds = formData.tags?.map((tag) => tag.id) || [];
      if (newTags.length) {
        newTags.forEach(async (tag) => {
          const newTag = { id: tag.id, name: tag.name };
          await createTag(newTag);
        });
      }
      const newFormData = new FormData();
      Object.entries(formData).map(([key, value]) => {
        newFormData.append(key, value);
      });
      newFormData.set("tags", JSON.stringify(tagIds));
      await createPost(newFormData);
      setIsOpen(false);
      successToast("Post is created! Wait for moderator validation.");
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
      {categoriesData ? (
        <div className="input-group">
          <label className="label">Category</label>
          <Select
            defaultText="Select a category"
            items={categoriesData.page}
            setItem={(item) =>
              setFormData((prev) => ({ ...prev, categoryId: item }))
            }
          />
        </div>
      ) : null}
      <div className="input-group">
        <label htmlFor="tags" className="label">
          Tags
        </label>
        <Tags
          name="tags"
          formTags={formData.tags}
          existingTags={tags}
          setTags={(tags) => setFormData((prev) => ({ ...prev, tags }))}
        />
      </div>
      <Button type="submit" isLoading={isCreateLoading}>
        Create
      </Button>
    </form>
  );
}
