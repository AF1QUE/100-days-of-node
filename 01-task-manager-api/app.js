require("./db/connect");
const express = require("express");
const app = express();
const tasksRouter = require("./routes/taskRoutes");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

require("dotenv").config();

// middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB CONNECTION WAS ESTABLISHED!");
    app.listen(3000, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
