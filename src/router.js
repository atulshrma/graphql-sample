import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-config';

import jobsRoutes from './components/jobs';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/app/jobs');
});

router.get('/*', async (req, res) => {
    const matchingRoutes = matchRoutes(jobsRoutes, req.url);

    matchingRoutes
        .filter(({ match }) => match.isExact)
        .forEach(async ({ route }) => {
            const { template, component: Component } = route;
            const reactComponent = renderToString(<Component />);

            res.status(200).render(template, { reactComponent });
        });
});

export default router;
