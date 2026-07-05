export interface User {
  id: number;
  nama: string;
  username: string;
  email: string;
  role: 'Bendahara Pusat' | 'Admin Wilayah';
  wilayah_id: number | null;
  status: 'Pending' | 'Approved' | 'Suspended';
  foto: string;
  last_login: string | null;
  created_at: string;
}

export interface Wilayah {
  id: number;
  kode: string;
  nama_wilayah: string;
  jumlah_gereja: number;
  jumlah_jiwa: number;
  ketua: string;
  alamat: string;
  telepon: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface Gereja {
  id: number;
  wilayah_id: number;
  kode_gereja: string;
  nama_gereja: string;
  gembala: string;
  jumlah_jiwa: number;
  alamat: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface Pembayaran {
  id: number;
  gereja_id: number;
  bulan: number;
  tahun: number;
  jumlah_jiwa: number;
  iuran_per_jiwa: number;
  total_iuran: number;
  tanggal_transfer: string;
  bank: string;
  nomor_referensi: string;
  bukti_transfer: string;
  status: 'Pending' | 'Verified' | 'Rejected' | 'Revision';
  catatan: string | null;
  created_at: string;
}

export interface Verifikasi {
  id: number;
  pembayaran_id: number;
  admin_id: number;
  status: 'Verified' | 'Rejected' | 'Revision';
  catatan: string | null;
  tanggal: string;
}

export interface AuditTrail {
  id: number;
  user_id: number | null;
  username: string;
  aktivitas: string;
  ip_address: string;
  browser: string;
  created_at: string;
}
