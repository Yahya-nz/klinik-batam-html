let _editPasienId = null;

function renderDataPasien() {
  return `
  <div class="section-header">
    <div><h2>Data Pasien</h2><p>Kelola data seluruh pasien terdaftar</p></div>
    <div class="section-header-actions">
      <div class="search-bar" style="width:220px;"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Cari pasien..." oninput="filterPasien(this.value)"></div>
      <button class="btn btn-primary" onclick="openFormPasien()"><i class="fa-solid fa-user-plus"></i> Tambah Pasien</button>
    </div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama</th><th>NIM/NIP</th><th>Prodi/Unit</th><th>Gender</th><th>No HP</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody id="tbody-pasien">
          ${_rowsPasien(dataPasien)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function _rowsPasien(data) {
  return data.map(p => `<tr>
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
      <button class="btn btn-xs btn-outline" onclick="openFormPasien('${p.id}')"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-xs btn-danger" onclick="hapusPasien('${p.id}')"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`).join('');
}

function filterPasien(q) {
  const filtered = dataPasien.filter(p =>
    p.nama.toLowerCase().includes(q.toLowerCase()) ||
    p.nim.toLowerCase().includes(q.toLowerCase()) ||
    p.prodi.toLowerCase().includes(q.toLowerCase())
  );
  const tbody = document.getElementById('tbody-pasien');
  if (tbody) tbody.innerHTML = _rowsPasien(filtered);
}

function openFormPasien(id = null) {
  _editPasienId = id;
  const p = id ? dataPasien.find(x => x.id === id) : {};
  openModal(id ? 'Edit Data Pasien' : 'Tambah Pasien Baru', `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Nama Lengkap *</label>
        <div class="input-wrap"><i class="pre fa-solid fa-user"></i><input type="text" id="frm-p-nama" class="form-control" placeholder="Nama lengkap" value="${p.nama||''}"></div>
      </div>
      <div class="form-group">
        <label class="form-label">NIM / NIP *</label>
        <div class="input-wrap"><i class="pre fa-solid fa-id-card"></i><input type="text" id="frm-p-nim" class="form-control" placeholder="Nomor identitas" value="${p.nim||''}"></div>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Prodi / Unit</label>
        <select id="frm-p-prodi" class="form-control">
          ${['Teknik Informatika','Sistem Informasi','Teknik Elektro','Manajemen Bisnis','Unit Kemahasiswaan'].map(o=>`<option ${p.prodi===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Role</label>
        <select id="frm-p-role" class="form-control">
          ${['Mahasiswa','Dosen','Staff'].map(o=>`<option ${p.role===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tanggal Lahir</label>
        <input type="date" id="frm-p-tgl" class="form-control" value="${p.tgl||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Jenis Kelamin</label>
        <select id="frm-p-gender" class="form-control">
          <option value="L" ${p.gender==='L'?'selected':''}>Laki-laki</option>
          <option value="P" ${p.gender==='P'?'selected':''}>Perempuan</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">No HP</label>
        <div class="input-wrap"><i class="pre fa-solid fa-phone"></i><input type="tel" id="frm-p-hp" class="form-control" placeholder="08xx..." value="${p.hp||''}"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Status</label>
        <select id="frm-p-status" class="form-control">
          <option ${(p.status||'Aktif')==='Aktif'?'selected':''}>Aktif</option>
          <option ${p.status==='Nonaktif'?'selected':''}>Nonaktif</option>
        </select>
      </div>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:'saveFormPasien()'}
  ]);
}

function saveFormPasien() {
  const nama = val('frm-p-nama');
  const nim  = val('frm-p-nim');
  if (!nama) { showToast('Nama wajib diisi!', 'error'); return; }
  if (!nim)  { showToast('NIM / NIP wajib diisi!', 'error'); return; }

  const data = {
    nama,
    nim,
    prodi:  val('frm-p-prodi'),
    role:   val('frm-p-role'),
    tgl:    val('frm-p-tgl'),
    gender: val('frm-p-gender'),
    hp:     val('frm-p-hp'),
    status: val('frm-p-status'),
  };

  if (_editPasienId) {
    const idx = dataPasien.findIndex(x => x.id === _editPasienId);
    dataPasien[idx] = { ...dataPasien[idx], ...data };
    showToast('Data pasien berhasil diperbarui', 'success');
  } else {
    dataPasien.push({ id: genId('P', dataPasien), ...data });
    showToast('Pasien berhasil ditambahkan', 'success');
  }
  closeModal();
  renderSection('data-pasien');
}

function hapusPasien(id) {
  const p = dataPasien.find(x => x.id === id);
  openModal('Hapus Pasien', `
    <p style="text-align:center;padding:12px 0;">Yakin ingin menghapus data pasien <strong>${p.nama}</strong>?</p>
    <p style="text-align:center;font-size:12px;color:var(--text-light);">Tindakan ini tidak dapat dibatalkan.</p>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-trash"></i> Hapus', cls:'btn-danger', action:`_konfirmasiHapusPasien('${id}')`}
  ]);
}

function _konfirmasiHapusPasien(id) {
  dataPasien = dataPasien.filter(x => x.id !== id);
  closeModal();
  showToast('Pasien berhasil dihapus', 'info');
  renderSection('data-pasien');
}

function lihatRekamMedis(nama) {
  const rm = dataRekamMedis.filter(r => r.pasien === nama);
  openModal('Rekam Medis — ' + nama,
    rm.length === 0
      ? '<p style="color:var(--text-light);text-align:center;padding:20px;">Belum ada rekam medis</p>'
      : rm.map(r => `
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
