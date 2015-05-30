var React = require('react');

var PaginationItem = React.createClass({
	
	// getInitialState: function() {
		
	// },

	goToPage: function() {
		console.log(this.props.page);
	},

	render: function() {
		return (
			<li onClick={this.goToPage} className={this.props.isActive ? 'is-active' : ''}>
				{this.props.children}
			</li>
		);
	}
});

var Pagination = React.createClass({

	render: function() {
		var data = this.props.pagination;

		var count = 0;
		var pages = [];

		while(count < data.totalPages) {
			count++;
			pages.push(
				<PaginationItem key={count} page={count} isActive={ data.page === count }>
					{count}
				</PaginationItem>
			);
		}

		return (
			<ul className="pagination">
				{pages}
			</ul>
		);
	}
});

module.exports = Pagination;