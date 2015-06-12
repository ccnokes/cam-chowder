var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route;

module.exports = (
	<Route handler={require('../app')}>
		<Route name="post-index" handler={require('../article/blog-page.jsx')} path="/"></Route>
		<Route name="single-post" handler={require('../article/single-post.jsx')} path="/blog/:slug"></Route>
		<Route name="contact" handler={require('../contact/contact-page.jsx')} path="/contact"></Route>
		<Route name="about" handler={require('../about/about-page.jsx')} path="/about"></Route>
		
		<Route name="admin" handler={require('../admin/admin-page.jsx')} path="/cn-admin"></Route>
	</Route>
);