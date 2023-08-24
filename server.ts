import path from 'path';
import express, { Request, Response } from 'express';

const { PORT, NODE_ENV } = process.env;

const app: express.Application = express();
const port: string | number = PORT || 4000;
const isDevelopment: boolean = NODE_ENV === 'development';
const staticDir: string = isDevelopment ? './build' : '.';

app.use(express.static(path.join(__dirname, staticDir)));

app.get('*', (_req: Request, res: Response): void => {
  res.sendFile('index.html', {
    root: path.join(__dirname, staticDir),
  });
});

app.listen(port, () => {
  console.log(`Express server listeting on port ${port}`);
});
