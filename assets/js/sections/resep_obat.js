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
            <td><button class="btn btn-xs btn-secondary" onclick="detailResep('${r.id}')"><i class="fa-solid fa-eye"></i> Detail</button></td>
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
          <thead><tr><th>Nama Obat</th><th>Dosis</th><th>Stok</th><th>Satuan</th></tr></thead>
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

function detailResep(id) {
  const r = dataResep.find(x=>x.id===id);
  if (!r) return;
  openModal('Detail Resep - ' + r.id, `
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
        <div class="detail-field"><label>Dosis</label><div class="val">${d.dosis}</div></div>
        <div class="detail-field"><label>Jumlah</label><div class="val">${d.jml} ${d.satuan}</div></div>
        <div class="detail-field"><label>Catatan Penggunaan</label><div class="val">${d.catatan}</div></div>
      </div>
    </div>`).join('')}
  `, [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}], true);
}

function openFormResep() {
  openModal('Buat Resep Baru', `
    <div class="resep-section-title"><i class="fa-solid fa-file-prescription"></i>A. DATA RESEP</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pasien</label>
        <select class="form-control">${dataPasien.map(p=>`<option>${p.nama}</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Tanggal</label><input type="date" class="form-control" value="2024-05-21"></div>
    </div>
    <div class="resep-section-title" style="margin-top:4px;"><i class="fa-solid fa-capsules"></i>B. DETAIL OBAT</div>
    <div id="resep-detail-list">
      <div class="form-row" style="margin-bottom:8px;">
        <div class="form-group"><label class="form-label">Nama Obat</label>
          <select class="form-control">${dataObat.map(o=>`<option>${o.nama}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Dosis</label><input type="text" class="form-control" placeholder="500mg"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Jumlah</label><input type="number" class="form-control" value="10"></div>
        <div class="form-group"><label class="form-label">Satuan</label><select class="form-control"><option>Tablet</option><option>Kapsul</option><option>Botol</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Catatan Penggunaan</label><input type="text" class="form-control" placeholder="Contoh: 3x1 sesudah makan"></div>
    </div>
    <button class="btn btn-outline btn-sm" style="margin-top:4px;" onclick="showToast('Tambah obat berikutnya','info')"><i class="fa-solid fa-plus"></i> Tambah Obat</button>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan Resep', cls:'btn-primary', action:"showToast('Resep berhasil disimpan','success');closeModal()"}
  ], true);
}
