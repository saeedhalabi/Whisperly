import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

// body parser (JSON-encoded bodies)
app.use(bodyParser.json());

// body parser (URL-encoded bodies)
app.use(bodyParser.urlencoded({ extended: true }));

// listen for a port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
