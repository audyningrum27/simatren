note :
bagaimana cara mengubah status pegawai?
bagaimana supaya kotak presensi di table bisa menampilkan data presensi berdasarkan tanggal?✅
nomor pon ditambah pegawai, nomor induk huruf masih bisa harusnya ga bisa✅
roll nya ganti dropdown✅
sertif upload admin masuk ke user bisa download
bisa buat notif ga kalo ada pengajuancuti baru?


minus :
Admin 
Dashboard => 
- pegawai aktif, presensi, pegawai cuti => filtered by date jadi harus ada kolom tanggal_presensi di semua table terkait(cuti, data_presensi), kalo data pegawai aktif tinggal menyesuaikan data cuti jadi jumlahnya tinggal dikurangi sama data cuti per tanggal_cuti nya
- grafik presensi => data cuti berdasarkan tanggal jadi bisa dibuat grafik sedangkan data cuti belom ada, data cuti didapat dari user upload -> admin acc -> dan data masuk ke database
- grafik pelatihan => seharusnya ngambil jumlah pelatihan berdasarkan bulan dan dalam Waktu 6 bulan✅
- grafik kinerja?

Manajemen Pegawai
pake maxlength
tambah_data✅
- nip => number✅
- no hp => number✅
- posisi dikasih dropdown✅
- data keluarga => tambahin example : jook,koko,lolo✅

detail
- poto profil => tambahin kolom buat potonya, panggil potonya kayak dibukti pelatihan => diupload oleh user
- status perkawinan => cerai is not found✅

Manajemen Gaji
- nip => number✅

Manajemen Presensi
- tambahkan filter tanggal biar table ga penuh✅

Manajemen Pelatihan
- admin atur jadwal => user submit pelatihan => admin acc selesai + upload sertif

atur jadwal 
- add Nama penyelenggara✅
- ada 3 status dalam pelatihan => ini bisa diambil berdasarkan tanggal jadi kalua belom masuk tanggal mulai berarti BELUM DIMULAI, kalua sudah masuk tanggal mulai berarti PROSES, kalua sudah lewat tanggal selesai berarti SELESAI, ✅

histori pelatihan 
- bagaimana membuat logika Ketika data user submit sudah masuk admin acc submitan dan kirim sertif bagi yang mengikuti,



task :
sidebar => nampilin pp terdeteksi login
detail pegawai => menampilkan pp => user
backend pelatihan => konflik✅
data cuti
tab table

note :
jadwal pelatihan detail add edit & delete













Menampilkan data dari database. Yang Perlu diinstall (cd ke folder backend dulu sebelum diinstall):
- npm init -y
- npm install express mysql2 bcryptjs jsonwebtoken cors
- npm install --save-dev nodemon

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
