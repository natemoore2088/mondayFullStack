import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';
import { logger } from './middleware/logger';
import errorHandler from './middleware/errorHandler';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import connectDB from './config/dbConn';
import mongoose from 'mongoose';
import { logEvents } from './middleware/logger';

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY)

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static('client/build'));

app.get('*', (req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'client/build/' });
});

app.use(errorHandler)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

export default app;