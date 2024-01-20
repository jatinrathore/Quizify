import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const Q_METER = "QM-token";
  const isLoggedIn = !!localStorage.getItem(Q_METER);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return <div>HomePage</div>;
};

export default HomePage;
