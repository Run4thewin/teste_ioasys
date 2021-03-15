//users model
const {Schema , model} = require('mongoose')
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
	profile_picture: String,
	name: String,
    surname: String,
	phone: String,
	password: { type : String , required : true, select: false },
	email: { type : String , unique : true, required : true },
	gender: Number,
    profile: { type : String , default: 0 },
	status: { type : String , default: 1 },
	createdAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	},
	modifyAt: {
		type: Date,
		default: new Date(+new Date() + 7*24*60*60*1000)
	}
},{
	toJSON:{
		virtuals: true
	}
})

UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 10)
	this.password = hash

	next()
})

module.exports = model('users', UserSchema)
