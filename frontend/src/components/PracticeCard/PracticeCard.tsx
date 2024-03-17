import { Box } from "@chakra-ui/react";
import "./practicecard.css";
import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}
const PracticeCard = ({ title, subtitle, children }: Props) => {
  return (
    <div className="db-cc-card">
      <div className="db-cc-title">{title}</div>
      <div className="db-cc-subtitle">{subtitle}</div>
      <Box display="flex" alignItems="center" justifyContent="center" mb="20px">
        <div className="card-circle">{children}</div>
      </Box>
      <button className="cc-card-btn">
        <span className="cc-btn-title">Practice Now!</span>
      </button>
    </div>
  );
};

export default PracticeCard;
