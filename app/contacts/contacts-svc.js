var mongoose = require('mongoose'),
	Contact = mongoose.model('Contact'),
	Q = require('q'),
	mongoosePaginate = require('mongoose-paginate');


var contactSvc = exports;

contactSvc.getContacts = function(page, limit) {
	var dfd = Q.defer();
	
	Contact.paginate({}, page, limit, function(error, pageCount, paginatedResults, itemCount) {			
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
	}, {
		//return in descending order (last made come first)
		sortBy: { date: -1 }
	});	

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
