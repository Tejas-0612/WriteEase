import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authenticated = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authenticated && authStatus != authenticated) {
      navigate("/login");
    } else if (!authenticated && authStatus != authenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authenticated]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
