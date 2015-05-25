var React = require('react'),
	articleSvc = require('./article/article-svc'),
	PostLI = require('./post-li.jsx');
	


var PostList = React.createClass({

	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		articleSvc.getAll()
		.then(
			function ok(data) {
				if(this.isMounted()) {
					this.setState({
						posts: data.content
					});
				}
			}.bind(this),
			function err(e) {
				console.error(e);
			}
		);
	},

	render: function() {
		var posts = this.state.posts.map(function(post) {
			return (
				<PostLI post={post} key={post._id}></PostLI>
			);
		});

		return (
			<ul className="list-group">
				{posts}
			</ul>
		);
	}

});

module.exports = PostList;