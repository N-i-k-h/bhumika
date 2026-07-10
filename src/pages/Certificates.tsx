import React, { useState, useEffect } from 'react';
import { Shield, ZoomIn, X, Award } from 'lucide-react';

interface Certificate {
  title: string;
  authority: string;
  scope: string;
  refNumber: string;
  validity: string;
  image?: string;
}

export const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [certificatesList, setCertificatesList] = useState<Certificate[]>([]);

  useEffect(() => {
    fetch('/api/certificates')
      .then(res => {
        if (!res.ok) throw new Error('API server down');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCertificatesList(data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch from server:', err);
      });
  }, []);

  return (
    <div className="bg-surface flex-grow page-transition">
      {/* Hero Section */}
      <section className="relative py-24 bg-alloy-dark text-on-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-alloy-dark to-primary opacity-95 z-0" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <div className="max-w-3xl">
            <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-widest block mb-3">
              STANDARDS & COMPLIANCE
            </span>
            <h1 className="font-headline-xl text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Certifications & Quality Policy
            </h1>
            <p className="font-body-lg text-lg text-surface-variant/80 max-w-2xl leading-relaxed">
              We maintain strict conformity with global aerospace, pressure vessel, and quality management standards. Click any certificate card to view full documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Unified Cards Grid */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificatesList.map((cert, index) => (
              <div 
                key={index}
                onClick={() => setSelectedCert(cert)}
                className="bg-white rounded-xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col premium-card cursor-pointer group"
              >
                {/* 50% Top: Document Preview or Placeholder */}
                <div className="aspect-[4/3] bg-steel-plate relative flex items-center justify-center p-4 border-b border-primary/5 overflow-hidden">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={`${cert.title} Preview`}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <Award className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-label-caps text-[9px] font-bold text-secondary uppercase tracking-wider block">
                          Accreditation Document
                        </span>
                        <span className="text-[10px] text-on-surface-variant/60 font-semibold block mt-1">
                          Document Upload Coming Soon
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-primary px-4 py-2 rounded-lg font-bold text-xs shadow flex items-center gap-2">
                      <ZoomIn className="w-4 h-4 text-secondary" />
                      {cert.image ? "View Document" : "View Details"}
                    </span>
                  </div>
                </div>

                {/* 50% Bottom: Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="bg-secondary/10 text-secondary text-[9px] font-black px-2 py-0.5 rounded font-label-caps inline-block">
                      {cert.title}
                    </span>
                    <h3 className="font-headline-md text-sm font-bold text-primary leading-tight">
                      {cert.authority}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                      {cert.scope}
                    </p>
                  </div>

                  <div className="border-t border-primary/5 pt-3 text-[10px] text-on-surface-variant/60 space-y-1">
                    <div className="flex justify-between">
                      <span>Ref / Registration No:</span>
                      <span className="font-mono font-bold text-primary">{cert.refNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Validity / Status:</span>
                      <span className="font-bold text-secondary">{cert.validity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Detail Modal */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-xl w-full p-6 flex flex-col shadow-2xl relative page-transition border border-primary/10"
          >
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors text-primary cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mt-4 space-y-6">
              <div>
                <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2.5 py-0.5 rounded font-label-caps inline-block mb-2">
                  {selectedCert.title}
                </span>
                <h2 className="font-headline-lg text-2xl font-black text-primary leading-tight">
                  {selectedCert.authority}
                </h2>
              </div>

              {selectedCert.image ? (
                <div className="max-h-[50vh] overflow-y-auto flex justify-center bg-steel-plate p-2 rounded border border-primary/5">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-w-full h-auto object-contain rounded"
                  />
                </div>
              ) : (
                <div className="bg-steel-plate p-6 rounded-lg border border-primary/5 flex flex-col items-center justify-center text-center space-y-3">
                  <Shield className="w-12 h-12 text-secondary" />
                  <div>
                    <h4 className="font-headline-md text-sm font-bold text-primary">Official Certification Document</h4>
                    <p className="text-xs text-on-surface-variant/70 mt-1 max-w-sm">
                      Our official certificate registry is updated dynamically. The verified scanning file for this certification is currently undergoing digital verification and will be viewable soon.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 bg-steel-plate/50 p-4 rounded-lg border border-primary/5">
                <div>
                  <h4 className="font-headline-md text-xs font-bold text-primary uppercase tracking-wider mb-1">Scope of Accreditation</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedCert.scope}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-primary/5 pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-on-surface-variant/60 block">Reference Code</span>
                    <span className="font-mono font-bold text-primary">{selectedCert.refNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant/60 block">Current Status</span>
                    <span className="font-bold text-secondary">{selectedCert.validity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
