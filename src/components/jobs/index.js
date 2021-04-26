import List from './partials/List.jsx';
import { Jobs } from './presenter.js';

const ROUTES = [
    {
        component: Jobs,
        routes: [
            {
                path: '/jobs',
                exact: true,
                component: List,
                template: 'jobs',
            },
        ],
    },
];

export default ROUTES;
