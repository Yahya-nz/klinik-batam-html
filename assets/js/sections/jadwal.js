function renderJadwal() {
  return `
  <div class="section-header">
    <div><h2>Jadwal Praktik</h2><p>Jadwal dan ketersediaan dokter per hari</p></div>
    <div class="section-header-actions">
      <button class="btn btn-primary" onclick="showToast('Tambah jadwal','info')"><i class="fa-solid fa-plus"></i> Tambah Jadwal</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:16px;">
    ${dataJadwal.map(d=>`
    <div class="schedule-day">
      <div class="schedule-day-header"><i class="fa-solid fa-calendar-day" style="margin-right:6px;"></i>${d.hari}</div>
      ${d.slots.map(s=>`<div class="schedule-slot"><i class="fa-solid fa-user-doctor"></i>${s}</div>`).join('')}
    </div>`).join('')}
  </div>
  <div class="card">
    <div class="card-header"><h3><i class="fa-solid fa-table"></i>Detail Jadwal</h3></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Dokter</th><th>Spesialis</th><th>Hari Praktik</th><th>Jam</th><th>Ruangan</th><th>Kuota</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr><td><strong>dr. Sarah Amalia</strong></td><td>Umum</td><td>Sen, Sel, Rab</td><td>08:00 - 12:00</td><td>Ruang 1</td><td>20 pasien</td><td><button class="btn btn-xs btn-outline" onclick="showToast('Edit jadwal','info')"><i class="fa-solid fa-pen"></i> Edit</button></td></tr>
          <tr><td><strong>dr. Rizal Hamdan</strong></td><td>Gigi</td><td>Sel, Rab, Kam</td><td>13:00 - 17:00</td><td>Ruang 2</td><td>15 pasien</td><td><button class="btn btn-xs btn-outline" onclick="showToast('Edit jadwal','info')"><i class="fa-solid fa-pen"></i> Edit</button></td></tr>
          <tr><td><strong>dr. Maya Sari</strong></td><td>Umum</td><td>Rab, Kam, Jum</td><td>08:00 - 12:00</td><td>Ruang 3</td><td>20 pasien</td><td><button class="btn btn-xs btn-outline" onclick="showToast('Edit jadwal','info')"><i class="fa-solid fa-pen"></i> Edit</button></td></tr>
        </tbody>
      </table>
    </div>
  </div>`;
}
