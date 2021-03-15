//users model
const {Schema , model} = require('mongoose')

const MovieSchema = new Schema({
	cover: String,
	createdBy: String,
	title: String,
	avarage_votes: String,
	watch_options: String,
	director: String,
	gender: [],
	actors: [],
	status: {
		type: Number,
		default: 1
	},
	sinopse: String,
	createdAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
	modifyAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
	createdBy: String,
},{
	toJSON:{
		virtuals: true
	}
})


module.exports = model('movies', MovieSchema)
