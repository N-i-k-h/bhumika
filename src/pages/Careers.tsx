import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, X, Mail, Send, Award } from 'lucide-react';

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
}

export const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleApplyClick = (job: JobItem) => {
    setSelectedJob(job);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      experience: '',
      email: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace('app-', '')]: value }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const rawSubject = `Job Application: ${selectedJob.title} (${selectedJob.jobId}) - ${formData.name}`;
    const rawBody =
      `Bhumika Alloy Castings - Candidate Application\n` +
      `----------------------------------------------\n` +
      `Target Role: ${selectedJob.title} (${selectedJob.jobId})\n` +
      `Department: ${selectedJob.department}\n` +
      `Location: ${selectedJob.location}\n\n` +
      `Candidate Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Total Experience: ${formData.experience || 'Not specified'}\n` +
      `Email Address: ${formData.email || 'Not specified'}\n\n` +
      `Additional Notes / Summary:\n` +
      `${formData.message || 'None provided'}\n`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bhumikacastings@gmail.com&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

    // Open Gmail Web compose in a new tab
    window.open(gmailUrl, '_blank');

    setIsSubmitted(true);
  };

  return (
    <div className="page-transition min-h-screen bg-surface">
      {/* Hero Section */}
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
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-2xl mt-4 leading-relaxed font-light">
            Build your career with over 29 years of foundry excellence, precision CNC engineering, and high-integrity metallurgical manufacturing in Shimoga.
          </p>
        </div>
      </section>

      {/* Main Jobs Section */}
      <section className="py-20 bg-steel-plate/30 text-primary min-h-[600px] border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="mb-12 border-b border-primary/10 pb-6">
            <div>
              <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-widest block mb-1">
                OPEN POSITIONS
              </span>
              <h2 className="font-headline-lg text-2xl md:text-3xl font-black tracking-wide uppercase text-primary">
                Explore Current <span className="text-secondary">Openings</span>
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="py-24 text-center text-on-surface-variant font-label-caps text-sm flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
              Loading Job Postings...
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center text-red-800 max-w-md mx-auto">
              <p className="text-sm">{error}</p>
              <button 
                onClick={fetchJobs}
                className="mt-4 px-4 py-2 bg-secondary text-white text-xs font-bold rounded uppercase tracking-wider font-label-caps"
              >
                Retry Loading
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-primary/10 p-12 rounded-2xl text-center max-w-xl mx-auto space-y-4 shadow-sm">
              <Briefcase className="w-12 h-12 text-secondary mx-auto opacity-70" />
              <h3 className="font-headline-md text-xl font-bold text-primary">No Open Positions Currently</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed font-body-md">
                We don't have any specific openings right now, but we are always looking for skilled CNC engineers and metallurgists. Feel free to submit an inquiry through our Contact page.
              </p>
            </div>
          ) : (
            /* Industrial Job Cards Grid in White & Orange */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <motion.div
                  key={job._id || job.jobId}
                  whileHover={{ y: -4 }}
                  className="bg-white p-8 rounded-2xl border border-primary/10 hover:border-secondary/50 shadow-sm hover:shadow-xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 premium-card"
                >
                  {/* Top Accent Orange Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-molten-glow to-amber-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>

                  <div className="space-y-6">
                    {/* Top Row: Job ID & Type Badge */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-xs text-secondary font-black tracking-widest bg-secondary/10 border border-secondary/20 px-3 py-1 rounded">
                        {job.jobId}
                      </span>
                      <span className="font-label-caps text-[10px] font-black uppercase tracking-wider bg-steel-plate text-primary px-3 py-1 rounded-full border border-primary/10">
                        {job.type || 'FULL-TIME'}
                      </span>
                    </div>

                    {/* Job Title & Department */}
                    <div>
                      <h3 className="font-headline-lg text-xl md:text-2xl font-black uppercase text-primary tracking-wide group-hover:text-secondary transition-colors">
                        {job.title}
                      </h3>
                      <p className="font-label-caps text-xs text-secondary font-bold tracking-wider mt-1 uppercase">
                        {job.department}
                      </p>
                    </div>

                    {/* Description if present */}
                    {job.description && (
                      <p className="text-xs text-on-surface-variant leading-relaxed font-body-md line-clamp-2">
                        {job.description}
                      </p>
                    )}

                    {/* Location & Shift Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10 text-xs font-label-caps">
                      <div>
                        <span className="text-[10px] text-on-surface-variant/60 block font-bold uppercase tracking-wider mb-1">
                          LOCATION
                        </span>
                        <span className="font-bold text-primary flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                          {job.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-on-surface-variant/60 block font-bold uppercase tracking-wider mb-1">
                          SHIFT
                        </span>
                        <span className="font-bold text-primary flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                          {job.shift}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-8">
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-secondary hover:bg-opacity-95 text-white py-3.5 px-6 rounded-lg font-bold text-xs uppercase font-label-caps tracking-widest flex items-center justify-between cursor-pointer shadow-md shadow-secondary/20 transition-all"
                    >
                      <span>APPLY FOR THIS ROLE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Candidate Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden z-10 my-8"
            >
              {/* Modal Header */}
              <div className="bg-primary p-6 text-white flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-secondary font-black bg-secondary/10 border border-secondary/20 px-2.5 py-0.5 rounded uppercase">
                    {selectedJob.jobId}
                  </span>
                  <h3 className="font-headline-lg text-lg sm:text-xl font-black uppercase text-white tracking-wide mt-2">
                    {selectedJob.title}
                  </h3>
                  <p className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">
                    {selectedJob.department} • {selectedJob.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <p className="text-xs text-on-surface-variant font-body-md leading-relaxed mb-4">
                      Please enter your candidate details below. Submitting will prepare your application and open a pre-filled Gmail draft directly to our recruitment team.
                    </p>

                    {/* Candidate Name */}
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-1.5" htmlFor="app-name">
                        Full Name *
                      </label>
                      <input
                        id="app-name"
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full text-xs p-3 border border-outline-variant rounded-lg bg-steel-plate/30 focus:bg-white rfq-input"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-1.5" htmlFor="app-phone">
                        Phone Number *
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-xs p-3 border border-outline-variant rounded-lg bg-steel-plate/30 focus:bg-white rfq-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Total Experience */}
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-1.5" htmlFor="app-experience">
                          Experience (Optional)
                        </label>
                        <input
                          id="app-experience"
                          type="text"
                          placeholder="e.g. 3 Years"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full text-xs p-3 border border-outline-variant rounded-lg bg-steel-plate/30 focus:bg-white rfq-input"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-1.5" htmlFor="app-email">
                          Email (Optional)
                        </label>
                        <input
                          id="app-email"
                          type="email"
                          placeholder="candidate@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full text-xs p-3 border border-outline-variant rounded-lg bg-steel-plate/30 focus:bg-white rfq-input"
                        />
                      </div>
                    </div>

                    {/* Short Cover Note / Message */}
                    <div>
                      <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-1.5" htmlFor="app-message">
                        Qualifications / Cover Note (Optional)
                      </label>
                      <textarea
                        id="app-message"
                        rows={3}
                        placeholder="Briefly mention your skills, machines operated, or certifications..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full text-xs p-3 border border-outline-variant rounded-lg bg-steel-plate/30 focus:bg-white rfq-input"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-opacity-95 text-white py-3.5 rounded-lg font-bold text-xs uppercase font-label-caps tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-secondary/20 mt-6"
                    >
                      Submit Application <Send className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* Success Feedback Screen */
                  <div className="py-6 text-center space-y-6">
                    <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-headline-md text-xl font-black text-primary uppercase">
                        Application Transmitted
                      </h4>
                      <p className="text-xs text-on-surface-variant font-label-caps font-bold">
                        ROLE: {selectedJob.title} ({selectedJob.jobId})
                      </p>
                    </div>

                    <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                      A Gmail compose draft pre-filled with your details has been opened in a new browser tab to send directly to <strong>bhumikacastings@gmail.com</strong>.
                    </p>

                    <div className="pt-2 flex flex-col gap-3">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=bhumikacastings@gmail.com&su=${encodeURIComponent(`Job Application: ${selectedJob.title} (${selectedJob.jobId}) - ${formData.name}`)}&body=${encodeURIComponent(
                          `Bhumika Alloy Castings - Candidate Application\n` +
                          `----------------------------------------------\n` +
                          `Target Role: ${selectedJob.title} (${selectedJob.jobId})\n` +
                          `Candidate Name: ${formData.name}\n` +
                          `Phone Number: ${formData.phone}\n` +
                          `Experience: ${formData.experience || 'N/A'}\n` +
                          `Email: ${formData.email || 'N/A'}\n\n` +
                          `Notes:\n${formData.message || 'None'}\n`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-xs inline-flex items-center justify-center gap-2 cursor-pointer shadow-md uppercase font-label-caps"
                      >
                        <Mail className="w-4 h-4" /> Re-Open in Gmail Web
                      </a>

                      <button
                        onClick={() => setSelectedJob(null)}
                        className="bg-steel-plate hover:bg-slate-200 text-primary py-2.5 rounded-lg font-bold text-xs uppercase font-label-caps cursor-pointer border border-primary/10"
                      >
                        Done &amp; Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
