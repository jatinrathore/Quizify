import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { CookieManager } from "../../services/handleCookies";
import LearningPage from "../LearningPage";

const HomePage = () => {
  const navigate = useNavigate();

  const cookieExists = CookieManager.isCookieSet();

  useEffect(() => {
    if (!cookieExists) navigate("/");
  }, [cookieExists]);

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
