import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, FeaturedImage, author }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full hover:shadow-2xl hover:border-gray-300  h-[380px] bg-white shadow-xl border-2 rounded-xl p-4">
        <div className="w-full  justify-center mb-4">
          <img
            src={service.getFilePreview(FeaturedImage)}
            alt={title}
            className="h-[250px] w-full bg-contain rounded-lg"
          />
        </div>
        <div className="relative w-full ml-1 h-[35%]">
          <h2 className="text-xl font-semibold text-pretty">{title}</h2>
          {author && (
            <h2 className="italic text-sm  my-1">
              Post By <span className="font-semibold">{author}</span>
            </h2>
          )}
          <button className="absolute bottom-10 right-2 bg-black font-semibold text-white px-2 py-1 rounded-md hover:bg-blue-600 cursor-pointer">
            Read
          </button>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
