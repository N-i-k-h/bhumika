import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Plus, RefreshCw, Layers, Users, ShieldCheck, Check } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'customers' | 'certificates'>('products');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Loaded lists
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  // Product Form State
  const [prodTitle, setProdTitle] = useState('');
  const [prodIndustry, setProdIndustry] = useState<'automobile' | 'food' | 'textile' | 'reverse_osmosis' | 'others'>('others');
  const [prodImage, setProdImage] = useState<string>('');
  const [prodMaterial, setProdMaterial] = useState('');
  const [prodWeight, setProdWeight] = useState('');
  const [prodDimensions, setProdDimensions] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodApplications, setProdApplications] = useState('');

  // Customer Form State
  const [custCompany, setCustCompany] = useState('');
  const [custLogo, setCustLogo] = useState<string>('');
  const [custQuote, setCustQuote] = useState('');

  // Certificate Form State
  const [certTitle, setCertTitle] = useState('');
  const [certAuthority, setCertAuthority] = useState('');
  const [certScope, setCertScope] = useState('');
  const [certRefNumber, setCertRefNumber] = useState('');
  const [certValidity, setCertValidity] = useState('');
  const [certImage, setCertImage] = useState<string>('');

  const API_URL = '/api';

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      if (activeTab === 'products') {
        const res = await fetch(`${API_URL}/products`);
        if (res.ok) setProducts(await res.json());
      } else if (activeTab === 'customers') {
        const res = await fetch(`${API_URL}/customers`);
        if (res.ok) setCustomers(await res.json());
      } else if (activeTab === 'certificates') {
        const res = await fetch(`${API_URL}/certificates`);
        if (res.ok) setCertificates(await res.json());
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setImageState: (b64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImageState(base64);
      } catch (err) {
        setErrorMsg('Error converting file to base64.');
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodImage) {
      setErrorMsg('Please select a product image.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: prodTitle,
          category: 'investment', // default/legacy field
          image: prodImage,
          material: prodMaterial,
          weight: prodWeight,
          dimensions: prodDimensions,
          description: prodDescription,
          applications: prodApplications,
          industry: prodIndustry
        })
      });
      if (res.ok) {
        setSuccessMsg('Product added successfully!');
        setProdTitle('');
        setProdImage('');
        setProdMaterial('');
        setProdWeight('');
        setProdDimensions('');
        setProdDescription('');
        setProdApplications('');
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || 'Failed to create product.');
      }
    } catch (err) {
      setErrorMsg('Failed to post product data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        setErrorMsg('Failed to delete product.');
      }
    } catch (err) {
      setErrorMsg('API connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custLogo) {
      setErrorMsg('Please upload a company logo.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: custCompany,
          logo: custLogo,
          quote: custQuote
        })
      });
      if (res.ok) {
        setSuccessMsg('Customer testimonial added successfully!');
        setCustCompany('');
        setCustLogo('');
        setCustQuote('');
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Failed to create customer record.');
      }
    } catch (err) {
      setErrorMsg('API connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!window.confirm('Delete this customer testimonial?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/customers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        setErrorMsg('Failed to delete customer.');
      }
    } catch (err) {
      setErrorMsg('API connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_URL}/certificates`, {
        method: 'POST',
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
        setSuccessMsg('Certificate added successfully!');
        setCertTitle('');
        setCertAuthority('');
        setCertScope('');
        setCertRefNumber('');
        setCertValidity('');
        setCertImage('');
        fetchData();
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg('Failed to create certificate record.');
      }
    } catch (err) {
      setErrorMsg('API connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm('Delete this certificate?')) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        setErrorMsg('Failed to delete certificate.');
      }
    } catch (err) {
      setErrorMsg('API connection error.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-primary/10 relative page-transition"
      >
        {/* Header */}
        <div className="p-6 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-white/10 text-secondary">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-headline-lg text-lg font-black tracking-wide">Bhumika Alloy Castings Admin Panel</h2>
              <p className="text-[10px] text-surface-variant/80">Configure dynamic content on live website</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData}
              className="p-2 rounded-full hover:bg-white/15 transition-all text-white/80 hover:text-white cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/15 transition-all text-white/80 hover:text-white cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-steel-plate border-b border-primary/5 flex">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'products'
                ? 'border-secondary text-secondary bg-white'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Layers className="w-4 h-4" />
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-6 py-3 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'customers'
                ? 'border-secondary text-secondary bg-white'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Users className="w-4 h-4" />
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-6 py-3 font-label-caps text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-b-2 ${
              activeTab === 'certificates'
                ? 'border-secondary text-secondary bg-white'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Certificates ({certificates.length})
          </button>
        </div>

        {/* Messaging Bar */}
        {(successMsg || errorMsg) && (
          <div className="px-6 py-3 flex gap-3 text-xs border-b">
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
        )}

        {/* Content Body - Split View: Form on Left, List on Right */}
        <div className="flex-grow flex overflow-hidden">
          
          {/* Left: Input Form (Scrollable) */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-primary/5 bg-steel-plate/20">
            <h3 className="font-label-caps text-xs text-secondary font-black tracking-wider uppercase mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New {activeTab.slice(0, -1)}
            </h3>

            {/* Products Form */}
            {activeTab === 'products' && (
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. Lost-Wax Valve Bonnet"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Industry Sector</label>
                    <select
                      value={prodIndustry}
                      onChange={(e) => setProdIndustry(e.target.value as any)}
                      className="w-full p-2 border border-primary/10 rounded text-xs bg-white"
                    >
                      <option value="automobile">Automobile</option>
                      <option value="food">Food Industry</option>
                      <option value="textile">Textile</option>
                      <option value="reverse_osmosis">Reverse Osmosis</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Material Standard</label>
                    <input
                      type="text"
                      required
                      value={prodMaterial}
                      onChange={(e) => setProdMaterial(e.target.value)}
                      className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                      className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                      className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. Custom up to 250 mm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Technical Description</label>
                  <textarea
                    required
                    rows={2}
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="e.g. High pressure piping, marine systems"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Upload Product Image</label>
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
                        <Check className="w-3.5 h-3.5" /> File Ready
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-2.5 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  Create Product Listing
                </button>
              </form>
            )}

            {/* Customers Form */}
            {activeTab === 'customers' && (
              <form onSubmit={handleAddCustomer} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={custCompany}
                    onChange={(e) => setCustCompany(e.target.value)}
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
                    placeholder="Max 120 chars. e.g. Outstanding casting precision..."
                  />
                  <span className="text-[9px] text-on-surface-variant/60 block mt-1 text-right">
                    {custQuote.length}/120 characters
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Company Logo Image</label>
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
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-2.5 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  Publish Testimonial
                </button>
              </form>
            )}

            {/* Certificates Form */}
            {activeTab === 'certificates' && (
              <form onSubmit={handleAddCertificate} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Certificate / Directive Title</label>
                  <input
                    type="text"
                    required
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                    className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                      className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
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
                      className="w-full p-2 border border-primary/10 rounded text-xs rfq-input"
                      placeholder="e.g. Valid until June 2027"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase font-label-caps mb-1">Upload Certificate File (Optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 border border-secondary text-secondary rounded hover:bg-secondary/5 cursor-pointer text-xs transition-all">
                      <Upload className="w-4 h-4" />
                      Choose Document Image
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
                  className="w-full bg-secondary hover:bg-opacity-95 text-white font-bold py-2.5 rounded text-xs shadow cursor-pointer transition-all disabled:opacity-50"
                >
                  Create Certificate Listing
                </button>
              </form>
            )}
          </div>

          {/* Right: Data List View (Scrollable) */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto">
            <h3 className="font-label-caps text-xs text-primary font-black tracking-wider uppercase mb-4">
              Active Database Records ({
                activeTab === 'products' ? products.length :
                activeTab === 'customers' ? customers.length :
                certificates.length
              })
            </h3>

            {isLoading && (
              <div className="flex justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
              </div>
            )}

            {/* List for Products */}
            {activeTab === 'products' && !isLoading && (
              <div className="space-y-3">
                {products.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60">No database products found. Run seed script or add above.</p>
                ) : (
                  products.map((prod) => (
                    <div key={prod.id} className="p-3 border border-primary/5 rounded bg-steel-plate/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={prod.image} alt={prod.title} className="w-10 h-10 object-contain rounded bg-white border border-primary/5 flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-primary truncate">{prod.title}</h4>
                          <span className="text-[10px] text-secondary font-semibold font-label-caps block uppercase mt-0.5">
                            {prod.industry === 'reverse_osmosis' ? 'REVERSE OSMOSIS' : (prod.industry || 'OTHERS').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors rounded cursor-pointer flex-shrink-0"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* List for Customers */}
            {activeTab === 'customers' && !isLoading && (
              <div className="space-y-3">
                {customers.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60">No database customers found.</p>
                ) : (
                  customers.map((cust) => (
                    <div key={cust._id} className="p-3 border border-primary/5 rounded bg-steel-plate/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={cust.logo} alt={cust.company} className="w-10 h-10 object-contain rounded bg-white border border-primary/5 flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-primary truncate">{cust.company}</h4>
                          <p className="text-[10px] text-on-surface-variant/70 italic truncate mt-0.5">"{cust.quote}"</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomer(cust._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors rounded cursor-pointer flex-shrink-0"
                        title="Delete customer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* List for Certificates */}
            {activeTab === 'certificates' && !isLoading && (
              <div className="space-y-3">
                {certificates.length === 0 ? (
                  <p className="text-xs text-on-surface-variant/60">No database certificates found.</p>
                ) : (
                  certificates.map((cert) => (
                    <div key={cert._id} className="p-3 border border-primary/5 rounded bg-steel-plate/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {cert.image ? (
                          <img src={cert.image} alt={cert.title} className="w-10 h-10 object-contain rounded bg-white border border-primary/5 flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-secondary/10 text-secondary rounded flex items-center justify-center flex-shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-primary truncate">{cert.title}</h4>
                          <span className="text-[10px] text-on-surface-variant/60 block mt-0.5 truncate">{cert.authority}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCertificate(cert._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors rounded cursor-pointer flex-shrink-0"
                        title="Delete certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
