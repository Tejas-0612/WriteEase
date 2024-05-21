import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import AppwriteService from "../appwrite/config";
import Shimmer from "../components/Shimmer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  useEffect(() => {
    AppwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log(posts);
      }
    });
  }, []);

  if (!userData) <Navigate to="/" />;
  return posts.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="w-full py-8 bg-slate-100">
      <Container>
        <div className="flex flex-wrap flex-col md:flex-row">
          {posts
            .filter((post) => post.userId == userData?.$id)
            .map((post) => (
              <div
                key={post.$id}
                className="p-2 w-[90%] mx-auto md:mx-0 md:w-1/4 h-1/2"
              >
                {post?.userId == userData.$id && (
                  <div className="hover:scale-105">
                    <PostCard {...post} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
