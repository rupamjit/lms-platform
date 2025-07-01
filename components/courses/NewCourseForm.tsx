"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComboBox } from "../custom/ComboBox";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is Required and minimum length will be 2 characters",
  }),
  categoryId: z.string().min(2, {
    message: "categotyId is Required and minimum length will be 2 characters",
  }),
  subCategoryId: z.string().min(2, {
    message:
      "subCategoryId is Required and minimum length will be 2 characters",
  }),
});

interface CreateCourseProps {
  categories: {
    name: string; // name of the category
    value: string; // categoryId
    subCategories: { label: string; value: string }[];
  }[];
}

const NewCourseForm = ({ categories }: CreateCourseProps) => {
  // 1. Define  form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Enter Basic Information For Your Course
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex. Web Developmet Course For Beginners" {...field} />
                </FormControl>
                <FormDescription>Enter Title of Your Course</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <ComboBox options={categories} {...field} />
                </FormControl>
                <FormDescription>
                  Select Category For Your Course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SubCategory</FormLabel>
                <FormControl>
                  <ComboBox
                    options={
                      categories.find(
                        (category) =>
                          category.value === form.watch("categoryId")
                      )?.subCategories || []
                    }
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Select SubCategory For Your Course
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-ponter">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewCourseForm;
