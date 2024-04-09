interface AppErrorInterface {
    status: number,
    message: string
}

export class AppError extends Error {
    status: number;

    constructor({ status, message }: AppErrorInterface) {
        super(message);
        this.status = status;
    }
}