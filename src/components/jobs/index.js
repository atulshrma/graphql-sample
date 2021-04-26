import List from './partials/List';
import { Jobs } from './presenter';

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
