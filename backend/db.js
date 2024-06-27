import pg from 'pg';
import { config } from "dotenv";
import { URL_DATABASE } from "./config.js";


config();
export const pool = new pg.Pool({
    connectionString: URL_DATABASE,
});