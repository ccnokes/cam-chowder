var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route;

module.exports = (
	<Route handler={require('../app')}>
		
		<Route name="post-index" handler={require('../post-index.jsx')} path="/"></Route>
		<Route name="single-post" handler={require('../single-post.jsx')} path="/blog/:slug"></Route>
		<Route name="contact" handler={require('../contact-page.jsx')} path="/contact"></Route>

	</Route>
);