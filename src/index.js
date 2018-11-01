import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

//import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Router basename="/app">
  <App />
</Router>
, document.getElementById('root'));
registerServiceWorker();
