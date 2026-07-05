<?php
/**
 * SISTEM MONITORING IURAN WAJIB BULANAN
 * PERSEKUTUAN GEREJA-GEREJA BAPTIS PAPUA (PGBP)
 * 
 * config/database.php - Koneksi Database MySQL / MariaDB (PDO)
 * ------------------------------------------------------------------------
 * Desain Keamanan Tingkat Tinggi (Enterprise Grade):
 * ✔ Menggunakan PDO (PHP Data Objects)
 * ✔ Prepared Statement murni (Disable Emulated Prepares) untuk mencegah SQL Injection
 * ✔ Penanganan Error Terpusat secara aman (Safe Exception Handling)
 * ✔ Perlindungan kebocoran informasi sensitif (Credential Exposure Mitigation)
 * ------------------------------------------------------------------------
 * @author Senior Database Architect & Senior Security Engineer PGBP
 */

class Database {
    // Parameter koneksi database (Sesuai standard lingkungan XAMPP/Laragon)
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    private $charset;
    private $conn = null;

    /**
     * Konstruktor otomatis memuat konfigurasi default
     */
    public function __construct() {
        // Default menggunakan environment variables jika tersedia, atau fallback ke standard lokal
        $this->host = defined('DB_HOST') ? DB_HOST : 'localhost';
        $this->db_name = defined('DB_NAME') ? DB_NAME : 'pgbp_iuran';
        $this->username = defined('DB_USER') ? DB_USER : 'root';
        $this->password = defined('DB_PASS') ? DB_PASS : '';
        $this->port = defined('DB_PORT') ? DB_PORT : '3306';
        $this->charset = 'utf8mb4';
    }

    /**
     * Mendapatkan koneksi database PDO yang aman
     * @return PDO|null Instance PDO koneksi database
     */
    public function getConnection() {
        if ($this->conn !== null) {
            return $this->conn;
        }

        try {
            // Data Source Name (DSN) lengkap dengan port dan charset
            $dsn = "mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            
            /**
             * Konfigurasi Keamanan & Performa Koneksi PDO:
             * 
             * 1. ATTR_ERRMODE => ERRMODE_EXCEPTION
             *    Memastikan setiap kesalahan query menghasilkan Exception sehingga bisa ditangkap
             *    dalam blok try-catch dan dicatat ke log internal, bukan langsung bocor ke browser.
             * 
             * 2. ATTR_DEFAULT_FETCH_MODE => FETCH_ASSOC
             *    Mempercepat pembacaan data dan menyederhanakan kode dengan mengembalikan 
             *    hasil query dalam format array asosiatif nama kolom secara default.
             * 
             * 3. ATTR_EMULATE_PREPARES => false
             *    Menonaktifkan emulasi prepared statements agar driver MySQL melakukan bind parameter
             *    secara native. Ini adalah pertahanan terkuat terhadap serangan SQL Injection (SQLi).
             */
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . $this->charset . " COLLATE utf8mb4_unicode_ci"
            ];

            // Inisialisasi objek PDO
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch (PDOException $exception) {
            // Log kesalahan ke server error log demi debugging aman tanpa membocorkan kredensial ke user
            error_log("Database Connection Failure: " . $exception->getMessage() . " in " . $exception->getFile() . " on line " . $exception->getLine());
            
            // Mengirimkan response HTTP 500 dan pesan error aman yang ramah pengguna
            if (!headers_sent()) {
                header('Content-Type: application/json; charset=UTF-8');
                http_response_code(500);
            }
            
            // Pesan error generik tanpa membocorkan detail server / stack trace database
            die(json_encode([
                "status" => "error",
                "message" => "Terjadi kesalahan koneksi sistem internal. Harap hubungi Administrator PGBP."
            ]));
        }

        return $this->conn;
    }
}
?>
