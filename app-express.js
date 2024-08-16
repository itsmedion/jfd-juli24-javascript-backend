const express   = require('express')
const app       = express()
const port      = 3000

// untuk mengambil data yg ter-encoded (terenkripsi) dari form html 
// yg dikrimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs') //setting penggunaan template engine untuk express
app.set('views', './view-ejs') //setting penggunaan folder untuk menyimpan file

// include masing-masing model
const m_karyawan = require('./model/m_karyawan')
const m_departemen = require('./model/m_departemen')
const m_agama = require('./model/m_agama')

const c_karyawan = require('./controller/c_karyawan')

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
app.get('/karyawan',c_karyawan.index)
app.get('/hubungi', function(req,res){
    res.render('hubungi-developer')
})
    // amabil object query string msg
app.get('/karyawan/detail/:id_karyawan',c_karyawan.detail)
app.get('/karyawan/hapus/:id_karyawan',c_karyawan.hapus)
app.get('/karyawan/tambah',c_karyawan.tambah)
app.post('/karyawan/proses-insert',c_karyawan.proses_insert)
app.get('/karyawan/edit/:id_karyawan',c_karyawan.proses_insert)
app.post('/karyawan/proses-update/:id_karyawan',c_karyawan.proses_update)

app.listen(port,function() {
    console.log('Server sudah siap, buka http://localhost:' + port)
})