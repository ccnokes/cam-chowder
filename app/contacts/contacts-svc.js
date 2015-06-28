var mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Q = require('q'),
	mongoosePaginate = require('mongoose-paginate');


var contactSvc = exports;

contactSvc.getContacts = function(page, limit) {
	var dfd = Q.defer();
	
	var cb = function(error, paginatedResults, pageCount, itemCount) {
		if(error) {
			dfd.reject(error);
		}
		else {
			var returnObj = {
				page: page,
				limit: limit,
				totalPages: pageCount,
				totalItems: itemCount,
				content: paginatedResults
			};

			dfd.resolve(returnObj);
		}
	};

	Contact.paginate({}, {
		page: page, 
		limit: limit,
		sortBy: { date: -1 }
	}, cb);	

	return dfd.promise;
};


contactSvc.createContact = function(contactObj) {
	var newContact = new Contact(contactObj);
	var dfd = Q.defer();

	newContact.save(function(err) {
		if(err) {
			dfd.reject(err);
		}
		else {
			dfd.resolve(newContact);
		}
	});
	return dfd.promise;
};


contactSvc.removeContact = function(id) {
	return Contact.remove({ _id: id }).exec();
};


