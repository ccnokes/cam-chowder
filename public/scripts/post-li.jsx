var React = require('react'),
	Link = require('react-router').Link,
	filters = require('./config/filters'),
	State = require('react-router').State;


var PostLI = React.createClass({

	mixins: [State],
	
	getInitialState: function() {
		var post = this.props.post;		

		var state = {};
		state.postUrl = '/blog/' + post.slug;
		state.isActive = (this.getPathname() === state.postUrl);
		state.postDate = filters.formatDate(post.modifiedDate);

		state.className = ['list-group-item'];

		// if(state.isActive) {
		// 	state.className.push('active');
		// }

		return state;
	},

	render: function() {
		var post = this.props.post;

		return (			
			<Link to="single-post" params={post} className="list-group-item">
				<div>
					<small>{this.state.postDate}</small>
				</div>
				<p className="list-group-item-heading">{post.title}</p>
			</Link>
		);
	}
});

module.exports = PostLI;