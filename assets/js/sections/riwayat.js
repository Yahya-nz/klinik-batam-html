function renderRiwayat() {
  return `
  <div class="section-header">
    <div><h2>Riwayat Kunjungan</h2><p>Riwayat konsultasi dan pemeriksaan Anda</p></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>No</th><th>Tanggal</th><th>Dokter</th><th>Diagnosa</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          ${dataRekamMedis.map((r,i)=>`<tr>
            <td>${i+1}</td>
            <td>${r.tgl}</td>
            <td><strong>${r.dokter}</strong></td>
            <td>${r.diagnosa}</td>
            <td><span class="badge badge-success">Selesai</span></td>
            <td><button class="btn btn-xs btn-secondary" onclick="detailRekamMedis('${r.id}')"><i class="fa-solid fa-eye"></i> Detail</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}
