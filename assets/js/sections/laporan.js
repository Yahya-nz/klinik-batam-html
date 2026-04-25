function renderLaporan() {
  return `
  <div class="section-header">
    <div><h2>Laporan</h2><p>Statistik dan laporan kunjungan klinik</p></div>
    <div class="section-header-actions">
      <select class="form-control" style="width:auto;padding:8px 12px;"><option>Tahun 2024</option><option>Tahun 2023</option></select>
      <button class="btn btn-secondary"><i class="fa-solid fa-file-export"></i> Export</button>
    </div>
  </div>
  <div class="stats-row">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-users"></i></div><div><div class="stat-val">528</div><div class="stat-lbl">Total Pasien</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-stethoscope"></i></div><div><div class="stat-val">530</div><div class="stat-lbl">Total Kunjungan</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-prescription"></i></div><div><div class="stat-val">412</div><div class="stat-lbl">Resep Dikeluarkan</div></div></div>
    <div class="stat-card"><div class="stat-icon red"><i class="fa-solid fa-pills"></i></div><div><div class="stat-val">6</div><div class="stat-lbl">Jenis Obat</div></div></div>
  </div>
  <div class="grid-2" style="margin-top:16px;">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-chart-bar"></i>Kunjungan Per Bulan</h3></div>
      <div class="card-body">
        <div class="bar-chart">
          ${[55,70,60,85,75,90,65,80,45,70,60,95].map(v=>`<div class="bar" style="height:${v}%" data-val="${v}"></div>`).join('')}
        </div>
        <div class="bar-labels">
          ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'].map(m=>`<span>${m}</span>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-stethoscope"></i>Distribusi Diagnosa</h3></div>
      <div class="card-body">
        ${[['ISPA / Flu','38%','var(--c1)'],['Gangguan Pencernaan','22%','var(--c2)'],['Cedera Ringan','15%','var(--c3)'],['Sakit Kepala','13%','var(--c4)'],['Lainnya','12%','var(--c5)']].map(([l,p,c])=>`
        <div class="progress-row">
          <div class="progress-meta"><span>${l}</span><strong>${p}</strong></div>
          <div class="progress-bar-bg"><div class="progress-fill" style="width:${p};background:${c};"></div></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-user-doctor"></i>Kunjungan Per Dokter</h3></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Dokter</th><th>Spesialis</th><th>Kunjungan</th><th>Persen</th></tr></thead>
          <tbody>
            <tr><td><strong>dr. Sarah Amalia</strong></td><td>Umum</td><td>248</td><td><span class="badge badge-success">47%</span></td></tr>
            <tr><td><strong>dr. Rizal Hamdan</strong></td><td>Gigi</td><td>162</td><td><span class="badge badge-info">31%</span></td></tr>
            <tr><td><strong>dr. Maya Sari</strong></td><td>Umum</td><td>120</td><td><span class="badge badge-warning">22%</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-pills"></i>Obat Paling Sering Diresepkan</h3></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nama Obat</th><th>Satuan</th><th>Dikeluarkan</th></tr></thead>
          <tbody>
            <tr><td><strong>Paracetamol</strong></td><td>Tablet</td><td>1.240</td></tr>
            <tr><td><strong>Amoxicillin</strong></td><td>Kapsul</td><td>820</td></tr>
            <tr><td><strong>Vitamin C</strong></td><td>Tablet</td><td>650</td></tr>
            <tr><td><strong>Ibuprofen</strong></td><td>Tablet</td><td>430</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}
