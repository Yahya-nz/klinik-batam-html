let _editDokterId = null;

function renderDataDokter() {
  return `
  <div class="section-header">
    <div><h2>Data Dokter</h2><p>Kelola data dokter dan tenaga medis</p></div>
    <div class="section-header-actions">
      <button class="btn btn-primary" onclick="openFormDokter()"><i class="fa-solid fa-user-plus"></i> Tambah Dokter</button>
    </div>
  </div>
  <div class="grid-3" style="margin-bottom:16px;">
    ${dataDokter.map(d=>`
    <div class="card">
      <div class="card-body" style="text-align:center;padding:20px;">
        <div style="width:56px;height:56px;background:var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;border:2px solid var(--border);">
          <i class="fa-solid fa-user-doctor" style="font-size:22px;color:var(--c1);"></i>
        </div>
        <div style="font-weight:700;font-size:14px;color:var(--dark);margin-bottom:3px;">${d.nama}</div>
        <span class="badge badge-info" style="margin-bottom:12px;">${d.spesialis}</span>
        <div class="separator"></div>
        <div class="detail-field"><label>Jadwal</label><div class="val">${d.jadwal}</div></div>
        <div class="detail-field"><label>Ruangan</label><div class="val">${d.ruangan}</div></div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn btn-sm btn-outline" style="flex:1" onclick="openFormDokter('${d.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn btn-sm btn-danger" style="flex:1" onclick="hapusDokter('${d.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
        </div>
      </div>
    </div>`).join('')}
  </div>
  <div class="card">
    <div class="card-header"><h3><i class="fa-solid fa-table-list"></i>Tabel Dokter</h3></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama Dokter</th><th>Spesialis</th><th>Jadwal</th><th>Ruangan</th><th>SIP</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataDokter.map(d=>`<tr>
            <td><span class="badge badge-muted">${d.id}</span></td>
            <td><strong>${d.nama}</strong></td>
            <td>${d.spesialis}</td>
            <td>${d.jadwal}</td>
            <td>${d.ruangan}</td>
            <td>${d.sip||'-'}</td>
            <td><span class="badge badge-success">${d.status}</span></td>
            <td>
              <button class="btn btn-xs btn-outline" onclick="openFormDokter('${d.id}')"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-xs btn-danger" onclick="hapusDokter('${d.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormDokter(id = null) {
  _editDokterId = id;
  const d = id ? dataDokter.find(x => x.id === id) : {};
  openModal(id ? 'Edit Data Dokter' : 'Tambah Data Dokter', `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Nama Dokter *</label>
        <div class="input-wrap"><i class="pre fa-solid fa-user-doctor"></i><input type="text" id="frm-d-nama" class="form-control" placeholder="dr. Nama Lengkap" value="${d.nama||''}"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Spesialis</label>
        <select id="frm-d-spesialis" class="form-control">
          ${['Umum','Gigi','THT','Kulit','Anak','Kandungan'].map(o=>`<option ${d.spesialis===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Hari Praktik</label>
        <select id="frm-d-hari" class="form-control">
          ${['Sen-Rab','Sel-Kam','Rab-Jum','Sen-Jum','Sen-Sel'].map(o=>`<option ${d.hari===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Jam Praktik</label>
        <select id="frm-d-jam" class="form-control">
          ${['08:00 - 12:00','13:00 - 17:00','08:00 - 17:00'].map(o=>`<option ${d.jam===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Ruangan</label>
        <select id="frm-d-ruangan" class="form-control">
          ${['Ruang 1','Ruang 2','Ruang 3','Ruang 4'].map(o=>`<option ${d.ruangan===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">No SIP</label>
        <div class="input-wrap"><i class="pre fa-solid fa-id-badge"></i><input type="text" id="frm-d-sip" class="form-control" placeholder="Nomor SIP dokter" value="${d.sip||''}"></div>
      </div>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:'saveFormDokter()'}
  ]);
}

function saveFormDokter() {
  const nama = val('frm-d-nama');
  if (!nama) { showToast('Nama dokter wajib diisi!', 'error'); return; }

  const hari = val('frm-d-hari');
  const jam  = val('frm-d-jam');
  const data = {
    nama,
    spesialis: val('frm-d-spesialis'),
    hari,
    jam,
    jadwal: `${hari} ${jam}`,
    ruangan: val('frm-d-ruangan'),
    sip: val('frm-d-sip'),
    status: 'Aktif',
  };

  if (_editDokterId) {
    const idx = dataDokter.findIndex(x => x.id === _editDokterId);
    dataDokter[idx] = { ...dataDokter[idx], ...data };
    showToast('Data dokter berhasil diperbarui', 'success');
  } else {
    dataDokter.push({ id: genId('D', dataDokter), ...data });
    showToast('Dokter berhasil ditambahkan', 'success');
  }
  closeModal();
  renderSection('data-dokter');
}

function hapusDokter(id) {
  const d = dataDokter.find(x => x.id === id);
  openModal('Hapus Dokter', `
    <p style="text-align:center;padding:12px 0;">Yakin ingin menghapus data <strong>${d.nama}</strong>?</p>
    <p style="text-align:center;font-size:12px;color:var(--text-light);">Tindakan ini tidak dapat dibatalkan.</p>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-trash"></i> Hapus', cls:'btn-danger', action:`_konfirmasiHapusDokter('${id}')`}
  ]);
}

function _konfirmasiHapusDokter(id) {
  dataDokter = dataDokter.filter(x => x.id !== id);
  closeModal();
  showToast('Dokter berhasil dihapus', 'info');
  renderSection('data-dokter');
}
