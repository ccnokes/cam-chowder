var React = require('react'),
	Link = require('react-router').Link,
	filters = require('./config/filters'),
	State = require('react-router').State;


var activeClass = 'active';
var elClass = 'list-group-item';

var PostLI = React.createClass({

	mixins: [State],

	postIsActive: function(postUrl) {
		return this.getPathname() === this.state.postUrl;
	},

	getInitialState: function() {
		var post = this.props.post;		

		var state = {};
		state.postUrl = '/blog/' + post.slug;
		state.postDate = filters.formatDate(post.createdDate);

		return state;
	},

	render: function() {
		var post = this.props.post;

		//react router's <Link> auto-detect if state is active doesn't seem to work
		//so we handle that behavior manually
		var className = 'list-group-item';
		if(this.postIsActive()) {
			className += ' ' + activeClass;
		}

		return (			
			<Link to="single-post" params={post} className={className}>
				<div>
					<small className="list-group-item-small">{this.state.postDate}</small>
				</div>
				<p className="list-group-item-heading">{post.title}</p>
			</Link>
		);
	}
});

module.exports = PostLI;