import express from "express";
import { router } from "./routes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error";

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(router);
app.use("/upload", express.static("images"));
app.use("/download", express.static("images"));

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
