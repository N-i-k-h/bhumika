import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, FileText, Send, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';

interface Attachment {
  filename: string;
  size: number;
  mimetype: string;
}

interface DraftData {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  attachments: Attachment[];
  status: string;
}

export const DraftEmail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<DraftData | null>(null);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (id) {
      fetchDraft();
    }
  }, [id]);

  const fetchDraft = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/email/draft/${id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setDraft(data.draft);
        setRecipient(data.draft.recipient);
        setSubject(data.draft.subject);
        setBody(data.draft.body);
      } else {
        setErrorMsg(data.message || 'Draft not found.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      setErrorMsg('To, Subject, and Message Body are required.');
      return;
    }
    setErrorMsg('');
    try {
      const res = await fetch(`/api/email/draft/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipient, subject, body }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Failed to save draft changes.');
      } else {
        setSuccessMsg('Draft changes saved successfully.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      setErrorMsg('Failed to connect to the server to save draft.');
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      setErrorMsg('Recipient email, subject, and message are required.');
      return;
    }

    // Save changes first
    setErrorMsg('');
    setIsSending(true);

    try {
      // 1. Save state to MongoDB
      const saveRes = await fetch(`/api/email/draft/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipient, subject, body }),
      });
      const saveData = await saveRes.json();
      if (!saveRes.ok || !saveData.success) {
        setErrorMsg(saveData.message || 'Failed to save draft changes before sending.');
        setIsSending(false);
        return;
      }

      // 2. Mark draft status as sent in database
      const sendRes = await fetch(`/api/email/draft/${id}/send`, {
        method: 'POST'
      });
      const sendData = await sendRes.json();

      if (sendRes.ok && sendData.success) {
        setSuccessMsg('Transmittal draft finalized! Opening mail client...');
        if (draft) {
          setDraft({ ...draft, status: 'sent' });
        }
        
        // Open Gmail Web Compose in a new window pre-filled with the Cloudinary body links
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
      } else {
        setErrorMsg(sendData.message || 'Failed to update draft status.');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to finalize draft.');
    } finally {
      setIsSending(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-steel-plate/30 flex items-center justify-center p-6 page-transition">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-label-caps text-on-surface-variant font-bold">Loading Transmittal Draft...</p>
        </div>
      </div>
    );
  }

  if (errorMsg && !draft) {
    return (
      <div className="min-h-screen bg-steel-plate/30 flex items-center justify-center p-6 page-transition">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-primary/10 max-w-md w-full text-center space-y-6">
          <div className="inline-flex p-3 rounded-full bg-red-50 text-red-600">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div>
            <h2 className="font-headline-lg text-xl font-black text-primary">Failed to Access Draft</h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={() => navigate('/careers')}
            className="w-full bg-primary hover:bg-opacity-95 text-white font-bold py-3 rounded text-xs uppercase font-label-caps cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Careers
          </button>
        </div>
      </div>
    );
  }

  const isSent = draft?.status === 'sent';

  return (
    <div className="page-transition min-h-screen bg-white">
      {/* Hero Header Section */}
      <section className="bg-primary py-12 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary" /> Email Transmittal Desk
            </span>
            <h1 className="font-headline-xl text-2xl md:text-4xl font-black mt-2 font-reveal tracking-wide uppercase">
              Review &amp; <span className="text-secondary">Send</span> Draft
            </h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded font-bold text-xs uppercase font-label-caps transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </section>

      {/* Main Form Body */}
      <section className="py-16 bg-steel-plate/20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-white p-8 rounded-xl border border-primary/5 shadow-lg space-y-6">
            
            {/* Sent Status Message */}
            {isSent && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex flex-col gap-3 text-green-800 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Transmittal Prepared Successfully</h4>
                    <p className="text-xs mt-1 text-green-700">
                      Your files have been uploaded to Cloudinary. You can open Gmail Web or your Default Email Client to send it from your personal account:
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pl-8">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-650 hover:bg-red-700 text-white px-5 py-2.5 rounded font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-md uppercase font-label-caps"
                  >
                    <Mail className="w-4 h-4" /> Open in Gmail Web
                  </a>

                  <a
                    href={`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                    className="bg-steel-plate hover:bg-slate-200 text-primary px-5 py-2.5 rounded font-bold text-xs inline-flex items-center gap-2 cursor-pointer border border-primary/10 shadow-sm uppercase font-label-caps"
                  >
                    <Mail className="w-4 h-4" /> Default Email App
                  </a>
                </div>
              </div>
            )}

            {/* Error Message banner */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs">{errorMsg}</div>
              </div>
            )}

            {/* Success Message banner */}
            {successMsg && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-800">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs font-bold">{successMsg}</div>
              </div>
            )}

            <form onSubmit={handleSend} className="space-y-6">
              {/* Recipient Field */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="draft-recipient">
                  Recipient Email
                </label>
                <input
                  className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  id="draft-recipient"
                  type="email"
                  required
                  disabled={isSent || isSending}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="recipient@email.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="draft-subject">
                  Email Subject
                </label>
                <input
                  className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  id="draft-subject"
                  type="text"
                  required
                  disabled={isSent || isSending}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Job Application Package"
                />
              </div>

              {/* Attachments Section */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-3">
                  Transmittal Attachments
                </label>
                {draft?.attachments && draft.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {draft.attachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg border border-primary/10 bg-steel-plate/30 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span className="font-medium text-primary truncate">
                            {att.filename}
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-mono bg-white px-2 py-0.5 rounded border border-primary/5">
                            {formatSize(att.size)}
                          </span>
                        </div>
                        <span className="text-[10px] text-secondary font-bold font-label-caps uppercase bg-secondary/5 px-2 py-0.5 rounded">
                          Attached
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg border border-dashed border-primary/10 bg-steel-plate/30 text-center text-xs text-on-surface-variant">
                    No attachments uploaded.
                  </div>
                )}
              </div>

              {/* Email Body Message Field */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase font-label-caps mb-2" htmlFor="draft-body">
                  Email Message Body
                </label>
                <textarea
                  className="w-full text-xs p-3 border border-outline-variant rounded bg-white rfq-input h-64 font-mono disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
                  id="draft-body"
                  required
                  disabled={isSent || isSending}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your email message body..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {!isSent && (
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={handleSave}
                    className="flex-1 bg-white hover:bg-slate-50 text-primary border border-primary/20 py-4 rounded font-bold transition-all text-xs uppercase font-label-caps cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
                  >
                    Save Changes
                  </button>
                )}

                 <button
                  type="submit"
                  disabled={isSent || isSending}
                  className="flex-1 bg-secondary hover:bg-opacity-95 text-white py-4 rounded font-bold transition-all shadow-md flex items-center justify-center gap-2 text-xs uppercase font-label-caps cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSending ? (
                    <>Preparing Transmittal... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                  ) : isSent ? (
                    <>Transmittal Prepared <CheckCircle2 className="w-4 h-4" /></>
                  ) : (
                    <>Prepare Transmittal <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>
    </div>
  );
};
