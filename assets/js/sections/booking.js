function renderBooking() {
  return `
  <div class="section-header">
    <div><h2>Booking Jadwal</h2><p>Buat janji temu dengan dokter klinik</p></div>
  </div>
  <div class="booking-layout">
    <div>
      <div class="card">
        <div class="card-header"><h3><i class="fa-solid fa-calendar-plus"></i>Form Booking</h3></div>
        <div class="card-body">
          <div class="form-group"><label class="form-label">Poli / Layanan</label>
            <select class="form-control"><option>Poli Umum</option><option>Poli Gigi</option><option>Konseling</option></select>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Pilih Dokter</label>
              <select class="form-control">${dataDokter.map(d=>`<option>${d.nama} (${d.spesialis})</option>`).join('')}</select>
            </div>
            <div class="form-group"><label class="form-label">Ruangan</label>
              <select class="form-control"><option>Ruang 1</option><option>Ruang 2</option><option>Ruang 3</option></select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group"><label class="form-label">Tanggal</label><input type="date" class="form-control" id="book-tgl" value="2024-05-21"></div>
            <div class="form-group"><label class="form-label">Jam</label>
              <select class="form-control" id="book-jam"><option>08:00</option><option>09:00</option><option>10:00</option><option>11:00</option></select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Keluhan Awal</label>
            <textarea class="form-control" rows="3" id="book-keluhan" placeholder="Tuliskan keluhan Anda..."></textarea>
          </div>
          <button class="btn btn-primary btn-w-full" onclick="doBooking()"><i class="fa-solid fa-calendar-check"></i> Booking Sekarang</button>
        </div>
      </div>
    </div>
    <div>
      <div id="booking-output-area" style="display:none;margin-bottom:14px;">
        <div class="booking-result">
          <h4><i class="fa-solid fa-circle-check" style="color:var(--success);"></i>Konfirmasi Booking</h4>
          <div class="grid-2">
            <div class="detail-field"><label>Nama Pasien</label><div class="val">Andi Pratama</div></div>
            <div class="detail-field"><label>Poli</label><div class="val">Poli Umum</div></div>
            <div class="detail-field"><label>Dokter</label><div class="val" id="out-dokter">-</div></div>
            <div class="detail-field"><label>Ruangan</label><div class="val" id="out-ruangan">-</div></div>
            <div class="detail-field"><label>Tanggal</label><div class="val" id="out-tgl">-</div></div>
            <div class="detail-field"><label>Jam</label><div class="val" id="out-jam">-</div></div>
          </div>
          <div class="detail-field" style="margin-top:8px;"><label>Keluhan</label><div class="val" id="out-keluhan">-</div></div>
          <div style="margin-top:10px;"><span class="badge badge-warning"><i class="fa-solid fa-hourglass-half"></i> Menunggu Konfirmasi</span></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3><i class="fa-solid fa-circle-info"></i>Info Dokter & Jadwal</h3></div>
        <div class="card-body">
          <div class="recent-list">
            ${dataDokter.map(d=>`
            <div class="recent-item">
              <div class="recent-icon"><i class="fa-solid fa-user-doctor"></i></div>
              <div class="recent-info"><div class="name">${d.nama}</div><div class="meta">${d.jadwal} &bull; ${d.ruangan}</div></div>
              <span class="badge badge-info">${d.spesialis}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function doBooking() {
  const tgl = document.getElementById('book-tgl')?.value || '-';
  const jam = document.getElementById('book-jam')?.value || '-';
  const keluhan = document.getElementById('book-keluhan')?.value || 'Tidak ada keluhan';
  document.getElementById('out-dokter').textContent = 'dr. Sarah Amalia';
  document.getElementById('out-ruangan').textContent = 'Ruang 1';
  document.getElementById('out-tgl').textContent = tgl;
  document.getElementById('out-jam').textContent = jam;
  document.getElementById('out-keluhan').textContent = keluhan;
  document.getElementById('booking-output-area').style.display = 'block';
  showToast('Booking berhasil dibuat!', 'success');
}
