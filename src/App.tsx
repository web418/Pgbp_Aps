import React, { useState, useEffect } from 'react';
import { 
  Users, Church, Wallet, CheckCircle, Clock, AlertTriangle, XCircle, 
  Search, ShieldAlert, Settings, Download, LogOut, Moon, Sun, 
  Menu, X, ChevronRight, FileText, Plus, Database, UserCheck, 
  Eye, RefreshCw, BarChart3, TrendingUp, Check, Filter, Printer, FileSpreadsheet
} from 'lucide-react';
import { User, Wilayah, Gereja, Pembayaran, AuditTrail } from './types';
import { INITIAL_WILAYAH, INITIAL_GEREJA, INITIAL_USERS, INITIAL_PEMBAYARAN, INITIAL_AUDIT } from './data';

export default function App() {
  // State manajemen lokal yang di-sinkronkan ke localStorage
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('pgbp_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  
  const [wilayahs, setWilayahs] = useState<Wilayah[]>(() => {
    const saved = localStorage.getItem('pgbp_wilayahs');
    return saved ? JSON.parse(saved) : INITIAL_WILAYAH;
  });

  const [gerejas, setGerejas] = useState<Gereja[]>(() => {
    const saved = localStorage.getItem('pgbp_gerejas');
    return saved ? JSON.parse(saved) : INITIAL_GEREJA;
  });

  const [pembayarans, setPembayarans] = useState<Pembayaran[]>(() => {
    const saved = localStorage.getItem('pgbp_pembayarans');
    return saved ? JSON.parse(saved) : INITIAL_PEMBAYARAN;
  });

  const [auditLogs, setAuditLogs] = useState<AuditTrail[]>(() => {
    const saved = localStorage.getItem('pgbp_audits');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT;
  });

  // Sinkronisasi ke localStorage setiap kali state berubah
  useEffect(() => {
    localStorage.setItem('pgbp_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('pgbp_wilayahs', JSON.stringify(wilayahs));
  }, [wilayahs]);
  useEffect(() => {
    localStorage.setItem('pgbp_gerejas', JSON.stringify(gerejas));
  }, [gerejas]);
  useEffect(() => {
    localStorage.setItem('pgbp_pembayarans', JSON.stringify(pembayarans));
  }, [pembayarans]);
  useEffect(() => {
    localStorage.setItem('pgbp_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Auth States
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pgbp_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // UI States
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pgbp_dark_mode');
    return saved === 'true';
  });

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Forms & Modals State
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('B9X2');
  const [authError, setAuthError] = useState('');

  // Register Form State
  const [regNama, setRegNama] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'Bendahara Pusat' | 'Admin Wilayah'>('Admin Wilayah');
  const [regWilayahId, setRegWilayahId] = useState<number>(1);
  const [regSuccess, setRegSuccess] = useState(false);

  // Input Iuran Form State
  const [formGerejaId, setFormGerejaId] = useState<number>(1);
  const [formBulan, setFormBulan] = useState<number>(7);
  const [formTahun, setFormTahun] = useState<number>(2026);
  const [formBank, setFormBank] = useState<string>('Bank Papua');
  const [formRef, setFormRef] = useState<string>('');
  const [formCatatan, setFormCatatan] = useState<string>('');
  const [formBuktiName, setFormBuktiName] = useState<string>('');
  const [formBuktiFile, setFormBuktiFile] = useState<string>('');

  // Verifikasi Form State
  const [selectedPembayaran, setSelectedPembayaran] = useState<Pembayaran | null>(null);
  const [verifikasiStatus, setVerifikasiStatus] = useState<'Verified' | 'Rejected' | 'Revision'>('Verified');
  const [verifikasiCatatan, setVerifikasiCatatan] = useState<string>('');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWilayah, setFilterWilayah] = useState<string>('all');
  const [filterGereja, setFilterGereja] = useState<string>('all');
  const [filterBulan, setFilterBulan] = useState<string>('all');
  const [filterTahun, setFilterTahun] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Input Gereja Baru State
  const [newGerejaNama, setNewGerejaNama] = useState('');
  const [newGerejaGembala, setNewGerejaGembala] = useState('');
  const [newGerejaJiwa, setNewGerejaJiwa] = useState<number>(100);
  const [newGerejaAlamat, setNewGerejaAlamat] = useState('');

  // Profile Edit State
  const [profileNama, setProfileNama] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  const [profileFoto, setProfileFoto] = useState('');

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Generate Captcha on mount
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, [authView]);

  // Log Audit Trail
  const addAuditLog = (activity: string, userId: number | null, username: string) => {
    const newLog: AuditTrail = {
      id: auditLogs.length + 1,
      user_id: userId,
      username: username,
      aktivitas: activity,
      ip_address: '182.253.140.231',
      browser: 'Chrome 126.0.0 / macOS Sonoma',
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (captchaInput.toUpperCase() !== captchaCode) {
      setAuthError('Captcha tidak sesuai! Periksa kembali kode captcha.');
      generateCaptcha();
      return;
    }

    const user = users.find(u => u.username === loginUsername);
    if (!user || loginPassword !== 'rahasia123') { // Simple pass for simulation
      setAuthError('Username atau Password salah!');
      return;
    }

    if (user.status === 'Pending') {
      setAuthError('Akun Anda masih menunggu verifikasi & approval Bendahara Pusat.');
      return;
    } else if (user.status === 'Suspended') {
      setAuthError('Akun Anda dinonaktifkan oleh Bendahara Pusat.');
      return;
    }

    // Success
    const updatedUser = { ...user, last_login: new Date().toISOString().replace('T', ' ').substring(0, 19) };
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    localStorage.setItem('pgbp_current_user', JSON.stringify(updatedUser));
    
    // Set Profile forms
    setProfileNama(updatedUser.nama);
    setProfileEmail(updatedUser.email);
    setProfileFoto(updatedUser.foto);

    addAuditLog(`Login berhasil ke sistem sebagai ${user.role}`, user.id, user.username);
    triggerToast(`Selamat datang kembali, ${user.nama}!`, 'success');
  };

  // Register Handler
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (users.some(u => u.username === regUsername)) {
      setAuthError('Username sudah digunakan!');
      return;
    }
    if (users.some(u => u.email === regEmail)) {
      setAuthError('Email sudah terdaftar!');
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      nama: regNama,
      username: regUsername,
      email: regEmail,
      role: regRole,
      wilayah_id: regRole === 'Bendahara Pusat' ? null : regWilayahId,
      status: 'Pending',
      foto: 'default-user.png',
      last_login: null,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setUsers(prev => [...prev, newUser]);
    addAuditLog(`Registrasi akun baru (${regUsername}) menunggu approval`, null, regUsername);
    setRegSuccess(true);
  };

  // Logout Handler
  const handleLogout = () => {
    if (currentUser) {
      addAuditLog(`Pengguna ${currentUser.username} logout dari sistem`, currentUser.id, currentUser.username);
    }
    setCurrentUser(null);
    localStorage.removeItem('pgbp_current_user');
    setActiveTab('dashboard');
    triggerToast('Anda berhasil logout.', 'info');
  };

  // Get active user's region
  const userRegion = currentUser?.wilayah_id ? wilayahs.find(w => w.id === currentUser.wilayah_id) : null;

  // Global calculations
  const filteredGerejas = gerejas.filter(g => {
    if (currentUser?.role === 'Admin Wilayah') {
      return g.wilayah_id === currentUser.wilayah_id;
    }
    if (filterWilayah !== 'all') {
      return g.wilayah_id === parseInt(filterWilayah);
    }
    return true;
  });

  const totalJiwaPusat = wilayahs.reduce((sum, w) => sum + w.jumlah_jiwa, 0);
  const totalChurchesPusat = gerejas.length;
  const totalRegions = wilayahs.length;

  const totalJiwaWilayah = userRegion ? gerejas.filter(g => g.wilayah_id === userRegion.id).reduce((sum, g) => sum + g.jumlah_jiwa, 0) : 0;
  const totalChurchesWilayah = userRegion ? gerejas.filter(g => g.wilayah_id === userRegion.id).length : 0;

  // Filtered Payments
  const displayPayments = pembayarans.filter(p => {
    const g = gerejas.find(gr => gr.id === p.gereja_id);
    if (!g) return false;

    // Role checks
    if (currentUser?.role === 'Admin Wilayah' && g.wilayah_id !== currentUser.wilayah_id) {
      return false;
    }

    // Search query
    const searchMatch = g.nama_gereja.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.nomor_referensi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.bank.toLowerCase().includes(searchQuery.toLowerCase());

    // Filters
    const wMatch = filterWilayah === 'all' || g.wilayah_id === parseInt(filterWilayah);
    const gMatch = filterGereja === 'all' || p.gereja_id === parseInt(filterGereja);
    const bMatch = filterBulan === 'all' || p.bulan === parseInt(filterBulan);
    const tMatch = filterTahun === 'all' || p.tahun === parseInt(filterTahun);
    const sMatch = filterStatus === 'all' || p.status === filterStatus;

    return searchMatch && wMatch && gMatch && bMatch && tMatch && sMatch;
  });

  // Calculate payment stats
  const totalIuranDiterima = pembayarans.filter(p => p.status === 'Verified').reduce((sum, p) => sum + p.total_iuran, 0);
  const totalIuranPending = pembayarans.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.total_iuran, 0);
  
  // Dashboard Toli/Region Dues status
  const currentMonth = 6; // Juni
  const currentYear = 2026;

  // Input Iuran Handler
  const handleInputIuran = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBuktiName) {
      triggerToast('Anda harus mengunggah bukti transfer!', 'error');
      return;
    }

    const targetGereja = gerejas.find(g => g.id === formGerejaId);
    if (!targetGereja) return;

    // Check if payment already exists for this church, month, year
    const exists = pembayarans.some(p => p.gereja_id === formGerejaId && p.bulan === formBulan && p.tahun === formTahun);
    if (exists) {
      triggerToast('Iuran untuk gereja, bulan, dan tahun tersebut sudah pernah diinput!', 'error');
      return;
    }

    const totalCalculated = targetGereja.jumlah_jiwa * 1000;
    const paymentRef = formRef || `REF-${formTahun}${String(formBulan).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: Pembayaran = {
      id: pembayarans.length + 1,
      gereja_id: formGerejaId,
      bulan: formBulan,
      tahun: formTahun,
      jumlah_jiwa: targetGereja.jumlah_jiwa,
      iuran_per_jiwa: 1000,
      total_iuran: totalCalculated,
      tanggal_transfer: new Date().toISOString().split('T')[0],
      bank: formBank,
      nomor_referensi: paymentRef,
      bukti_transfer: formBuktiName,
      status: 'Pending',
      catatan: formCatatan || null,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setPembayarans(prev => [newPayment, ...prev]);
    addAuditLog(`Menambahkan iuran pending untuk ${targetGereja.nama_gereja} senilai Rp ${totalCalculated.toLocaleString('id-ID')}`, currentUser?.id || null, currentUser?.username || 'system');
    triggerToast('Iuran berhasil diinput! Menunggu verifikasi Bendahara Pusat.', 'success');
    
    // Reset Form
    setFormRef('');
    setFormCatatan('');
    setFormBuktiName('');
    setActiveTab('iuran');
  };

  // Verification Decision Handler
  const handleVerifikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPembayaran) return;

    const targetGereja = gerejas.find(g => g.id === selectedPembayaran.gereja_id);

    const updatedPembayaran = pembayarans.map(p => {
      if (p.id === selectedPembayaran.id) {
        return {
          ...p,
          status: verifikasiStatus,
          catatan: verifikasiCatatan || (verifikasiStatus === 'Verified' ? 'Diverifikasi sukses oleh pusat.' : 'Pembayaran ditolak/revisi.')
        };
      }
      return p;
    });

    setPembayarans(updatedPembayaran);
    addAuditLog(`Verifikasi iuran ${targetGereja?.nama_gereja || ''}: ${verifikasiStatus} dengan catatan: "${verifikasiCatatan}"`, currentUser?.id || null, currentUser?.username || 'system');
    triggerToast(`Iuran berhasil diubah ke status: ${verifikasiStatus}`, 'success');
    setSelectedPembayaran(null);
    setVerifikasiCatatan('');
  };

  // Add Church Handler
  const handleAddGereja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.wilayah_id) return;

    const kodeNew = `GER-${String(currentUser.wilayah_id).padStart(2, '0')}${String(gerejas.length + 1).padStart(2, '0')}`;
    const newG: Gereja = {
      id: gerejas.length + 1,
      wilayah_id: currentUser.wilayah_id,
      kode_gereja: kodeNew,
      nama_gereja: newGerejaNama,
      gembala: newGerejaGembala,
      jumlah_jiwa: Number(newGerejaJiwa),
      alamat: newGerejaAlamat,
      status: 'Aktif'
    };

    setGerejas(prev => [...prev, newG]);
    
    // Update jumlah_gereja & jumlah_jiwa in Wilayah array
    setWilayahs(prev => prev.map(w => {
      if (w.id === currentUser.wilayah_id) {
        return {
          ...w,
          jumlah_gereja: w.jumlah_gereja + 1,
          jumlah_jiwa: w.jumlah_jiwa + Number(newGerejaJiwa)
        };
      }
      return w;
    }));

    addAuditLog(`Menambahkan gereja baru: ${newGerejaNama} (Gembala: ${newGerejaGembala})`, currentUser.id, currentUser.username);
    triggerToast(`Gereja ${newGerejaNama} berhasil ditambahkan!`, 'success');
    
    // Reset form
    setNewGerejaNama('');
    setNewGerejaGembala('');
    setNewGerejaJiwa(100);
    setNewGerejaAlamat('');
    setActiveTab('gereja');
  };

  // Edit Profile Handler
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      nama: profileNama,
      email: profileEmail,
      foto: profileFoto || currentUser.foto
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    localStorage.setItem('pgbp_current_user', JSON.stringify(updatedUser));

    addAuditLog('Memperbarui informasi profil pengguna', currentUser.id, currentUser.username);
    triggerToast('Profil Anda berhasil diperbarui!', 'success');
  };

  // User Approval (Bendahara Pusat Only)
  const handleApproveUser = (userId: number, action: 'Approved' | 'Suspended') => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: action };
      }
      return u;
    }));
    const userObj = users.find(u => u.id === userId);
    addAuditLog(`Mengubah status user ${userObj?.username} menjadi ${action}`, currentUser?.id || null, currentUser?.username || 'system');
    triggerToast(`User ${userObj?.nama} berhasil ${action === 'Approved' ? 'disetujui' : 'ditangguhkan'}.`, 'success');
  };

  // Generate Dummy file upload simulation
  const simulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        triggerToast('Ukuran file melebihi 2MB!', 'error');
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        triggerToast('Format file tidak didukung! Hanya JPEG, PNG, dan PDF.', 'error');
        return;
      }
      setFormBuktiName(file.name);
      setFormBuktiFile(URL.createObjectURL(file));
      triggerToast(`File ${file.name} berhasil diunggah!`, 'success');
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Toast Notification */}
      {toast && (
        <div id="global-toast" className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all transform duration-300 translate-y-0 ${
          toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
          toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
          'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
        } backdrop-blur-md animate-bounce`}>
          {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {toast.type === 'error' && <XCircle className="w-5 h-5" />}
          {toast.type === 'info' && <Clock className="w-5 h-5" />}
          <p className="font-medium text-sm">{toast.message}</p>
        </div>
      )}

      {/* Auth Screen (Login / Register / Forgot Password) */}
      {!currentUser ? (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-950">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 sm:p-10 relative">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                <Church className="w-10 h-10" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">MONITORING IURAN BULANAN</h1>
              <p className="text-xs text-indigo-300 font-semibold tracking-widest mt-1 uppercase">PGBP PAPUA</p>
            </div>

            {authError && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authView === 'login' && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username</label>
                  <input 
                    type="text" 
                    required
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                    placeholder="Masukkan username (e.g. bendahara)" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Petunjuk: Gunakan username <strong className="text-indigo-300">bendahara</strong> (Pusat) atau <strong className="text-indigo-300">admintoli</strong> (Wilayah)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                  <input 
                    type="password" 
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Masukkan password" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Password Simulasi default: <strong className="text-indigo-300">rahasia123</strong></span>
                </div>

                {/* Captcha */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Captcha</label>
                    <input 
                      type="text" 
                      required
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      placeholder="Input kode" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-center font-bold tracking-widest"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 font-bold tracking-widest text-lg select-none">
                      <span className="italic line-through decoration-indigo-500/60">{captchaCode}</span>
                      <button type="button" onClick={generateCaptcha} className="text-slate-400 hover:text-white transition">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mt-2">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500" 
                    />
                    <span>Remember Me</span>
                  </label>
                  <button type="button" onClick={() => setAuthView('forgot')} className="text-indigo-400 hover:underline">Lupa Password?</button>
                </div>

                <button type="submit" className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 mt-4">
                  Masuk ke Aplikasi
                </button>

                <p className="text-center text-xs text-slate-400 mt-6">
                  Belum memiliki akun Admin Wilayah?{' '}
                  <button type="button" onClick={() => setAuthView('register')} className="text-indigo-400 hover:underline font-semibold">Registrasi Sekarang</button>
                </p>
              </form>
            )}

            {authView === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                {regSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Clock className="w-12 h-12 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Registrasi Berhasil Diajukan</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Akun Anda berhasil didaftarkan dan berada dalam antrean. Hubungi Bendahara Pusat untuk melakukan approval status pendaftaran Anda.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => { setRegSuccess(false); setAuthView('login'); }} 
                      className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition"
                    >
                      Kembali ke Login
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        value={regNama}
                        onChange={e => setRegNama(e.target.value)}
                        placeholder="Nama lengkap Anda" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Username</label>
                      <input 
                        type="text" 
                        required
                        value={regUsername}
                        onChange={e => setRegUsername(e.target.value)}
                        placeholder="Pilih username unik" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Alamat Email</label>
                      <input 
                        type="email" 
                        required
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="email@pgbp.org" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
                      <input 
                        type="password" 
                        required
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="Pilih password kuat" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Role Akses</label>
                        <select 
                          value={regRole} 
                          onChange={e => setRegRole(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                        >
                          <option value="Admin Wilayah">Admin Wilayah</option>
                          <option value="Bendahara Pusat">Bendahara Pusat</option>
                        </select>
                      </div>
                      {regRole === 'Admin Wilayah' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Delegasi Wilayah</label>
                          <select 
                            value={regWilayahId} 
                            onChange={e => setRegWilayahId(parseInt(e.target.value))}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                          >
                            {wilayahs.map(w => (
                              <option key={w.id} value={w.id}>{w.nama_wilayah}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg transition mt-4">
                      Daftar Akun Baru
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                      Sudah memiliki akun?{' '}
                      <button type="button" onClick={() => setAuthView('login')} className="text-indigo-400 hover:underline font-semibold">Login</button>
                    </p>
                  </>
                )}
              </form>
            )}

            {authView === 'forgot' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white text-center">Lupa Password?</h3>
                <p className="text-slate-300 text-xs text-center leading-relaxed">
                  Masukkan email terdaftar Anda. Sistem akan mengirimkan tautan instruksi penyetelan ulang sandi.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="Masukkan email Anda" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
                <button type="button" onClick={() => { triggerToast('Tautan reset password berhasil dikirim ke email!', 'info'); setAuthView('login'); }} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg transition">
                  Kirim Instruksi Reset
                </button>
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setAuthView('login')} className="text-xs text-slate-400 hover:text-white hover:underline">Kembali ke Login</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* App Layout (Header + Sidebar + Dynamic Views) */
        <div className="flex h-screen overflow-hidden">
          
          {/* Sidebar Left */}
          <aside className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col ${
            sidebarOpen ? 'w-64' : 'w-20'
          } lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* Header Sidebar */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
                  <Church className="w-5 h-5" />
                </div>
                {sidebarOpen && (
                  <div className="flex flex-col">
                    <span className="font-bold text-white leading-tight tracking-tight text-xs">PGBP MONITORING</span>
                    <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Iuran Wajib</span>
                  </div>
                )}
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition">
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Block */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center border-2 border-indigo-500/30">
                  {currentUser.nama.charAt(0)}
                </div>
                {sidebarOpen && (
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{currentUser.nama}</h4>
                    <p className="text-[10px] text-emerald-400 font-semibold">{currentUser.role}</p>
                    {currentUser.role === 'Admin Wilayah' && userRegion && (
                      <p className="text-[9px] text-indigo-300 truncate font-semibold mt-0.5">{userRegion.nama_wilayah}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
              
              {/* Dashboard Nav */}
              <button 
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>Dashboard {currentUser.role === 'Bendahara Pusat' ? 'Nasional' : 'Wilayah'}</span>}
              </button>

              {/* Master Wilayah - Pusat Only */}
              {currentUser.role === 'Bendahara Pusat' && (
                <button 
                  onClick={() => { setActiveTab('wilayah'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'wilayah' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span>Master Wilayah</span>}
                </button>
              )}

              {/* Gereja */}
              <button 
                onClick={() => { setActiveTab('gereja'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === 'gereja' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Church className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>Data Gereja {currentUser.role === 'Admin Wilayah' ? 'Wilayah' : ''}</span>}
              </button>

              {/* Input Iuran - Wilayah Only */}
              {currentUser.role === 'Admin Wilayah' && (
                <button 
                  onClick={() => { setActiveTab('input-iuran'); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                    activeTab === 'input-iuran' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span>Input Iuran Bulanan</span>}
                </button>
              )}

              {/* Riwayat / Pembayaran */}
              <button 
                onClick={() => { setActiveTab('iuran'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === 'iuran' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>{currentUser.role === 'Bendahara Pusat' ? 'Verifikasi Iuran' : 'Riwayat Pembayaran'}</span>}
              </button>

              {/* Laporan */}
              <button 
                onClick={() => { setActiveTab('laporan'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === 'laporan' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>Laporan {currentUser.role === 'Bendahara Pusat' ? 'Nasional' : 'Wilayah'}</span>}
              </button>

              {/* Master Users & Approval - Pusat Only */}
              {currentUser.role === 'Bendahara Pusat' && (
                <>
                  <button 
                    onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span>Approval & User</span>}
                  </button>

                  <button 
                    onClick={() => { setActiveTab('audit'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      activeTab === 'audit' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span>Audit Trail Logs</span>}
                  </button>

                  <button 
                    onClick={() => { setActiveTab('setting'); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      activeTab === 'setting' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Database className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span>Sistem & Backup</span>}
                  </button>
                </>
              )}

              {/* Profile - All Roles */}
              <button 
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>Profil Pengguna</span>}
              </button>

            </nav>

            {/* Footer Sidebar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
              <button onClick={handleLogout} className="w-full flex items-center gap-3.5 px-3 py-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition font-semibold text-xs">
                <LogOut className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span>Keluar Sistem</span>}
              </button>
            </div>

          </aside>

          {/* Main App Block */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header / Navbar */}
            <header className={`h-16 flex items-center justify-between px-6 border-b transition-colors duration-300 ${
              darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            } backdrop-blur-md z-30`}>
              
              <div className="flex items-center gap-4">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden sm:flex flex-col">
                  <h2 className="text-sm font-bold leading-none">Sistem Monitoring Iuran Wajib</h2>
                  <p className="text-[10px] text-slate-500 mt-1 font-semibold">PGBP - Persekutuan Gereja-Gereja Baptis Papua</p>
                </div>
              </div>

              {/* Top Bar Actions */}
              <div className="flex items-center gap-4">
                
                {/* Theme toggle */}
                <button 
                  onClick={() => { setDarkMode(!darkMode); localStorage.setItem('pgbp_dark_mode', String(!darkMode)); }} 
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    darkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Database Quick indicator */}
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  CONNECTED
                </span>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold hidden sm:inline-block">{currentUser.nama}</span>
                </div>

              </div>

            </header>

            {/* Main scrollable view panel */}
            <main className="flex-1 overflow-y-auto p-6">
              
              {/* VIEW: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* Top Welcome Title */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-xl">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Syalom, {currentUser.nama}!</h1>
                      <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
                        {currentUser.role === 'Bendahara Pusat' 
                          ? 'Selamat datang di Dashboard Pusat PGBP. Monitor statistik real-time 19 Wilayah Papua.'
                          : `Selamat datang di Dashboard Admin Wilayah. Kelola gereja dan input iuran berkala untuk ${userRegion?.nama_wilayah || ''}.`
                        }
                      </p>
                    </div>
                    {currentUser.role === 'Admin Wilayah' && (
                      <button onClick={() => setActiveTab('input-iuran')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold rounded-xl text-xs shadow-lg transition-all transform hover:scale-[1.02]">
                        <Plus className="w-4 h-4" />
                        Input Iuran Baru
                      </button>
                    )}
                  </div>

                  {/* KARTU STATISTIK UTAMA (DASHBOARD) */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="p-5 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-md flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Jiwa</p>
                        <h3 className="text-base sm:text-lg font-extrabold">{currentUser.role === 'Bendahara Pusat' ? totalJiwaPusat.toLocaleString() : totalJiwaWilayah.toLocaleString()}</h3>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-md flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-sky-500/10 text-sky-500">
                        <Church className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Gereja</p>
                        <h3 className="text-base sm:text-lg font-extrabold">{currentUser.role === 'Bendahara Pusat' ? totalChurchesPusat : totalChurchesWilayah}</h3>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-md flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Sudah Verifikasi</p>
                        <h3 className="text-base sm:text-lg font-extrabold text-emerald-500">Rp {totalIuranDiterima.toLocaleString('id-ID')}</h3>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-md flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Menunggu Verifikasi</p>
                        <h3 className="text-base sm:text-lg font-extrabold text-amber-500">Rp {totalIuranPending.toLocaleString('id-ID')}</h3>
                      </div>
                    </div>

                  </div>

                  {/* VISUALISASI GRAFIK & STATISTIK DAERAH */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Grafik Bulanan */}
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold tracking-tight">Tren Iuran Masuk (2026)</h3>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2 py-0.5 rounded-full">Bulanan</span>
                      </div>
                      
                      {/* Custom SVG Chart Bar Graph */}
                      <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 px-2 border-b border-slate-800">
                        {[
                          { m: 'Jan', val: 1200000, active: false },
                          { m: 'Feb', val: 1500000, active: false },
                          { m: 'Mar', val: 1900000, active: false },
                          { m: 'Apr', val: 2400000, active: false },
                          { m: 'Mei', val: 1600000, active: true },
                          { m: 'Jun', val: 650000, active: false },
                          { m: 'Jul', val: 0, active: false }
                        ].map((item, idx) => {
                          const heightPct = item.val > 0 ? (item.val / 2500000) * 100 : 2;
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                              <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 p-1 rounded -translate-y-1">
                                Rp{(item.val/1000).toLocaleString('id-ID')}k
                              </div>
                              <div 
                                style={{ height: `${heightPct}%` }}
                                className={`w-full rounded-t-lg transition-all duration-500 hover:scale-x-105 ${
                                  item.active 
                                    ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' 
                                    : 'bg-indigo-400/40 hover:bg-indigo-400'
                                }`}
                              ></div>
                              <span className="text-[10px] font-bold text-slate-500">{item.m}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Persentase Kepatuhan */}
                    <div className="p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold tracking-tight mb-4">Statistik Kepatuhan</h3>
                        <div className="flex items-center justify-center py-6">
                          {/* Circle Progress */}
                          <div className="relative w-36 h-36 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" className="stroke-slate-800" strokeWidth="8" fill="transparent" />
                              <circle cx="50" cy="50" r="40" className="stroke-indigo-500" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="75.36" fill="transparent" strokeLinecap="round" />
                            </svg>
                            <div className="absolute text-center">
                              <span className="text-2xl font-extrabold">70%</span>
                              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sudah Bayar</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Verified Churches</span>
                          <span className="font-bold text-emerald-500">3 / 52 Gereja</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Pending Verification</span>
                          <span className="font-bold text-amber-500">1 Gereja</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span>Belum Bayar Bulan Ini</span>
                          <span className="font-bold text-rose-500">48 Gereja</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* RIWAYAT AKTIVITAS TERBARU & DAFTAR QUICK ACTION */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Riwayat Log Aktivitas */}
                    <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                      <h3 className="text-sm font-bold tracking-tight mb-4">Aktivitas Sistem Terbaru</h3>
                      <div className="space-y-4">
                        {auditLogs.slice(0, 4).map((log) => (
                          <div key={log.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-800/10 transition border border-transparent hover:border-slate-800/30">
                            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0 self-start">
                              <Users className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-300 font-semibold leading-relaxed">{log.aktivitas}</p>
                              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-semibold">
                                <span>User: <strong className="text-slate-400">@{log.username}</strong></span>
                                <span>•</span>
                                <span>{log.created_at}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-4">
                      <h3 className="text-sm font-bold tracking-tight">Aksi Cepat</h3>
                      <div className="grid grid-cols-1 gap-2.5">
                        {currentUser.role === 'Bendahara Pusat' ? (
                          <>
                            <button onClick={() => setActiveTab('wilayah')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Lihat Master Wilayah</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => setActiveTab('iuran')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Periksa Antrean Iuran</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => setActiveTab('users')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Approval Akun Baru</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => setActiveTab('input-iuran')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Input Iuran Baru</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => setActiveTab('gereja')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Lihat Daftar Gereja</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => setActiveTab('laporan')} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-indigo-600 hover:text-white border border-slate-800 text-xs transition font-semibold">
                              <span>Ekspor Laporan Wilayah</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* VIEW: MASTER WILAYAH */}
              {activeTab === 'wilayah' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">Master Data Wilayah</h1>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">Kelola 19 Wilayah Persekutuan Gereja-Gereja Baptis Papua</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Kode</th>
                          <th className="px-6 py-4">Nama Wilayah</th>
                          <th className="px-6 py-4">Ketua Wilayah</th>
                          <th className="px-6 py-4 text-center">Gereja</th>
                          <th className="px-6 py-4 text-center">Jumlah Jiwa</th>
                          <th className="px-6 py-4">Kontak</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {wilayahs.map(w => (
                          <tr key={w.id} className="hover:bg-slate-800/10">
                            <td className="px-6 py-4 font-bold text-indigo-400">{w.kode}</td>
                            <td className="px-6 py-4 font-bold text-white">{w.nama_wilayah}</td>
                            <td className="px-6 py-4 font-semibold">{w.ketua}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-300">{w.jumlah_gereja}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-300">{w.jumlah_jiwa.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-400">{w.telepon}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                w.status === 'Aktif' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                              }`}>
                                {w.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: DATA GEREJA */}
              {activeTab === 'gereja' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">Daftar Jemaat Gereja</h1>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">Data Jemaat dan Gembala Per Wilayah PGBP</p>
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="Cari gereja / gembala..." 
                          className="pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs w-full placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      
                      {currentUser.role === 'Admin Wilayah' && (
                        <button onClick={() => {
                          setNewGerejaNama('');
                          setNewGerejaGembala('');
                          setNewGerejaJiwa(100);
                          setNewGerejaAlamat('');
                          setActiveTab('tambah-gereja');
                        }} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition">
                          <Plus className="w-4 h-4" />
                          Tambah Gereja
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Filter for Pusat only */}
                  {currentUser.role === 'Bendahara Pusat' && (
                    <div className="p-4 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md flex flex-wrap gap-4 items-center">
                      <Filter className="w-4 h-4 text-indigo-400" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400">Filter Wilayah:</span>
                        <select 
                          value={filterWilayah}
                          onChange={e => setFilterWilayah(e.target.value)}
                          className="bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-1.5 focus:outline-none"
                        >
                          <option value="all">Semua Wilayah</option>
                          {wilayahs.map(w => (
                            <option key={w.id} value={w.id}>{w.nama_wilayah}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Kode</th>
                          <th className="px-6 py-4">Nama Jemaat</th>
                          <th className="px-6 py-4">Gembala Sidang</th>
                          <th className="px-6 py-4 text-center">Jumlah Jiwa (Anggota)</th>
                          <th className="px-6 py-4">Wilayah Regional</th>
                          <th className="px-6 py-4">Alamat</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {filteredGerejas
                          .filter(g => g.nama_gereja.toLowerCase().includes(searchQuery.toLowerCase()) || g.gembala.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map(g => {
                            const wil = wilayahs.find(w => w.id === g.wilayah_id);
                            return (
                              <tr key={g.id} className="hover:bg-slate-800/10">
                                <td className="px-6 py-4 font-bold text-indigo-400">{g.kode_gereja}</td>
                                <td className="px-6 py-4 font-bold text-white">{g.nama_gereja}</td>
                                <td className="px-6 py-4 font-semibold">{g.gembala}</td>
                                <td className="px-6 py-4 text-center font-extrabold text-slate-300">{g.jumlah_jiwa.toLocaleString()}</td>
                                <td className="px-6 py-4 font-medium text-indigo-300">{wil?.nama_wilayah || ''}</td>
                                <td className="px-6 py-4 text-slate-400">{g.alamat}</td>
                                <td className="px-6 py-4">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    {g.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: TAMBAH GEREJA (Wilayah Only) */}
              {activeTab === 'tambah-gereja' && (
                <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-6">
                  <div>
                    <h1 className="text-lg font-bold tracking-tight">Tambah Gereja Jemaat Baru</h1>
                    <p className="text-xs text-slate-500 mt-1">Gereja yang didaftarkan akan otomatis masuk dalam wilayah administratif {userRegion?.nama_wilayah}</p>
                  </div>

                  <form onSubmit={handleAddGereja} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nama Jemaat / Gereja</label>
                      <input 
                        type="text" 
                        required
                        value={newGerejaNama}
                        onChange={e => setNewGerejaNama(e.target.value)}
                        placeholder="Contoh: Gereja Baptis Sion Karubaga" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Gembala Sidang</label>
                      <input 
                        type="text" 
                        required
                        value={newGerejaGembala}
                        onChange={e => setNewGerejaGembala(e.target.value)}
                        placeholder="Nama Pdt. atau Ev. yang bertugas" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Jumlah Jiwa (Anggota Jemaat)</label>
                      <input 
                        type="number" 
                        required
                        value={newGerejaJiwa}
                        onChange={e => setNewGerejaJiwa(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Alamat Lengkap Gereja</label>
                      <textarea 
                        rows={3}
                        value={newGerejaAlamat}
                        onChange={e => setNewGerejaAlamat(e.target.value)}
                        placeholder="Detail lokasi jemaat..." 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setActiveTab('gereja')} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition hover:bg-slate-700">Batal</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold transition hover:bg-indigo-500">Simpan Jemaat</button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIEW: INPUT IURAN (Wilayah Only) */}
              {activeTab === 'input-iuran' && (
                <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-6">
                  <div>
                    <h1 className="text-lg font-bold tracking-tight">Input Setoran Iuran Bulanan</h1>
                    <p className="text-xs text-slate-500 mt-1">Halaman input iuran untuk gereja-gereja di {userRegion?.nama_wilayah || ''}. Besaran iuran otomatis terhitung Rp 1.000 per jiwa jemaat.</p>
                  </div>

                  <form onSubmit={handleInputIuran} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Gereja Pengirim</label>
                        <select 
                          value={formGerejaId} 
                          onChange={e => setFormGerejaId(parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                        >
                          {gerejas.filter(g => g.wilayah_id === currentUser.wilayah_id).map(g => (
                            <option key={g.id} value={g.id}>{g.nama_gereja} ({g.jumlah_jiwa} jiwa)</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Iuran Terhitung (Otomatis)</label>
                        <div className="px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white font-bold text-sm h-10 flex items-center">
                          Rp {((gerejas.find(g => g.id === formGerejaId)?.jumlah_jiwa || 0) * 1000).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Bulan Setoran</label>
                        <select 
                          value={formBulan} 
                          onChange={e => setFormBulan(parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                        >
                          {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, idx) => (
                            <option key={idx} value={idx + 1}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Tahun</label>
                        <select 
                          value={formTahun} 
                          onChange={e => setFormTahun(parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                        >
                          <option value={2026}>2026</option>
                          <option value={2025}>2025</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Bank Pengirim</label>
                        <select 
                          value={formBank} 
                          onChange={e => setFormBank(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-xs"
                        >
                          <option value="Bank Papua">Bank Papua</option>
                          <option value="BRI">BRI</option>
                          <option value="BNI">BNI</option>
                          <option value="Mandiri">Mandiri</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nomor Referensi Transfer</label>
                        <input 
                          type="text" 
                          required
                          value={formRef}
                          onChange={e => setFormRef(e.target.value)}
                          placeholder="Nomor referensi / slip transfer" 
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Upload Bukti Transfer (Format Gambar/PDF, Maks 2MB)</label>
                      <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition">
                        <input 
                          type="file" 
                          id="bukti-upload" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.pdf" 
                          onChange={simulateFileUpload}
                        />
                        <label htmlFor="bukti-upload" className="cursor-pointer flex flex-col items-center gap-2">
                          <Download className="w-8 h-8 text-indigo-400 animate-pulse" />
                          <span className="text-xs text-slate-300 font-bold">Pilih File bukti transfer atau Seret kesini</span>
                          <span className="text-[10px] text-slate-500 font-semibold">Maksimal ukuran file 2 MB (JPG, PNG, PDF)</span>
                        </label>
                      </div>
                      {formBuktiName && (
                        <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
                          <span>File terpilih: {formBuktiName}</span>
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Catatan Tambahan</label>
                      <textarea 
                        rows={2}
                        value={formCatatan}
                        onChange={e => setFormCatatan(e.target.value)}
                        placeholder="Keterangan setoran..." 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button type="button" onClick={() => setActiveTab('iuran')} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition hover:bg-slate-700">Batal</button>
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold transition hover:bg-indigo-500">Ajukan Iuran</button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIEW: VERIFIKASI / RIWAYAT IURAN */}
              {activeTab === 'iuran' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">
                        {currentUser.role === 'Bendahara Pusat' ? 'Antrean Verifikasi Iuran PGBP' : 'Riwayat Pembayaran Iuran'}
                      </h1>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">
                        {currentUser.role === 'Bendahara Pusat' ? 'Verifikasi laporan transfer iuran dari Admin Wilayah secara real-time.' : 'Daftar pengajuan iuran bulanan jemaat wilayah Anda.'}
                      </p>
                    </div>
                  </div>

                  {/* Filters Block */}
                  <div className="p-4 rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md flex flex-wrap gap-4 items-center">
                    <Filter className="w-4 h-4 text-indigo-400" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Status:</span>
                      <select 
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-1.5 focus:outline-none"
                      >
                        <option value="all">Semua Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Revision">Revision</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Nomor Referensi</th>
                          <th className="px-6 py-4">Nama Jemaat / Gereja</th>
                          <th className="px-6 py-4">Bulan / Tahun</th>
                          <th className="px-6 py-4 text-center">Jiwa</th>
                          <th className="px-6 py-4 text-center">Total Iuran</th>
                          <th className="px-6 py-4">Tgl Transfer</th>
                          <th className="px-6 py-4">Bank</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {displayPayments.map(p => {
                          const g = gerejas.find(gr => gr.id === p.gereja_id);
                          return (
                            <tr key={p.id} className="hover:bg-slate-800/10">
                              <td className="px-6 py-4 font-bold text-indigo-400">{p.nomor_referensi}</td>
                              <td className="px-6 py-4 font-bold text-white">{g?.nama_gereja || ''}</td>
                              <td className="px-6 py-4 font-semibold">{['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][p.bulan - 1]} {p.tahun}</td>
                              <td className="px-6 py-4 text-center font-bold">{p.jumlah_jiwa.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center font-extrabold text-emerald-400">Rp {p.total_iuran.toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4 text-slate-400">{p.tanggal_transfer}</td>
                              <td className="px-6 py-4 font-medium">{p.bank}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  p.status === 'Verified' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                  p.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                  p.status === 'Rejected' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                  'bg-sky-500/10 border-sky-500/20 text-sky-400'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {currentUser.role === 'Bendahara Pusat' && p.status === 'Pending' ? (
                                    <button 
                                      onClick={() => setSelectedPembayaran(p)}
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-[11px]"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                      Verifikasi
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => {
                                        triggerToast(`Membuka berkas lampiran: ${p.bukti_transfer}`, 'info');
                                      }}
                                      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      Bukti
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* MODAL / SUBVIEW FOR VERIFICATION */}
                  {selectedPembayaran && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
                      <div className="w-full max-w-xl rounded-2xl border border-slate-200/10 bg-slate-900 p-6 shadow-2xl relative space-y-6">
                        <button onClick={() => setSelectedPembayaran(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                          <X className="w-5 h-5" />
                        </button>

                        <div>
                          <h3 className="text-lg font-bold text-white">Verifikasi Iuran Bulanan</h3>
                          <p className="text-xs text-slate-400 mt-1">Periksa lampiran transfer dan tentukan keputusan verifikasi.</p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/50 space-y-2 text-xs border border-slate-800">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Nama Gereja:</span>
                            <span className="font-bold text-white">{gerejas.find(g => g.id === selectedPembayaran.gereja_id)?.nama_gereja}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Total Iuran:</span>
                            <span className="font-extrabold text-emerald-400">Rp {selectedPembayaran.total_iuran.toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Nomor Referensi:</span>
                            <span className="font-bold text-indigo-400">{selectedPembayaran.nomor_referensi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">File Bukti:</span>
                            <span className="font-semibold text-slate-300 underline">{selectedPembayaran.bukti_transfer}</span>
                          </div>
                        </div>

                        <form onSubmit={handleVerifikasi} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Tindakan Verifikasi</label>
                            <select 
                              value={verifikasiStatus} 
                              onChange={e => setVerifikasiStatus(e.target.value as any)}
                              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-xs"
                            >
                              <option value="Verified">Setujui (Verified)</option>
                              <option value="Rejected">Tolak (Rejected)</option>
                              <option value="Revision">Revisi Bukti (Revision)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Catatan Verifikasi</label>
                            <textarea 
                              required
                              rows={3}
                              value={verifikasiCatatan}
                              onChange={e => setVerifikasiCatatan(e.target.value)}
                              placeholder="Keterangan keputusan..." 
                              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setSelectedPembayaran(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition hover:bg-slate-700">Tutup</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold transition hover:bg-indigo-500">Simpan Keputusan</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* VIEW: LAPORAN (NATIONAL & REGIONAL) */}
              {activeTab === 'laporan' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">Eksportasi Laporan Iuran PGBP</h1>
                      <p className="text-xs text-slate-500 mt-1 font-semibold">Cetak atau ekspor file laporan periodik jemaat gereja.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-6">
                    <h3 className="text-sm font-bold tracking-tight">Filter Laporan</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {currentUser.role === 'Bendahara Pusat' && (
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Wilayah</label>
                          <select 
                            value={filterWilayah}
                            onChange={e => setFilterWilayah(e.target.value)}
                            className="w-full bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-2 focus:outline-none"
                          >
                            <option value="all">Semua Wilayah</option>
                            {wilayahs.map(w => (
                              <option key={w.id} value={w.id}>{w.nama_wilayah}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Bulan</label>
                        <select 
                          value={filterBulan}
                          onChange={e => setFilterBulan(e.target.value)}
                          className="w-full bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-2 focus:outline-none"
                        >
                          <option value="all">Semua Bulan</option>
                          {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((m, idx) => (
                            <option key={idx} value={idx + 1}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Tahun</label>
                        <select 
                          value={filterTahun}
                          onChange={e => setFilterTahun(e.target.value)}
                          className="w-full bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-2 focus:outline-none"
                        >
                          <option value="all">Semua Tahun</option>
                          <option value="2026">2026</option>
                          <option value="2025">2025</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Status Verifikasi</label>
                        <select 
                          value={filterStatus}
                          onChange={e => setFilterStatus(e.target.value)}
                          className="w-full bg-slate-900 text-xs rounded-lg border border-slate-800 px-3 py-2 focus:outline-none"
                        >
                          <option value="all">Semua Status</option>
                          <option value="Verified">Verified</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
                      <button 
                        onClick={() => triggerToast('Mencetak dokumen laporan...', 'info')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
                      >
                        <Printer className="w-4 h-4" />
                        Cetak Laporan
                      </button>
                      <button 
                        onClick={() => triggerToast('Ekspor PDF berhasil diunduh!', 'success')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition"
                      >
                        <FileText className="w-4 h-4" />
                        Ekspor ke PDF
                      </button>
                      <button 
                        onClick={() => triggerToast('Ekspor Excel berhasil diunduh!', 'success')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        Ekspor ke Excel
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl p-4">
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">Pratinjau Hasil Filter Laporan</h3>
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Gereja</th>
                          <th className="px-6 py-4">Bulan/Tahun</th>
                          <th className="px-6 py-4 text-center">Anggota (Jiwa)</th>
                          <th className="px-6 py-4 text-center">Iuran / Jiwa</th>
                          <th className="px-6 py-4 text-center">Total Setoran</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {displayPayments.map(p => {
                          const g = gerejas.find(gr => gr.id === p.gereja_id);
                          return (
                            <tr key={p.id}>
                              <td className="px-6 py-4 font-bold text-white">{g?.nama_gereja}</td>
                              <td className="px-6 py-4 font-semibold">{['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][p.bulan - 1]} {p.tahun}</td>
                              <td className="px-6 py-4 text-center font-bold">{p.jumlah_jiwa.toLocaleString()}</td>
                              <td className="px-6 py-4 text-center">Rp {p.iuran_per_jiwa.toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4 text-center font-extrabold text-emerald-400">Rp {p.total_iuran.toLocaleString('id-ID')}</td>
                              <td className="px-6 py-4 font-bold">{p.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: APPROVALS & USERS */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">Approval & Manajemen Akun</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Berikan otorisasi pendaftaran akun baru Admin Wilayah dan Bendahara.</p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Nama Lengkap</th>
                          <th className="px-6 py-4">Username</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Role Akses</th>
                          <th className="px-6 py-4">Wilayah</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-center">Tindakan Otorisasi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {users.map(u => {
                          const w = wilayahs.find(wl => wl.id === u.wilayah_id);
                          return (
                            <tr key={u.id} className="hover:bg-slate-800/10">
                              <td className="px-6 py-4 font-bold text-white">{u.nama}</td>
                              <td className="px-6 py-4 font-bold text-indigo-400">@{u.username}</td>
                              <td className="px-6 py-4 font-semibold">{u.email}</td>
                              <td className="px-6 py-4 text-indigo-300 font-medium">{u.role}</td>
                              <td className="px-6 py-4 text-slate-300">{w ? w.nama_wilayah : '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  u.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                  u.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                  'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                }`}>
                                  {u.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                  {u.status === 'Pending' && (
                                    <button 
                                      onClick={() => handleApproveUser(u.id, 'Approved')}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                                    >
                                      Setujui
                                    </button>
                                  )}
                                  {u.status === 'Approved' && u.id !== 1 && (
                                    <button 
                                      onClick={() => handleApproveUser(u.id, 'Suspended')}
                                      className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold"
                                    >
                                      Tangguhkan
                                    </button>
                                  )}
                                  {u.status === 'Suspended' && (
                                    <button 
                                      onClick={() => handleApproveUser(u.id, 'Approved')}
                                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                                    >
                                      Aktifkan Kembali
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: AUDIT TRAILS */}
              {activeTab === 'audit' && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">Audit Trail Logs Keamanan</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Log aktivitas keamanan dan perubahan data dalam sistem secara runtut.</p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/50 border-b border-slate-800 tracking-wider">
                        <tr>
                          <th className="px-6 py-4">ID Log</th>
                          <th className="px-6 py-4">Pengguna</th>
                          <th className="px-6 py-4">Aktivitas Kegiatan</th>
                          <th className="px-6 py-4">Alamat IP</th>
                          <th className="px-6 py-4">Browser Client</th>
                          <th className="px-6 py-4">Waktu Kejadian</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {auditLogs.map(log => (
                          <tr key={log.id} className="hover:bg-slate-800/10">
                            <td className="px-6 py-4 font-bold text-indigo-400">#LOG-{log.id}</td>
                            <td className="px-6 py-4 font-bold text-white">@{log.username}</td>
                            <td className="px-6 py-4 font-semibold">{log.aktivitas}</td>
                            <td className="px-6 py-4 text-slate-400">{log.ip_address}</td>
                            <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{log.browser}</td>
                            <td className="px-6 py-4 font-medium text-indigo-300">{log.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW: SETTINGS & BACKUP */}
              {activeTab === 'setting' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">Sistem & Cadangan Database</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Pencadangan database MySQL dan konfigurasi parameter iuran wajib.</p>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-4">
                    <h3 className="text-sm font-bold tracking-tight flex items-center gap-2 text-indigo-400">
                      <Database className="w-5 h-5" />
                      Backup Database
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lakukan pencadangan (backup) seluruh skema tabel, data master wilayah, gereja, serta histori transaksi iuran bulanan ke dalam format file SQL terkompresi.
                    </p>
                    <button 
                      onClick={() => triggerToast('Proses pencadangan database selesai! File pgbp_iuran_backup.sql diunduh.', 'success')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition"
                    >
                      <Download className="w-4 h-4" />
                      Eksekusi Backup SQL
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-4">
                    <h3 className="text-sm font-bold tracking-tight flex items-center gap-2 text-indigo-400">
                      <Settings className="w-5 h-5" />
                      Parameter Sistem Iuran
                    </h3>
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1.5">Standar Iuran Wajib Bulanan per Jiwa (Rp)</label>
                        <input 
                          type="text" 
                          disabled
                          value="Rp 1.000 / Jiwa"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-bold"
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block">Nilai parameter ini mengacu pada keputusan sidang sinode PGBP Papua.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW: PROFILE */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-slate-200/10 bg-white/5 backdrop-blur-md shadow-xl space-y-6">
                  <div>
                    <h1 className="text-lg font-bold tracking-tight">Ubah Informasi Profil</h1>
                    <p className="text-xs text-slate-500 mt-1">Perbarui nama, alamat email, atau setel ulang kata sandi akun jemaat Anda.</p>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nama Lengkap Pengguna</label>
                      <input 
                        type="text" 
                        required
                        value={profileNama}
                        onChange={e => setProfileNama(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Username Pengguna (Permanen)</label>
                      <input 
                        type="text" 
                        disabled
                        value={`@${currentUser.username}`}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/30 border border-slate-800 text-slate-500 focus:outline-none text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Alamat Email Aktif</label>
                      <input 
                        type="email" 
                        required
                        value={profileEmail}
                        onChange={e => setProfileEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Ubah Sandi Baru (Opsional)</label>
                      <input 
                        type="password" 
                        value={profilePassword}
                        onChange={e => setProfilePassword(e.target.value)}
                        placeholder="Masukkan sandi baru jika ingin mengubah" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
                      />
                    </div>

                    <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition">
                      Simpan Perubahan Profil
                    </button>
                  </form>
                </div>
              )}

            </main>
          </div>
        </div>
      )}
    </div>
  );
}
