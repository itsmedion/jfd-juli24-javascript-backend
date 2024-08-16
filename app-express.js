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



app.get('/karyawan', async function(req,res) {
    // amabil object query string msg
    req.query.msg
    let dataview = {
        karyawan: await m_karyawan.get_semuakaryawan(),
        message: req.query.msg,
    }
res.render('karyawan/index', dataview)
})

app.get('/karyawan/detail/:id_karyawan', async function(req,res) {

    // ambil id yang di kirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await m_karyawan.get_satukaryawan(idk),
    }
    res.render('karyawan/detail',dataview)
})



app.get('/karyawan/hapus/:id_karyawan', async function (req,res) {
    // ambil id yang di kirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    try {
        let hapus = await m_karyawan.hapus_satukaryawan(idk)
        if (hapus.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil hapus karyawan`)
        }
    } catch (error) {
        throw(error)
    }
})
    



app.get('/karyawan/tambah', async function(req,res){
    // ambil data departemen dari database tabel departemen
    let dataview = {
        dept: await m_departemen.get_semuaDepartemen(),
        agm: await m_agama.get_semuaAgama(),
    }
    res.render('karyawan/form-tambah',dataview)
})







app.post('/karyawan/proses-insert', async function (req,res){
    // terima kiriman object data dari form html
    console.log(req.body)
    console.log(req.body.form_nama_lengkap)
    let body = req.body

    try {
        let insert = await m_karyawan.insert_karyawan(req)
        if (insert.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil tambah karyawan a/n ${req.body.form_nama_lengkap}`)
        }
    } catch (error) {
        throw(error)
        
    }
})



app.get('/karyawan/edit/:id_karyawan', async function (req,res) {
    let idk = req.params.id_karyawan
    let dataview = {
        dept: await m_departemen.get_semuaDepartemen(),
        agm: await m_agama.get_semuaAgama(),
        pegawai: await m_karyawan.get_satukaryawan(idk),
        }
    res.render('karyawan/form-edit',dataview)
})

app.post('/karyawan/proses-update/:id_karyawan', async (req,res) => {
    let idk = req.params.id_karyawan
    try {
        let update = await m_karyawan.update_karyawan(req, idk)
        if (update.affectedRows > 0) {
            res.redirect(`/karyawan?msg=berhasil edit karyawan a/n ${req.body.form_nama_lengkap}`)
        }
    } catch (error) {
        throw error
    }
})









app.listen(port,function() {
    console.log('Server sudah siap, buka http://localhost:' + port)
})