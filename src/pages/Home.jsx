import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "../components/Shimmer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    AppwriteService.getPosts([]).then((posts) => {
      if (posts) {
        console.log(posts);
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!userData) {
    return (
      <div className="w-full h-[495px] min-h-[50vh] py-8 mt-4 text-center flex items-center">
        <Container className="">
          <div className="p-2 w-full h-[80%] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
            <Link to="/login">
              <button className="px-4 bg-blue-400 py-2 rounded-md my-2 font-semibold">
                Login
              </button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
  return posts.length == 0 ? (
    <div className="">
      <Shimmer />
    </div>
  ) : (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-center md:text-xl my-4">
          Welcome back,{" "}
          <span className="font-semibold text-xl">{userData?.name}</span>
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="hover:scale-95  p-2 w-[90%] mx-auto md:mx-0 md:w-1/4 h-1/2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
