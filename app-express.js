const express   = require('express')
const app       = express()
const port      = 3000


app.set('view engine','ejs') //setting penggunaan template engine untuk express
app.set('views', './view-ejs') //setting penggunaan folder untuk menyimpan file




app.get('/', function(req,res) {
    res.send ('<h1>Hello World !!</h1>')
})

// route -> rute
// app.get('/hubungi', function(req,res) {
    // res.send ('<h1>Silahkan WA: 08233412343</h1>')
// })


app.get('/profil', function(req,res){
    let data = {
        jabatan: 'Senior Manager',
        gender: 'Laki',
        gaji: 5000000,
    }
    res.render ('profil-developer',data)
    // error karna express tidak bisa membaca file dengan extensi .html
    // res.send(require('./view/profil.html'))
})


app.get('/hubungi', function(req,res){
    res.render('hubungi-developer')
})

app.listen(port,function() {
    console.log('Server sudah siap, buka http://localhost:' + port)
})