var React = require('react'),
	Link = require('react-router').Link;


var PostLI = React.createClass({
	
	handleClick: function() {
		console.log( this.props.post._id );

	},

	render: function() {
		var post = this.props.post;
		post.url = '/blog/' + post.slug;

		return (
			<div>
				<Link to="single-post" params={post} onClick={this.handleClick}>
					{post.title}
				</Link>
				<p>{post.createdDate || post.modifiedDate}</p>
				// <p>{post.teaser}</p>
			</div>
		);
	}
});

module.exports = PostLI;