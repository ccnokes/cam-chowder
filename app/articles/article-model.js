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

	//insert auto-generated teaser 
	//this creates problems if there's markdown in it
	// if(!this.teaser) {
	// 	this.teaser = this.text.split(' ').splice(0, 160).join(' ') + '...';
	// }

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

