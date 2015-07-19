var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	NotFoundRoute = Router.NotFoundRoute

module.exports = (
	<Route>

		<Route handler={require('../admin/admin.jsx')} path="/admin">
			<Route name="admin-login" handler={require('../admin/admin-login.jsx')} path="login" />
			<Route name="admin-main" handler={require('../admin/admin-main.jsx')} path="main" />
		</Route>

		<Route handler={require('../app.jsx')}>
			<Route name="post-index" handler={require('../article/blog-page.jsx')} path="/"></Route>
			<Route name="single-post" handler={require('../article/single-post.jsx')} path="/blog/:slug"></Route>
			<Route name="contact" handler={require('../contact/contact-page.jsx')} path="/contact"></Route>
			<Route name="about" handler={require('../about/about-page.jsx')} path="/about"></Route>

			<NotFoundRoute name="404" path="/404" handler={require('../not-found.jsx')} />
		</Route>

	</Route>
);