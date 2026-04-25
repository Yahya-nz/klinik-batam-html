let _editRmId = null;

function renderRekamMedis() {
  return `
  <div class="section-header">
    <div><h2>Rekam Medis</h2><p>Input dan riwayat rekam medis pasien</p></div>
    <div class="section-header-actions">
      <div class="search-bar" style="width:200px;"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Cari rekam medis..." oninput="filterRm(this.value)"></div>
      <button class="btn btn-primary" onclick="openFormRekamMedis()"><i class="fa-solid fa-plus"></i> Input Rekam Medis</button>
    </div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Pasien</th><th>Dokter</th><th>Tanggal</th><th>Diagnosa</th><th>Aksi</th></tr></thead>
        <tbody id="tbody-rm">
          ${_rowsRm(dataRekamMedis)}
        </tbody>
      </table>
    </div>
  </div>`;
}

function _rowsRm(data) {
  return data.map(r => `<tr>
    <td><span class="badge badge-muted">${r.id}</span></td>
    <td><strong>${r.pasien}</strong></td>
    <td>${r.dokter}</td>
    <td>${r.tgl}</td>
    <td>${r.diagnosa}</td>
    <td>
      <button class="btn btn-xs btn-secondary" onclick="detailRekamMedis('${r.id}')"><i class="fa-solid fa-eye"></i> Detail</button>
      <button class="btn btn-xs btn-outline" onclick="openFormRekamMedis('${r.id}')"><i class="fa-solid fa-pen"></i></button>
      <button class="btn btn-xs btn-danger" onclick="hapusRm('${r.id}')"><i class="fa-solid fa-trash"></i></button>
    </td>
  </tr>`).join('');
}

function filterRm(q) {
  const filtered = dataRekamMedis.filter(r =>
    r.pasien.toLowerCase().includes(q.toLowerCase()) ||
    r.diagnosa.toLowerCase().includes(q.toLowerCase()) ||
    r.dokter.toLowerCase().includes(q.toLowerCase())
  );
  const tbody = document.getElementById('tbody-rm');
  if (tbody) tbody.innerHTML = _rowsRm(filtered);
}

function openFormRekamMedis(id = null) {
  _editRmId = id;
  const r = id ? dataRekamMedis.find(x => x.id === id) : {};
  const today = new Date().toISOString().split('T')[0];
  openModal(id ? 'Edit Rekam Medis — ' + id : 'Input Rekam Medis Baru', `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Pasien *</label>
        <select id="frm-rm-pasien" class="form-control">
          ${dataPasien.map(p=>`<option ${r.pasien===p.nama?'selected':''}>${p.nama}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Dokter *</label>
        <select id="frm-rm-dokter" class="form-control">
          ${dataDokter.map(d=>`<option ${r.dokter===d.nama?'selected':''}>${d.nama}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tanggal</label>
        <input type="date" id="frm-rm-tgl" class="form-control" value="${id ? _rmDateToInput(r.tgl) : today}">
      </div>
      <div class="form-group">
        <label class="form-label">Poli</label>
        <select id="frm-rm-poli" class="form-control">
          ${['Poli Umum','Poli Gigi','Konseling'].map(o=>`<option ${r.poli===o?'selected':''}>${o}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Keluhan *</label>
      <textarea id="frm-rm-keluhan" class="form-control" rows="2" placeholder="Keluhan yang disampaikan pasien...">${r.keluhan||''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Hasil Pemeriksaan</label>
      <textarea id="frm-rm-pemeriksaan" class="form-control" rows="2" placeholder="Hasil pemeriksaan fisik...">${r.pemeriksaan||''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Diagnosa *</label>
      <input type="text" id="frm-rm-diagnosa" class="form-control" placeholder="Diagnosa klinis" value="${r.diagnosa||''}">
    </div>
    <div class="form-group">
      <label class="form-label">Catatan Tambahan</label>
      <textarea id="frm-rm-catatan" class="form-control" rows="2" placeholder="Catatan dokter...">${r.catatan||''}</textarea>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:'saveFormRekamMedis()'}
  ]);
}

function _rmDateToInput(tglDDMMYYYY) {
  if (!tglDDMMYYYY) return '';
  const [d,m,y] = tglDDMMYYYY.split('/');
  return `${y}-${m}-${d}`;
}

function saveFormRekamMedis() {
  const pasien  = val('frm-rm-pasien');
  const keluhan = val('frm-rm-keluhan');
  const diagnosa = val('frm-rm-diagnosa');
  if (!keluhan)  { showToast('Keluhan wajib diisi!', 'error'); return; }
  if (!diagnosa) { showToast('Diagnosa wajib diisi!', 'error'); return; }

  const tglRaw = val('frm-rm-tgl');
  const data = {
    pasien,
    dokter:       val('frm-rm-dokter'),
    tgl:          fmtTgl(tglRaw),
    poli:         val('frm-rm-poli'),
    keluhan,
    pemeriksaan:  val('frm-rm-pemeriksaan'),
    diagnosa,
    catatan:      val('frm-rm-catatan'),
  };

  if (_editRmId) {
    const idx = dataRekamMedis.findIndex(x => x.id === _editRmId);
    dataRekamMedis[idx] = { ...dataRekamMedis[idx], ...data };
    showToast('Rekam medis berhasil diperbarui', 'success');
  } else {
    dataRekamMedis.push({ id: genId('RM', dataRekamMedis), ...data });
    showToast('Rekam medis berhasil disimpan', 'success');
  }
  closeModal();
  renderSection('rekam-medis');
}

function hapusRm(id) {
  const r = dataRekamMedis.find(x => x.id === id);
  openModal('Hapus Rekam Medis', `
    <p style="text-align:center;padding:12px 0;">Yakin ingin menghapus rekam medis <strong>${r.id}</strong> milik <strong>${r.pasien}</strong>?</p>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-trash"></i> Hapus', cls:'btn-danger', action:`_konfirmasiHapusRm('${id}')`}
  ]);
}

function _konfirmasiHapusRm(id) {
  dataRekamMedis = dataRekamMedis.filter(x => x.id !== id);
  closeModal();
  showToast('Rekam medis dihapus', 'info');
  renderSection('rekam-medis');
}

function detailRekamMedis(id) {
  const r = dataRekamMedis.find(x => x.id === id);
  if (!r) return;
  openModal('Detail Rekam Medis — ' + r.id, `
    <div class="grid-2">
      <div class="detail-field"><label>Pasien</label><div class="val">${r.pasien}</div></div>
      <div class="detail-field"><label>Dokter</label><div class="val">${r.dokter}</div></div>
      <div class="detail-field"><label>Tanggal</label><div class="val">${r.tgl}</div></div>
      <div class="detail-field"><label>Diagnosa</label><div class="val">${r.diagnosa}</div></div>
    </div>
    <div class="separator"></div>
    <div class="detail-field"><label>Keluhan</label><div class="val">${r.keluhan}</div></div>
    <div class="detail-field"><label>Hasil Pemeriksaan</label><div class="val">${r.pemeriksaan||'-'}</div></div>
    <div class="detail-field"><label>Catatan Tambahan</label><div class="val">${r.catatan||'-'}</div></div>
  `, [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}]);
}
