import express, { Express, Response, Request } from 'express';

export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.json();
})

