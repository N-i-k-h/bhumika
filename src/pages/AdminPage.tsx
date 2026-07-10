import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, Users, ShieldCheck, Plus, Trash2, Edit2, 
  Upload, X, RefreshCw, Check, LogOut, ShieldAlert 
} from 'lucide-react';

interface EditingItem {
  type: 'products' | 'customers' | 'certificates';
  id: string | number;
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [activeTab, setActiveTab] = useState<'products' | 'customers' | 'certificates'>('products');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Authentication Fields (for direct page login)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Active items lists from DB
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  // Edit Mode state tracking
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  // Form Fields: Products
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState<'centrifugal' | 'investment' | 'sand'>('investment');
  const [prodImage, setProdImage] = useState<string>(''); // Base64 string
  const [prodMaterial, setProdMaterial] = useState('');
  const [prodWeight, setProdWeight] = useState('');
  const [prodDimensions, setProdDimensions] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodApplications, setProdApplications] = useState('');

  // Form Fields: Customers
  const [custCompany, setCustCompany] = useState('');
  const [custLogo, setCustLogo] = useState<string>(''); // Base64 string
  const [custQuote, setCustQuote] = useState('');

  // Form Fields: Certificates
  const [certTitle, setCertTitle] = useState('');
  const [certAuthority, setCertAuthority] = useState('');
  const [certScope, setCertScope] = useState('');
  const [certRefNumber, setCertRefNumber] = useState('');
  const [certValidity, setCertValidity] = useState('');
  const [certImage, setCertImage] = useState<string>(''); // Base64 string

  const API_URL = '/api';

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      let res;
      if (activeTab === 'products') {
        res = await fetch(`${API_URL}/products`);
        if (res.ok) {
          setProducts(await res.json());
        } else {
          const errData = await res.json();
          setErrorMsg(errData.error || 'Failed to retrieve products.');
        }
      } else if (activeTab === 'customers') {
        res = await fetch(`${API_URL}/customers`);
        if (res.ok) {
          setCustomers(await res.json());
        } else {
          const errData = await res.json();
          setErrorMsg(errData.error || 'Failed to retrieve customers.');
        }
      } else if (activeTab === 'certificates') {
        res = await fetch(`${API_URL}/certificates`);
        if (res.ok) {
          setCertificates(await res.json());
        } else {
          const errData = await res.json();
          setErrorMsg(errData.error || 'Failed to retrieve certificates.');
        }
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the backend server API.');
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler
  const handlePageLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'bhumikaalloy@gmail.com' && password.trim() === 'adminbac') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setErrorMsg('');
      // Force reload to notify header/layout
      window.dispatchEvent(new Event('storage'));
      // Wait a moment then refresh
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setErrorMsg('Invalid administrator credentials.');
    }
  };

  // Logout handler
  const handlePageLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setEditingItem(null);
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);
  };

  // Convert File to Base64 utility
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setImageState: (b64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageState(reader.result as string);
      };
      reader.onerror = () => {
        setErrorMsg('Error parsing chosen file.');
      };
    }
  };

  // Clear Form Fields & Edit Mode
  const resetForms = () => {
    setEditingItem(null);
    setSuccessMsg('');
    setErrorMsg('');

    // Product Reset
    setProdTitle('');
    setProdCategory('investment');
    setProdImage('');
    setProdMaterial('');
    setProdWeight('');
    setProdDimensions('');
    setProdDescription('');
    setProdApplications('');

    // Customer Reset
    setCustCompany('');
    setCustLogo('');
    setCustQuote('');

    // Certificate Reset
    setCertTitle('');
    setCertAuthority('');
    setCertScope('');
    setCertRefNumber('');
    setCertValidity('');
    setCertImage('');
  };

  // PRODUCTS SUBMISSION (CREATE or UPDATE)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    const isEdit = editingItem && editingItem.type === 'products';
    if (!isEdit && !prodImage) {
      setErrorMsg('Please select a product image file.');
      return;
    }

    setIsLoading(true);
    const url = isEdit ? `${API_URL}/products/${editingItem.id}` : `${API_URL}/products`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: prodTitle,
          category: prodCategory,
          image: prodImage || undefined, // Only pass image if updated
          material: prodMaterial,
          weight: prodWeight,
          dimensions: prodDimensions,
          description: prodDescription,
          applications: prodApplications
        })
      });

      if (res.ok) {
        setSuccessMsg(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
        resetForms();
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to submit product data.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // PRODUCT EDIT INITIATION
  const startEditProduct = (item: any) => {
    setEditingItem({ type: 'products', id: item.id });
    setProdTitle(item.title);
    setProdCategory(item.category);
    setProdMaterial(item.material);
    setProdWeight(item.weight);
    setProdDimensions(item.dimensions);
    setProdDescription(item.description);
    setProdApplications(item.applications);
    setProdImage(''); // Clear file picker. Leave empty to keep existing image on server
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (editingItem?.type === 'products' && editingItem.id === id) {
          resetForms();
        }
        fetchData();
      } else {
        setErrorMsg('Failed to delete product.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // CUSTOMERS SUBMISSION (CREATE or UPDATE)
  const handleSubmitCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const isEdit = editingItem && editingItem.type === 'customers';
    if (!isEdit && !custLogo) {
      setErrorMsg('Please select a client logo file.');
      return;
    }

    setIsLoading(true);
    const url = isEdit ? `${API_URL}/customers/${editingItem.id}` : `${API_URL}/customers`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: custCompany,
          logo: custLogo || undefined, // Only pass if updated
          quote: custQuote
        })
      });

      if (res.ok) {
        setSuccessMsg(isEdit ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        resetForms();
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Failed to submit customer data.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // CUSTOMER EDIT INITIATION
  const startEditCustomer = (item: any) => {
    setEditingItem({ type: 'customers', id: item._id });
    setCustCompany(item.company);
    setCustQuote(item.quote);
    setCustLogo(''); // Clear file picker
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!window.confirm('Delete this customer testimonial?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (editingItem?.type === 'customers' && editingItem.id === id) {
          resetForms();
        }
        fetchData();
      } else {
        setErrorMsg('Failed to delete customer.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // CERTIFICATES SUBMISSION (CREATE or UPDATE)
  const handleSubmitCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const isEdit = editingItem && editingItem.type === 'certificates';
    setIsLoading(true);
    const url = isEdit ? `${API_URL}/certificates/${editingItem.id}` : `${API_URL}/certificates`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: certTitle,
          authority: certAuthority,
          scope: certScope,
          refNumber: certRefNumber,
          validity: certValidity,
          image: certImage || undefined
        })
      });

      if (res.ok) {
        setSuccessMsg(isEdit ? 'Certificate updated successfully!' : 'Certificate created successfully!');
        resetForms();
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Failed to submit certificate data.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // CERTIFICATE EDIT INITIATION
  const startEditCertificate = (item: any) => {
    setEditingItem({ type: 'certificates', id: item._id });
    setCertTitle(item.title);
    setCertAuthority(item.authority);
    setCertScope(item.scope);
    setCertRefNumber(item.refNumber);
    setCertValidity(item.validity);
    setCertImage(''); // Clear file picker
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm('Delete this certificate?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (editingItem?.type === 'certificates' && editingItem.id === id) {
          resetForms();
        }
        fetchData();
      } else {
        setErrorMsg('Failed to delete certificate.');
      }
    } catch (err) {
      setErrorMsg('API server connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  // ACCESS DENIED PAGE (LOGIN FORM)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-steel-plate/30 flex items-center justify-center p-6 page-transition">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-primary/10 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-secondary/15 text-secondary mb-3">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="font-headline-lg text-2xl font-black text-primary">Access Denied</h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-2">
              This page requires secure administrator access. Please provide the console login parameters below.
            </p>
          </div>

          <form onSubmit={handlePageLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded font-medium">
                {errorMsg}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-primary font-label-caps mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 border border-primary/10 rounded text-sm rfq-input"
                placeholder="admin@bhumikacastings.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary font-label-caps mb-1.5">Security Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-primary/10 rounded text-sm rfq-input"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-opacity-95 text-white font-bold py-3 rounded text-sm shadow cursor-pointer transition-all"
            >
              Sign In to System Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN FULL PAGE DASHBOARD
  return (
    <div className="bg-surface flex-grow page-transition min-h-screen flex flex-col">
      
      {/* Top Banner Dashboard */}
      <section className="bg-primary text-white py-12 px-6 md:px-margin-desktop border-b border-white/10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-lg bg-white/10 text-secondary">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <div>
              <h1 className="font-headline-lg text-2xl font-black tracking-wide">Administrator Customization Panel</h1>
              <p className="text-xs text-surface-variant/80">Wired to live MongoDB cluster + Cloudinary image sync</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2 border border-white/20 hover:bg-white/10 rounded font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Sync DB
            </button>
            <button
              onClick={handlePageLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-steel-plate border-b border-primary/5 px-6 md:px-margin-desktop">
        <div className="max-w-[1280px] mx-auto flex">
          <button
            onClick={() => { setActiveTab('products'); resetForms(); }}
            className={`px-6 py-4 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'products'
                ? 'border-secondary text-secondary bg-surface'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Layers className="w-4 h-4" />
            Products ({products.length})
          </button>
          <button
            onClick={() => { setActiveTab('customers'); resetForms(); }}
            className={`px-6 py-4 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'customers'
                ? 'border-secondary text-secondary bg-surface'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Users className="w-4 h-4" />
            Customers ({customers.length})
          </button>
          <button
            onClick={() => { setActiveTab('certificates'); resetForms(); }}
            className={`px-6 py-4 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'certificates'
                ? 'border-secondary text-secondary bg-surface'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Certificates ({certificates.length})
          </button>
        </div>
      </div>

      {/* Alert Bar */}
      {(successMsg || errorMsg) && (
        <div className="bg-white border-b border-primary/5 py-3 px-6 md:px-margin-desktop">
          <div className="max-w-[1280px] mx-auto flex gap-3 text-xs">
            {successMsg && (
              <div className="flex-grow p-2.5 rounded bg-green-50 text-green-800 border border-green-200 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4" /> {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="flex-grow p-2.5 rounded bg-red-50 text-red-800 border border-red-200 font-medium">
                {errorMsg}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Work Area */}
      <section className="py-12 px-6 md:px-margin-desktop flex-grow flex flex-col bg-steel-plate/10">
        <div className="max-w-[1280px] mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CRU FORM */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-label-caps text-xs text-secondary font-black tracking-wider uppercase flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingItem ? 'Edit Entry' : `Create New ${activeTab.slice(0, -1)}`}
              </h3>
              {editingItem && (
                <button
                  onClick={resetForms}
                  className="text-xs text-on-surface-variant hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </button>
              )}
            </div>

            {/* Products Form */}
            {activeTab === 'products' && (
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. Lost-Wax Valve Bonnet"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Process Category</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as any)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs bg-white"
                    >
                      <option value="investment">Investment Casting</option>
                      <option value="centrifugal">Centrifugal Casting</option>
                      <option value="sand">Sand Casting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Material Standard</label>
                    <input
                      type="text"
                      required
                      value={prodMaterial}
                      onChange={(e) => setProdMaterial(e.target.value)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. ASTM A351 CF8M"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Part Weight Range</label>
                    <input
                      type="text"
                      required
                      value={prodWeight}
                      onChange={(e) => setProdWeight(e.target.value)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. 1.5 kg – 12.0 kg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Dimensions / Envelope</label>
                    <input
                      type="text"
                      required
                      value={prodDimensions}
                      onChange={(e) => setProdDimensions(e.target.value)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. Custom up to 250 mm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Technical Description</label>
                  <textarea
                    required
                    rows={3}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="Describe casting tolerances, gas porosity levels, metallurgy..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Target Applications</label>
                  <input
                    type="text"
                    required
                    value={prodApplications}
                    onChange={(e) => setProdApplications(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. High pressure piping, marine systems"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">
                    Upload Product Image {editingItem ? '(Optional - leave blank to keep current)' : ''}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded hover:bg-secondary/5 cursor-pointer text-xs transition-all">
                      <Upload className="w-4 h-4" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setProdImage)}
                        className="hidden"
                      />
                    </label>
                    {prodImage && (
                      <span className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> File Selected
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-3 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  {editingItem ? 'Save Product Changes' : 'Create Product Listing'}
                </button>
              </form>
            )}

            {/* Customers Form */}
            {activeTab === 'customers' && (
              <form onSubmit={handleSubmitCustomer} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={custCompany}
                    onChange={(e) => setCustCompany(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. Pentair Flow Control"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Client Testimonial Quote</label>
                  <textarea
                    required
                    rows={3}
                    maxLength={120}
                    value={custQuote}
                    onChange={(e) => setCustQuote(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="Max 120 chars. e.g. Outstanding casting precision..."
                  />
                  <span className="text-[9px] text-on-surface-variant/60 block mt-1 text-right">
                    {custQuote.length}/120 characters
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">
                    Company Logo Image {editingItem ? '(Optional - leave blank to keep current)' : ''}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded hover:bg-secondary/5 cursor-pointer text-xs transition-all">
                      <Upload className="w-4 h-4" />
                      Choose Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setCustLogo)}
                        className="hidden"
                      />
                    </label>
                    {custLogo && (
                      <span className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Logo Loaded
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-3 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  {editingItem ? 'Save Testimonial Changes' : 'Publish Testimonial'}
                </button>
              </form>
            )}

            {/* Certificates Form */}
            {activeTab === 'certificates' && (
              <form onSubmit={handleSubmitCertificate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Certificate / Directive Title</label>
                  <input
                    type="text"
                    required
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. ISO 9001:2015"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Certifying Authority</label>
                  <input
                    type="text"
                    required
                    value={certAuthority}
                    onChange={(e) => setCertAuthority(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. TUV SUD South Asia"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Scope of Certification</label>
                  <textarea
                    required
                    rows={2}
                    value={certScope}
                    onChange={(e) => setCertScope(e.target.value)}
                    className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="Describe manufacturing lines covered..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Reference / Cert Code</label>
                    <input
                      type="text"
                      required
                      value={certRefNumber}
                      onChange={(e) => setCertRefNumber(e.target.value)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. 99 100 18360 / QMS"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Validity Status</label>
                    <input
                      type="text"
                      required
                      value={certValidity}
                      onChange={(e) => setCertValidity(e.target.value)}
                      className="w-full p-2.5 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. Implemented June 2008"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">
                    Upload Certificate Image {editingItem ? '(Optional - leave blank to keep current)' : ''}
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded hover:bg-secondary/5 cursor-pointer text-xs transition-all">
                      <Upload className="w-4 h-4" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setCertImage)}
                        className="hidden"
                      />
                    </label>
                    {certImage && (
                      <span className="text-[10px] text-green-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> File Attached
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-3 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  {editingItem ? 'Save Certificate Changes' : 'Create Certificate Listing'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: ACTIVE DATABASE LIST WITH ACTIONS */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-primary/5 shadow-sm">
            <h3 className="font-label-caps text-xs text-primary font-black tracking-wider uppercase mb-6 pb-2 border-b border-primary/5">
              Active Database Records ({
                activeTab === 'products' ? products.length :
                activeTab === 'customers' ? customers.length :
                certificates.length
              })
            </h3>

            {isLoading && (
              <div className="flex justify-center py-20">
                <RefreshCw className="w-8 h-8 animate-spin text-secondary" />
              </div>
            )}

            {/* Products List */}
            {activeTab === 'products' && !isLoading && (
              <div className="space-y-4">
                {products.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60 py-6 text-center">No products found in MongoDB. Create one using the form.</p>
                ) : (
                  products.map((prod) => (
                    <div 
                      key={prod.id} 
                      className={`p-4 border rounded-lg transition-all flex items-center justify-between gap-6 bg-steel-plate/10 ${
                        editingItem?.type === 'products' && editingItem.id === prod.id
                          ? 'border-secondary ring-1 ring-secondary'
                          : 'border-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.title} 
                          className="w-12 h-12 object-contain rounded bg-white border border-primary/5 flex-shrink-0" 
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-primary truncate">{prod.title}</h4>
                          <span className="text-[10px] text-secondary font-bold font-label-caps block uppercase mt-0.5">
                            {prod.category} Casting • {prod.material}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEditProduct(prod)}
                          className="p-2 text-primary hover:bg-white border border-primary/5 hover:text-secondary hover:border-secondary transition-all rounded cursor-pointer"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 text-red-600 hover:bg-red-50 hover:text-red-800 border border-transparent hover:border-red-200 transition-all rounded cursor-pointer"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Customers List */}
            {activeTab === 'customers' && !isLoading && (
              <div className="space-y-4">
                {customers.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60 py-6 text-center">No customers found in MongoDB.</p>
                ) : (
                  customers.map((cust) => (
                    <div 
                      key={cust._id} 
                      className={`p-4 border rounded-lg transition-all flex items-center justify-between gap-6 bg-steel-plate/10 ${
                        editingItem?.type === 'customers' && editingItem.id === cust._id
                          ? 'border-secondary ring-1 ring-secondary'
                          : 'border-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        <img 
                          src={cust.logo} 
                          alt={cust.company} 
                          className="w-12 h-12 object-contain rounded bg-white border border-primary/5 flex-shrink-0" 
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-primary truncate">{cust.company}</h4>
                          <p className="text-[11px] text-on-surface-variant/70 italic truncate mt-0.5">"{cust.quote}"</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEditCustomer(cust)}
                          className="p-2 text-primary hover:bg-white border border-primary/5 hover:text-secondary hover:border-secondary transition-all rounded cursor-pointer"
                          title="Edit customer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(cust._id)}
                          className="p-2 text-red-600 hover:bg-red-50 hover:text-red-800 border border-transparent hover:border-red-200 transition-all rounded cursor-pointer"
                          title="Delete customer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Certificates List */}
            {activeTab === 'certificates' && !isLoading && (
              <div className="space-y-4">
                {certificates.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60 py-6 text-center">No certificates found in MongoDB.</p>
                ) : (
                  certificates.map((cert) => (
                    <div 
                      key={cert._id} 
                      className={`p-4 border rounded-lg transition-all flex items-center justify-between gap-6 bg-steel-plate/10 ${
                        editingItem?.type === 'certificates' && editingItem.id === cert._id
                          ? 'border-secondary ring-1 ring-secondary'
                          : 'border-primary/5'
                      }`}
                    >
                      <div className="flex items-center gap-4 overflow-hidden">
                        {cert.image ? (
                          <img 
                            src={cert.image} 
                            alt={cert.title} 
                            className="w-12 h-12 object-contain rounded bg-white border border-primary/5 flex-shrink-0" 
                          />
                        ) : (
                          <div className="w-12 h-12 bg-secondary/15 text-secondary rounded flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-primary truncate">{cert.title}</h4>
                          <span className="text-[10px] text-on-surface-variant/60 block mt-0.5 truncate">{cert.authority}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEditCertificate(cert)}
                          className="p-2 text-primary hover:bg-white border border-primary/5 hover:text-secondary hover:border-secondary transition-all rounded cursor-pointer"
                          title="Edit certificate"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(cert._id)}
                          className="p-2 text-red-600 hover:bg-red-50 hover:text-red-800 border border-transparent hover:border-red-200 transition-all rounded cursor-pointer"
                          title="Delete certificate"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
