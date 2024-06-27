import express from "express";
import shortenerRoutes from "./routes/shortener.routes.js";
import morgan from "morgan";
import { config } from "dotenv";    
import { PORT } from "./config.js";


config();
const app = express();

app.use(morgan('test'))
app.use(express.json());
app.use('/api',shortenerRoutes);

app.listen(PORT);