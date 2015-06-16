var React = require('react'),
	validators = require('../../../app/utilities/validators'),
	formComponents = require('../form/form-components.jsx'),
	Input = formComponents.Input,
	TextArea = formComponents.TextArea,
	Hider = require('../core/hider.jsx'),
	adminSvc = require('./admin-svc.js'),
	CreateArticle = require('./create-article.jsx');


export default React.createClass({
	
	render() {
		return(
			<div>
				<CreateArticle />
			</div>
		);
	}
});

