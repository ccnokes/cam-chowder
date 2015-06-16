
var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');
require('./ga.js');


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	React.render(<Handler/>, document.getElementById('appRoot'));
});