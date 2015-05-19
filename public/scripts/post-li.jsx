var React = require('react'),
	Link = require('react-router').Link,
	filters = require('./config/filters'),
	State = require('react-router').State;


var activeClass = 'active';
var elClass = 'list-group-item';

var PostLI = React.createClass({

	mixins: [State],

	postIsActive: function(postUrl) {
		return this.getPathname() === postUrl;
	},

	getInitialState: function() {
		var post = this.props.post;		

		var state = {};
		state.postUrl = '/blog/' + post.slug;
		state.postDate = filters.formatDate(post.createdDate);
		state.className = elClass;

		if(this.postIsActive(state.postUrl)) {
			state.className += ' ' + activeClass;
		}

		return state;
	},

	//react router's <Link> auto-detect if state is active doesn't seem to work
	//so we handle that behavior manually
	componentWillReceiveProps: function() {
		if(this.isMounted()) {
			//it's active
			if(this.postIsActive(this.state.postUrl)) {
				var className = elClass + ' ' + activeClass;
				this.setState({
					className: className
				});
			}
			//it's not
			else {
				this.setState({
					className: elClass
				});
			}
		}
	},

	render: function() {
		var post = this.props.post;

		return (			
			<Link to="single-post" params={post} className={this.state.className}>
				<div>
					<small className="list-group-item-small">{this.state.postDate}</small>
				</div>
				<p className="list-group-item-heading">{post.title}</p>
			</Link>
		);
	}
});

module.exports = PostLI;