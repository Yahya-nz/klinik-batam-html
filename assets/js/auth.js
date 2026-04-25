// roleInfo diisi saat initApp — nama diambil dari session PHP (currentName)
const roleInfo = {
  admin:  { name:'Ahmad Admin',      label:'Admin',     chip:'role-admin' },
  dokter: { name:'dr. Sarah Amalia', label:'Dokter',    chip:'role-dokter' },
  pasien: { name:'Andi Pratama',     label:'Mahasiswa', chip:'role-pasien' },
};

function initApp() {
  // Pakai nama dari session PHP jika tersedia
  if (typeof currentName !== 'undefined' && currentName) {
    roleInfo[currentRole] = { ...roleInfo[currentRole], name: currentName };
  }

  const info = roleInfo[currentRole] || { name: currentName || 'Pengguna', label: currentRole, chip: 'role-pasien' };
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
