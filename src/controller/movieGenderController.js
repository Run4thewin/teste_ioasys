//
const MovieGender = require('../model/movieGender')

class MovieGenderController {

    async index(req, res) {

        const { movileGenderId } = req.params

        const movieGender = await MovieGender.find({ _id: movileGenderId })
        
        res.status(200).json({ movieGender })
    }    

    async store(req, res) {

        const { createdBy, name } = req.body

        const moveis = await MovieGender.create({
            createdBy, 
            name
        })

        res.status(201).json({ "id": moveis.id })
    }


    async update(req, res) {
        const { movileGenderId } = req.params
        const { createdBy, name } = req.body

        const updatedMovieGender = await MovieGender.updateOne({ _id: movileGenderId }, {
            createdBy, 
            name
        })

        if(updatedMovieGender)
            return res.send( 'Movie Gender updated' )
    }

    async destroy(req, res) {

        const { movileGenderId } = req.params

        await MovieGender.findByIdAndDelete({ _id: movileGenderId })
        
        res.json({ menseger: "Movie Gender Deleted" })
    }
}

module.exports = new MovieGenderController()