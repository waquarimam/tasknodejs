import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {restRouter} from './api'
import swaggerUi from 'swagger-ui-express';
import {connect} from './config/db';

const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();
connect();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
console.log(process.env.NODE_ENV);
const base_route = "/customer/api/v1/";
app.use(async(req, res, next) => { 
     next();
});
app.use(base_route, restRouter);
app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
    })
);
app.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json(response.error('Invalid Route', _lang('NOTFOUND'), 404));
});
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(response.error('Server Error', error.message, error.status || 500));
});
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
