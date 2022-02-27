import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import uploadConfig from '../../../config/upload';
import { AppError } from '../../errors/AppError';
import cors from 'cors';
import { routes } from './routes';
import "../../container";
import '../typeorm';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

app.use(express.json());

app.use(errors());

app.use(routes);

app.use('/files', express.static(uploadConfig.tmpFolder));
 
app.get('/', (request, response) => response.json({ message: 'Hello world!' }));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'internal server error'
    })
});

app.listen(3333, () => console.log('Server is running!'));
