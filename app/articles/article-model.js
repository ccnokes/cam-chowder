var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slugify = require('../utilities/utils.js').slugify,
	_ = require('lodash'),
	mongoosePaginate = require('mongoose-paginate'),
	validators = require('../utilities/validators'),
	md = require('../utilities/md');


/**
 * Schema
 */

var ArticleSchema = new Schema({
	slug: {
		type: String,
		index: true
	},
	status: {
		type: String,
		default: 'active'
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	teaser: String,
	metaDescription: String,
	modifiedDate: Date,
	createdDate: {
		type: Date,
		default: Date.now
	},
	appreciates: {
		type: Number,
		default: 0
	}
},
{
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
});


ArticleSchema.pre('save', function(next) {
	var self = this;

	if(!this.slug) {
		this.slug = slugify(this.title);
	}
	this.modifiedDate = this.createdDate = new Date().toISOString();

	this.title = this.title.trim();

	//ensure there are no duplicate slugs created
	this.constructor.findOne({slug: this.slug}, function(err, article) {        
		if(article) {			
			//throw error
			next(new Error('No duplicate slugs allowed'));
		}
		else {
			next();
		}
	});
});

//update sitemap when new post added
ArticleSchema.post('save', function() {
	//can't require this above because it eventually relies on this file,
	//which creates a weird circular dependency
	require('../utilities/sitemap-generator').renderSitemap();
});

ArticleSchema.virtual('html').get(function() {
	return md.render(this.text);
});

ArticleSchema.plugin(mongoosePaginate);

var Article = mongoose.model('Article', ArticleSchema);


/**
 * Validation
 */

Article.schema.path('title').validate(validators.isNotEmptyString, 'Title can\'t be empty');
Article.schema.path('text').validate(validators.isNotEmptyString, 'Text can\'t be empty');

