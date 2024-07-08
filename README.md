User

ProfilEdit
- button edit => numpuk✅
- add mata di password Ketika klik button edit,✅ => hash masih berlaku
- posisi dibuat dropdown if isedit click✅


Histori Presensi 
- tab table✅
- data ambil dari database berdasarkan ID✅
- data ambil dari post QR
- perhitungan total jam kerja✅

Scan QR 
- masuk dan keluar dibedain✅
- data masuk ke database
- dapat menangkap gps user Ketika akan scan
- scan hanya bisa dilakukan di ponpes sesuai dengan shift

penggajian
- tab table✅
- select data download & all select✅

cuti
- data pengajuan langsung masuk ke admin
- status awal => proses
- admin menyetujui => status berubah jadi => Disetujui
- admin menolak => status berubah jadi => Ditolak
- button lihat histori => typo dan ganggu penempatannya
- tab table

pelatihan
- masukkan nama kegiatan
- Ketika tekan konfir di jadwal pelatihan maka data akan masuk ke histori
- Ketika sudah masuk ke histori status menyesuaikan tanggal
- tambahkan kolom untuk sertif
- hilangkan nip 
- tambahkan nama penyelenggara
- tab table

grafik kinerja
=> presensi
- ambil dari data histori presensi => aktif dan cuti

=> pelatihan
- ambil dari data histori pelatihan => banyaknya yang sudah diikuti



*******
Admin 
- sidebar => nampilin pp terdeteksi login
- tab table✅

Dashboard => 
- pegawai aktif, presensi, pegawai cuti => filtered by date jadi harus ada kolom tanggal_presensi di semua table terkait(cuti, data_presensi), kalo data pegawai aktif tinggal menyesuaikan data cuti jadi jumlahnya tinggal dikurangi sama data cuti per tanggal_cuti nya
- grafik presensi => data cuti berdasarkan tanggal jadi bisa dibuat grafik sedangkan data cuti belom ada, data cuti didapat dari user upload -> admin acc -> dan data masuk ke database
- grafik pelatihan => seharusnya ngambil jumlah pelatihan berdasarkan bulan dan dalam Waktu 6 bulan✅
- grafik kinerja?

Manajemen Cuti
- bisa buat notif ga kalo ada pengajuan cuti baru?
- data cuti

Manajemen Pegawai => tambah_data
- nip => number✅
- no hp => number✅
- posisi dikasih dropdown✅
- data keluarga => tambahin example : jook,koko,lolo✅
- nomor pon ditambah pegawai, nomor induk huruf masih bisa harusnya ga bisa✅
- roll nya ganti dropdown✅
- bagaimana cara mengubah status pegawai?
=> setelah cuti di acc otomatis status pegawai menjadi tidak aktif sesuai tanggalnya,

=> detail
- detail pegawai => menampilkan pp => user✅
- pp di admin ga tampil kalua ubah dari user/edit
- status perkawinan => cerai is not found✅

Manajemen Gaji
- nip => number✅
- data gaji => tambah dta => urut huruf depan nama, seharusnya gausah karna jadi ga urut sesuai menambahkannya

Manajemen Presensi
- tambahkan filter tanggal biar table ga penuh✅
- bagaimana supaya kotak presensi di table bisa menampilkan data presensi berdasarkan tanggal?✅

Manajemen Pelatihan
- jadwal pelatihan detail add edit & delete✅
- backend pelatihan => konflik✅
- jadwal pelatihan => ga update✅
- admin atur jadwal => user submit pelatihan => admin acc selesai + upload sertif
- sertif upload admin masuk ke user bisa download

atur jadwal 
- add Nama penyelenggara✅
- ada 3 status dalam pelatihan => ini bisa diambil berdasarkan tanggal jadi kalua belom masuk tanggal mulai berarti BELUM DIMULAI, kalua sudah masuk tanggal mulai berarti PROSES, kalua sudah lewat tanggal selesai berarti SELESAI, ✅

histori pelatihan 
- bagaimana membuat logika Ketika data user submit sudah masuk admin acc submitan dan kirim sertif bagi yang mengikuti,
