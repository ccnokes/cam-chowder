var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongoosePaginate = require('mongoose-paginate'),
	_ = require('lodash'),
	validators = require('../utilities/validators');


var ContactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});

ContactSchema.plugin(mongoosePaginate);

var Contact = mongoose.model('Contact', ContactSchema);

Contact.schema.path('name').validate(validators.isNotEmptyString, 'Name can\'t be empty');
Contact.schema.path('email').validate(validators.isValidEmail, 'Email must be valid');
Contact.schema.path('message').validate(validators.isNotEmptyString, 'Message can\'t be empty');
