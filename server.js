import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "./database/conn.js";
import router from "./router/route.js";
import bodyParser from "body-parser";
import multer from "multer";
import { verifyUser } from "./controller/appController.js";

const app = express();
const upload = multer();

// ************* midlewar *************
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); 

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Hello World");
});

//api routes
app.use("/api", upload.none(), router);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server Connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot Connected to server");
    }
  })
  .catch((error) => {
    console.log("Invalid DataBase Connection");
  });
