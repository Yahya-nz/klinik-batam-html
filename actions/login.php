<?php
session_start();

// Hardcoded users (tanpa DB dulu)
$users = [
    'admin@polibatam.ac.id'  => ['password' => 'admin123',  'role' => 'admin',  'name' => 'Ahmad Admin'],
    'dokter@polibatam.ac.id' => ['password' => 'dokter123', 'role' => 'dokter', 'name' => 'dr. Sarah Amalia'],
    'pasien@polibatam.ac.id' => ['password' => 'pasien123', 'role' => 'pasien', 'name' => 'Andi Pratama'],
];

// Quick login via tombol demo
if (!empty($_POST['quick_role'])) {
    $role = $_POST['quick_role'];
    $roleMap = [
        'admin'  => ['name' => 'Ahmad Admin',      'role' => 'admin'],
        'dokter' => ['name' => 'dr. Sarah Amalia',  'role' => 'dokter'],
        'pasien' => ['name' => 'Andi Pratama',       'role' => 'pasien'],
    ];
    if (isset($roleMap[$role])) {
        $_SESSION['role'] = $roleMap[$role]['role'];
        $_SESSION['name'] = $roleMap[$role]['name'];
        header('Location: ../app.php');
        exit;
    }
}

// Login normal via email + password
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (isset($users[$email]) && $users[$email]['password'] === $password) {
    $_SESSION['role'] = $users[$email]['role'];
    $_SESSION['name'] = $users[$email]['name'];
    header('Location: ../app.php');
    exit;
}

// Gagal login
$_SESSION['flash_error'] = 'Email atau password salah.';
header('Location: ../login.php');
exit;
