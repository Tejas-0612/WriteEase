import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { PostShimmer } from "../components/Shimmer";
const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      AppwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    AppwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        AppwriteService.deleteFile(post.FeaturedImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-slate-100 ">
      <Container>
        <div className="bg-white py-4 rounded-lg">
          <div className="w-auto max-h-[450px] flex justify-center mb-4 relative border-2 mx-2 rounded-xl p-2  ">
            <img
              src={AppwriteService.getFilePreview(post.FeaturedImage)}
              alt={post.title}
              className="rounded-xl bg-center"
            />
            {isAuthor && (
              <div className="absolute right-2 top-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500 hover:bg-green-600 font-semibold"
                    className="mr-2"
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500 hover:bg-red-600 font-semibold"
                  onClick={deletePost}
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6 ">
            <h1 className="text-xl md:text-3xl text-center font-semibold my-4">
              {post.title}
            </h1>
            {post.author && (
              <p className="text-center mb-2 ">
                Post by <span className="font-bold">{post.author} </span>
              </p>
            )}
            <div className="w-[90%] md:max-w-6xl mx-auto text-base md:text-lg">
              {post?.content ? parse(post.content) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <PostShimmer />
  );
};

export default Post;
