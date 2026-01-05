//modules imports
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config({ path: 'config/.env' })

const app = express();
const PORT = process.env.PORT;

console.log("port", PORT);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:3001"
}));

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
});