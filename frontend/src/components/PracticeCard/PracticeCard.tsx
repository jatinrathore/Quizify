import { Box } from "@chakra-ui/react";
import "./practicecard.css";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CookieManager } from "../../services/handleCookies";
import useQuestionsStore from "../../store";

interface Props {
  title: string;
  subtitle: string;
  genre: string;
  children: ReactNode;
}
const PracticeCard = ({ title, subtitle, children, genre }: Props) => {
  const navigate = useNavigate();
  const cookieExists = CookieManager.isCookieSet();
  const setSelectedGenre = useQuestionsStore((s) => s.setSelectedGenre);

  const handleClick = () => {
    console.log("Haanji " ,cookieExists);

    if (!cookieExists) {
      navigate("/account-manage");
    } else {
      setSelectedGenre(genre);
      navigate("/home");
    }
  };

  return (
    <div className="db-cc-card">
      <div className="db-cc-title">{title}</div>
      <div className="db-cc-subtitle">{subtitle}</div>
      <Box display="flex" alignItems="center" justifyContent="center" mb="20px">
        <div className="card-circle">{children}</div>
      </Box>
      <button className="cc-card-btn" onClick={handleClick}>
        <span className="cc-btn-title">Practice Now!</span>
      </button>
    </div>
  );
};

export default PracticeCard;
