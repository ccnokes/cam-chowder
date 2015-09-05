var contactSvc = require('./contacts-svc'),
	mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	router = require('express').Router(),
	Q = require('q'),
	_ = require('lodash'),
	authCtrl = require('../auth/auth-ctrl'),
	notifier = require('../notifications/notifier'),
	logger = require('../config/logger'),
	appConstants = require('../config/app-constants');


var contactCtrl = exports;
contactCtrl.router = router;

const resourceUri = '/api/contacts';

//protected resource
contactCtrl.getContacts = function(req, res) {
	contactSvc.getContacts(req.params.page, req.params.limit)
	.then(
		function ok(data) {
			res.json(data);
		},
		function err(e) {
			logger.errorLog(e);
			res.status(404).end();
		}
	)
};
router.route(resourceUri).get(authCtrl.isAuthenticated, contactCtrl.getContacts);


contactCtrl.createContact = function(req, res) {
	contactSvc.createContact(req.body)
	.then(
		function ok(contact) {
			//send notification to my phone
			if(appConstants.env !== 'dev') {
				notifier.sendContactNotification(contact._doc);
			}

			res.status(201).json(contact);
		},
		function err(e) {
			logger.errorLog(e);
			res.status(404).end();
		}
	);
};
router.route(resourceUri).post(contactCtrl.createContact);


//protected resource
contactCtrl.removeContact = function(req, res) {
	contactSvc.removeContact(req.params.id)
	.then(
		function ok(contact) {
			res.json({message: 'Contact removed.'});
		},
		function err(e) {
			logger.errorLog(e);
			res.status(404).end();
		}
	);
};
router.route(resourceUri + '/:id').delete(authCtrl.isAuthenticated, contactCtrl.removeContact);
