var React = require('react/addons');

var CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				Hello, world! I am a CommentList.
			</div>
			);
	}
});

React.render(<CommentList />, document.getElementsByTagName('body')[0]);