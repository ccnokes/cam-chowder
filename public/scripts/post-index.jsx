var React = require('react'),
	articleSvc = require('./article/article-svc'),
	PostLI = require('./post-li.jsx');


var PostIndex = React.createClass({

	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		articleSvc.getAll()
		.then(
			function ok(data) {
				console.log('getAll()', data);

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
			return (<PostLI post={post} key={post._id}></PostLI>);
		});

		return (
			<section className="content">
				{posts}
			</section>
		);
	}

});

module.exports = PostIndex;