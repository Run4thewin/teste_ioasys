//ROUTERS
const {Router} = require('express')
const routes = new Router()
const authFunction = require ('./utils/authMiddleware')

//CONTROLLERS
const UserController = require('./controller/UserController')
const RatingsController = require('./controller/RatingsController')
const MoviesController = require('./controller/MoviesController')
const MovieGenderController = require('./controller/MovieGenderController')
const ArtistsController = require('./controller/ArtistsController')
const SystemController = require('./controller/SystemController')

//AUTH ROUTE AND CREATE ROUTER
routes.post('/auth', SystemController.auth)
routes.post('/user/create', UserController.store)

routes.use(authFunction)
    //user routes
routes.get('/user/:users_id', UserController.index)
routes.put('/user/:user_id', UserController.update)
routes.delete('/user/:user_id', UserController.destroy)

//Movies routes
routes.post('/rating/create', RatingsController.store)
routes.get('/rating/:id', RatingsController.index)
routes.put('/rating/:id', RatingsController.update)
routes.delete('/rating/:id', RatingsController.destroy)

//Rating routes
routes.post('/movie/create', MoviesController.store)
routes.get('/movie/:movie_id', MoviesController.index)
routes.put('/movie/:movie_id', MoviesController.update)
routes.delete('/movie/:movie_id', MoviesController.destroy)

//movieGender routes
routes.post('/movieGender/create', MovieGenderController.store)
routes.get('/movieGender/:movileGenderId', MovieGenderController.index)
routes.put('/movieGender/:movileGenderId', MovieGenderController.update)
routes.delete('/movieGender/:movileGenderId', MovieGenderController.destroy)

//artists routes
routes.post('/artists/create', ArtistsController.store)
routes.get('/artists/:artist_id', ArtistsController.index)
routes.put('/artists/:artist_id', ArtistsController.update)
routes.delete('/artists/:artist_id', ArtistsController.destroy)


//routes.stack.forEach((item) => console.log(`Path: ${item.route.path}`))
            

module.exports = routes 