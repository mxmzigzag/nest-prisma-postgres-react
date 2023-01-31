import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CreatePost, Post } from "../../types/post.types";
import { schema } from "./postForm.schema";

import { useAuth } from "../../hooks/useAuth";
import { useGetAllCategoriesQuery } from "../../store/api/category.api";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../store/api/post.api";
import {
  useCreateTagMutation,
  useGetAllTagsQuery,
} from "../../store/api/tag.api";

import { errorToast, successToast } from "../../components/ui/toast";
import { baseModalFormStyles } from "../../components/ui/modal";
import InputGroup, {
  inputGroupStyles,
  labelStyles,
} from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";
import Upload from "../../components/forms/upload";
import Select from "../../components/forms/select";
import Tags from "../../components/forms/tags";

type Props = {
  post?: Partial<Post>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostForm({ post = {}, setIsOpen }: Props) {
  const { user } = useAuth();

  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const { data: tags = [] } = useGetAllTagsQuery();

  const [createTag] = useCreateTagMutation();
  const [createPost, { isLoading: isCreateLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdateLoading }] = useUpdatePostMutation();

  const defaultValues = {
    ...post,
    authorId: user?.id,
    tags: post.tags?.map((t) => t.tag),
  };

  const {
    watch,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const formState = watch();

  const onSubmit = async (formData: Partial<CreatePost & { id?: string }>) => {
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
      if (formData.id) {
        await updatePost({ postId: formData.id, post: newFormData });
        successToast("Post updated!");
      } else {
        await createPost(newFormData);
        successToast("Post is created! Wait for moderator validation.");
      }
      setIsOpen(false);
    } catch (err: any) {
      errorToast(err.data.message);
    }
  };

  return (
    <form className={baseModalFormStyles} onSubmit={handleSubmit(onSubmit)}>
      <InputGroup
        label="Title"
        name="title"
        placeholder="Title"
        register={register}
        error={errors.title?.message}
      />
      <InputGroup
        label="Description"
        name="description"
        placeholder="Description"
        register={register}
        error={errors.description?.message}
      />
      <InputGroup
        label="Body"
        name="body"
        type="textarea"
        placeholder="Body"
        register={register}
        error={errors.body?.message}
      />
      <Upload
        label="Image"
        name="image"
        value={formState.image?.toString()}
        setValue={(value) => setValue("image", value)}
      />
      {categoriesData ? (
        <div className={inputGroupStyles}>
          <label className={labelStyles}>Category</label>
          <Select
            defaultText="Select a category"
            items={categoriesData.page}
            setItem={(item) => setValue("categoryId", item)}
            currentItem={formState.categoryId}
          />
        </div>
      ) : null}
      <div className={inputGroupStyles}>
        <label htmlFor="tags" className={labelStyles}>
          Tags
        </label>
        <Tags
          name="tags"
          formTags={formState.tags}
          existingTags={tags}
          setTags={(tags) => setValue("tags", tags)}
        />
      </div>
      <Button type="submit" isLoading={isCreateLoading || isUpdateLoading}>
        {post.id ? "Update" : "Create"}
      </Button>
    </form>
  );
}
