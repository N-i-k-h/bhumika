import React, { useState } from 'react';
import { MapPin, Phone, Mail, UploadCloud, CheckCircle2, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    process: 'investment',
    material: '',
    quantity: '',
    message: '',
    terms: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [id.replace('rfq-', '')]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [id.replace('rfq-', '')]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a random Reference ID
    const ref = "BAC-RFQ-" + Math.floor(1000 + Math.random() * 9000);
    setReferenceId(ref);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      process: 'investment',
      material: '',
      quantity: '',
      message: '',
      terms: false,
    });
    setSelectedFile(null);
    setIsSubmitted(false);
  };

  return (
    <div className="page-transition">
      {/* Inner Page Hero */}
      <section className="bg-primary py-20 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            GET A QUOTE
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2">
            RFQ &amp; Contact Engineering
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            Have a design drawing or metallurgical request? Fill out our RFQ matrix or reach out to our team directly.
          </p>
        </div>
      </section>

      {/* Contact Matrix & RFQ Form */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid lg:grid-cols-3 gap-16">
          
          {/* Left: Contact Details */}
          <div className="space-y-12 lg:col-span-1">
            <div>
              <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-wider text-xs font-bold">
                OFFICE CONTACTS
              </span>
              <h2 className="font-headline-lg text-2xl font-bold text-primary mb-6">Direct Channels</h2>
              
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-molten-glow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Shimoga Facility</h4>
                    <p className="text-on-surface-variant leading-relaxed mt-1 text-xs">
                      Srirampura Village, Sagar Road,
                      <br />
                      Shimoga – 577204, Karnataka, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-molten-glow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Phone Infrastructure</h4>
                    <p className="text-on-surface-variant text-xs mt-1">Landline: +91 8182 600600</p>
                    <p className="text-on-surface-variant text-xs">Mobile: +91 98805 30102</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-molten-glow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary">Inquiries</h4>
                    <p className="text-on-surface-variant text-xs mt-1">
                      <a
                        href="mailto:marketing@bhumikacastings.com"
                        className="text-secondary hover:text-molten-glow font-medium"
                      >
                        marketing@bhumikacastings.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-8">
              <h4 className="font-headline-md text-sm font-bold text-primary mb-3">Office Hours</h4>
              <ul className="text-xs text-on-surface-variant space-y-2 font-label-caps">
                <li className="flex justify-between">
                  <span>Monday – Friday</span> <span>10:00 AM – 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday – Sunday</span> <span>By Appointment Only</span>
                </li>
              </ul>
            </div>
            
            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden border border-primary/10 shadow-sm w-full h-[280px]">
              <iframe
                title="Bhumika Alloy Castings Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.985675075439!2d75.512947!3d13.9594583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba5ec5374bf71%3A0x32b1392f2a0b0f9b!2sBhumika%20Alloy%20Castings%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1779419362860!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Interactive RFQ Form Container */}
          <div className="lg:col-span-2 bg-steel-plate/60 p-8 rounded-lg border border-primary/5 shadow-sm">
            <span className="font-label-caps text-xs text-secondary font-bold mb-2 block uppercase tracking-wider text-xs">
              ONLINE TRANSMITTAL
            </span>
            <h2 className="font-headline-lg text-2xl font-black text-primary mb-6">
              Request for Engineering Quote (RFQ)
            </h2>
            
            {/* RFQ Form */}
            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-name">
                      Contact Person *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-name"
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-company">
                      Company Name *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-company"
                      required
                      type="text"
                      placeholder="Engineering Corp"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-email">
                      Corporate Email *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-email"
                      required
                      type="email"
                      placeholder="marketing@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-phone">
                      Contact Number *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-phone"
                      required
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-process">
                      Preferred Process
                    </label>
                    <select
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-process"
                      value={formData.process}
                      onChange={handleInputChange}
                    >
                      <option value="investment">Investment Casting</option>
                      <option value="centrifugal">Centrifugal Casting</option>
                      <option value="consult">Consult Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-material">
                      Material / Alloy Grade
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-material"
                      type="text"
                      placeholder="e.g. CF8M, Ni-Resist D2"
                      value={formData.material}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-quantity">
                      Est. Annual Qty
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="rfq-quantity"
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2">
                    CAD/Drawing Upload (Simulation)
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 bg-white hover:bg-steel-plate/30 transition-all flex flex-col items-center justify-center cursor-pointer relative">
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      id="rfq-file"
                      type="file"
                      accept=".pdf,.dwg,.dxf,.stp,.step"
                      onChange={handleFileChange}
                    />
                    <UploadCloud className="w-8 h-8 text-outline mb-2" />
                    <p className="text-xs text-primary font-bold">
                      {selectedFile 
                        ? `Selected File: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`
                        : "Drag and drop or click to upload"
                      }
                    </p>
                    <p className="text-[10px] text-outline mt-1 font-label-caps">
                      Supports PDF, STEP, DWG, DXF up to 15MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="rfq-message">
                    Technical Requirements / Scope
                  </label>
                  <textarea
                    className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input h-32"
                    id="rfq-message"
                    placeholder="Provide tolerances, hardness requirements, heat treatments, testing protocols (radiography, spectrometer verification), etc."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    className="rounded border-outline-variant text-secondary focus:ring-secondary text-xs"
                    id="rfq-terms"
                    required
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleInputChange}
                  />
                  <label className="text-[11px] text-on-surface-variant cursor-pointer select-none" htmlFor="rfq-terms">
                    I consent to sharing this data under Bhumika's engineering confidentiality policies.
                  </label>
                </div>

                <button
                  className="w-full bg-secondary hover:bg-opacity-90 text-white py-4 rounded font-bold transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase font-label-caps cursor-pointer"
                  type="submit"
                >
                  Submit RFQ Package <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Feedback Screen */
              <div className="flex flex-col items-center text-center py-12 space-y-6 page-transition">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline-md text-2xl font-black text-primary">RFQ Package Transmitted</h3>
                  <p className="text-xs text-on-surface-variant font-label-caps font-bold">
                    REFERENCE ID: {referenceId}
                  </p>
                </div>
                <p className="text-xs text-on-surface-variant max-w-md leading-relaxed mx-auto">
                  Thank you. Your drawings and metallurgical data sheets have been securely transmitted to our engineering team in Shimoga. We will review your tolerances and respond with a formal quote within <strong>24 to 48 business hours</strong>.
                </p>
                <div className="pt-4">
                  <button
                    className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded font-bold text-xs cursor-pointer"
                    onClick={resetForm}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
