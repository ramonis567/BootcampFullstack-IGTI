import express from "express";
import router from "./routes/grades.js";

const app = express();

global.fileName = "grades.json";

app.use(express.json());
app.use("/grade", router);
app.listen(3000, () => {
  console.log("API INICIADA");
});