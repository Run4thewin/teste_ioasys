const config = require ('../../config/config.json')
const UserModel = require('../model/Users')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt');

class System {

    async auth(req, res) {

        const token = jwt.sign({ email: req.body.email }, config.rashCode, {
            expiresIn: 86400
        })

        const user = await UserModel.findOne({ email: req.body.email }).select('+password')

        if(!await bcrypt.compare( req.body.password, user.password ))  
            return res.status(401).send({ message: 'Acesso negado' })
        else
            user.password = undefined
            return res.status(200).send({ user, token })
    }    

}

module.exports = new System()