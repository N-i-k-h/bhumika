import React, { useState, useEffect } from 'react';
import { Briefcase, UploadCloud, CheckCircle2, Send, Mail } from 'lucide-react';

interface JobItem {
  _id?: string;
  jobId: string;
  title: string;
  department: string;
  location: string;
  shift: string;
  type: string;
  description?: string;
  requirements?: string;
  vacancy?: string;
}

export const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Form State (Single unified form for all jobs)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    targetRole: 'General Application',
    experience: '',
    message: '',
    terms: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    fetchJobs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      } else {
        setError('Unable to load current career opportunities.');
      }
    } catch (err) {
      setError('Connection error to backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [id.replace('app-', '')]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [id.replace('app-', '')]: value }));
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
    const ref = "BAC-APP-" + Math.floor(1000 + Math.random() * 9000);
    setReferenceId(ref);

    const rawSubject = `Job Application Package - ${ref} (${formData.targetRole}) - ${formData.name}`;
    const rawBody =
      `Bhumika Alloy Castings - Candidate Application\n` +
      `----------------------------------------------\n` +
      `Reference ID: ${ref}\n` +
      `Candidate Name: ${formData.name}\n` +
      `Email Address: ${formData.email}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Applied Position: ${formData.targetRole}\n` +
      `Total Experience: ${formData.experience || 'Not specified'}\n` +
      `${selectedFile ? `Attached Resume: ${selectedFile.name}\n` : ''}\n` +
      `[IMPORTANT: Please attach your resume file manually to this email before sending.]\n\n` +
      `Cover Message / Summary:\n` +
      `${formData.message || 'None provided'}\n`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bhumikacastings@gmail.com&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

    // Open Gmail Web compose in a new tab
    window.open(gmailUrl, '_blank');

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      targetRole: 'General Application',
      experience: '',
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
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-secondary" /> JOIN OUR METALLURGICAL TEAM
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2 font-reveal tracking-wide uppercase">
            <span className="text-white">Career </span>
            <span className="text-secondary">Opportunities</span>
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            Build your career with over 29 years of foundry excellence, precision CNC engineering, and high-integrity metallurgical manufacturing in Shimoga.
          </p>
        </div>
      </section>

      {/* Main Content Layout (Jobs on Left, Form on Right) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop grid lg:grid-cols-3 gap-16">
          
          {/* Left: Job Openings List */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <span className="font-label-caps text-label-caps text-secondary mb-4 block uppercase tracking-wider text-xs font-bold">
                OPEN POSITIONS
              </span>
              <h2 className="font-headline-lg text-2xl font-bold mb-6">
                <span className="text-primary">Current </span>
                <span className="text-secondary">Openings</span>
              </h2>

              {isLoading ? (
                <div className="py-12 text-on-surface-variant font-label-caps text-xs flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  Loading Positions...
                </div>
              ) : error ? (
                <p className="text-xs text-red-600 bg-red-50 p-4 rounded border border-red-200">{error}</p>
              ) : jobs.length === 0 ? (
                <div className="border border-primary/10 p-6 rounded-lg text-center space-y-2 bg-steel-plate/30">
                  <h4 className="font-bold text-primary text-sm">No Active Openings</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    We don't have any specific openings right now, but we are always looking for skilled CNC engineers and metallurgists. You can still submit a General Application.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <div 
                      key={job._id || job.jobId}
                      className="p-5 rounded-lg border border-primary/10 bg-white shadow-sm hover:shadow transition-shadow space-y-3"
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] text-secondary font-mono tracking-widest font-bold uppercase mb-1">
                          <span>{job.jobId}</span>
                        </div>
                        <h4 className="font-bold text-primary text-base leading-tight uppercase">
                          {job.title}
                        </h4>
                      </div>
                      
                      {job.description && (
                        <p className="text-on-surface-variant leading-relaxed text-xs">
                          {job.description}
                        </p>
                      )}

                      <div className="pt-2 border-t border-primary/5 flex items-center justify-end text-[11px] text-on-surface-variant/80 font-label-caps font-semibold">
                        <span className="text-secondary bg-secondary/5 px-2 py-0.5 rounded border border-secondary/10 font-bold">
                          Vacancy: {job.vacancy || '1 Position'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Application Form Container */}
          <div className="lg:col-span-2 bg-steel-plate/60 p-8 rounded-lg border border-primary/5 shadow-sm h-fit">
            <span className="font-label-caps text-xs text-secondary font-bold mb-2 block uppercase tracking-wider">
              ONLINE APPLICATION
            </span>
            <h2 className="font-headline-lg text-2xl font-black text-primary mb-6">
              Apply for Career Openings
            </h2>
            
            {!isSubmitted ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-name">
                      Full Name *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="app-name"
                      required
                      type="text"
                      placeholder="Rajesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-email">
                      Email Address *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="app-email"
                      required
                      type="email"
                      placeholder="candidate@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-phone">
                      Contact Number *
                    </label>
                    <input
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="app-phone"
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-targetRole">
                      Target Role / Job Position
                    </label>
                    <select
                      className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                      id="app-targetRole"
                      value={formData.targetRole}
                      onChange={handleInputChange}
                    >
                      <option value="General Application">General Application</option>
                      {jobs.map(job => (
                        <option key={job.jobId} value={`${job.title} (${job.jobId})`}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-experience">
                    Total Experience
                  </label>
                  <input
                    className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input"
                    id="app-experience"
                    type="text"
                    placeholder="e.g. 3.5 Years"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2">
                    Upload Resume (Simulation)
                  </label>
                  <div className="border-2 border-dashed border-outline-variant rounded-lg p-6 bg-white hover:bg-steel-plate/30 transition-all flex flex-col items-center justify-center cursor-pointer relative">
                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      id="app-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                    <UploadCloud className="w-8 h-8 text-outline mb-2" />
                    <p className="text-xs text-primary font-bold">
                      {selectedFile 
                        ? `Selected File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
                        : "Drag and drop or click to upload"
                      }
                    </p>
                    <p className="text-[10px] text-outline mt-1 font-label-caps">
                      Supports PDF, DOC, DOCX, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="app-message">
                    Say About You
                  </label>
                  <textarea
                    className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input h-32"
                    id="app-message"
                    placeholder="Tell us about yourself, your skills, or work experience..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    className="rounded border-outline-variant text-secondary focus:ring-secondary text-xs"
                    id="app-terms"
                    required
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleInputChange}
                  />
                  <label className="text-[11px] text-on-surface-variant cursor-pointer select-none" htmlFor="app-terms">
                    I consent to share this candidate data under Bhumika's recruitment & privacy policies.
                  </label>
                </div>

                <button
                  className="w-full bg-secondary hover:bg-opacity-90 text-white py-4 rounded font-bold transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase font-label-caps cursor-pointer"
                  type="submit"
                >
                  Submit Application Package <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Feedback Screen */
              <div className="flex flex-col items-center text-center py-12 space-y-6 page-transition">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline-md text-2xl font-black text-primary">Application Prepared</h3>
                  <p className="text-xs text-on-surface-variant font-label-caps font-bold">
                    REFERENCE ID: {referenceId}
                  </p>
                </div>
                <p className="text-xs text-on-surface-variant max-w-md leading-relaxed mx-auto">
                  A Gmail draft with your application details has been opened in a new tab to send directly to <strong>bhumikacastings@gmail.com</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=bhumikacastings@gmail.com&su=${encodeURIComponent(`Job Application Package - ${referenceId} (${formData.targetRole}) - ${formData.name}`)}&body=${encodeURIComponent(
                      `Bhumika Alloy Castings - Candidate Application\n` +
                      `----------------------------------------------\n` +
                      `Reference ID: ${referenceId}\n` +
                      `Candidate Name: ${formData.name}\n` +
                      `Email Address: ${formData.email}\n` +
                      `Phone Number: ${formData.phone}\n` +
                      `Applied Position: ${formData.targetRole}\n` +
                      `Total Experience: ${formData.experience || 'Not specified'}\n` +
                      `${selectedFile ? `Attached Resume: ${selectedFile.name}\n` : ''}\n` +
                      `[IMPORTANT: Please attach your resume file manually to this email before sending.]\n\n` +
                      `Cover Message / Summary:\n` +
                      `${formData.message || 'None'}\n`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md uppercase font-label-caps"
                  >
                    <Mail className="w-4 h-4" /> Re-Open in Gmail Web
                  </a>

                  <a
                    href={`mailto:bhumikacastings@gmail.com?subject=${encodeURIComponent(`Job Application Package - ${referenceId} (${formData.targetRole}) - ${formData.name}`)}&body=${encodeURIComponent(
                      `Bhumika Alloy Castings - Candidate Application\n` +
                      `----------------------------------------------\n` +
                      `Reference ID: ${referenceId}\n` +
                      `Candidate Name: ${formData.name}\n` +
                      `Email Address: ${formData.email}\n` +
                      `Phone Number: ${formData.phone}\n` +
                      `Applied Position: ${formData.targetRole}\n` +
                      `Total Experience: ${formData.experience || 'Not specified'}\n` +
                      `${selectedFile ? `Attached Resume: ${selectedFile.name}\n` : ''}\n` +
                      `[IMPORTANT: Please attach your resume file manually to this email before sending.]\n\n` +
                      `Cover Message / Summary:\n` +
                      `${formData.message || 'None'}\n`
                    )}`}
                    className="bg-steel-plate hover:bg-slate-200 text-primary px-5 py-2.5 rounded font-bold text-xs inline-flex items-center gap-2 cursor-pointer border border-primary/10"
                  >
                    <Mail className="w-4 h-4" /> Default Email App
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded font-bold text-xs cursor-pointer"
                    onClick={resetForm}
                  >
                    Submit Another Application
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
