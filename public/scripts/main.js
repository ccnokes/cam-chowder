var FontFaceOnload = require('./core/onfontfaceload');
/**
 * adds a class only once to an element
 * @param {DOMElement} node
 * @param {String} newClass - the class to add
 * @return {DOMElement}
 */
function addClassOnce(node, newClass) {
    let classes = node.className.trim().split(' ');
    if(classes.indexOf(newClass) === -1) {
        classes.push(newClass.trim());
        node.className = classes.join(' ');
    }
    return node;
}

const HEADER_FONT = 'Montserrat';
const BODY_FONT = 'Hind';

/*jshint newcap:false*/
FontFaceOnload(HEADER_FONT, {
    success() {
        addClassOnce(document.body, 'font-' + HEADER_FONT);
    }
});

FontFaceOnload(BODY_FONT, {
    success() {
        addClassOnce(document.body, 'font-' + BODY_FONT);
    }
});


var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');
require('./ga.js');


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	React.render(<Handler/>, document.getElementById('appRoot'));
});
