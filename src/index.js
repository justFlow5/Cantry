import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';

import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(<AppRouter />, document.getElementById('root'));
