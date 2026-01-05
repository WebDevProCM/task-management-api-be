//modules imports
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import taskRoutes from "./routes/task";
import authRoutes from "./routes/user";

dotenv.config({ path: 'config/.env' });

//importing mongodbConnection
const mongodbConnection = require("../config/db.ts");

//middlewares imports
const errorHandler = require("./middleware/errrorHandler");

const app = express();
const PORT = process.env.PORT;

console.log("port", PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3001"
}));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//handling errors globally
app.use(errorHandler);

//handling Unhandled Rejection and Uncaught Exceptions globally
process.on("uncaughtException", (err) => {
    console.log("Uncaught exception: ", err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, async () =>{
    console.log('server is running');
    await mongodbConnection();
});