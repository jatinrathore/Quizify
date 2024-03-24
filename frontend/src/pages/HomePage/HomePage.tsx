import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import LearningPage from "../LearningPage";
import { TokenManager } from "../../services/handleToken";

const HomePage = () => {
  const navigate = useNavigate();

  const tokenExists = TokenManager.isToken();

  useEffect(() => {
    if (!tokenExists) navigate("/");
  }, [tokenExists]);

  return (
    <Grid
      templateAreas={`"nav"
                      "main"`}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="main">
        <LearningPage />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
