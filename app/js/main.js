'use strict';
import './globals';
import Router from './components/Router.jsx';
document.getElementById('splash').remove();

React.render(<Router/>, document.getElementById('main'));
