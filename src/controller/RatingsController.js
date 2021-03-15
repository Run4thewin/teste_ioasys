//
const Ratings = require('../model/Ratings')

class RatingsController {

    async index(req, res) {

        const { movie_id, rate_id, user_id } = req.params
        const rate = await Ratings.find({ movie_id: movie_id, _id: rate_id, user_id: user_id })
        
        res.status(200).json({ rate })
    }    

    async store(req, res) {

        const { user_id, comment, rate } = req.body

        const moveis = await Ratings.create({
            user_id, 
            comment, 
            rate
        })

        res.status(201).json({ "id": moveis.id })
    }


    async update(req, res) {
        const { rate_id } = req.params
        const { user_id, comment, rate } = req.body

        const updatedRate = await Ratings.updateOne({ _id: rate_id }, {
            user_id, 
            comment, 
            rate
        })

        if(updatedRate)
            return res.send( 'rate updated' )
    }

    async destroy(req, res) {

        const { rate_id } = req.params

        await Ratings.findByIdAndDelete({ _id: rate_id })
        
        res.json({ menseger: "rate_id Deleted" })
    }
}

module.exports = new RatingsController()