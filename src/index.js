const mongoose = require("mongoose");
const app = require("./app");
const dbConnect = require("./Config/config");
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application Running on Port ${port}`);
  dbConnect(mongoose);
});
