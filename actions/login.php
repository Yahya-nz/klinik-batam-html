<?php
session_start();

// Akun hardcoded (tanpa DB)
$users = [
    'admin@polibatam.ac.id'  => ['password' => 'admin123',  'role' => 'admin',  'name' => 'Ahmad Admin'],
    'dokter@polibatam.ac.id' => ['password' => 'dokter123', 'role' => 'dokter', 'name' => 'dr. Sarah Amalia'],
    'pasien@polibatam.ac.id' => ['password' => 'pasien123', 'role' => 'pasien', 'name' => 'Andi Pratama'],
];

// Gabung dengan akun yang sudah didaftarkan via register.php (disimpan di session)
$regUsers = $_SESSION['reg_users'] ?? [];
$allUsers = array_merge($users, $regUsers);

// ── Quick login via tombol demo ──
if (!empty($_POST['quick_role'])) {
    $roleMap = [
        'admin'  => ['name' => 'Ahmad Admin',      'role' => 'admin'],
        'dokter' => ['name' => 'dr. Sarah Amalia',  'role' => 'dokter'],
        'pasien' => ['name' => 'Andi Pratama',       'role' => 'pasien'],
    ];
    $role = $_POST['quick_role'];
    if (isset($roleMap[$role])) {
        $_SESSION['role'] = $roleMap[$role]['role'];
        $_SESSION['name'] = $roleMap[$role]['name'];
        header('Location: ../app.php');
        exit;
    }
}

// ── Login normal ──
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email && isset($allUsers[$email]) && $allUsers[$email]['password'] === $password) {
    $_SESSION['role'] = $allUsers[$email]['role'];
    $_SESSION['name'] = $allUsers[$email]['name'];
    header('Location: ../app.php');
    exit;
}

$_SESSION['flash_error'] = 'Email atau password salah.';
header('Location: ../login.php');
exit;
