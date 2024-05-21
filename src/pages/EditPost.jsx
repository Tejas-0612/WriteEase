import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppwriteSevice from "../appwrite/config";
import { Container, PostForm } from "../components";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      AppwriteSevice.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          console.log(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8 bg-slate-100">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPost;
