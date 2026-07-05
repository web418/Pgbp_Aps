-- ========================================================================
-- SISTEM MONITORING IURAN WAJIB BULANAN
-- PERSEKUTUAN GEREJA-GEREJA BAPTIS PAPUA (PGBP)
-- 
-- DATABASE SCRIPT (MYSQL / MARIADB) - PRODUCTION READY
-- TARGET ENGINE: InnoDB, CHARACTER SET: utf8mb4, COLLATE: utf8mb4_unicode_ci
-- ========================================================================

CREATE DATABASE IF NOT EXISTS `pgbp_iuran` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `pgbp_iuran`;

-- Set foreign key checks and SQL modes
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+07:00";

-- ------------------------------------------------------------------------
-- Table Structure: `wilayah`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `wilayah`;
CREATE TABLE `wilayah` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `kode` VARCHAR(20) NOT NULL UNIQUE,
  `nama_wilayah` VARCHAR(100) NOT NULL,
  `jumlah_gereja` INT(11) NOT NULL DEFAULT 0,
  `jumlah_jiwa` INT(11) NOT NULL DEFAULT 0,
  `ketua` VARCHAR(100) DEFAULT NULL,
  `alamat` TEXT DEFAULT NULL,
  `telepon` VARCHAR(20) DEFAULT NULL,
  `status` ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table Structure: `users`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Bendahara Pusat', 'Admin Wilayah') NOT NULL DEFAULT 'Admin Wilayah',
  `wilayah_id` INT(11) DEFAULT NULL,
  `status` ENUM('Pending', 'Approved', 'Suspended') NOT NULL DEFAULT 'Pending',
  `foto` VARCHAR(255) DEFAULT 'default-user.png',
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_wilayah` FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table Structure: `gereja`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `gereja`;
CREATE TABLE `gereja` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `wilayah_id` INT(11) NOT NULL,
  `kode_gereja` VARCHAR(20) NOT NULL UNIQUE,
  `nama_gereja` VARCHAR(150) NOT NULL,
  `gembala` VARCHAR(100) NOT NULL,
  `jumlah_jiwa` INT(11) NOT NULL DEFAULT 0,
  `alamat` TEXT DEFAULT NULL,
  `status` ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_gereja_wilayah` FOREIGN KEY (`wilayah_id`) REFERENCES `wilayah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table Structure: `pembayaran`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `pembayaran`;
CREATE TABLE `pembayaran` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `gereja_id` INT(11) NOT NULL,
  `bulan` TINYINT(4) NOT NULL, -- 1 s/d 12
  `tahun` INT(11) NOT NULL,
  `jumlah_jiwa` INT(11) NOT NULL,
  `iuran_per_jiwa` DECIMAL(15,2) NOT NULL DEFAULT 1000.00, -- Standar iuran per jiwa
  `total_iuran` DECIMAL(15,2) NOT NULL,
  `tanggal_transfer` DATE NOT NULL,
  `bank` VARCHAR(100) NOT NULL,
  `nomor_referensi` VARCHAR(100) NOT NULL UNIQUE,
  `bukti_transfer` VARCHAR(255) NOT NULL,
  `status` ENUM('Pending', 'Verified', 'Rejected', 'Revision') NOT NULL DEFAULT 'Pending',
  `catatan` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pembayaran_gereja` FOREIGN KEY (`gereja_id`) REFERENCES `gereja` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table Structure: `verifikasi`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `verifikasi`;
CREATE TABLE `verifikasi` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pembayaran_id` INT(11) NOT NULL,
  `admin_id` INT(11) NOT NULL, -- User pusat yang memverifikasi
  `status` ENUM('Verified', 'Rejected', 'Revision') NOT NULL,
  `catatan` TEXT DEFAULT NULL,
  `tanggal` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_verifikasi_pembayaran` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_verifikasi_user` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------
-- Table Structure: `audit_trail`
-- ------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_trail`;
CREATE TABLE `audit_trail` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) DEFAULT NULL,
  `aktivitas` VARCHAR(255) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `browser` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Enable foreign keys
SET FOREIGN_KEY_CHECKS = 1;

-- ========================================================================
-- DATA SEEDING: MASTER 19 WILAYAH PGBP
-- ========================================================================
INSERT INTO `wilayah` (`id`, `kode`, `nama_wilayah`, `jumlah_gereja`, `jumlah_jiwa`, `ketua`, `alamat`, `telepon`, `status`) VALUES
(1, 'WIL-01', 'Wilayah Toli', 5, 2350, 'Pdt. Markus Kogoya, S.Th', 'Jl. Trans Papua, Karubaga', '081234567001', 'Aktif'),
(2, 'WIL-02', 'Wilayah Yamo', 4, 1850, 'Pdt. Zakarias Weya, M.Th', 'Jl. Irian, Mulia, Puncak Jaya', '081234567002', 'Aktif'),
(3, 'WIL-03', 'Wilayah Tiom', 4, 2100, 'Pdt. Simon Yoman, M.Div', 'Jl. Utama Tiom, Lanny Jaya', '081234567003', 'Aktif'),
(4, 'WIL-04', 'Wilayah Wamena', 3, 1450, 'Pdt. Lukas Karoba, S.Th', 'Jl. Bhayangkara No. 45, Wamena', '081234567004', 'Aktif'),
(5, 'WIL-05', 'Wilayah Jayapura', 4, 2800, 'Pdt. John Wenda, D.Th', 'Jl. Raya Sentani Km. 18, Jayapura', '081234567005', 'Aktif'),
(6, 'WIL-06', 'Wilayah Nabire', 3, 1200, 'Pdt. Elia Tabuni, S.Th', 'Jl. Merdeka No. 12, Nabire', '081234567006', 'Aktif'),
(7, 'WIL-07', 'Wilayah Mimika', 3, 1350, 'Pdt. Samuel Jigibalom, M.Min', 'Jl. Timika Indah, Mimika', '081234567007', 'Aktif'),
(8, 'WIL-08', 'Wilayah Yahukimo', 3, 1600, 'Pdt. Barnabas Karoba, S.Th', 'Jl. Dekai Baru, Yahukimo', '081234567008', 'Aktif'),
(9, 'WIL-09', 'Wilayah Bokondini', 3, 1100, 'Pdt. Yusuf Pagawak, S.Th', 'Jl. Lembah Bokondini, Tolikara', '081234567009', 'Aktif'),
(10, 'WIL-10', 'Wilayah Gamelia', 2, 950, 'Pdt. Daniel Jikwa, M.Th', 'Jl. Gamelia Raya, Lanny Jaya', '081234567010', 'Aktif'),
(11, 'WIL-11', 'Wilayah Ilaga', 2, 850, 'Pdt. Gideon Murib, S.Th', 'Jl. Pegunungan Tengah, Ilaga, Puncak', '081234567011', 'Aktif'),
(12, 'WIL-12', 'Wilayah Kuyawage', 2, 900, 'Pdt. Abraham Kogoya, S.Th', 'Jl. Utama Kuyawage, Lanny Jaya', '081234567012', 'Aktif'),
(13, 'WIL-13', 'Wilayah Mapnduma', 2, 750, 'Pdt. Philemon Gwijangge, S.Th', 'Jl. Lembah Mapnduma, Nduga', '081234567013', 'Aktif'),
(14, 'WIL-14', 'Wilayah Kembu', 2, 800, 'Pdt. Silas Wenda, S.Th', 'Jl. Poros Kembu, Tolikara', '081234567014', 'Aktif'),
(15, 'WIL-15', 'Wilayah Konda', 2, 700, 'Pdt. Nehemia Jikwa, S.Th', 'Jl. Trans Konda, Sorong Selatan', '081234567015', 'Aktif'),
(16, 'WIL-16', 'Wilayah Merauke', 2, 650, 'Pdt. Paul Kogoya, S.Th', 'Jl. Raya Mandala No. 88, Merauke', '081234567016', 'Aktif'),
(17, 'WIL-17', 'Wilayah Sorong', 2, 720, 'Pdt. Markus Weya, S.Th', 'Jl. Ahmad Yani No. 5, Sorong', '081234567017', 'Aktif'),
(18, 'WIL-18', 'Wilayah Manokwari', 2, 800, 'Pdt. Stephen Tabuni, S.Th', 'Jl. Siliwangi No. 10, Manokwari', '081234567018', 'Aktif'),
(19, 'WIL-19', 'Wilayah Biak', 2, 580, 'Pdt. Silas Gwijangge, S.Th', 'Jl. Imam Bonjol No. 34, Biak', '081234567019', 'Aktif');

-- ========================================================================
-- DATA SEEDING: DAFTAR GEREJA LENGKAP UNTUK 19 WILAYAH PGBP
-- ========================================================================
INSERT INTO `gereja` (`id`, `wilayah_id`, `kode_gereja`, `nama_gereja`, `gembala`, `jumlah_jiwa`, `alamat`, `status`) VALUES
-- Wilayah Toli (WIL-01)
(1, 1, 'GER-0101', 'Gereja Baptis Betania Karubaga', 'Pdt. Yusuf Kogoya, S.Th', 600, 'Jl. Trans Papua, Karubaga', 'Aktif'),
(2, 1, 'GER-0102', 'Gereja Baptis Sion Karubaga', 'Pdt. Paul Wenda, S.Th', 450, 'Jl. Lembah Hijau, Karubaga', 'Aktif'),
(3, 1, 'GER-0103', 'Gereja Baptis Immanuel Goli', 'Ev. Daniel Karoba', 500, 'Kp. Goli, Distrik Karubaga', 'Aktif'),
(4, 1, 'GER-0104', 'Gereja Baptis Efata Konda', 'Ev. Markus Weya', 400, 'Kp. Konda, Tolikara', 'Aktif'),
(5, 1, 'GER-0105', 'Gereja Baptis Gibeon Gilime', 'Ev. Zakarias Kogoya', 400, 'Distrik Gilime, Tolikara', 'Aktif'),

-- Wilayah Yamo (WIL-02)
(6, 2, 'GER-0201', 'Gereja Baptis Yerusalem Mulia', 'Pdt. Abraham Weya, S.Th', 550, 'Jl. Irian, Mulia', 'Aktif'),
(7, 2, 'GER-0202', 'Gereja Baptis Getsemani Mulia', 'Pdt. Lukas Tabuni, S.Th', 450, 'Jl. Bandara Mulia, Puncak Jaya', 'Aktif'),
(8, 2, 'GER-0203', 'Gereja Baptis Filadelfia Yamo', 'Ev. John Karoba', 450, 'Distrik Yamo, Puncak Jaya', 'Aktif'),
(9, 2, 'GER-0204', 'Gereja Baptis Hosana Mewoluk', 'Ev. Simon Weya', 400, 'Kp. Mewoluk, Puncak Jaya', 'Aktif'),

-- Wilayah Tiom (WIL-03)
(10, 3, 'GER-0301', 'Gereja Baptis Betel Tiom', 'Pdt. Zakarias Wenda, M.Div', 650, 'Jl. Utama Tiom, Lanny Jaya', 'Aktif'),
(11, 3, 'GER-0302', 'Gereja Baptis Sion Gamelia', 'Ev. Markus Kogoya', 500, 'Kp. Gamelia Lama, Lanny Jaya', 'Aktif'),
(12, 3, 'GER-0303', 'Gereja Baptis Maranatha Pirime', 'Ev. Philemon Weya', 450, 'Distrik Pirime, Lanny Jaya', 'Aktif'),
(13, 3, 'GER-0304', 'Gereja Baptis Getsemani Tiom', 'Pdt. Simon Kogoya, S.Th', 500, 'Jl. Baru No. 8, Tiom', 'Aktif'),

-- Wilayah Wamena (WIL-04)
(14, 4, 'GER-0401', 'Gereja Baptis Peniel Wamena', 'Pdt. Stephen Tabuni, S.Th', 550, 'Jl. Bhayangkara No. 45, Wamena', 'Aktif'),
(15, 4, 'GER-0402', 'Gereja Baptis El-Shaddai Wamena', 'Pdt. Paul Karoba, S.Th', 450, 'Jl. Hom-hom, Distrik Wamena', 'Aktif'),
(16, 4, 'GER-0403', 'Gereja Baptis Sion Sinakma', 'Ev. Yusuf Weya', 450, 'Kp. Sinakma, Wamena', 'Aktif'),

-- Wilayah Jayapura (WIL-05)
(17, 5, 'GER-0501', 'Gereja Baptis Sion Sentani', 'Pdt. John Wenda, D.Th', 800, 'Jl. Raya Sentani Km. 18, Jayapura', 'Aktif'),
(18, 5, 'GER-0502', 'Gereja Baptis Peniel Waena', 'Pdt. Markus Jikwa, M.Th', 700, 'Jl. Perumnas III, Waena, Jayapura', 'Aktif'),
(19, 5, 'GER-0503', 'Gereja Baptis Yerusalem Abepura', 'Pdt. Silas Kogoya, S.Th', 650, 'Jl. Raya Abepura, Jayapura', 'Aktif'),
(20, 5, 'GER-0504', 'Gereja Baptis Immanuel Koya', 'Ev. David Tabuni', 650, 'Distrik Muara Tami, Jayapura', 'Aktif'),

-- Wilayah Nabire (WIL-06)
(21, 6, 'GER-0601', 'Gereja Baptis Maranatha Nabire', 'Pdt. Elia Tabuni, S.Th', 450, 'Jl. Merdeka No. 12, Nabire', 'Aktif'),
(22, 6, 'GER-0602', 'Gereja Baptis Betania Kalibobo', 'Pdt. Paul Kogoya, S.Th', 350, 'Jl. Kalibobo Baru, Nabire', 'Aktif'),
(23, 6, 'GER-0603', 'Gereja Baptis Sion Siriwini', 'Ev. Simon Wenda', 400, 'Jl. Pantai Siriwini, Nabire', 'Aktif'),

-- Wilayah Mimika (WIL-07)
(24, 7, 'GER-0701', 'Gereja Baptis Peniel Timika', 'Pdt. Samuel Jigibalom, M.Min', 500, 'Jl. Timika Indah, Mimika', 'Aktif'),
(25, 7, 'GER-0702', 'Gereja Baptis Sion SP3', 'Pdt. Nehemia Karoba, S.Th', 400, 'Kp. SP 3, Distrik Kuala Kencana', 'Aktif'),
(26, 7, 'GER-0703', 'Gereja Baptis Getsemani Pomako', 'Ev. Markus Weya', 450, 'Kp. Pomako, Mimika', 'Aktif'),

-- Wilayah Yahukimo (WIL-08)
(27, 8, 'GER-0801', 'Gereja Baptis Yerusalem Dekai', 'Pdt. Barnabas Karoba, S.Th', 600, 'Jl. Dekai Baru, Yahukimo', 'Aktif'),
(28, 8, 'GER-0802', 'Gereja Baptis Betania Anggruk', 'Ev. Gideon Kogoya', 500, 'Kp. Anggruk Lama, Yahukimo', 'Aktif'),
(29, 8, 'GER-0803', 'Gereja Baptis Maranatha Kurima', 'Ev. John Weya', 500, 'Kp. Kurima, Yahukimo', 'Aktif'),

-- Wilayah Bokondini (WIL-09)
(30, 9, 'GER-0901', 'Gereja Baptis Sion Bokondini', 'Pdt. Yusuf Pagawak, S.Th', 450, 'Jl. Lembah Bokondini, Tolikara', 'Aktif'),
(31, 9, 'GER-0902', 'Gereja Baptis Betel Kelila', 'Ev. Abraham Wenda', 350, 'Distrik Kelila, Tolikara', 'Aktif'),
(32, 9, 'GER-0903', 'Gereja Baptis Peniel Bewani', 'Ev. David Jikwa', 300, 'Kp. Bewani, Bokondini', 'Aktif'),

-- Wilayah Gamelia (WIL-10)
(33, 10, 'GER-1001', 'Gereja Baptis Peniel Gamelia', 'Pdt. Daniel Jikwa, M.Th', 500, 'Jl. Gamelia Raya, Lanny Jaya', 'Aktif'),
(34, 10, 'GER-1002', 'Gereja Baptis Yerusalem Gamelia', 'Ev. Elia Karoba', 450, 'Kp. Gamelia, Lanny Jaya', 'Aktif'),

-- Wilayah Ilaga (WIL-11)
(35, 11, 'GER-1101', 'Gereja Baptis El-Shaddai Ilaga', 'Pdt. Gideon Murib, S.Th', 450, 'Jl. Pegunungan Tengah, Ilaga', 'Aktif'),
(36, 11, 'GER-1102', 'Gereja Baptis Betania Sinak', 'Ev. Samuel Weya', 400, 'Kp. Sinak, Distrik Ilaga', 'Aktif'),

-- Wilayah Kuyawage (WIL-12)
(37, 12, 'GER-1201', 'Gereja Baptis Yerusalem Kuyawage', 'Pdt. Abraham Kogoya, S.Th', 500, 'Jl. Utama Kuyawage, Lanny Jaya', 'Aktif'),
(38, 12, 'GER-1202', 'Gereja Baptis Sion Kuyawage', 'Ev. John Gwijangge', 400, 'Kp. Kuyawage Baru, Lanny Jaya', 'Aktif'),

-- Wilayah Mapnduma (WIL-13)
(39, 13, 'GER-1301', 'Gereja Baptis Peniel Mapnduma', 'Pdt. Philemon Gwijangge, S.Th', 400, 'Jl. Lembah Mapnduma, Nduga', 'Aktif'),
(40, 13, 'GER-1302', 'Gereja Baptis Betel Mapnduma', 'Ev. Silas Weya', 350, 'Kp. Mapnduma, Nduga', 'Aktif'),

-- Wilayah Kembu (WIL-14)
(41, 14, 'GER-1401', 'Gereja Baptis Sion Kembu', 'Pdt. Silas Wenda, S.Th', 450, 'Jl. Poros Kembu, Tolikara', 'Aktif'),
(42, 14, 'GER-1402', 'Gereja Baptis Peniel Kembu', 'Ev. David Kogoya', 350, 'Kp. Kembu Raya, Tolikara', 'Aktif'),

-- Wilayah Konda (WIL-15)
(43, 15, 'GER-1501', 'Gereja Baptis Betania Konda', 'Pdt. Nehemia Jikwa, S.Th', 400, 'Jl. Trans Konda, Sorong Selatan', 'Aktif'),
(44, 15, 'GER-1502', 'Gereja Baptis Sion Teminabuan', 'Ev. Stephen Tabuni', 300, 'Kp. Teminabuan, Sorong Selatan', 'Aktif'),

-- Wilayah Merauke (WIL-16)
(45, 16, 'GER-1601', 'Gereja Baptis Peniel Merauke', 'Pdt. Paul Kogoya, S.Th', 350, 'Jl. Raya Mandala No. 88, Merauke', 'Aktif'),
(46, 16, 'GER-1602', 'Gereja Baptis Sion Tanah Miring', 'Ev. Yusuf Kogoya', 300, 'Kp. Tanah Miring, Merauke', 'Aktif'),

-- Wilayah Sorong (WIL-17)
(47, 17, 'GER-1701', 'Gereja Baptis Sion Sorong', 'Pdt. Markus Weya, S.Th', 400, 'Jl. Ahmad Yani No. 5, Sorong', 'Aktif'),
(48, 17, 'GER-1702', 'Gereja Baptis Peniel Aimas', 'Ev. Gideon Kogoya', 320, 'Kp. Aimas Unit I, Sorong', 'Aktif'),

-- Wilayah Manokwari (WIL-18)
(49, 18, 'GER-1801', 'Gereja Baptis Peniel Manokwari', 'Pdt. Stephen Tabuni, S.Th', 450, 'Jl. Siliwangi No. 10, Manokwari', 'Aktif'),
(50, 18, 'GER-1802', 'Gereja Baptis Sion Prafi', 'Ev. Daniel Karoba', 350, 'Kp. Prafi Baru, Manokwari', 'Aktif'),

-- Wilayah Biak (WIL-19)
(51, 19, 'GER-1901', 'Gereja Baptis Sion Biak', 'Pdt. Silas Gwijangge, S.Th', 300, 'Jl. Imam Bonjol No. 34, Biak', 'Aktif'),
(52, 19, 'GER-1902', 'Gereja Baptis Peniel Biak Barat', 'Ev. John Kogoya', 280, 'Kp. Biak Barat, Biak Numfor', 'Aktif');

-- ========================================================================
-- DATA SEEDING: BENDAHARA PUSAT (SUPER ADMIN) & CONTOH ADMIN WILAYAH
-- password default = '$2y$10$7R0/MAnU9h1r5.FpClyGSeh48Y5Nf9Hl0o6iC5y6vWdEorF1fP43S' (rahasia123)
-- ========================================================================
INSERT INTO `users` (`id`, `nama`, `username`, `email`, `password`, `role`, `wilayah_id`, `status`, `foto`) VALUES
(1, 'Bendahara Pusat PGBP', 'bendahara', 'bendahara@pgbp.org', '$2y$10$7R0/MAnU9h1r5.FpClyGSeh48Y5Nf9Hl0o6iC5y6vWdEorF1fP43S', 'Bendahara Pusat', NULL, 'Approved', 'default-user.png'),
(2, 'Admin Wilayah Toli', 'admintoli', 'admintoli@pgbp.org', '$2y$10$7R0/MAnU9h1r5.FpClyGSeh48Y5Nf9Hl0o6iC5y6vWdEorF1fP43S', 'Admin Wilayah', 1, 'Approved', 'default-user.png'),
(3, 'Admin Wilayah Yamo', 'adminyamo', 'adminyamo@pgbp.org', '$2y$10$7R0/MAnU9h1r5.FpClyGSeh48Y5Nf9Hl0o6iC5y6vWdEorF1fP43S', 'Admin Wilayah', 2, 'Approved', 'default-user.png'),
(4, 'Admin Wilayah Tiom', 'admintiom', 'admintiom@pgbp.org', '$2y$10$7R0/MAnU9h1r5.FpClyGSeh48Y5Nf9Hl0o6iC5y6vWdEorF1fP43S', 'Admin Wilayah', 3, 'Approved', 'default-user.png');

-- ========================================================================
-- DATA SEEDING: TRANSAKSI PEMBAYARAN CONTOH (IURAN BULANAN)
-- ========================================================================
INSERT INTO `pembayaran` (`id`, `gereja_id`, `bulan`, `tahun`, `jumlah_jiwa`, `iuran_per_jiwa`, `total_iuran`, `tanggal_transfer`, `bank`, `nomor_referensi`, `bukti_transfer`, `status`, `catatan`, `created_at`) VALUES
-- Pembayaran Sukses - Toli
(1, 1, 5, 2026, 600, 1000.00, 600000.00, '2026-05-10', 'Bank Papua', 'REF-20260510-001', 'bukti_ger_1_mei.png', 'Verified', 'Iuran Mei 2026 - Lunas diverifikasi', '2026-05-10 10:00:00'),
(2, 2, 5, 2026, 450, 1000.00, 450000.00, '2026-05-12', 'Bank Papua', 'REF-20260512-002', 'bukti_ger_2_mei.png', 'Verified', 'Iuran Mei 2026 - Diverifikasi oleh pusat', '2026-05-12 11:30:00'),

-- Pembayaran Sukses - Yamo
(3, 6, 5, 2026, 550, 1000.00, 550000.00, '2026-05-11', 'Bank Papua', 'REF-20260511-003', 'bukti_ger_6_mei.png', 'Verified', 'Pembayaran Yamo Mei lunas', '2026-05-11 09:15:00'),

-- Pembayaran Pending - Tiom (Menunggu Verifikasi)
(4, 10, 6, 2026, 650, 1000.00, 650000.00, '2026-06-05', 'BRI', 'REF-20260605-004', 'bukti_ger_10_juni.png', 'Pending', 'Mohon segera diverifikasi untuk Bulan Juni', '2026-06-05 14:00:00'),

-- Pembayaran Ditolak - Jayapura (Butuh Revisi)
(5, 17, 5, 2026, 800, 1000.00, 800000.00, '2026-05-08', 'Bank Papua', 'REF-20260508-005', 'bukti_ger_17_mei.png', 'Rejected', 'Jumlah transfer tidak sesuai nominal total iuran. Mohon upload ulang.', '2026-05-08 08:00:00');

-- ========================================================================
-- DATA SEEDING: VERIFIKASI SEED DATA
-- ========================================================================
INSERT INTO `verifikasi` (`id`, `pembayaran_id`, `admin_id`, `status`, `catatan`, `tanggal`) VALUES
(1, 1, 1, 'Verified', 'Bukti valid, dana masuk rekening pusat PGBP.', '2026-05-10 15:00:00'),
(2, 2, 1, 'Verified', 'Sesuai dengan mutasi rekening Bank Papua.', '2026-05-13 10:00:00'),
(3, 3, 1, 'Verified', 'Telah dicek dan sah.', '2026-05-12 09:00:00'),
(4, 5, 1, 'Rejected', 'Jumlah transfer tidak sesuai nominal total iuran. Mohon upload ulang.', '2026-05-09 11:00:00');

-- ========================================================================
-- DATA SEEDING: CONTOH AUDIT TRAIL LOGS
-- ========================================================================
INSERT INTO `audit_trail` (`id`, `user_id`, `aktivitas`, `ip_address`, `browser`, `created_at`) VALUES
(1, 1, 'Login berhasil ke dashboard Bendahara Pusat', '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0', '2026-07-05 08:30:00'),
(2, 2, 'Login berhasil ke dashboard Admin Wilayah Toli', '192.168.1.15', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/120.0', '2026-07-05 08:45:00'),
(3, 2, 'Melakukan input iuran bulanan untuk Gereja Betania Karubaga', '192.168.1.15', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/120.0', '2026-07-05 09:12:00'),
(4, 1, 'Menyetujui verifikasi iuran pembayaran ID 1', '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0', '2026-07-05 09:20:00');
