import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { CookieManager } from "../../services/handleCookies";

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
        <div style={{ borderBottom: "2px solid #E1F0DA" }}>
          <NavBar />
        </div>
      </GridItem>
      <GridItem area="main">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
