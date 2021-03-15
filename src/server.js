//importadno 
const app = require('./app')
//porta utilizada para o servidor
const porta = 8080

//
app.listen(porta, ()=>{
    console.log(`
        =============================================
       ||                                           ||
       ||  Servidor está escutando a porta ${porta}     ||
       ||                                           || 
        =============================================
        
    `)
})
