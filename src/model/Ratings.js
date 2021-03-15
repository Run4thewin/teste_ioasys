const {Schema , model} = require('mongoose')

const RatingSchema = new Schema({
	user_id: String,
	comment: String,
	createdAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
	modifyAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
    rate: Number
},{
	toJSON:{
		virtuals: true
	}
})

RatingSchema.virtual('id').get(function(){ return `${this.id}` })

module.exports = model(	'movie_rates', RatingSchema )
