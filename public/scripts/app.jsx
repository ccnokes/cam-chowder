let React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	Link = require('react-router').Link,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	headerGraphic = require('./header/header-graphic'),
	Header = require('./header/header.jsx'),
	DocTitle = require('./core/doc-title.jsx'),
	Icon = require('./core/icon.jsx'),
	appConstants = require('./config/constants');


let Footer = React.createClass({
	render() {
		return (
			<footer className="footer">
				<div className="page-container">
					<div>
						<a href={appConstants.linkedin}>
							<Icon className="social-icon" id="linkedin" />
						</a>
						<a href={appConstants.github}>
							<Icon className="social-icon" id="github" />
						</a>
						<a href={appConstants.twitter}>
							<Icon className="social-icon" id="twitter" />
						</a>
						<a href={appConstants.stackOverflow}>
							<Icon className="social-icon" id="stackoverflow" />
						</a>
					</div>
					<br />
					<small>&copy; { (new Date).getFullYear() } Cameron Nokes</small>
				</div>
			</footer>
		);
	}
});


// let tags = [
// 	{'twitter:card': 'summary'},
// 	{'twitter:site': '@ccnokes'},
// 	{'twitter:creator': '@ccnokes'}
// ];


let App = React.createClass({

	componentDidMount() {
		headerGraphic.makeGraphic({
			target: '#header-graphic'
		});
	},

	componentWillUnmount() {
		headerGraphic.destroy();
	},

	render() {
		return (
			<DocTitle>
				<div>
					<div id="header-graphic"></div>
					<div className="page-container">
						<Header/>
						<TransitionGroup transitionName="post-index">
							<RouteHandler {...this.props} />
						</TransitionGroup>
					</div>
					<Footer />
				</div>
			</DocTitle>
		);
	}

});


module.exports = App;