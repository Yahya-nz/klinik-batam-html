function renderTransaksi() {
  return `
  <div class="section-header">
    <div><h2>Transaksi</h2><p>Riwayat transaksi layanan klinik kampus</p></div>
    <div class="section-header-actions">
      <button class="btn btn-primary" onclick="openFormTransaksi()"><i class="fa-solid fa-plus"></i> Tambah Transaksi</button>
    </div>
  </div>
  <div class="stats-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px;">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-receipt"></i></div><div><div class="stat-val">${dataTransaksi.length}</div><div class="stat-lbl">Total Transaksi</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-hand-holding-heart"></i></div><div><div class="stat-val">3</div><div class="stat-lbl">Gratis / Subsidi</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-money-bill"></i></div><div><div class="stat-val">Rp 25.000</div><div class="stat-lbl">Pendapatan Bulan Ini</div></div></div>
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
            <td><button class="btn btn-xs btn-secondary" onclick="showToast('Lihat detail transaksi','info')"><i class="fa-solid fa-eye"></i> Detail</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormTransaksi() {
  openModal('Tambah Transaksi', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pasien</label>
        <select class="form-control">${dataPasien.map(p=>`<option>${p.nama}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Layanan</label>
        <select class="form-control"><option>Konsultasi Umum</option><option>Konsultasi Gigi</option><option>Laboratorium</option><option>Konseling</option></select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Metode Pembayaran</label>
        <select class="form-control"><option>Gratis</option><option>Subsidi</option><option>Bayar</option></select>
      </div>
      <div class="form-group"><label class="form-label">Total Biaya (Rp)</label>
        <input type="number" class="form-control" value="0" min="0">
      </div>
    </div>
    <div class="form-group"><label class="form-label">Catatan</label><textarea class="form-control" rows="2" placeholder="Keterangan tambahan..."></textarea></div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:"showToast('Transaksi berhasil dicatat','success');closeModal()"}
  ]);
}
