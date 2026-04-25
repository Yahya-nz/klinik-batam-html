function renderDataPasien() {
  return `
  <div class="section-header">
    <div><h2>Data Pasien</h2><p>Kelola data seluruh pasien terdaftar</p></div>
    <div class="section-header-actions">
      <div class="search-bar" style="width:220px;"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Cari pasien..."></div>
      <button class="btn btn-primary" onclick="openFormPasien()"><i class="fa-solid fa-user-plus"></i> Tambah Pasien</button>
    </div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama</th><th>NIM/NIP</th><th>Prodi/Unit</th><th>Gender</th><th>No HP</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataPasien.map(p=>`<tr>
            <td><span class="badge badge-muted">${p.id}</span></td>
            <td><strong>${p.nama}</strong></td>
            <td>${p.nim}</td>
            <td>${p.prodi}</td>
            <td>${p.gender==='L'?'<i class="fa-solid fa-mars" style="color:var(--c1)"></i> L':'<i class="fa-solid fa-venus" style="color:#e879a0"></i> P'}</td>
            <td>${p.hp}</td>
            <td><span class="badge badge-info">${p.role}</span></td>
            <td><span class="badge badge-success">${p.status}</span></td>
            <td>
              <button class="btn btn-xs btn-secondary" onclick="lihatRekamMedis('${p.nama}')"><i class="fa-solid fa-file-medical"></i></button>
              <button class="btn btn-xs btn-outline" onclick="showToast('Edit pasien','info')"><i class="fa-solid fa-pen"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormPasien() {
  openModal('Tambah Pasien Baru', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nama Lengkap</label><div class="input-wrap"><i class="pre fa-solid fa-user"></i><input type="text" class="form-control" placeholder="Nama lengkap"></div></div>
      <div class="form-group"><label class="form-label">NIM / NIP</label><div class="input-wrap"><i class="pre fa-solid fa-id-card"></i><input type="text" class="form-control" placeholder="Nomor identitas"></div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Prodi / Unit</label><select class="form-control"><option>Teknik Informatika</option><option>Sistem Informasi</option><option>Teknik Elektro</option><option>Manajemen Bisnis</option></select></div>
      <div class="form-group"><label class="form-label">Role</label><select class="form-control"><option>Mahasiswa</option><option>Dosen</option><option>Staff</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Tanggal Lahir</label><input type="date" class="form-control"></div>
      <div class="form-group"><label class="form-label">Jenis Kelamin</label><select class="form-control"><option>Laki-laki</option><option>Perempuan</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">No HP</label><input type="tel" class="form-control" placeholder="08xx..."></div>
      <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-control" placeholder="@polibatam.ac.id"></div>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:"showToast('Pasien berhasil ditambahkan','success');closeModal()"}
  ]);
}

function lihatRekamMedis(nama) {
  const rm = dataRekamMedis.filter(r => r.pasien === nama);
  openModal('Rekam Medis - ' + nama,
    rm.length === 0
      ? '<p style="color:var(--text-light);text-align:center;padding:20px;">Belum ada rekam medis</p>'
      : rm.map(r=>`
        <div style="border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span class="badge badge-muted">${r.id}</span>
            <span style="font-size:12px;color:var(--text-light);">${r.tgl}</span>
          </div>
          <div class="grid-2">
            <div class="detail-field"><label>Dokter</label><div class="val">${r.dokter}</div></div>
            <div class="detail-field"><label>Diagnosa</label><div class="val">${r.diagnosa}</div></div>
            <div class="detail-field"><label>Keluhan</label><div class="val">${r.keluhan}</div></div>
            <div class="detail-field"><label>Catatan</label><div class="val">${r.catatan}</div></div>
          </div>
        </div>`).join(''),
  [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}]);
}
