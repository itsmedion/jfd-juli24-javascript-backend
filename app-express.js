const express   = require('express')
const app       = express()
const port      = 3000
const mysql     = require('mysql2')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'jfd_belajar_database',
})

db.connect()


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

function get_semuakaryawan() {
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM karyawan", function (errorSql, hasil) {
            if (errorSql) {
                reject(errorSql);
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan', async function(req,res) {
    let dataview = {
        karyawan: await get_semuakaryawan()
    }
res.render('karyawan/index', dataview)
})

app.get('/karyawan/detail/:id_karyawan', async function(req,res) {

    // ambil id yang di kirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    let dataview = {
        pegawai: await get_satukaryawan(idk),
    }
    res.render('karyawan/detail',dataview)
})

function get_satukaryawan(idk) {
    let sql = 
    `SELECT
    karyawan.*,
    departemen.kode, departemen.nama AS nama_dept,
    agama.nama AS nama_agama
    FROM karyawan
    LEFT JOIN departemen ON departemen.id = karyawan.departemen_id
    LEFT JOIN agama ON agama.id = karyawan.agama_id 
    WHERE karyawan.id = ?`;
    return new Promise((resolve,reject)=>{
        db.query(sql, [idk], function (errorSql, hasil) {
            if (errorSql) {
                reject(errorSql);
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan/hapus/:id_karyawan', async function (req,res) {
    // ambil id yang di kirim via url
    let idk = req.params.id_karyawan

    // setelah itu kirim ke proses request data mysql
    try {
        let hapus = await hapus_satukaryawan(idk)
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw(error)
    }
})
    

function hapus_satukaryawan(idk) {
    let sql = 
   `DELETE FROM karyawan
   WHERE id =?`;

   return new Promise((resolve,reject)=>{
    db.query(sql, [idk], function (errorSql, hasil) {
        if (errorSql) {
            reject(errorSql);
        } else {
            resolve(hasil)
        }
    })
})
}

app.get('/karyawan/tambah', function(req,res){
    res.render('karyawan/form-tambah')
})


app.listen(port,function() {
    console.log('Server sudah siap, buka http://localhost:' + port)
})