//modules import
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import taskRoutes from "./routes/task";
import authRoutes from "./routes/user";

dotenv.config({ path: 'config/.env' });

//importing mongodbConnection
const mongodbConnection = require("../config/db.ts");

//middlewares imports
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT;

console.log("port", PORT);

// RATE LIMITING
const limiting = rateLimit({
  windowMs: 1000 * 60, //1 minutes
  limit: 3, // Limit each IP to 3 requests per `window`
  message: {success:false, message: "Too many requests, please try again later."},
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true,
}));

// route registration
app.use("/api/auth", limiting, authRoutes);
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