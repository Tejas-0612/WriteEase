import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import { AuthLayout } from "./components/index.js";
import Shimmer, {
  PostFormShimmer,
  PostShimmer,
} from "./components/Shimmer.jsx";

const Post = lazy(() => import("./pages/Post.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const AllPosts = lazy(() => import("./pages/AllPosts.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authenticated={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authenticated={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authenticated={true}>
            <Suspense fallback={<Shimmer />}>
              <AllPosts />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout>
            <Suspense fallback={<PostFormShimmer />}>
              <AddPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout>
            <Suspense fallback={<PostFormShimmer />}>
              <EditPost />
            </Suspense>
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Suspense fallback={<PostShimmer />}>
            <Post />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
