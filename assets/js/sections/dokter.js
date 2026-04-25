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
          <button class="btn btn-sm btn-outline" style="flex:1" onclick="showToast('Edit dokter','info')"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn btn-sm btn-secondary" style="flex:1" onclick="showToast('Jadwal dikelola','info')"><i class="fa-solid fa-calendar"></i> Jadwal</button>
        </div>
      </div>
    </div>`).join('')}
  </div>
  <div class="card">
    <div class="card-header"><h3><i class="fa-solid fa-table-list"></i>Tabel Dokter</h3></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama Dokter</th><th>Spesialis</th><th>Jadwal</th><th>Ruangan</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataDokter.map(d=>`<tr>
            <td><span class="badge badge-muted">${d.id}</span></td>
            <td><strong>${d.nama}</strong></td>
            <td>${d.spesialis}</td>
            <td>${d.jadwal}</td>
            <td>${d.ruangan}</td>
            <td><span class="badge badge-success">${d.status}</span></td>
            <td>
              <button class="btn btn-xs btn-outline" onclick="showToast('Edit dokter','info')"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-xs btn-danger" onclick="showToast('Hapus dokter','error')"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormDokter() {
  openModal('Tambah Data Dokter', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nama Dokter</label><div class="input-wrap"><i class="pre fa-solid fa-user-doctor"></i><input type="text" class="form-control" placeholder="dr. Nama Lengkap"></div></div>
      <div class="form-group"><label class="form-label">Spesialis</label><select class="form-control"><option>Umum</option><option>Gigi</option><option>THT</option><option>Kulit</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Hari Praktik</label><select class="form-control"><option>Sen-Rab</option><option>Sel-Kam</option><option>Rab-Jum</option></select></div>
      <div class="form-group"><label class="form-label">Jam Praktik</label><select class="form-control"><option>08:00 - 12:00</option><option>13:00 - 17:00</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Ruangan</label><select class="form-control"><option>Ruang 1</option><option>Ruang 2</option><option>Ruang 3</option></select></div>
      <div class="form-group"><label class="form-label">No SIP</label><input type="text" class="form-control" placeholder="Nomor SIP dokter"></div>
    </div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:"showToast('Dokter berhasil ditambahkan','success');closeModal()"}
  ]);
}
