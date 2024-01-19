const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require("./startup/routes")(app);

require("./startup/db")();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
