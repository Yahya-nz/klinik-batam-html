const roleInfo = {
  admin:  { name:'Ahmad Admin',      label:'Admin',     chip:'role-admin' },
  dokter: { name:'dr. Sarah Amalia', label:'Dokter',    chip:'role-dokter' },
  pasien: { name:'Andi Pratama',     label:'Mahasiswa', chip:'role-pasien' },
};

function initApp() {
  const info = roleInfo[currentRole];
  document.getElementById('sidebar-username').textContent = info.name;
  document.getElementById('sidebar-role-lbl').textContent = info.label;
  const chip = document.getElementById('topbar-role-chip');
  chip.textContent = info.label;
  chip.className = 'role-chip ' + info.chip;
  buildSidebar();
  renderSection('dashboard');
}

function logout() {
  window.location.href = 'logout.php';
}

function updateRegFields() {
  const role = document.getElementById('reg-role')?.value;
  const lbl = document.getElementById('reg-jabatan-label');
  const sel = document.getElementById('reg-jabatan-select');
  if (!lbl || !sel) return;
  if (role === 'Mahasiswa') {
    lbl.textContent = 'Semester';
    sel.innerHTML = [1,2,3,4,5,6].map(s=>`<option>Semester ${s}</option>`).join('');
  } else if (role === 'Dosen') {
    lbl.textContent = 'Status Dosen';
    sel.innerHTML = '<option>Dosen Tetap</option><option>Dosen LB</option>';
  } else {
    lbl.textContent = 'Jabatan';
    sel.innerHTML = '<option>Administrasi</option><option>Keuangan</option><option>Teknisi</option><option>Keamanan</option>';
  }
}
