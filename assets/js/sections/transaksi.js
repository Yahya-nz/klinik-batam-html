function renderTransaksi() {
  const totalPendapatan = dataTransaksi.reduce((s,t) => s + (t.total||0), 0);
  const gratisSubsidi   = dataTransaksi.filter(t => t.total === 0).length;
  return `
  <div class="section-header">
    <div><h2>Transaksi</h2><p>Riwayat transaksi layanan klinik kampus</p></div>
    <div class="section-header-actions">
      <button class="btn btn-primary" onclick="openFormTransaksi()"><i class="fa-solid fa-plus"></i> Tambah Transaksi</button>
    </div>
  </div>
  <div class="stats-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px;">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-receipt"></i></div><div><div class="stat-val">${dataTransaksi.length}</div><div class="stat-lbl">Total Transaksi</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-hand-holding-heart"></i></div><div><div class="stat-val">${gratisSubsidi}</div><div class="stat-lbl">Gratis / Subsidi</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-money-bill"></i></div><div><div class="stat-val">Rp ${totalPendapatan.toLocaleString('id')}</div><div class="stat-lbl">Total Pendapatan</div></div></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Tanggal</th><th>Pasien</th><th>Layanan</th><th>Total</th><th>Metode</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataTransaksi.map(t=>`<tr>
            <td><span class="badge badge-muted">${t.id}</span></td>
            <td>${t.tgl}</td>
            <td><strong>${t.pasien}</strong></td>
            <td>${t.layanan}</td>
            <td>${t.total===0?'<span class="badge badge-success">Gratis</span>':`<strong>Rp ${t.total.toLocaleString('id')}</strong>`}</td>
            <td><span class="badge badge-info">${t.metode}</span></td>
            <td><span class="badge badge-success">${t.status}</span></td>
            <td>
              <button class="btn btn-xs btn-secondary" onclick="detailTransaksi('${t.id}')"><i class="fa-solid fa-eye"></i></button>
              <button class="btn btn-xs btn-danger" onclick="hapusTransaksi('${t.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormTransaksi() {
  const today = new Date().toISOString().split('T')[0];
  openModal('Tambah Transaksi', `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Pasien *</label>
        <select id="frm-trx-pasien" class="form-control">
          ${dataPasien.map(p=>`<option>${p.nama}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tanggal</label>
        <input type="date" id="frm-trx-tgl" class="form-control" value="${today}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Layanan</label>
        <select id="frm-trx-layanan" class="form-control">
          ${['Konsultasi Umum','Konsultasi Gigi','Laboratorium','Konseling','Fisioterapi'].map(o=>`<option>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Metode Pembayaran</label>
        <select id="frm-trx-metode" class="form-control" onchange="toggleTotalField(this.value)">
          <option>Gratis</option><option>Subsidi</option><option>Bayar</option>
        </select>
      </div>
    </div>
    <div class="form-group" id="total-field" style="display:none;">
      <label class="form-label">Total Biaya (Rp)</label>
      <input type="number" id="frm-trx-total" class="form-control" value="0" min="0">
    </div>
    <div class="form-group">
      <label class="form-label">Catatan</label>
      <textarea id="frm-trx-catatan" class="form-control" rows="2" placeholder="Keterangan tambahan..."></textarea>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:'saveFormTransaksi()'}
  ]);
}

function toggleTotalField(metode) {
  const tf = document.getElementById('total-field');
  if (tf) tf.style.display = metode === 'Bayar' ? 'block' : 'none';
}

function saveFormTransaksi() {
  const pasien  = val('frm-trx-pasien');
  const metode  = val('frm-trx-metode');
  const tglRaw  = val('frm-trx-tgl');
  const total   = metode === 'Bayar' ? (parseInt(val('frm-trx-total')) || 0) : 0;

  if (!pasien) { showToast('Pilih pasien!', 'error'); return; }

  dataTransaksi.push({
    id:      genId('TRX', dataTransaksi),
    pasien,
    layanan: val('frm-trx-layanan'),
    metode,
    total,
    status:  'Lunas',
    tgl:     fmtTgl(tglRaw),
    catatan: val('frm-trx-catatan'),
  });

  closeModal();
  showToast('Transaksi berhasil dicatat', 'success');
  renderSection('transaksi');
}

function detailTransaksi(id) {
  const t = dataTransaksi.find(x => x.id === id);
  if (!t) return;
  openModal('Detail Transaksi — ' + t.id, `
    <div class="grid-2">
      <div class="detail-field"><label>ID</label><div class="val">${t.id}</div></div>
      <div class="detail-field"><label>Tanggal</label><div class="val">${t.tgl}</div></div>
      <div class="detail-field"><label>Pasien</label><div class="val">${t.pasien}</div></div>
      <div class="detail-field"><label>Layanan</label><div class="val">${t.layanan}</div></div>
      <div class="detail-field"><label>Metode</label><div class="val"><span class="badge badge-info">${t.metode}</span></div></div>
      <div class="detail-field"><label>Total</label><div class="val">${t.total===0?'<span class="badge badge-success">Gratis</span>':`<strong>Rp ${t.total.toLocaleString('id')}</strong>`}</div></div>
      <div class="detail-field"><label>Status</label><div class="val"><span class="badge badge-success">${t.status}</span></div></div>
    </div>
    ${t.catatan ? `<div class="separator"></div><div class="detail-field"><label>Catatan</label><div class="val">${t.catatan}</div></div>` : ''}
  `, [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}]);
}

function hapusTransaksi(id) {
  const t = dataTransaksi.find(x => x.id === id);
  openModal('Hapus Transaksi', `
    <p style="text-align:center;padding:12px 0;">Yakin hapus transaksi <strong>${t.id}</strong> atas nama <strong>${t.pasien}</strong>?</p>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-trash"></i> Hapus', cls:'btn-danger', action:`_konfirmasiHapusTrx('${id}')`}
  ]);
}

function _konfirmasiHapusTrx(id) {
  dataTransaksi = dataTransaksi.filter(x => x.id !== id);
  closeModal();
  showToast('Transaksi dihapus', 'info');
  renderSection('transaksi');
}
