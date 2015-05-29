var React = require('react'),
	articleSvc = require('./article/article-svc'),
	PostLI = require('./post-li.jsx'),
	PostIndexMixin = require('./post-index-mixin');


var PostIndex = React.createClass({

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