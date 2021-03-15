const jwt = require ('jsonwebtoken')
const config = require ('../../config/config.json')
const Users = require('../model/Users')

module.exports = (req, res, next) => {
    
    //AUTH TOKEN
    const authHeader = req.headers.authorization
    //CHECKING IF NEED TO BE ADMIN TO USE THE ROUTE
    //the list of routes and methods allowed fot admins and no admins are setted on config/config.json
    const adminRiquired = config.routesAdminRequired.path.route.includes(req.url) && config.routesAdminRequired.path.methods.includes(req.url) 
    //CHECK IF CANT BE ADMIN
    const routesForNonAdmins = config.routesAdminRequired.path.route.includes(req.url) && config.routesAdminRequired.path.methods.includes(req.url)
    //CHECKING TOKEN INTEGRIT
    if(!authHeader)
        return res.status(401).send({ message: 'Token não informado' })
    //VALIDATING TOKEN
    jwt.verify( authHeader, config.rashCode, (e, result) => {
        //VERIFYING ERRORS
        if(e)
            return res.status(401).send({ message: e.message })

        //ADMIN VALIDATION
        Users.findOne({ email: result.email }).then((user) => { 
            if( (user.profile != 1  && adminRiquired) || ( user.profile == 1 && routesForNonAdmins))
                return res.status(401).send({ message: 'Acesso negado' })
        })
        //DECODING EMAIL
        req.email = result.email
        return next() 
    })
    
}