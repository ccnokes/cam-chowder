var React = require('react'),
	articleSvc = require('./article/article-svc'),
	PostLI = require('./post-li.jsx');


var PostIndexMixin = {

	getInitialState: function() {
		return {
			posts: [],
			pagination: {
				totalPages: 0,
				page: 0,
				totalPosts: 0,
				postsPerPage: 0
			}
		};
	},

	componentDidMount: function() {
		articleSvc.getAll()
		.then(
			function ok(data) {
				//console.log('getAll()', data);

				if(this.isMounted()) {
					this.setState({
						posts: data.content,
						pagination: {
							totalPages: data.totalPages,
							page: data.page,
							totalPosts: data.totalItems,
							postsPerPage: data.limit
						}
					});
				}

			}.bind(this),
			function err(e) {
				console.error(e);
			}
		);
	}
};

module.exports = PostIndexMixin;