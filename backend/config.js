import { config } from "dotenv";

config();
export const PORT = process.env.PORT || 3000;
export const URL_DATABASE = process.env.URL_DATABASE;