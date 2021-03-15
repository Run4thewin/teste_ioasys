//
const Movies = require('../model/Movies')
const UserModel = require('../model/Users')
const MovieGenderController = require('../controller/UserController')

class MovieController {

    async index(req, res) {

        const { movie_id } = req.params
        const moveis = await Movies.find({ _id: movie_id, status: 1 })
        
        res.json({ moveis })
    }    

    async store(req, res) {

        const userProfile = await UserModel.findOne({ _id: req.body.createdBy })
        //checking if the user is an admin
        if(userProfile.profile != 1){
            return res.status(401).json({ message: 'Acesso negado' })
        }else{
            //if the user is an admin, try to add to the movies table
            try{
                const { cover, title, avarage_votes, watch_options, director, gender, actors, sinopse, createdBy } = req.body
                const moveis = await Movies.create({
                    cover, 
                    title, 
                    avarage_votes,
                    createdBy, 
                    watch_options, 
                    director, 
                    gender, 
                    actors,
                    sinopse
                })
               return res.status(201).json({ "id": moveis.id })
            }catch(e){
                //anything else, send error message
                return res.status(402).json({ message: e.message })        
            }
        }

    }


    async update(req, res) {
        const { movie_id } = req.params
        const { cover, title, avarage_votes, watch_options, description, director, gender, actors } = req.body
        //checking if the user is an admin
        if( userProfile.includes(1) )
            return req.status(401).json({ message: 'Acesso negado' })
        else{
            //if the user is an admin, try to add to the movies table
            try{
                const movies = await Movies.updateOne({ _id: movie_id }, {
                    cover, 
                    title, 
                    avarage_votes, 
                    watch_options, 
                    description, 
                    director, 
                    gender, 
                    actors,
                    sinopse
                })
                return res.status(200).send( 'Movie updated' )

                }catch(e){
                    //anything else, send error message
                    return req.status(402).json({ message: e.message })        
                }
            }
    }

    async destroy(req, res) {

        const { movie_id } = req.params

        await Movies.findByIdAndDelete({ _id: movie_id })

        res.json({ menseger: "Movie Deleted" })
    }
}

module.exports = new MovieController()