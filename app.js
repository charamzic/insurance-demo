import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import auth from "./route/auth/authRoutes.js";
import home from './route/homeRoutes.js';
import insureds from './route/insuredRoutes.js';
import insuredsApi from './route/api/insuredApiRoutes.js';
import insurancesApi from './route/api/insuranceApiRoutes.js';
import insurance from "./route/insuranceRoutes.js";
import { checkUser } from "./config/authMiddleware.js";
import router from "./route/insuranceRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CORS_JAVAJITSU, process.env.CORS_LOCALHOST]
}));


app.use('*', checkUser);

app.use(auth);

app.use('/', home);
app.use('/insureds', insureds);
app.use('/insurances', insurance);

app.use('/api/insureds', insuredsApi);
app.use('/api/insurances', insurancesApi);

app.use((req, res) => {
    res.status(400).render('404', { title: '404', activePage: '' });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
    .catch((err) => console.log('Something went wrong, when connecting to Mongo: ' + err));