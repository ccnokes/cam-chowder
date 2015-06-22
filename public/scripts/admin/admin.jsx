var React = require('react'),
	Router = require('react-router'),
	Link = require('react-router').Link,
	RouteHandler = Router.RouteHandler,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	headerGraphic = require('../header/header-graphic'),
	adminSvc = require('./admin-svc'),
	Navigation = require('react-router').Navigation;


//admin app wrapper
var Admin = React.createClass({
	
	mixins: [Navigation],

	componentDidMount() {
		//render header
		headerGraphic({
			target: '#header-graphic'
		})
		.render();

		//if not authed, redirect to login page
		if(!adminSvc.isAuthenticated()) {
			this.transitionTo('admin-login');
		}
		//go to admin page
		else {
			this.transitionTo('admin-main');
		}
	},

	render() {
		return(
			<div>
				<div id="header-graphic"></div>
				
				<div className="page-container">			
					<header className="header">
						<Link to="post-index">
							View Site
						</Link>
					</header>

					<h1>Site Admin</h1>
					<br />

					<TransitionGroup transitionName="admin">
						<RouteHandler {...this.props} />
					</TransitionGroup>
				</div>

			</div>
		);
	}
});

module.exports = Admin;