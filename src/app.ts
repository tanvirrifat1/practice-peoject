/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler';
import NotFound from './app/middlewares/NotFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(express.text());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1 style="text-align:center; color:#A55FEF; font-family:Verdana;">Hey, How can I assist you today!</h1>',
  );
});

//global error handle

// Global Error Handler
app.use(GlobalErrorHandler);
app.use(NotFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
