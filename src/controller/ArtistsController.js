//
const Artist = require('../model/Artists')

class ArtistsController {

    async index(req, res) {
        

        const { artist_id } = req.params
        const rate = await Artist.find({ artist_id: artist_id })
        
        res.status(200).json({ rate })
    }    

    async store(req, res) {

        const { name, comment, place, birthDate, bio } = req.body

        const moveis = await Artist.create({
            name, 
            comment, 
            birth: [{
                place,
                birthDate
            }],
            bio
        })

        res.status(201).json({ "id": moveis.id })
    }


    async update(req, res) {
        const { rate_id } = req.params
        const { user_id, comment, rate } = req.body

        const updatedRate = await Artist.updateOne({ _id: rate_id }, {
            user_id, 
            comment, 
            rate
        })

        if(updatedRate)
            return res.send( 'rate updated' )
    }

    async destroy(req, res) {

        const { rate_id } = req.params

        await Artist.findByIdAndDelete({ _id: rate_id })
        
        res.json({ menseger: "rate_id Deleted" })
    }
}

module.exports = new ArtistsController()