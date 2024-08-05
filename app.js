const http = require('http')

http.createServer (function(request,respon){
    // mendeteksi status http 200 (user berhasil terkoneksi dengaan aplikasi kita)
    // Content type: jenis type konten apa yg ingin di berikan ke user
    // jenis type text plain itu akan menampilkan text apa adanya
    // jenis type text html akan merender tag html menjadi tampilan di browser
    respon.writeHead(200,{'Content-type':'text/html'})
    // hasil akhir yg akan diberikan ke user
    respon.end('<h1>Halo Guys, Aji disini mau review gadget</h1>')
}).listen(3000, function() {
    console.log('server sudah siap, buka http://localhost:3000')
})



