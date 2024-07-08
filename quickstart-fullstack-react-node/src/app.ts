import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';
import { logger } from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import connectDB from './config/dbConn';
import mongoose from 'mongoose';
import { logEvents } from './middleware/logger';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 8080;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Determine the correct path to your static files and index.html
let staticPath = path.join(__dirname, '../client/build');
let indexPath = path.join(staticPath, 'index.html');

// If the above path doesn't exist, try an alternative
if (!fs.existsSync(indexPath)) {
  staticPath = path.join(__dirname, 'client/build');
  indexPath = path.join(staticPath, 'index.html');
}

// If we still can't find it, log an error
if (!fs.existsSync(indexPath)) {
  console.error('Cannot find index.html. Please check your build process and file locations.');
}

// Serve static files
app.use(express.static(staticPath));

// API routes
app.use('/api', routes);

// For any other route, serve index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(indexPath);
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

export default app;