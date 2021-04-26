import express from 'express';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log(err));

import router from './router.js';
import schema from './graphql/schema';

const app = express();

app.set('views', path.join(__dirname, 'static', 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'static', 'public')));

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.redirect('/app');
});
app.use('/app', router);

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

const port = process.env.BASE_PORT || 3000;

function listenHandler() {
    console.log(`Running server on port ${port}...`);
}

app.listen(port, listenHandler);
