import { User, Wilayah, Gereja, Pembayaran, AuditTrail } from './types';

export const INITIAL_WILAYAH: Wilayah[] = [
  { id: 1, kode: 'WIL-01', nama_wilayah: 'Wilayah Toli', jumlah_gereja: 5, jumlah_jiwa: 2350, ketua: 'Pdt. Markus Kogoya, S.Th', alamat: 'Jl. Trans Papua, Karubaga', telepon: '081234567001', status: 'Aktif' },
  { id: 2, kode: 'WIL-02', nama_wilayah: 'Wilayah Yamo', jumlah_gereja: 4, jumlah_jiwa: 1850, ketua: 'Pdt. Zakarias Weya, M.Th', alamat: 'Jl. Irian, Mulia, Puncak Jaya', telepon: '081234567002', status: 'Aktif' },
  { id: 3, kode: 'WIL-03', nama_wilayah: 'Wilayah Tiom', jumlah_gereja: 4, jumlah_jiwa: 2100, ketua: 'Pdt. Simon Yoman, M.Div', alamat: 'Jl. Utama Tiom, Lanny Jaya', telepon: '081234567003', status: 'Aktif' },
  { id: 4, kode: 'WIL-04', nama_wilayah: 'Wilayah Wamena', jumlah_gereja: 3, jumlah_jiwa: 1450, ketua: 'Pdt. Lukas Karoba, S.Th', alamat: 'Jl. Bhayangkara No. 45, Wamena', telepon: '081234567004', status: 'Aktif' },
  { id: 5, kode: 'WIL-05', nama_wilayah: 'Wilayah Jayapura', jumlah_gereja: 4, jumlah_jiwa: 2800, ketua: 'Pdt. John Wenda, D.Th', alamat: 'Jl. Raya Sentani Km. 18, Jayapura', telepon: '081234567005', status: 'Aktif' },
  { id: 6, kode: 'WIL-06', nama_wilayah: 'Wilayah Nabire', jumlah_gereja: 3, jumlah_jiwa: 1200, ketua: 'Pdt. Elia Tabuni, S.Th', alamat: 'Jl. Merdeka No. 12, Nabire', telepon: '081234567006', status: 'Aktif' },
  { id: 7, kode: 'WIL-07', nama_wilayah: 'Wilayah Mimika', jumlah_gereja: 3, jumlah_jiwa: 1350, ketua: 'Pdt. Samuel Jigibalom, M.Min', alamat: 'Jl. Timika Indah, Mimika', telepon: '081234567007', status: 'Aktif' },
  { id: 8, kode: 'WIL-08', nama_wilayah: 'Wilayah Yahukimo', jumlah_gereja: 3, jumlah_jiwa: 1600, ketua: 'Pdt. Barnabas Karoba, S.Th', alamat: 'Jl. Dekai Baru, Yahukimo', telepon: '081234567008', status: 'Aktif' },
  { id: 9, kode: 'WIL-09', nama_wilayah: 'Wilayah Bokondini', jumlah_gereja: 3, jumlah_jiwa: 1100, ketua: 'Pdt. Yusuf Pagawak, S.Th', alamat: 'Jl. Lembah Bokondini, Tolikara', telepon: '081234567009', status: 'Aktif' },
  { id: 10, kode: 'WIL-10', nama_wilayah: 'Wilayah Gamelia', jumlah_gereja: 2, jumlah_jiwa: 950, ketua: 'Pdt. Daniel Jikwa, M.Th', alamat: 'Jl. Gamelia Raya, Lanny Jaya', telepon: '081234567010', status: 'Aktif' },
  { id: 11, kode: 'WIL-11', nama_wilayah: 'Wilayah Ilaga', jumlah_gereja: 2, jumlah_jiwa: 850, ketua: 'Pdt. Gideon Murib, S.Th', alamat: 'Jl. Pegunungan Tengah, Ilaga, Puncak', telepon: '081234567011', status: 'Aktif' },
  { id: 12, kode: 'WIL-12', nama_wilayah: 'Wilayah Kuyawage', jumlah_gereja: 2, jumlah_jiwa: 900, ketua: 'Pdt. Abraham Kogoya, S.Th', alamat: 'Jl. Utama Kuyawage, Lanny Jaya', telepon: '081234567012', status: 'Aktif' },
  { id: 13, kode: 'WIL-13', nama_wilayah: 'Wilayah Mapnduma', jumlah_gereja: 2, jumlah_jiwa: 750, ketua: 'Pdt. Philemon Gwijangge, S.Th', alamat: 'Jl. Lembah Mapnduma, Nduga', telepon: '081234567013', status: 'Aktif' },
  { id: 14, kode: 'WIL-14', nama_wilayah: 'Wilayah Kembu', jumlah_gereja: 2, jumlah_jiwa: 800, ketua: 'Pdt. Silas Wenda, S.Th', alamat: 'Jl. Poros Kembu, Tolikara', telepon: '081234567014', status: 'Aktif' },
  { id: 15, kode: 'WIL-15', nama_wilayah: 'Wilayah Konda', jumlah_gereja: 2, jumlah_jiwa: 700, ketua: 'Pdt. Nehemia Jikwa, S.Th', alamat: 'Jl. Trans Konda, Sorong Selatan', telepon: '081234567015', status: 'Aktif' },
  { id: 16, kode: 'WIL-16', nama_wilayah: 'Wilayah Merauke', jumlah_gereja: 2, jumlah_jiwa: 650, ketua: 'Pdt. Paul Kogoya, S.Th', alamat: 'Jl. Raya Mandala No. 88, Merauke', telepon: '081234567016', status: 'Aktif' },
  { id: 17, kode: 'WIL-17', nama_wilayah: 'Wilayah Sorong', jumlah_gereja: 2, jumlah_jiwa: 720, ketua: 'Pdt. Markus Weya, S.Th', alamat: 'Jl. Ahmad Yani No. 5, Sorong', telepon: '081234567017', status: 'Aktif' },
  { id: 18, kode: 'WIL-18', nama_wilayah: 'Wilayah Manokwari', jumlah_gereja: 2, jumlah_jiwa: 800, ketua: 'Pdt. Stephen Tabuni, S.Th', alamat: 'Jl. Siliwangi No. 10, Manokwari', telepon: '081234567018', status: 'Aktif' },
  { id: 19, kode: 'WIL-19', nama_wilayah: 'Wilayah Biak', jumlah_gereja: 2, jumlah_jiwa: 580, ketua: 'Pdt. Silas Gwijangge, S.Th', alamat: 'Jl. Imam Bonjol No. 34, Biak', telepon: '081234567019', status: 'Aktif' }
];

export const INITIAL_GEREJA: Gereja[] = [
  // Wilayah Toli
  { id: 1, wilayah_id: 1, kode_gereja: 'GER-0101', nama_gereja: 'Gereja Baptis Betania Karubaga', gembala: 'Pdt. Yusuf Kogoya, S.Th', jumlah_jiwa: 600, alamat: 'Jl. Trans Papua, Karubaga', status: 'Aktif' },
  { id: 2, wilayah_id: 1, kode_gereja: 'GER-0102', nama_gereja: 'Gereja Baptis Sion Karubaga', gembala: 'Pdt. Paul Wenda, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Lembah Hijau, Karubaga', status: 'Aktif' },
  { id: 3, wilayah_id: 1, kode_gereja: 'GER-0103', nama_gereja: 'Gereja Baptis Immanuel Goli', gembala: 'Ev. Daniel Karoba', jumlah_jiwa: 500, alamat: 'Kp. Goli, Distrik Karubaga', status: 'Aktif' },
  { id: 4, wilayah_id: 1, kode_gereja: 'GER-0104', nama_gereja: 'Gereja Baptis Efata Konda', gembala: 'Ev. Markus Weya', jumlah_jiwa: 400, alamat: 'Kp. Konda, Tolikara', status: 'Aktif' },
  { id: 5, wilayah_id: 1, kode_gereja: 'GER-0105', nama_gereja: 'Gereja Baptis Gibeon Gilime', gembala: 'Ev. Zakarias Kogoya', jumlah_jiwa: 400, alamat: 'Distrik Gilime, Tolikara', status: 'Aktif' },

  // Wilayah Yamo
  { id: 6, wilayah_id: 2, kode_gereja: 'GER-0201', nama_gereja: 'Gereja Baptis Yerusalem Mulia', gembala: 'Pdt. Abraham Weya, S.Th', jumlah_jiwa: 550, alamat: 'Jl. Irian, Mulia', status: 'Aktif' },
  { id: 7, wilayah_id: 2, kode_gereja: 'GER-0202', nama_gereja: 'Gereja Baptis Getsemani Mulia', gembala: 'Pdt. Lukas Tabuni, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Bandara Mulia, Puncak Jaya', status: 'Aktif' },
  { id: 8, wilayah_id: 2, kode_gereja: 'GER-0203', nama_gereja: 'Gereja Baptis Filadelfia Yamo', gembala: 'Ev. John Karoba', jumlah_jiwa: 450, alamat: 'Distrik Yamo, Puncak Jaya', status: 'Aktif' },
  { id: 9, wilayah_id: 2, kode_gereja: 'GER-0204', nama_gereja: 'Gereja Baptis Hosana Mewoluk', gembala: 'Ev. Simon Weya', jumlah_jiwa: 400, alamat: 'Kp. Mewoluk, Puncak Jaya', status: 'Aktif' },

  // Wilayah Tiom
  { id: 10, wilayah_id: 3, kode_gereja: 'GER-0301', nama_gereja: 'Gereja Baptis Betel Tiom', gembala: 'Pdt. Zakarias Wenda, M.Div', jumlah_jiwa: 650, alamat: 'Jl. Utama Tiom, Lanny Jaya', status: 'Aktif' },
  { id: 11, wilayah_id: 3, kode_gereja: 'GER-0302', nama_gereja: 'Gereja Baptis Sion Gamelia', gembala: 'Ev. Markus Kogoya', jumlah_jiwa: 500, alamat: 'Kp. Gamelia Lama, Lanny Jaya', status: 'Aktif' },
  { id: 12, wilayah_id: 3, kode_gereja: 'GER-0303', nama_gereja: 'Gereja Baptis Maranatha Pirime', gembala: 'Ev. Philemon Weya', jumlah_jiwa: 450, alamat: 'Distrik Pirime, Lanny Jaya', status: 'Aktif' },
  { id: 13, wilayah_id: 3, kode_gereja: 'GER-0304', nama_gereja: 'Gereja Baptis Getsemani Tiom', gembala: 'Pdt. Simon Kogoya, S.Th', jumlah_jiwa: 500, alamat: 'Jl. Baru No. 8, Tiom', status: 'Aktif' },

  // Wilayah Wamena
  { id: 14, wilayah_id: 4, kode_gereja: 'GER-0401', nama_gereja: 'Gereja Baptis Peniel Wamena', gembala: 'Pdt. Stephen Tabuni, S.Th', jumlah_jiwa: 550, alamat: 'Jl. Bhayangkara No. 45, Wamena', status: 'Aktif' },
  { id: 15, wilayah_id: 4, kode_gereja: 'GER-0402', nama_gereja: 'Gereja Baptis El-Shaddai Wamena', gembala: 'Pdt. Paul Karoba, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Hom-hom, Distrik Wamena', status: 'Aktif' },
  { id: 16, wilayah_id: 4, kode_gereja: 'GER-0403', nama_gereja: 'Gereja Baptis Sion Sinakma', gembala: 'Ev. Yusuf Weya', jumlah_jiwa: 450, alamat: 'Kp. Sinakma, Wamena', status: 'Aktif' },

  // Wilayah Jayapura
  { id: 17, wilayah_id: 5, kode_gereja: 'GER-0501', nama_gereja: 'Gereja Baptis Sion Sentani', gembala: 'Pdt. John Wenda, D.Th', jumlah_jiwa: 800, alamat: 'Jl. Raya Sentani Km. 18, Jayapura', status: 'Aktif' },
  { id: 18, wilayah_id: 5, kode_gereja: 'GER-0502', nama_gereja: 'Gereja Baptis Peniel Waena', gembala: 'Pdt. Markus Jikwa, M.Th', jumlah_jiwa: 700, alamat: 'Jl. Perumnas III, Waena, Jayapura', status: 'Aktif' },
  { id: 19, wilayah_id: 5, kode_gereja: 'GER-0503', nama_gereja: 'Gereja Baptis Yerusalem Abepura', gembala: 'Pdt. Silas Kogoya, S.Th', jumlah_jiwa: 650, alamat: 'Jl. Raya Abepura, Jayapura', status: 'Aktif' },
  { id: 20, wilayah_id: 5, kode_gereja: 'GER-0504', nama_gereja: 'Gereja Baptis Immanuel Koya', gembala: 'Ev. David Tabuni', jumlah_jiwa: 650, alamat: 'Distrik Muara Tami, Jayapura', status: 'Aktif' },

  // Wilayah Nabire
  { id: 21, wilayah_id: 6, kode_gereja: 'GER-0601', nama_gereja: 'Gereja Baptis Maranatha Nabire', gembala: 'Pdt. Elia Tabuni, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Merdeka No. 12, Nabire', status: 'Aktif' },
  { id: 22, wilayah_id: 6, kode_gereja: 'GER-0602', nama_gereja: 'Gereja Baptis Betania Kalibobo', gembala: 'Pdt. Paul Kogoya, S.Th', jumlah_jiwa: 350, alamat: 'Jl. Kalibobo Baru, Nabire', status: 'Aktif' },
  { id: 23, wilayah_id: 6, kode_gereja: 'GER-0603', nama_gereja: 'Gereja Baptis Sion Siriwini', gembala: 'Ev. Simon Wenda', jumlah_jiwa: 400, alamat: 'Jl. Pantai Siriwini, Nabire', status: 'Aktif' },

  // Wilayah Mimika
  { id: 24, wilayah_id: 7, kode_gereja: 'GER-0701', nama_gereja: 'Gereja Baptis Peniel Timika', gembala: 'Pdt. Samuel Jigibalom, M.Min', jumlah_jiwa: 500, alamat: 'Jl. Timika Indah, Mimika', status: 'Aktif' },
  { id: 25, wilayah_id: 7, kode_gereja: 'GER-0702', nama_gereja: 'Gereja Baptis Sion SP3', gembala: 'Pdt. Nehemia Karoba, S.Th', jumlah_jiwa: 400, alamat: 'Kp. SP 3, Distrik Kuala Kencana', status: 'Aktif' },
  { id: 26, wilayah_id: 7, kode_gereja: 'GER-0703', nama_gereja: 'Gereja Baptis Getsemani Pomako', gembala: 'Ev. Markus Weya', jumlah_jiwa: 450, alamat: 'Kp. Pomako, Mimika', status: 'Aktif' },

  // Wilayah Yahukimo
  { id: 27, wilayah_id: 8, kode_gereja: 'GER-0801', nama_gereja: 'Gereja Baptis Yerusalem Dekai', gembala: 'Pdt. Barnabas Karoba, S.Th', jumlah_jiwa: 600, alamat: 'Jl. Dekai Baru, Yahukimo', status: 'Aktif' },
  { id: 28, wilayah_id: 8, kode_gereja: 'GER-0802', nama_gereja: 'Gereja Baptis Betania Anggruk', gembala: 'Ev. Gideon Kogoya', jumlah_jiwa: 500, alamat: 'Kp. Anggruk Lama, Yahukimo', status: 'Aktif' },
  { id: 29, wilayah_id: 8, kode_gereja: 'GER-0803', nama_gereja: 'Gereja Baptis Maranatha Kurima', gembala: 'Ev. John Weya', jumlah_jiwa: 500, alamat: 'Kp. Kurima, Yahukimo', status: 'Aktif' },

  // Wilayah Bokondini
  { id: 30, wilayah_id: 9, kode_gereja: 'GER-0901', nama_gereja: 'Gereja Baptis Sion Bokondini', gembala: 'Pdt. Yusuf Pagawak, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Lembah Bokondini, Tolikara', status: 'Aktif' },
  { id: 31, wilayah_id: 9, kode_gereja: 'GER-0902', nama_gereja: 'Gereja Baptis Betel Kelila', gembala: 'Ev. Abraham Wenda', jumlah_jiwa: 350, alamat: 'Distrik Kelila, Tolikara', status: 'Aktif' },
  { id: 32, wilayah_id: 9, kode_gereja: 'GER-0903', nama_gereja: 'Gereja Baptis Peniel Bewani', gembala: 'Ev. David Jikwa', jumlah_jiwa: 300, alamat: 'Kp. Bewani, Bokondini', status: 'Aktif' },

  // Wilayah Gamelia
  { id: 33, wilayah_id: 10, kode_gereja: 'GER-1001', nama_gereja: 'Gereja Baptis Peniel Gamelia', gembala: 'Pdt. Daniel Jikwa, M.Th', jumlah_jiwa: 500, alamat: 'Jl. Gamelia Raya, Lanny Jaya', status: 'Aktif' },
  { id: 34, wilayah_id: 10, kode_gereja: 'GER-1002', nama_gereja: 'Gereja Baptis Yerusalem Gamelia', gembala: 'Ev. Elia Karoba', jumlah_jiwa: 450, alamat: 'Kp. Gamelia, Lanny Jaya', status: 'Aktif' },

  // Wilayah Ilaga
  { id: 35, wilayah_id: 11, kode_gereja: 'GER-1101', nama_gereja: 'Gereja Baptis El-Shaddai Ilaga', gembala: 'Pdt. Gideon Murib, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Pegunungan Tengah, Ilaga', status: 'Aktif' },
  { id: 36, wilayah_id: 11, kode_gereja: 'GER-1102', nama_gereja: 'Gereja Baptis Betania Sinak', gembala: 'Ev. Samuel Weya', jumlah_jiwa: 400, alamat: 'Kp. Sinak, Distrik Ilaga', status: 'Aktif' },

  // Wilayah Kuyawage
  { id: 37, wilayah_id: 12, kode_gereja: 'GER-1201', nama_gereja: 'Gereja Baptis Yerusalem Kuyawage', gembala: 'Pdt. Abraham Kogoya, S.Th', jumlah_jiwa: 500, alamat: 'Jl. Utama Kuyawage, Lanny Jaya', status: 'Aktif' },
  { id: 38, wilayah_id: 12, kode_gereja: 'GER-1202', nama_gereja: 'Gereja Baptis Sion Kuyawage', gembala: 'Ev. John Gwijangge', jumlah_jiwa: 400, alamat: 'Kp. Kuyawage Baru, Lanny Jaya', status: 'Aktif' },

  // Wilayah Mapnduma
  { id: 39, wilayah_id: 13, kode_gereja: 'GER-1301', nama_gereja: 'Gereja Baptis Peniel Mapnduma', gembala: 'Pdt. Philemon Gwijangge, S.Th', jumlah_jiwa: 400, alamat: 'Jl. Lembah Mapnduma, Nduga', status: 'Aktif' },
  { id: 40, wilayah_id: 13, kode_gereja: 'GER-1302', nama_gereja: 'Gereja Baptis Betel Mapnduma', gembala: 'Ev. Silas Weya', jumlah_jiwa: 350, alamat: 'Kp. Mapnduma, Nduga', status: 'Aktif' },

  // Wilayah Kembu
  { id: 41, wilayah_id: 14, kode_gereja: 'GER-1401', nama_gereja: 'Gereja Baptis Sion Kembu', gembala: 'Pdt. Silas Wenda, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Poros Kembu, Tolikara', status: 'Aktif' },
  { id: 42, wilayah_id: 14, kode_gereja: 'GER-1402', nama_gereja: 'Gereja Baptis Peniel Kembu', gembala: 'Ev. David Kogoya', jumlah_jiwa: 350, alamat: 'Kp. Kembu Raya, Tolikara', status: 'Aktif' },

  // Wilayah Konda
  { id: 43, wilayah_id: 15, kode_gereja: 'GER-1501', nama_gereja: 'Gereja Baptis Betania Konda', gembala: 'Pdt. Nehemia Jikwa, S.Th', jumlah_jiwa: 400, alamat: 'Jl. Trans Konda, Sorong Selatan', status: 'Aktif' },
  { id: 44, wilayah_id: 15, kode_gereja: 'GER-1502', nama_gereja: 'Gereja Baptis Sion Teminabuan', gembala: 'Ev. Stephen Tabuni', jumlah_jiwa: 300, alamat: 'Kp. Teminabuan, Sorong Selatan', status: 'Aktif' },

  // Wilayah Merauke
  { id: 45, wilayah_id: 16, kode_gereja: 'GER-1601', nama_gereja: 'Gereja Baptis Peniel Merauke', gembala: 'Pdt. Paul Kogoya, S.Th', jumlah_jiwa: 350, alamat: 'Jl. Raya Mandala No. 88, Merauke', status: 'Aktif' },
  { id: 46, wilayah_id: 16, kode_gereja: 'GER-1602', nama_gereja: 'Gereja Baptis Sion Tanah Miring', gembala: 'Ev. Yusuf Kogoya', jumlah_jiwa: 300, alamat: 'Kp. Tanah Miring, Merauke', status: 'Aktif' },

  // Wilayah Sorong
  { id: 47, wilayah_id: 17, kode_gereja: 'GER-1701', nama_gereja: 'Gereja Baptis Sion Sorong', gembala: 'Pdt. Markus Weya, S.Th', jumlah_jiwa: 400, alamat: 'Jl. Ahmad Yani No. 5, Sorong', status: 'Aktif' },
  { id: 48, wilayah_id: 17, kode_gereja: 'GER-1702', nama_gereja: 'Gereja Baptis Peniel Aimas', gembala: 'Ev. Gideon Kogoya', jumlah_jiwa: 320, alamat: 'Kp. Aimas Unit I, Sorong', status: 'Aktif' },

  // Wilayah Manokwari
  { id: 49, wilayah_id: 18, kode_gereja: 'GER-1801', nama_gereja: 'Gereja Baptis Peniel Manokwari', gembala: 'Pdt. Stephen Tabuni, S.Th', jumlah_jiwa: 450, alamat: 'Jl. Siliwangi No. 10, Manokwari', status: 'Aktif' },
  { id: 50, wilayah_id: 18, kode_gereja: 'GER-1802', nama_gereja: 'Gereja Baptis Sion Prafi', gembala: 'Ev. Daniel Karoba', jumlah_jiwa: 350, alamat: 'Kp. Prafi Baru, Manokwari', status: 'Aktif' },

  // Wilayah Biak
  { id: 51, wilayah_id: 19, kode_gereja: 'GER-1901', nama_gereja: 'Gereja Baptis Sion Biak', gembala: 'Pdt. Silas Gwijangge, S.Th', jumlah_jiwa: 300, alamat: 'Jl. Imam Bonjol No. 34, Biak', status: 'Aktif' },
  { id: 52, wilayah_id: 19, kode_gereja: 'GER-1902', nama_gereja: 'Gereja Baptis Peniel Biak Barat', gembala: 'Ev. John Kogoya', jumlah_jiwa: 280, alamat: 'Kp. Biak Barat, Biak Numfor', status: 'Aktif' }
];

export const INITIAL_USERS: User[] = [
  { id: 1, nama: 'Bendahara Pusat PGBP', username: 'bendahara', email: 'bendahara@pgbp.org', role: 'Bendahara Pusat', wilayah_id: null, status: 'Approved', foto: 'default-user.png', last_login: '2026-07-05 08:30:00', created_at: '2026-01-01 10:00:00' },
  { id: 2, nama: 'Admin Wilayah Toli', username: 'admintoli', email: 'admintoli@pgbp.org', role: 'Admin Wilayah', wilayah_id: 1, status: 'Approved', foto: 'default-user.png', last_login: '2026-07-05 08:45:00', created_at: '2026-01-02 11:00:00' },
  { id: 3, nama: 'Admin Wilayah Yamo', username: 'adminyamo', email: 'adminyamo@pgbp.org', role: 'Admin Wilayah', wilayah_id: 2, status: 'Approved', foto: 'default-user.png', last_login: '2026-07-04 15:20:00', created_at: '2026-01-03 12:00:00' },
  { id: 4, nama: 'Admin Wilayah Tiom', username: 'admintiom', email: 'admintiom@pgbp.org', role: 'Admin Wilayah', wilayah_id: 3, status: 'Approved', foto: 'default-user.png', last_login: '2026-07-03 09:15:00', created_at: '2026-01-04 13:00:00' }
];

export const INITIAL_PEMBAYARAN: Pembayaran[] = [
  { id: 1, gereja_id: 1, bulan: 5, tahun: 2026, jumlah_jiwa: 600, iuran_per_jiwa: 1000.00, total_iuran: 600000.00, tanggal_transfer: '2026-05-10', bank: 'Bank Papua', nomor_referensi: 'REF-20260510-001', bukti_transfer: 'bukti_ger_1_mei.png', status: 'Verified', catatan: 'Iuran Mei 2026 - Lunas diverifikasi', created_at: '2026-05-10 10:00:00' },
  { id: 2, gereja_id: 2, bulan: 5, tahun: 2026, jumlah_jiwa: 450, iuran_per_jiwa: 1000.00, total_iuran: 450000.00, tanggal_transfer: '2026-05-12', bank: 'Bank Papua', nomor_referensi: 'REF-20260512-002', bukti_transfer: 'bukti_ger_2_mei.png', status: 'Verified', catatan: 'Iuran Mei 2026 - Diverifikasi oleh pusat', created_at: '2026-05-12 11:30:00' },
  { id: 3, gereja_id: 6, bulan: 5, tahun: 2026, jumlah_jiwa: 550, iuran_per_jiwa: 1000.00, total_iuran: 550000.00, tanggal_transfer: '2026-05-11', bank: 'Bank Papua', nomor_referensi: 'REF-20260511-003', bukti_transfer: 'bukti_ger_6_mei.png', status: 'Verified', catatan: 'Pembayaran Yamo Mei lunas', created_at: '2026-05-11 09:15:00' },
  { id: 4, gereja_id: 10, bulan: 6, tahun: 2026, jumlah_jiwa: 650, iuran_per_jiwa: 1000.00, total_iuran: 650000.00, tanggal_transfer: '2026-06-05', bank: 'BRI', nomor_referensi: 'REF-20260605-004', bukti_transfer: 'bukti_ger_10_juni.png', status: 'Pending', catatan: 'Mohon segera diverifikasi untuk Bulan Juni', created_at: '2026-06-05 14:00:00' },
  { id: 5, gereja_id: 17, bulan: 5, tahun: 2026, jumlah_jiwa: 800, iuran_per_jiwa: 1000.00, total_iuran: 800000.00, tanggal_transfer: '2026-05-08', bank: 'Bank Papua', nomor_referensi: 'REF-20260508-005', bukti_transfer: 'bukti_ger_17_mei.png', status: 'Rejected', catatan: 'Jumlah transfer tidak sesuai nominal total iuran. Mohon upload ulang.', created_at: '2026-05-08 08:00:00' }
];

export const INITIAL_AUDIT: AuditTrail[] = [
  { id: 1, user_id: 1, username: 'bendahara', aktivitas: 'Login berhasil ke dashboard Bendahara Pusat', ip_address: '192.168.1.10', browser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0', created_at: '2026-07-05 08:30:00' },
  { id: 2, user_id: 2, username: 'admintoli', aktivitas: 'Login berhasil ke dashboard Admin Wilayah Toli', ip_address: '192.168.1.15', browser: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/120.0', created_at: '2026-07-05 08:45:00' },
  { id: 3, user_id: 2, username: 'admintoli', aktivitas: 'Melakukan input iuran bulanan untuk Gereja Betania Karubaga', ip_address: '192.168.1.15', browser: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Chrome/120.0', created_at: '2026-07-05 09:12:00' },
  { id: 4, user_id: 1, username: 'bendahara', aktivitas: 'Menyetujui verifikasi iuran pembayaran ID 1', ip_address: '192.168.1.10', browser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0', created_at: '2026-07-05 09:20:00' }
];
