const express   = require('express')
const app       = express()
const port      = 3000


app.get('/', function(req,res) {
    res.send ('<h1>Hello World !!</h1>')
})

app.get('/hubungi', function(req,res) {
    res.send ('<h1>Silahkan WA: 08233412343</h1>')
})



app.listen(port,function() {
    console.log('Server sudah siap, buka http://localhost:' + port)
})