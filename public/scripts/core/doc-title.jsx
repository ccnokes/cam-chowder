//just a wrapper around react-document-title library so I ensure consistent naming across the site

import DocumentTitle from 'react-document-title';
import React from 'react';

let baseTitle = document.title; //use document title that is in HTML / index.ejs as a baseline
let delim = ' | ';

export default React.createClass({

	propTypes: {
		pageTitle: React.PropTypes.string
	},

	render() {
		let docTitle = (this.props.pageTitle ? this.props.pageTitle + delim : '') + baseTitle;

		return(
			<DocumentTitle title={docTitle} {...this.props} />
		);
	}
});