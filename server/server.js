const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// route
readdirSync("./routes/user").map((route) =>
  app.use("/", require("./routes/user/" + route))
);

connectDb(process.env.DATABASE_URL);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
