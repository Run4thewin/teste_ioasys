const {Schema , model} = require('mongoose')

const MovieGender = new Schema({
	createdBy: {
		type: String,
		required: true
	},
	name: String,
	createdAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
	modifyAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
},{
	toJSON:{
		virtuals: true
	}
})

module.exports = model(	'movie_genders', MovieGender )
