import React from "react";

import ProfileLayout from "../layouts/profile.layout";
import CategoriesList from "../features/Categories/categoriesList";

export default function Categories() {
  return (
    <ProfileLayout title="Categories">
      <CategoriesList />
    </ProfileLayout>
  );
}
