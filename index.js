import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Approuter from './src/routes/index.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(Approuter);

app.listen(PORT, ()=> console.log(`App listening in port #${PORT}`))