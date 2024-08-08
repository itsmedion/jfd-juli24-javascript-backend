const http= require('http')
const  fs = require('fs')

let server = http.createServer( function(request, respon) {
    if(request.url == '/') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/beranda.html').pipe(respon)
    } 
    else if (request.url == '/karyawan') {
        respon.writeHead(200, {'Content-type': 'text/html'})
        // proses pengambilan data dari mysql
        fs.createReadStream('./view/karyawan/semua.html').pipe(respon)
    }
    else {
        respon.writeHead(200, {'Content-type': 'text/html'})
        fs.createReadStream('./view/error404.html').pipe(respon)
    }
})


server.listen(3000, function() {
    console.log('Server sudah siap, buka http://localhost:3000');
})