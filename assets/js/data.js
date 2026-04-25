const dataPasien = [
  { id:'P001', nama:'Andi Pratama', nim:'NIM4311901001', prodi:'Teknik Informatika', tgl:'12/01/2002', gender:'L', hp:'08123456789', role:'Mahasiswa', status:'Aktif' },
  { id:'P002', nama:'Siti Rahayu', nim:'NIM4311901045', prodi:'Sistem Informasi', tgl:'22/03/2001', gender:'P', hp:'08234567890', role:'Mahasiswa', status:'Aktif' },
  { id:'P003', nama:'Budi Santoso', nim:'NIP198001012010', prodi:'Unit Kemahasiswaan', tgl:'01/01/1980', gender:'L', hp:'08345678901', role:'Staff', status:'Aktif' },
  { id:'P004', nama:'Maya Lestari', nim:'NIM4311902012', prodi:'Teknik Elektro', tgl:'07/07/2002', gender:'P', hp:'08456789012', role:'Mahasiswa', status:'Aktif' },
  { id:'P005', nama:'Rizki Hidayat', nim:'NIP197505152008', prodi:'Manajemen Bisnis', tgl:'15/05/1975', gender:'L', hp:'08567890123', role:'Dosen', status:'Aktif' },
];

const dataDokter = [
  { id:'D001', nama:'dr. Sarah Amalia', spesialis:'Umum', jadwal:'Sen-Rab 08:00-12:00', ruangan:'Ruang 1', status:'Aktif' },
  { id:'D002', nama:'dr. Rizal Hamdan', spesialis:'Gigi', jadwal:'Sel-Kam 13:00-17:00', ruangan:'Ruang 2', status:'Aktif' },
  { id:'D003', nama:'dr. Maya Sari', spesialis:'Umum', jadwal:'Rab-Jum 08:00-12:00', ruangan:'Ruang 3', status:'Aktif' },
];

const dataObat = [
  { id:'OB001', nama:'Paracetamol', stok:240, satuan:'Tablet', kadaluarsa:'2026-08-01', fungsi:'Analgesik / Antipiretik' },
  { id:'OB002', nama:'Amoxicillin 500mg', stok:85, satuan:'Kapsul', kadaluarsa:'2025-12-31', fungsi:'Antibiotik' },
  { id:'OB003', nama:'Vitamin C', stok:320, satuan:'Tablet', kadaluarsa:'2026-06-15', fungsi:'Suplemen' },
  { id:'OB004', nama:'Ibuprofen 200mg', stok:18, satuan:'Tablet', kadaluarsa:'2025-09-30', fungsi:'Analgesik / Anti-inflamasi' },
  { id:'OB005', nama:'Antasida', stok:60, satuan:'Tablet', kadaluarsa:'2026-03-01', fungsi:'Tukak lambung' },
  { id:'OB006', nama:'Cetirizine', stok:5, satuan:'Tablet', kadaluarsa:'2025-11-15', fungsi:'Antihistamin' },
];

const dataRekamMedis = [
  { id:'RM001', pasien:'Andi Pratama', tgl:'21/05/2024', keluhan:'Sakit kepala dan demam ringan', pemeriksaan:'Suhu 37.8°C, TD 120/80', diagnosa:'Tension headache', catatan:'Istirahat cukup', dokter:'dr. Sarah Amalia' },
  { id:'RM002', pasien:'Siti Rahayu', tgl:'15/04/2024', keluhan:'Nyeri gigi kiri bawah', pemeriksaan:'Gigi berlubang G36', diagnosa:'Karies gigi', catatan:'Perlu penambalan', dokter:'dr. Rizal Hamdan' },
  { id:'RM003', pasien:'Maya Lestari', tgl:'02/03/2024', keluhan:'Batuk, pilek, sesak', pemeriksaan:'RR 20x/mnt, suhu 37.5°C', diagnosa:'ISPA ringan', catatan:'Minum air putih banyak', dokter:'dr. Maya Sari' },
];

const dataResep = [
  { id:'RX001', pasien:'Andi Pratama', dokter:'dr. Sarah Amalia', tgl:'21/05/2024', detail:[
    { nama:'Paracetamol', dosis:'500mg', jml:10, satuan:'Tablet', catatan:'3x1 sesudah makan' },
    { nama:'Vitamin C', dosis:'500mg', jml:10, satuan:'Tablet', catatan:'1x1 sesudah makan pagi' },
  ]},
  { id:'RX002', pasien:'Siti Rahayu', dokter:'dr. Rizal Hamdan', tgl:'15/04/2024', detail:[
    { nama:'Amoxicillin 500mg', dosis:'500mg', jml:15, satuan:'Kapsul', catatan:'3x1 sebelum makan' },
    { nama:'Ibuprofen 200mg', dosis:'200mg', jml:6, satuan:'Tablet', catatan:'2x1 sesudah makan' },
  ]},
];

const dataTransaksi = [
  { id:'TRX001', pasien:'Andi Pratama', layanan:'Konsultasi Umum', total:0, metode:'Gratis', status:'Lunas', tgl:'21/05/2024' },
  { id:'TRX002', pasien:'Siti Rahayu', layanan:'Konsultasi Gigi', total:0, metode:'Subsidi', status:'Lunas', tgl:'15/04/2024' },
  { id:'TRX003', pasien:'Budi Santoso', layanan:'Konsultasi Umum', total:0, metode:'Gratis', status:'Lunas', tgl:'10/03/2024' },
  { id:'TRX004', pasien:'Maya Lestari', layanan:'Laboratorium', total:25000, metode:'Bayar', status:'Lunas', tgl:'02/03/2024' },
];

const dataJadwal = [
  { hari:'Senin', slots:['08:00 - dr. Sarah Amalia / Ruang 1', '13:00 - dr. Rizal Hamdan / Ruang 2'] },
  { hari:'Selasa', slots:['08:00 - dr. Sarah Amalia / Ruang 1', '13:00 - dr. Rizal Hamdan / Ruang 2'] },
  { hari:'Rabu', slots:['08:00 - dr. Sarah Amalia / Ruang 1', '08:00 - dr. Maya Sari / Ruang 3'] },
  { hari:'Kamis', slots:['13:00 - dr. Rizal Hamdan / Ruang 2', '08:00 - dr. Maya Sari / Ruang 3'] },
  { hari:'Jumat', slots:['08:00 - dr. Maya Sari / Ruang 3'] },
];
