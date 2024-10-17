import express, { Express } from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from './routes/financial-record';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGODB || '';

mongoose
  .connect(mongoURI)
  .then(() => console.log('CONNECTED MONGODB!'))
  .catch((err) => console.log('Failed to Connect Mongodb', err));

app.use('/financial-record', financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running Port ${port}`);
});
