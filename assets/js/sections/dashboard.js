function renderDashboard() {
  if (currentRole === 'admin')  return renderDashAdmin();
  if (currentRole === 'dokter') return renderDashDokter();
  return renderDashPasien();
}

function renderDashAdmin() {
  return `
  <div class="stats-row">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-users"></i></div><div><div class="stat-val">528</div><div class="stat-lbl">Total Pasien</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-calendar-check"></i></div><div><div class="stat-val">47</div><div class="stat-lbl">Kunjungan Bulan Ini</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-pills"></i></div><div><div class="stat-val">6</div><div class="stat-lbl">Jenis Obat Tersedia</div></div></div>
    <div class="stat-card"><div class="stat-icon red"><i class="fa-solid fa-triangle-exclamation"></i></div><div><div class="stat-val">2</div><div class="stat-lbl">Stok Hampir Habis</div></div></div>
  </div>
  <div class="grid-2" style="margin-bottom:16px;">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-chart-bar"></i>Kunjungan Bulanan 2024</h3></div>
      <div class="card-body">
        <div class="bar-chart">
          ${[55,70,60,85,75,90,65,80,45,70,60,95].map((v,i) => `<div class="bar" style="height:${v}%" data-val="${v}"></div>`).join('')}
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
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-clock-rotate-left"></i>Kunjungan Terbaru</h3></div>
      <div class="card-body">
        <div class="recent-list">
          ${dataRekamMedis.map(r=>`
          <div class="recent-item">
            <div class="recent-icon"><i class="fa-solid fa-user-injured"></i></div>
            <div class="recent-info"><div class="name">${r.pasien}</div><div class="meta">${r.tgl} &bull; ${r.dokter}</div></div>
            <span class="badge badge-success">Selesai</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-pills"></i>Status Stok Obat</h3></div>
      <div class="card-body">
        <div class="recent-list">
          ${dataObat.map(o => {
            const pct = Math.min(100, Math.round(o.stok/320*100));
            const cls = o.stok < 10 ? 'stok-low' : o.stok < 30 ? 'stok-warn' : 'stok-ok';
            return `<div class="recent-item">
              <div class="recent-icon"><i class="fa-solid fa-capsules"></i></div>
              <div class="recent-info">
                <div class="name">${o.nama}</div>
                <div class="stok-bar-bg"><div class="stok-bar-fill ${cls}" style="width:${pct}%"></div></div>
              </div>
              <span style="font-size:12px;font-weight:700;color:${o.stok<10?'var(--danger)':o.stok<30?'var(--warning)':'var(--success)'};">${o.stok} ${o.satuan}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

function renderDashDokter() {
  return `
  <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-calendar-day"></i></div><div><div class="stat-val">8</div><div class="stat-lbl">Pasien Hari Ini</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-file-medical"></i></div><div><div class="stat-val">23</div><div class="stat-lbl">Rekam Medis Bulan Ini</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-prescription"></i></div><div><div class="stat-val">18</div><div class="stat-lbl">Resep Dikeluarkan</div></div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-list-check"></i>Antrian Hari Ini</h3></div>
      <div class="card-body">
        <div class="recent-list">
          ${[['Andi Pratama','08:00','Sakit kepala'],['Siti Rahayu','09:00','Flu & batuk'],['Maya Lestari','10:00','Sakit perut'],['Rizki Hidayat','11:00','Kontrol ulang']].map(([n,j,k],i)=>`
          <div class="recent-item">
            <div class="recent-icon" style="background:rgba(74,112,122,${0.1+i*0.03});"><i class="fa-solid fa-user"></i></div>
            <div class="recent-info"><div class="name">${n}</div><div class="meta">${j} &bull; ${k}</div></div>
            <span class="badge ${i===0?'badge-success':i===1?'badge-info':'badge-muted'}">${i===0?'Sedang':'Menunggu'}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-calendar-week"></i>Jadwal Saya</h3></div>
      <div class="card-body">
        ${dataJadwal.slice(0,3).map(d=>`
        <div class="schedule-day" style="margin-bottom:10px;">
          <div class="schedule-day-header">${d.hari}</div>
          ${d.slots.filter(s=>s.includes('Sarah')).map(s=>`<div class="schedule-slot"><i class="fa-solid fa-clock"></i>${s}</div>`).join('') || '<div class="schedule-slot" style="color:var(--text-light)"><i class="fa-solid fa-minus"></i>Tidak ada jadwal</div>'}
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function renderDashPasien() {
  return `
  <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
    <div class="stat-card"><div class="stat-icon teal"><i class="fa-solid fa-stethoscope"></i></div><div><div class="stat-val">3</div><div class="stat-lbl">Total Kunjungan</div></div></div>
    <div class="stat-card"><div class="stat-icon green"><i class="fa-solid fa-prescription-bottle"></i></div><div><div class="stat-val">2</div><div class="stat-lbl">Resep Aktif</div></div></div>
    <div class="stat-card"><div class="stat-icon orange"><i class="fa-solid fa-calendar-check"></i></div><div><div class="stat-val">0</div><div class="stat-lbl">Booking Aktif</div></div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-id-card-clip"></i>Data Saya</h3></div>
      <div class="card-body">
        <div class="grid-2">
          <div class="detail-field"><label>Nama</label><div class="val">Andi Pratama</div></div>
          <div class="detail-field"><label>NIM</label><div class="val">NIM4311901001</div></div>
          <div class="detail-field"><label>Prodi</label><div class="val">Teknik Informatika</div></div>
          <div class="detail-field"><label>Semester</label><div class="val">Semester 6</div></div>
          <div class="detail-field"><label>No HP</label><div class="val">08123456789</div></div>
          <div class="detail-field"><label>Status</label><div class="val"><span class="badge badge-success">Aktif</span></div></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3><i class="fa-solid fa-clock-rotate-left"></i>Kunjungan Terakhir</h3></div>
      <div class="card-body">
        <div class="recent-list">
          ${dataRekamMedis.slice(0,2).map(r=>`
          <div class="recent-item">
            <div class="recent-icon"><i class="fa-solid fa-stethoscope"></i></div>
            <div class="recent-info"><div class="name">${r.dokter}</div><div class="meta">${r.tgl} &bull; ${r.diagnosa}</div></div>
            <span class="badge badge-success">Selesai</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:14px;">
          <button class="btn btn-primary" onclick="renderSection('booking')"><i class="fa-solid fa-calendar-plus"></i> Booking Baru</button>
        </div>
      </div>
    </div>
  </div>`;
}
