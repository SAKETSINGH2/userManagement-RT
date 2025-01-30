const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/databaseConnection");
dotenv.config();
const routes = require("./routes/index");

const app = express();

const port = process.env.PORT || 4000;

connectDb();

app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
    console.log(`app is running on ${port}`);
});
