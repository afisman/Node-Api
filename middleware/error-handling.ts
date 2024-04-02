import { Request, Response, NextFunction } from "express";


const errorHandler = (app: any): void => {

    app.use((_req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ errorMessage: "This route does not exist" });
    });

    app.use((_req: Request, res: Response, next: NextFunction) => {
        res.status(401).json({ errorMessage: "Error with aunthentication, token doesn't exist" });
    });

    app.use((_req: Request, res: Response, next: NextFunction) => {
        res.status(403).json({ errorMessage: "Error with aunthentication, token is malformed" });
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error("ERROR", req.method, req.path, err);

        if (!res.headersSent) {
            res
                .status(500)
                .json({
                    errorMessage: "Internal server error. Check the server console",
                });
        }
    });
};

export default errorHandler;