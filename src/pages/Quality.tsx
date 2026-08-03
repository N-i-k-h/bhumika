import React, { useEffect } from 'react';
import { ShieldCheck, Flame, Scale } from 'lucide-react';
import impactTestingImg from '../assets/impact_testing_machine.png';
import brinellHardnessImg from '../assets/brinell_hardness_testing_machine.png';
import universalTestingImg from '../assets/universal_testing_machine.png';
import dimensionalImg from '../assets/dimensional_inspection.png';
import microscopeImg from '../assets/metallurgical_microscope.png';
import spectrometerImg from '../assets/spectrometer.png';

interface TestingMachine {
  title: string;
  category: string;
  description: string;
  image: string;
  specs: string[];
}

const testingMachines: TestingMachine[] = [
  {
    title: "Optical Emission Spectrometer",
    category: "Chemical Composition",
    description: "Determines precise chemical and elemental makeup of cast melts. Helps verify alloying compliance (Carbon, Manganese, Chrome, Nickel) before mold pouring.",
    image: spectrometerImg,
    specs: ["Metromaxx Analyzer", "Multi-base capability", "Fe, Ni, Co alloy matrices"]
  },
  {
    title: "Metallographic Microscope",
    category: "Microstructure Analysis",
    description: "Enables deep evaluation of metal crystalline structures, grain sizes, heat-treat phase transformations, and graphite nodularity distribution.",
    image: microscopeImg,
    specs: ["High-magnification optics", "Image analyzer software", "Grain-size verification"]
  },
  {
    title: "Universal Testing Machine (UTM)",
    category: "Mechanical Testing",
    description: "Measures tensile load capability, yield point, ultimate tensile strength (UTS), and elongation percentage of casting test specimens.",
    image: universalTestingImg,
    specs: ["Tensile & compression", "Specimen yield tracking", "Load vs displacement curves"]
  },
  {
    title: "Brinell Hardness Tester",
    category: "Hardness Verification",
    description: "Presses a heavy carbide ball indenter under calibrated loads into polished castings to measure exact Brinell (HBW) hardness levels.",
    image: brinellHardnessImg,
    specs: ["Conforms to ASTM standards", "Heavy-duty load cells", "Accurate heat-treatment validation"]
  },
  {
    title: "Charpy / Izod Impact Tester",
    category: "Toughness & Ductility",
    description: "Measures the impact energy absorbed during high-rate crack propagation in notched specimens. Crucial for high-impact industrial parts.",
    image: impactTestingImg,
    specs: ["Charpy pendulum arm", "Dial energy scale", "Fracture toughness check"]
  },
  {
    title: "Precision Metrology & Height Gauging",
    category: "Dimensional Inspection",
    description: "Detailed measurement of critical diameters, lengths, and concentricity using digital vernier calipers, digital height gauges, and micro-indicators.",
    image: dimensionalImg,
    specs: ["Digital height master", "Granite surface plate", "Traceable calibration gauges"]
  }
];

export const Quality: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            QUALITY ASSURANCE DEPARTMENT
          </span>
          <h1 className="font-headline-xl text-4xl md:text-6xl font-black mt-2 leading-tight">
            Quality Assurance
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-2xl mt-4 leading-relaxed font-light font-sans">
            At BHUMIKA ALLOY CASTINGS, we are committed to delivering the highest quality castings. Our shell moulding process includes rigorous quality control measures at every stage, from raw material selection to final inspection. We employ advanced testing methods, including dimensional inspection, metallurgical analysis, and non-destructive testing, to ensure that each casting meets the stringent standards of quality and performance.
          </p>
        </div>
      </section>

      {/* Core Quality Pillars */}
      <section className="py-16 bg-white border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-steel-plate rounded-lg border-l-4 border-secondary flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-secondary/10 rounded flex items-center justify-center text-secondary mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-lg font-bold text-primary mb-2">Rigorous Inspection</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Every batch is inspected at multiple control gates, ensuring zero-defect workflow routing from core assembly to shipment.
                </p>
              </div>
            </div>

            <div className="p-6 bg-steel-plate rounded-lg border-l-4 border-secondary flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-secondary/10 rounded flex items-center justify-center text-secondary mb-4">
                  <Flame className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-lg font-bold text-primary mb-2">Metallurgical Verification</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Advanced spectro and micro-grain checks confirm alloy properties meet exact ASTM, BS, or ISO specifications.
                </p>
              </div>
            </div>

            <div className="p-6 bg-steel-plate rounded-lg border-l-4 border-secondary flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-secondary/10 rounded flex items-center justify-center text-secondary mb-4">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-lg font-bold text-primary mb-2">Dimensional Precision</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  Calibrated verniers, height masters, and gauges check structural boundaries, guaranteeing parts fit perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Equipment & Infrastructure */}
      <section className="py-20 bg-steel-plate/30">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              LABORATORY INFRASTRUCTURE
            </span>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-black text-primary">
              Advanced Quality Testing Equipment
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-4 max-w-xl mx-auto">
              Our in-house metrology, chemical, and mechanical testing laboratories are fully outfitted with state-of-the-art instruments for comprehensive casting validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testingMachines.map((machine, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col premium-card group animate-fadeIn"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] bg-steel-plate relative flex items-center justify-center border-b border-primary/5 overflow-hidden">
                  <img 
                    src={machine.image} 
                    alt={machine.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold font-label-caps px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                    {machine.category}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-base font-black text-primary leading-tight group-hover:text-secondary transition-colors">
                      {machine.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {machine.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
