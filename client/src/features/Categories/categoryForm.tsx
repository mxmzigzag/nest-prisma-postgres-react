import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as createUID } from "uuid";

import { Category } from "../../types/category.types";

import { useCreateCategoryMutation } from "../../store/api/category.api";

import InputGroup from "../../components/forms/inputGroup";
import Button from "../../components/ui/button";
import { errorToast, successToast } from "../../components/ui/toast";

type Props = {
  category?: Category;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryForm({
  category = {
    id: createUID(),
    title: "",
    color: "#000",
  },
  setIsOpen,
}: Props) {
  const [formData, setFormData] = useState<Category>(category);

  const [createCategory] = useCreateCategoryMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      setIsOpen(false);
      successToast(`Category ${formData.title} is created!`);
    } catch (error: any) {
      errorToast(error.message);
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="category-form-content">
        <InputGroup
          label="Title"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={onChange}
          className="category-form-input"
        />
        <InputGroup
          label="Color"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={onChange}
          className="category-form-input"
        />
      </div>
      <Button type="submit" className="category-form-btn">
        Save
      </Button>
    </form>
  );
}
