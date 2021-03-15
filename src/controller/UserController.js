//
const Users = require('../model/Users')
const jwt = require ('jsonwebtoken')
const config = require ('../../config/config.json')

class UserController{

    async index(req, res){

        const {users_id} = req.params
        const users = await Users.find({
            "_id": users_id
        }, { password: 0 })
        
        res.json( users )
    }

    async store(req, res){
        try{
            const { name, surname, phone, password, email, gender } = req.body
            const token = jwt.sign({ email: email }, config.rashCode, {
                expiresIn: 86400
            })


            const users = await Users.create({
                name,
                surname,
                phone,
                password,
                email,
                gender
            })
   


            return res.status(201).json({ "id": users.id, token})            
        }catch(e){
            return res.status(500).json({ "message": e.message })
        }
      }

    async update(req, res){
        try{

            //armazenando id do Users
            const {user_id} = req.params
            //buscadno os outro parametros
            const { name, surname, phone, password, email, gender } = req.body
            
            const users = await Users.updateOne({ _id: user_id }, {
                name,
                surname,
                phone,
                password,
                email,
                gender
            })

            res.status(200).send( users )
        }catch(e){
            res.status(500).send({ message: e.message })
        }
    }


    async destroy(req, res){

        try{
            const { user_id } = req.params

            await Users.findByIdAndDelete({ _id: user_id }) 
    
            //retorno
            res.status(200).json({ mensage: 'User Deleted' })
    
        }catch(e){
            res.status(500).send({ message: e.message })
        }
    }
}

module.exports = new UserController()