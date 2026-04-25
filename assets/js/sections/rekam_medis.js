function renderRekamMedis() {
  return `
  <div class="section-header">
    <div><h2>Rekam Medis</h2><p>Input dan riwayat rekam medis pasien</p></div>
    <div class="section-header-actions">
      <div class="search-bar" style="width:200px;"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Cari rekam medis..."></div>
      <button class="btn btn-primary" onclick="openFormRekamMedis()"><i class="fa-solid fa-plus"></i> Input Rekam Medis</button>
    </div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Pasien</th><th>Dokter</th><th>Tanggal</th><th>Diagnosa</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataRekamMedis.map(r=>`<tr>
            <td><span class="badge badge-muted">${r.id}</span></td>
            <td><strong>${r.pasien}</strong></td>
            <td>${r.dokter}</td>
            <td>${r.tgl}</td>
            <td>${r.diagnosa}</td>
            <td>
              <button class="btn btn-xs btn-secondary" onclick="detailRekamMedis('${r.id}')"><i class="fa-solid fa-eye"></i> Detail</button>
              <button class="btn btn-xs btn-outline" onclick="openFormRekamMedis('${r.id}')"><i class="fa-solid fa-pen"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function openFormRekamMedis(id) {
  const r = id ? dataRekamMedis.find(x=>x.id===id) : null;
  openModal(r ? 'Edit Rekam Medis - ' + r.id : 'Input Rekam Medis', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Pasien</label>
        <select class="form-control">${dataPasien.map(p=>`<option ${r&&p.nama===r.pasien?'selected':''}>${p.nama} (${p.nim})</option>`).join('')}</select>
      </div>
      <div class="form-group"><label class="form-label">Tanggal</label><input type="date" class="form-control" value="2024-05-21"></div>
    </div>
    <div class="form-group"><label class="form-label">Keluhan</label><textarea class="form-control" rows="2" placeholder="Keluhan yang disampaikan pasien...">${r?r.keluhan:''}</textarea></div>
    <div class="form-group"><label class="form-label">Hasil Pemeriksaan</label><textarea class="form-control" rows="2" placeholder="Hasil pemeriksaan fisik...">${r?r.pemeriksaan:''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Diagnosa</label><input type="text" class="form-control" placeholder="Diagnosa klinis" value="${r?r.diagnosa:''}"></div>
      <div class="form-group"><label class="form-label">Poli</label><select class="form-control"><option>Poli Umum</option><option>Poli Gigi</option><option>Konseling</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Catatan Tambahan</label><textarea class="form-control" rows="2" placeholder="Catatan dokter...">${r?r.catatan:''}</textarea></div>
  `, [
    {label:'Batal', cls:'btn-secondary', action:'closeModal()'},
    {label:'<i class="fa-solid fa-save"></i> Simpan', cls:'btn-primary', action:"showToast('Rekam medis berhasil disimpan','success');closeModal()"}
  ]);
}

function detailRekamMedis(id) {
  const r = dataRekamMedis.find(x=>x.id===id);
  if (!r) return;
  openModal('Detail Rekam Medis - ' + r.id, `
    <div class="grid-2">
      <div class="detail-field"><label>Pasien</label><div class="val">${r.pasien}</div></div>
      <div class="detail-field"><label>Dokter</label><div class="val">${r.dokter}</div></div>
      <div class="detail-field"><label>Tanggal</label><div class="val">${r.tgl}</div></div>
      <div class="detail-field"><label>Diagnosa</label><div class="val">${r.diagnosa}</div></div>
    </div>
    <div class="separator"></div>
    <div class="detail-field"><label>Keluhan</label><div class="val">${r.keluhan}</div></div>
    <div class="detail-field"><label>Hasil Pemeriksaan</label><div class="val">${r.pemeriksaan}</div></div>
    <div class="detail-field"><label>Catatan Tambahan</label><div class="val">${r.catatan}</div></div>
  `, [{label:'Tutup', cls:'btn-secondary', action:'closeModal()'}]);
}
