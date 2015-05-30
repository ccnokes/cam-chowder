var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slugify = require('../utilities/utils.js').slugify,
	_ = require('lodash'),
	mongoosePaginate = require('mongoose-paginate'),
	validators = require('../utilities/validators');



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
	var self = this;

	if(!this.slug) {
		this.slug = slugify(this.title);
	}
	this.modifiedDate = this.createdDate = new Date().toISOString();

	if(!this.teaser) {
		this.teaser = this.text.split(' ').splice(0, 80).join(' ') + '...';
	}

	//ensure there are no duplicate slugs created
	this.constructor.findOne({slug: this.slug}, function(err, article) {        
		if(article) {
			//presumably, adding this would be enough to eliminate the possibility of dupe slugs
			//self.slug += '-' + count++;
			
			//throw error
			next(new Error('No duplicate slugs allowed'));
		}
		else {
			next();
		}
	});
});

//ArticleSchema.set('toJSON', { virtuals: true });

ArticleSchema.plugin(mongoosePaginate);

var Article = mongoose.model('Article', ArticleSchema);


/**
 * Validation
 */

Article.schema.path('title').validate(validators.isNotEmptyString, 'Title can\'t be empty');
Article.schema.path('text').validate(validators.isNotEmptyString, 'Text can\'t be empty');

