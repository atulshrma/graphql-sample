import React from 'react';
import { hydrate } from 'react-dom';

import { Jobs } from '../components/jobs/presenter';

hydrate(<Jobs />, document.getElementById('root'));
