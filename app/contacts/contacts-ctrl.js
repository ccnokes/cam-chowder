var contactSvc = require('./contacts-svc'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	router = require('express').Router(),
	Q = require('q'),
	_ = require('lodash');


var contactCtrl = exports;
contactCtrl.router = router;


contactCtrl.getContacts = function(req, res) {
	contactSvc.getContacts(req.params.page, req.params.limit)
	.then(
		function ok(data) {
			res.json(data);
		},
		function err(e) {
			res.status(404).end();
		}
	)
};
router.route('/api/contacts').get(contactCtrl.getContacts);


contactCtrl.createContact = function(req, res) {
	contactSvc.createContact(req.body)
	.then(
		function ok(contact) {
			res.status(201).json(contact);
		},
		function err(e) {
			console.log(e);
			res.status(404).end();
		}
	);
};
router.route('/api/contacts').post(contactCtrl.createContact);