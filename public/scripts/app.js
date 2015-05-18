var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	articleSvc = require('./article/article-svc');


var App = React.createClass({

	render: function() {
		return (
			
			<div className="page-container">
				<header className="header row">
					<div className="col-md-6">
						<h2 className="header-title">Cameron Nokes</h2>
						<p><small>A website about front-end web development, UX, and cheesecake.</small></p>
					</div>
					<nav className="collapse navbar-collapse col-md-6 pull-right">
						<ul className="nav navbar-nav">
							<li>
								<a>Blog</a>
							</li>
							<li>
								<a>About</a>
							</li>
							<li>
								<a>Contact</a>
							</li>
						</ul>
					</nav>
				</header>
				

				<TransitionGroup transitionName="post-index">
					<RouteHandler {...this.props} />
				</TransitionGroup>


				<footer className="footer"></footer>
			</div>

		);
	}

});

module.exports = App;