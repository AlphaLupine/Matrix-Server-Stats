import MatrixClient from "./lib/structures/MatrixClient";
import dotenv from 'dotenv';
dotenv.config();

const client = new MatrixClient();
client.start();