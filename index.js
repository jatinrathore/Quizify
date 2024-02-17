require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
require("./startup/routes")(app);

//database connection
require("./startup/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
