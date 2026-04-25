// Item-item obat yang sedang di-input di form resep
let _resepItems = [];

function renderResepObat() {
  return `
  <div class="section-header">
    <div><h2>Resep Obat</h2><p>Manajemen resep dan pengeluaran obat</p></div>
    <div class="section-header-actions">
      ${currentRole === 'dokter' ? `<button class="btn btn-primary" onclick="openFormResep()"><i class="fa-solid fa-plus"></i> Buat Resep Baru</button>` : ''}
    </div>
  </div>
  <div class="card" style="margin-bottom:16px;">
    <div class="card-header"><h3><i class="fa-solid fa-list-ul"></i>Daftar Resep</h3></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID Resep</th><th>Pasien</th><th>Dokter</th><th>Tanggal</th><th>Jml Obat</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataResep.map(r=>`<tr>
            <td><span class="badge badge-muted">${r.id}</span></td>
            <td><strong>${r.pasien}</strong></td>
            <td>${r.dokter}</td>
            <td>${r.tgl}</td>
            <td><span class="badge badge-info">${r.detail.length} obat</span></td>
            <td>
              <button class="btn btn-xs btn-secondary" onclick="detailResep('${r.id}')"><i class="fa-solid fa-eye"></i> Detail</button>
              <button class="btn btn-xs btn-danger" onclick="hapusResep('${r.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-capsules"></i>Daftar Obat Tersedia</h3></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nama Obat</th><th>Fungsi</th><th>Stok</th><th>Satuan</th></tr></thead>
          <tbody>
            ${dataObat.map(o=>`<tr>
              <td><strong>${o.nama}</strong></td>
              <td>${o.fungsi}</td>
              <td style="color:${o.stok<10?'var(--danger)':o.stok<30?'var(--warning)':'var(--success)'};font-weight:700;">${o.stok}</td>
              <td>${o.satuan}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-chart-simple"></i>Statistik Resep</h3></div>
      <div class="card-body">
        ${[['Paracetamol','1.240 Tablet',85],['Amoxicillin','820 Kapsul',60],['Vitamin C','650 Tablet',48],['Ibuprofen','430 Tablet',32]].map(([n,jml,p])=>`
        <div class="progress-row">
          <div class="progress-meta"><span>${n}</span><strong>${jml}</strong></div>
          <div class="progress-bar-bg"><div class="progress-fill" style="width:${p}%;background:var(--c1);"></div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function openFormResep() {
  _resepItems = [{ nama: dataObat[0]?.nama||'', dosis:'', jml:1, satuan:'Tablet', catatan:'' }];
  _renderFormResep();
}

function _renderFormResep() {
  const today = new Date().toISOString().split('T')[0];
  openModal('Buat Resep Baru', `
    <div class="resep-section-title"><i class="fa-solid fa-file-prescription"></i>A. DATA RESEP</div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Pasien *</label>
        <select id="frm-rx-pasien" class="form-control">
          ${dataPasien.map(p=>`<option>${p.nama}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tanggal</label>
        <input type="date" id="frm-rx-tgl" class="form-control" value="${today}">
      </div>
    </div>
    <div class="resep-section-title" style="margin-top:4px;"><i class="fa-solid fa-capsules"></i>B. DETAIL OBAT</div>
    <div id="resep-items-list">
      ${_resepItems.map((item, i) => _resepItemHtml(item, i)).join('')}
    </div>
    <button class="btn btn-outline btn-sm" style="margin-top:6px;" onclick="tambahItemResep()">
      <i class="fa-solid fa-plus"></i> Tambah Obat
    </button>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan Resep', cls:'btn-primary', action:'saveFormResep()'}
  ], true);
}

function _resepItemHtml(item, i) {
  return `
  <div class="resep-item-block" id="resep-item-${i}" style="background:var(--bg);border-radius:var(--radius);padding:12px;margin-bottom:10px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span style="font-size:11px;font-weight:700;color:var(--text-light);">OBAT ${i+1}</span>
      ${i > 0 ? `<button class="btn btn-xs btn-danger" onclick="hapusItemResep(${i})"><i class="fa-solid fa-xmark"></i></button>` : ''}
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Nama Obat</label>
        <select id="frm-rx-obat-${i}" class="form-control">
          ${dataObat.map(o=>`<option ${item.nama===o.nama?'selected':''}>${o.nama}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Dosis</label>
        <input type="text" id="frm-rx-dosis-${i}" class="form-control" placeholder="500mg" value="${item.dosis}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Jumlah</label>
        <input type="number" id="frm-rx-jml-${i}" class="form-control" value="${item.jml}" min="1">
      </div>
      <div class="form-group">
        <label class="form-label">Satuan</label>
        <select id="frm-rx-satuan-${i}" class="form-control">
          ${['Tablet','Kapsul','Botol','Sachet'].map(s=>`<option ${item.satuan===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Catatan Penggunaan</label>
      <input type="text" id="frm-rx-catatan-${i}" class="form-control" placeholder="Contoh: 3x1 sesudah makan" value="${item.catatan}">
    </div>
  </div>`;
}

function tambahItemResep() {
  // Simpan state item yang sudah ada sebelum re-render
  _resepItems.forEach((_, i) => {
    _resepItems[i].nama    = document.getElementById(`frm-rx-obat-${i}`)?.value || '';
    _resepItems[i].dosis   = document.getElementById(`frm-rx-dosis-${i}`)?.value || '';
    _resepItems[i].jml     = parseInt(document.getElementById(`frm-rx-jml-${i}`)?.value) || 1;
    _resepItems[i].satuan  = document.getElementById(`frm-rx-satuan-${i}`)?.value || 'Tablet';
    _resepItems[i].catatan = document.getElementById(`frm-rx-catatan-${i}`)?.value || '';
  });
  _resepItems.push({ nama: dataObat[0]?.nama||'', dosis:'', jml:1, satuan:'Tablet', catatan:'' });
  // Re-render hanya list item
  const listEl = document.getElementById('resep-items-list');
  if (listEl) listEl.innerHTML = _resepItems.map((item, i) => _resepItemHtml(item, i)).join('');
}

function hapusItemResep(i) {
  _resepItems.splice(i, 1);
  const listEl = document.getElementById('resep-items-list');
  if (listEl) listEl.innerHTML = _resepItems.map((item, idx) => _resepItemHtml(item, idx)).join('');
}

function saveFormResep() {
  const pasien = val('frm-rx-pasien');
  const tglRaw = val('frm-rx-tgl');

  const detail = _resepItems.map((_, i) => ({
    nama:    document.getElementById(`frm-rx-obat-${i}`)?.value || '',
    dosis:   document.getElementById(`frm-rx-dosis-${i}`)?.value || '',
    jml:     parseInt(document.getElementById(`frm-rx-jml-${i}`)?.value) || 1,
    satuan:  document.getElementById(`frm-rx-satuan-${i}`)?.value || 'Tablet',
    catatan: document.getElementById(`frm-rx-catatan-${i}`)?.value || '',
  })).filter(x => x.nama);

  if (!pasien) { showToast('Pilih pasien terlebih dahulu!', 'error'); return; }
  if (detail.length === 0) { showToast('Tambahkan minimal 1 obat!', 'error'); return; }

  dataResep.push({
    id:     genId('RX', dataResep),
    pasien,
    dokter: roleInfo[currentRole]?.name || 'Dokter',
    tgl:    fmtTgl(tglRaw),
    detail,
  });

  closeModal();
  showToast('Resep berhasil disimpan', 'success');
  renderSection('resep-obat');
}

function hapusResep(id) {
  const r = dataResep.find(x => x.id === id);
  openModal('Hapus Resep', `
    <p style="text-align:center;padding:12px 0;">Yakin hapus resep <strong>${r.id}</strong> untuk <strong>${r.pasien}</strong>?</p>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-trash"></i> Hapus', cls:'btn-danger', action:`_konfirmasiHapusResep('${id}')`}
  ]);
}

function _konfirmasiHapusResep(id) {
  dataResep = dataResep.filter(x => x.id !== id);
  closeModal();
  showToast('Resep dihapus', 'info');
  renderSection('resep-obat');
}

function detailResep(id) {
  const r = dataResep.find(x => x.id === id);
  if (!r) return;
  openModal('Detail Resep — ' + r.id, `
    <div class="resep-section-title"><i class="fa-solid fa-file-prescription"></i>A. DATA RESEP</div>
    <div class="grid-2" style="margin-bottom:14px;">
      <div class="detail-field"><label>ID Resep</label><div class="val">${r.id}</div></div>
      <div class="detail-field"><label>Tanggal</label><div class="val">${r.tgl}</div></div>
      <div class="detail-field"><label>Pasien</label><div class="val">${r.pasien}</div></div>
      <div class="detail-field"><label>Dokter</label><div class="val">${r.dokter}</div></div>
    </div>
    <div class="resep-section-title"><i class="fa-solid fa-list-check"></i>B. DETAIL & OBAT</div>
    ${r.detail.map((d,i)=>`
    <div style="background:var(--bg);border-radius:var(--radius);padding:12px;margin-bottom:8px;">
      <div style="font-size:11px;font-weight:700;color:var(--text-light);margin-bottom:8px;">OBAT ${i+1}</div>
      <div class="grid-2">
        <div class="detail-field"><label>Nama Obat</label><div class="val">${d.nama}</div></div>
        <div class="detail-field"><label>Dosis</label><div class="val">${d.dosis||'-'}</div></div>
        <div class="detail-field"><label>Jumlah</label><div class="val">${d.jml} ${d.satuan}</div></div>
        <div class="detail-field"><label>Catatan</label><div class="val">${d.catatan||'-'}</div></div>
      </div>
    </div>`).join('')}
  `, [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}], true);
}
