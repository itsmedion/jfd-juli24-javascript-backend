let nama = 'Uchiha Sasuke'
let alamat = 'Konoha'

function biodata() {
    return `Biodata Karyawan:\n
        ======================\n
        Nama: ${nama}\n
        Alamat: ${alamat}\n`
}



module.exports = {
    nama,alamat, cetakbio: biodata
}