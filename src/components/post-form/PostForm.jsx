import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { Input, Button, Select, RTE, Login } from "../index";
import appwriteService from "../../appwrite/config";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || " ",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    if (post) {
      setLoading(true);
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.FeaturedImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        FeaturedImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        toast.success("Updated Successfully");
        setLoading(false);
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      setLoading(true);
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.FeaturedImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
          author: userData?.name,
        });
        console.log(dbPost);
        setLoading(false);
        toast.success("Posted successfully");
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return userData ? (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col bg-white shadow-xl px-10 py-4 rounded-md"
    >
      <div className="my-14">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          defaultValue={getValues("title")}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/2 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 border-2 border-gray-300"
          {...register("status", { required: true })}
        />
      </div>

      <Button
        type="submit"
        bgColor={post ? "bg-green-500 hover:bg-green-600" : undefined}
        className="w-full flex justify-center gap-2 font-semibold"
      >
        {loading && <Spinner />}
        {post
          ? loading
            ? "Updating"
            : "Update"
          : loading
          ? "Saving"
          : "Submit"}
      </Button>
    </form>
  ) : (
    <Login />
  );
}
