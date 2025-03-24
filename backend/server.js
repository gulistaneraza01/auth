import express from "express";

//DB connect
import connectDB from "./src/utils/connectDB.js";

//router
import auth from "./src/routes/auth.js";

//middleware
import cookieParser from "cookie-parser";
import cors from "cors";

//utils
import { incomeUrl } from "./src/utils/constaints.js";

const app = express();

//port
const port = process.env.PORT || 8000;

//middleware
app.use(cors({ origin: incomeUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use("/auth", auth);

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
