function renderStokObat() {
  return `
  <div class="section-header">
    <div><h2>Stok Obat</h2><p>Monitoring dan kelola persediaan obat klinik</p></div>
    <div class="section-header-actions">
      <button class="btn btn-primary" onclick="openFormObat()"><i class="fa-solid fa-plus"></i> Tambah Obat</button>
    </div>
  </div>
  <div class="stats-row" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px;">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-box"></i></div><div><div class="stat-val">6</div><div class="stat-lbl">Jenis Obat</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-check-circle"></i></div><div><div class="stat-val">4</div><div class="stat-lbl">Stok Aman</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-exclamation-circle"></i></div><div><div class="stat-val">1</div><div class="stat-lbl">Stok Minim</div></div></div>
    <div class="stat-card"><div class="stat-icon red"><i class="fa-solid fa-times-circle"></i></div><div><div class="stat-val">1</div><div class="stat-lbl">Stok Kritis</div></div></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama Obat</th><th>Fungsi</th><th>Stok</th><th>Satuan</th><th>Kadaluarsa</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataObat.map(o => {
            const cls = o.stok < 10 ? 'badge-danger' : o.stok < 30 ? 'badge-warning' : 'badge-success';
            const lbl = o.stok < 10 ? 'Kritis' : o.stok < 30 ? 'Minim' : 'Aman';
            return `<tr>
              <td><span class="badge badge-muted">${o.id}</span></td>
              <td><strong>${o.nama}</strong></td>
              <td>${o.fungsi}</td>
              <td><strong style="color:${o.stok<10?'var(--danger)':o.stok<30?'var(--warning)':'var(--success)'};">${o.stok}</strong></td>
              <td>${o.satuan}</td>
              <td>${o.kadaluarsa}</td>
              <td><span class="badge ${cls}">${lbl}</span></td>
              <td>
                <button class="btn btn-xs btn-outline" onclick="openUpdateStok('${o.id}','${o.nama}',${o.stok})"><i class="fa-solid fa-arrows-rotate"></i> Update</button>
                <button class="btn btn-xs btn-secondary" onclick="showToast('Edit obat','info')"><i class="fa-solid fa-pen"></i></button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormObat() {
  openModal('Tambah Data Obat', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nama Obat</label><div class="input-wrap"><i class="pre fa-solid fa-pills"></i><input type="text" class="form-control" placeholder="Nama obat"></div></div>
      <div class="form-group"><label class="form-label">Fungsi</label><input type="text" class="form-control" placeholder="Analgesik, Antibiotik..."></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Stok Awal</label><input type="number" class="form-control" placeholder="Jumlah" min="0"></div>
      <div class="form-group"><label class="form-label">Satuan</label><select class="form-control"><option>Tablet</option><option>Kapsul</option><option>Botol</option><option>Ampul</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Tanggal Kadaluarsa</label><input type="date" class="form-control"></div>
      <div class="form-group"><label class="form-label">Dosis</label><input type="text" class="form-control" placeholder="Contoh: 500mg"></div>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:"showToast('Obat berhasil ditambahkan','success');closeModal()"}
  ]);
}

function openUpdateStok(id, nama, stok) {
  openModal('Update Stok - ' + nama, `
    <div class="form-group"><label class="form-label">Stok Saat Ini</label>
      <div class="input-wrap"><i class="pre fa-solid fa-box"></i><input type="number" class="form-control" value="${stok}" id="stok-val"></div>
    </div>
    <div class="form-group"><label class="form-label">Tambah / Kurang Stok</label>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-success" onclick="document.getElementById('stok-val').value=parseInt(document.getElementById('stok-val').value||0)+10">+10</button>
        <button class="btn btn-success" onclick="document.getElementById('stok-val').value=parseInt(document.getElementById('stok-val').value||0)+50">+50</button>
        <button class="btn btn-danger" onclick="document.getElementById('stok-val').value=Math.max(0,parseInt(document.getElementById('stok-val').value||0)-10)">-10</button>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Catatan</label><input type="text" class="form-control" placeholder="Penerimaan barang, pemakaian, dll"></div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Update', cls:'btn-primary', action:"showToast('Stok berhasil diperbarui','success');closeModal()"}
  ]);
}
