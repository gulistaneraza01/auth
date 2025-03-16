import express from "express";

//DB connect
import connectDB from "./src/utils/connectDB.js";

//router
import auth from "./src/routes/auth.js";
import client from "./src/routes/client.js";

//middleware
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//router
app.use("/auth", auth);
app.use("/client", client);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "hello from server",
  });
});
app.get("/product", (req, res) => {
  return res.json({
    success: true,
    message: "product info",
  });
});

//server listen
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Listening On PORT:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
