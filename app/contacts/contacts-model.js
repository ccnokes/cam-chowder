var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	mongoosePaginate = require('mongoose-paginate'),
	_ = require('lodash'),
	validators = require('../utilities/validators');


var ContactSchema = new Schema({
	name: String,
	email: String,
	message: String
});

ContactSchema.plugin(mongoosePaginate);

var Contact = mongoose.model('Contact', ContactSchema);

Contact.schema.path('name').validate(validators.isNotEmpty, 'Name can\'t be empty');
Contact.schema.path('email').validate(validators.checkEmail, 'Email must be valid');
Contact.schema.path('message').validate(validators.isNotEmpty, 'Message can\'t be empty');
