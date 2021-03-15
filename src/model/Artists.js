const {Schema , model} = require('mongoose')

const ArtistSchema = new Schema({
	name: String,
	comment: String,
    birth: [{
        place: String,
        birthDate: String
    }],
    bio: String,
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


module.exports = model(	'artists', ArtistSchema )
