var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slugify = require('../utilities/utils.js').slugify,
	_ = require('lodash'),
	mongoosePaginate = require('mongoose-paginate');


/**
 * Schema
 */

var ArticleSchema = new Schema({
	slug: String,
	status: {
		type: String,
		default: 'active'
	},
	title: String,
	text: String,
	teaser: String,
	modifiedDate: Date,
	createdDate: Date,
	appreciates: {
		type: Number,
		default: 0
	}
});


ArticleSchema.pre('save', function(next) {
	if(!this.slug) {
		this.slug = slugify(this.title);
	}
	this.modifiedDate = this.createdDate = new Date().toISOString();
	next();
});

ArticleSchema.set('toObject', { getters: true });

ArticleSchema.plugin(mongoosePaginate);

var Article = mongoose.model('Article', ArticleSchema);


/**
 * Validation
 */

function checkForEmptyString(str) {
	return _.isString(str) && str.length > 0;
}

Article.schema.path('title').validate(checkForEmptyString, 'Title can\'t be empty');
Article.schema.path('text').validate(checkForEmptyString, 'Text can\'t be empty');