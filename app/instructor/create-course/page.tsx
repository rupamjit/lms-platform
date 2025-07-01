import NewCourseForm from "@/components/courses/NewCourseForm";
import db from "@/lib/db";
import React from "react";

const CreateCourse = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  return (
    <div>
      <NewCourseForm
        categories={categories.map((category) => ({
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subcategory) => ({
            label: subcategory.name,
            value: subcategory.name,
          })),
        }))}
      />
    </div>
  );
};

export default CreateCourse;
