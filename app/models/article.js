var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slugify = require('../utilities/slugify.js');


var ArticleSchema = new Schema({
	slug: String,
	status: {
		type: String,
		default: 'active'
	},
	title: String,
	text: String,
	teaser: String,
	modifiedDate: Date
});


ArticleSchema.virtual('date').get(function() {
	return this._id.getTimestamp();
});


ArticleSchema.virtual('url').get(function() {
	return '/blog/' + this.slug;
});


ArticleSchema.pre('save', function(next) {
	if(!this.slug) {
		this.slug = slugify(this.title);
	}
	this.modifiedDate = new Date().toISOString();
	next();
});


ArticleSchema.set('toObject', { getters: true });


mongoose.model('Article', ArticleSchema);
