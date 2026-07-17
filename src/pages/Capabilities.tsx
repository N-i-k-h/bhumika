import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Settings, Layers, Zap } from 'lucide-react';
import waxInjectionImg from '../assets/wax_injection.png';
import preAssemblyImg from '../assets/pre_assembly.png';
import shellBuildingImg from '../assets/DSC02302.JPG';
import dewaxingImg from '../assets/image copy 13.png';
import shellFiringKilnImg from '../assets/DSC01818 (1).JPG';
import shellFiringImg from '../assets/image copy 9.png';
import knockoutImg from '../assets/knockout.png';
import fettlingImg from '../assets/DSC02041.JPG';
import cuttingImg from '../../public/assets/images/gallery/photo_5.jpg';
import heatTreatmentImg from '../assets/image copy 14.png';
import shotBlastingImg from '../assets/shot_blasting.png';
import grindingImg from '../assets/DSC01997.JPG';
import testingImg from '../../public/assets/images/gallery/photo_14.jpg';
import centrifugalImg from '../assets/Screenshot 2026-07-09 122649.png';
import vmcMachiningImg from '../assets/image copy 8.png';
import moldPrepImg from '../assets/Screenshot 2026-07-09 173251.png';
import pouringImg from '../assets/DSC01737.JPG';
import pouringMainImg from '../assets/pouring_main.png';
import heatTreatmentCentrifugalImg from '../assets/heat_treatment_centrifugal.png';
import finishMachiningImg from '../assets/finish_machining.png';
import cncTurningImg from '../assets/cnc_turning.png';

interface GalleryItem {
  title: string;
  subtitle: string;
  desc: string;
  image?: string;
}

const investmentSteps: GalleryItem[] = [
  {
    title: "Wax Injection",
    subtitle: "Creating Replica Patterns",
    desc: "Molten wax is injected into highly polished steel dies under pressure to form precise wax patterns that duplicate the final component geometry, accounting for shrinkage.",
    image: waxInjectionImg
  },
  {
    title: "Pre-Assembly",
    subtitle: "Wax Tree Fabrication",
    desc: "Individual wax patterns are welded onto a central wax sprue (runner system) by skilled operators to create a tree structure, enabling efficient batch pouring.",
    image: preAssemblyImg
  },
  {
    title: "Shell Building",
    subtitle: "Ceramic Mold Layering",
    desc: "The tree assembly is dipped repeatedly into liquid ceramic slurry and coated with fine silica sand (stucco). Each layer is dried to build a thick refractory shell capable of holding molten metal.",
    image: shellBuildingImg
  },
  {
    title: "Dewaxing",
    subtitle: "Steam Autoclave Wax Removal",
    desc: "The shell is placed in a high-pressure steam autoclave. The wax melts and drains out, leaving behind a hollow ceramic mold containing the precise cavity of the parts.",
    image: dewaxingImg
  },
  {
    title: "Shell Firing",
    subtitle: "Mold Sintering",
    desc: "The empty ceramic shells are fired in high-temperature ovens (around 1000°C) to strengthen the ceramic structure and remove any residual moisture or wax, preparing them for receiving molten metal.",
    image: shellFiringKilnImg
  },
  {
    title: "Pouring",
    subtitle: "High-Temp Alloy Transfer",
    desc: "Molten metal is tapped from induction furnaces into a ladle and carefully poured into the preheated ceramic shells to form the cast parts.",
    image: pouringMainImg
  },
  {
    title: "Knockout",
    subtitle: "Mechanical Shell Removal",
    desc: "Once the poured metal cools and solidifies, the ceramic mold is cracked open and removed using pneumatic hammers and high-frequency vibration units.",
    image: knockoutImg
  },
  {
    title: "Cutting",
    subtitle: "Runner Separation",
    desc: "Individual castings are mechanically cut off from the main central runner tree system using abrasive cut-off wheels and band saws, cleanly separating each component.",
    image: cuttingImg
  },
  {
    title: "Fettling",
    subtitle: "Gate Removal & Dressing",
    desc: "Remaining gate stubs and flash are dressed and blended to flush tolerances using grinding wheels and pneumatic tools, preparing the surface for finishing.",
    image: fettlingImg
  },
  {
    title: "Heat Treatment",
    subtitle: "Thermal Refinement",
    desc: "Castings undergo specialized heat treatment cycles (such as normalizing, tempering, or solution annealing) to refine their grain structure and achieve the required mechanical properties.",
    image: heatTreatmentImg
  },
  {
    title: "Shot Blasting",
    subtitle: "Surface Texturing & Cleaning",
    desc: "Parts are shot blasted with high-velocity steel grit to remove any remaining microscopic ceramic particles, achieving a clean, satin surface finish.",
    image: shotBlastingImg
  },
  {
    title: "Grinding & Gunwork",
    subtitle: "Gate Dressing & Cleaning",
    desc: "Operators use grinding wheels and specialized pneumatic tools to dress and blend the remaining runner gates on the casting surface to flush tolerances.",
    image: grindingImg
  },
  {
    title: "Inspection & Testing",
    subtitle: "Zero-Defect Quality Control",
    desc: "Final castings undergo rigorous checks: chemical spectrometry, dye-penetrant (FPI) cracks search, dimensional reports, and final visual verification before packaging.",
    image: testingImg
  }
];

const centrifugalSteps: GalleryItem[] = [
  {
    title: "Mold Preparation",
    subtitle: "Die Coating & Preheating",
    desc: "The cylindrical steel mold is cleaned, preheated, and coated with a refractory slurry. This coating protects the mold and ensures smooth casting extraction.",
    image: moldPrepImg
  },
  {
    title: "Pouring & Spinning",
    subtitle: "High-Speed Rotation",
    desc: "Molten metal is poured into the spinning mold. High centrifugal force holds the liquid metal against the walls, while lighter impurities float to the center bore.",
    image: pouringImg
  },
  {
    title: "Heat Treatment",
    subtitle: "Microstructure Refinement",
    desc: "Castings undergo thermal cycles (normalizing or tempering) to release internal spin stresses and refine the crystalline grain structure for strength.",
    image: heatTreatmentCentrifugalImg
  },
  {
    title: "Finish Machining",
    subtitle: "Boring & Dressing",
    desc: "The inner slag-rich layer is bored out, and the outer diameter is turned to the precise microns required on finish drawings.",
    image: finishMachiningImg
  }
];

export const Capabilities: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="page-transition">
      {/* Inner Page Hero */}
      <section className="bg-primary py-20 text-on-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#C15C26_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop relative z-10">
          <span className="font-label-caps text-xs text-molten-glow uppercase tracking-widest">
            METALLURGY &amp; ENGINEERING
          </span>
          <h1 className="font-headline-xl text-3xl md:text-5xl font-black mt-2">
            Processes &amp; Materials
          </h1>
          <p className="font-body-lg text-sm md:text-base text-surface-variant max-w-xl mt-4 leading-relaxed font-light">
            Review the technical boundaries of our Investment Casting, Centrifugal Casting, CNC tolerances, and chemical alloy spectrum.
          </p>
        </div>
      </section>

      {/* Process Deep Dives - Part 1 */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          {/* Investment Casting */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="investment">
            <div className="space-y-6">
              <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider block">
                PROCESS 01
              </span>
              <h2 className="font-headline-lg text-3xl font-extrabold text-primary molten-border pb-4">
                Precision Investment Casting
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Our investment casting uses the <strong>lost-wax injection technique</strong> to produce near-net-shape components. Wax patterns are pressed, assembled into clusters (trees), coated in refractory ceramic, fired to melt out the wax, and filled with custom molten alloys.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-label-caps">
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">WEIGHT SPECS</span>
                  10 grams up to 20 kilograms
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">SURFACE FINISH</span>
                  3.2 µm Ra or better
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">TYPICAL TOLERANCE</span>
                  ±0.37 mm
                </div>
                <div className="bg-steel-plate p-4 rounded border-l-4 border-molten-glow">
                  <span className="text-secondary block font-bold mb-1">BEST FOR</span>
                  Complex Geometry
                </div>
              </div>
            </div>
             <div className="aspect-video bg-steel-plate rounded-lg overflow-hidden shadow-md">
              <img
                className="w-full h-full object-cover"
                alt="Molten metal pouring into ceramic shells"
                src={pouringMainImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-process flow timeline */}
      <section className="py-20 bg-steel-plate/30 border-t border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest text-xs font-bold">
              PRODUCTION WORKFLOW
            </span>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-black text-primary">
              Investment Casting Sub-Processes
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-4 max-w-xl mx-auto">
              Follow our comprehensive 10-step lost-wax casting cycle, engineered to deliver absolute dimensional precision and zero metallurgical defects.
            </p>
          </div>

          <div className="flex flex-row lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-x-visible gap-4 pb-6 lg:pb-0 scrollbar-container">
            {investmentSteps.map((step, idx) => (
               <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col premium-card w-[240px] sm:w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink"
              >
                <div className="aspect-square bg-steel-plate rounded overflow-hidden mb-3 flex flex-col items-center justify-center border border-primary/5 relative">
                  {step.image ? (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0" />
                      <span className="text-[10px] text-on-surface-variant/60 font-semibold relative z-10 text-center px-3">
                        Image Placeholder<br />[ {step.title} ]
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-label-caps">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline-md text-xs font-black text-primary truncate leading-tight">
                    {step.title}
                  </h3>
                </div>
                <h4 className="text-[9px] font-semibold text-secondary italic mb-1.5 truncate">
                  {step.subtitle}
                </h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed line-clamp-3">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Deep Dives - Part 2 */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop space-y-28">
          {/* Centrifugal Casting */}
          <div className="grid md:grid-cols-2 gap-16 items-center" id="centrifugal">
            <div className="md:order-2 space-y-6">
              <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider block">
                PROCESS 02
              </span>
              <h2 className="font-headline-lg text-3xl font-extrabold text-primary molten-border pb-4">
                Horizontal Centrifugal Casting
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                By introducing molten alloy into a <strong>rapidly rotating steel die</strong>, centrifugal force pushes the liquid metal outwards. Impurities and lighter slag float to the hollow inner bore (which is later machined away), creating a completely dense metal wall with uniform grain crystallization and zero internal gas pockets.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-label-caps">
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">WEIGHT RANGE</span>
                  5 Kgs – 500 Kgs
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">OD RANGE</span>
                  60 – 400 mm
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">MIN ID</span>
                  50 mm
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">MAX LENGTH</span>
                  2500 mm
                </div>
              </div>
            </div>
            <div className="md:order-1 aspect-video bg-steel-plate rounded-lg overflow-hidden shadow-md">
              <img
                className="w-full h-full object-cover"
                alt="Centrifugal spinning alloy cylinder"
                src={centrifugalImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Centrifugal Sub-process flow */}
      <section className="py-20 bg-steel-plate/30 border-t border-b border-primary/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-secondary mb-2 block uppercase tracking-widest text-xs font-bold">
              SPINNING WORKFLOW
            </span>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-black text-primary">
              Centrifugal Casting Sub-Processes
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant mt-4 max-w-xl mx-auto">
              Follow our horizontal centrifugal casting method, designed to eliminate internal gas cavities and deliver maximum structural density.
            </p>
          </div>

          <div className="flex flex-row lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-x-visible gap-4 pb-6 lg:pb-0 scrollbar-container">
            {centrifugalSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-primary/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col premium-card w-[240px] sm:w-[280px] lg:w-auto flex-shrink-0 lg:flex-shrink"
              >
                <div className="aspect-square bg-steel-plate rounded overflow-hidden mb-3 flex flex-col items-center justify-center border border-primary/5 relative">
                  {step.image ? (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 z-0" />
                      <span className="text-[10px] text-on-surface-variant/60 font-semibold relative z-10 text-center px-3">
                        Image Placeholder<br />[ {step.title} ]
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-label-caps">
                    STEP {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline-md text-xs font-black text-primary truncate leading-tight">
                    {step.title}
                  </h3>
                </div>
                <h4 className="text-[9px] font-semibold text-secondary italic mb-1.5 truncate">
                  {step.subtitle}
                </h4>
                <p className="text-[10px] text-on-surface-variant leading-relaxed line-clamp-3">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CNC & VMC Precision Machining */}
      <section className="py-20 bg-white" id="machining">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider block">
                MACHINING
              </span>
              <h2 className="font-headline-lg text-3xl font-extrabold text-primary molten-border pb-4">
                CNC &amp; VMC Finish Machining
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Providing raw castings often leaves complex features unfinished. Bhumika's in-house machine shop bridges this gap by offering both <strong>CNC Turning</strong> and <strong>VMC (Vertical Machining Center) Milling</strong>, finishing parts to absolute tolerances.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-label-caps">
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">MACHINING LIMITS</span>
                  Sub-micron dimensional range
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">VALIDATION SYSTEM</span>
                  Optical Profile Projector
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">DRILLING/MILLING</span>
                  High-speed vertical VMC centers
                </div>
                <div className="bg-steel-plate p-4 rounded">
                  <span className="text-secondary block font-bold mb-1">ADVANTAGE</span>
                  Turnkey cast-to-spec parts
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-steel-plate rounded-lg overflow-hidden shadow-md relative group">
                <img
                  className="w-full h-full object-cover"
                  alt="CNC turning lathe carving steel"
                  src={cncTurningImg}
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-label-caps py-1.5 px-3">
                  CNC Turning
                </div>
              </div>
              <div className="aspect-[4/3] bg-steel-plate rounded-lg overflow-hidden shadow-md relative group">
                <img
                  className="w-full h-full object-cover"
                  alt="VMC vertical milling center in action"
                  src={vmcMachiningImg}
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] font-label-caps py-1.5 px-3">
                  VMC Vertical Milling
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Process Comparison Table */}
      <section className="py-20 bg-steel-plate">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <h2 className="font-headline-lg text-2xl font-bold text-primary mb-8 text-center">
            Technical Process Comparison Matrix
          </h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-primary/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary text-on-primary font-label-caps text-xs">
                  <th className="p-4 border-b border-primary/10">CASTING METHOD</th>
                  <th className="p-4 border-b border-primary/10">WEIGHT RANGE</th>
                  <th className="p-4 border-b border-primary/10">TOLERANCE CAPABILITY</th>
                  <th className="p-4 border-b border-primary/10">SURFACE FINISH (Ra)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5 font-body-md text-xs text-on-surface-variant">
                <tr>
                  <td className="p-4 font-bold text-primary">Investment Casting</td>
                  <td className="p-4">10 g – 20 kg</td>
                  <td className="p-4">±0.37 mm</td>
                  <td className="p-4">3.2 – 6.3 µm</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-primary">Centrifugal Casting</td>
                  <td className="p-4">5 kg – 500 kg</td>
                  <td className="p-4">Machined bore (±0.01 mm)</td>
                  <td className="p-4">Machined finishes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Metallurgical Materials Matrix */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-margin-desktop">
          <div className="text-center mb-16 max-w-xl mx-auto">
            <span className="font-label-caps text-label-caps text-secondary block mb-2 uppercase tracking-widest text-xs">
              METALLURGY PORTFOLIO
            </span>
            <h2 className="font-headline-lg text-3xl font-black text-primary">
              Supported Alloy Materials
            </h2>
            <p className="text-sm text-on-surface-variant mt-3">
              We cast a broad spectrum of ferrous and high-heat alloys conforming to ASTM, BS, DIN, and custom corporate engineering standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Stainless Steels */}
            <div className="p-6 border border-primary/10 rounded-lg hover:border-secondary transition-all">
              <h4 className="font-headline-md text-base font-bold text-primary mb-3 flex items-center justify-between">
                Stainless Steel Alloys <Shield className="w-5 h-5 text-secondary" />
              </h4>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Corrosion-resistant and precipitation hardening steel castings ideal for chemical flow valves, aerospace fittings, instrumentation housings, and fluid engineering.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-label-caps text-primary">
                <span className="bg-steel-plate px-2 py-1 rounded">CF8 (304)</span>
                <span className="bg-steel-plate px-2 py-1 rounded">CF3 (304L)</span>
                <span className="bg-steel-plate px-2 py-1 rounded">CF8M (316)</span>
                <span className="bg-steel-plate px-2 py-1 rounded">CF3M (316L)</span>
                <span className="bg-steel-plate px-2 py-1 rounded">CB7Cu-1 (17-4 PH)</span>
                <span className="bg-steel-plate px-2 py-1 rounded">1.4841</span>
                <span className="bg-steel-plate px-2 py-1 rounded">1.4785</span>
                <span className="bg-steel-plate px-2 py-1 rounded">1.4845</span>
                <span className="bg-steel-plate px-2 py-1 rounded">1.4408</span>
                <span className="bg-steel-plate px-2 py-1 rounded">1.4864</span>
              </div>
            </div>

            {/* Super Duplex Steel */}
            <div className="p-6 border border-primary/10 rounded-lg hover:border-secondary transition-all">
              <h4 className="font-headline-md text-base font-bold text-primary mb-3 flex items-center justify-between">
                Super Duplex Steel <Zap className="w-5 h-5 text-secondary" />
              </h4>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                High-strength duplex and super duplex alloys offering superior resistance to pitting, crevice corrosion, and stress corrosion cracking in aggressive environments.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-label-caps text-primary">
                <span className="bg-steel-plate px-2 py-1 rounded">CD4MCuN</span>
                <span className="bg-steel-plate px-2 py-1 rounded">CD3MWCuN</span>
              </div>
            </div>

            {/* Carbon & Low Alloys */}
            <div className="p-6 border border-primary/10 rounded-lg hover:border-secondary transition-all">
              <h4 className="font-headline-md text-base font-bold text-primary mb-3 flex items-center justify-between">
                Carbon &amp; Low Alloy Steels <Settings className="w-5 h-5 text-secondary" />
              </h4>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Providing high structural tensile strength, weldability, and impact endurance for structural heavy machine blocks.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-label-caps text-primary">
                <span className="bg-steel-plate px-2 py-1 rounded">LCB / LCC</span>
                <span className="bg-steel-plate px-2 py-1 rounded">4130 / 8620</span>
              </div>
            </div>

            {/* Mild Steel */}
            <div className="p-6 border border-primary/10 rounded-lg hover:border-secondary transition-all">
              <h4 className="font-headline-md text-base font-bold text-primary mb-3 flex items-center justify-between">
                Mild Steel <Layers className="w-5 h-5 text-secondary" />
              </h4>
              <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                Versatile mild steel grades suited for general-purpose structural castings, valve bodies, and industrial fittings requiring good machinability and weldability.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-label-caps text-primary">
                <span className="bg-steel-plate px-2 py-1 rounded">IC1020</span>
                <span className="bg-steel-plate px-2 py-1 rounded">C12-3</span>
                <span className="bg-steel-plate px-2 py-1 rounded">C40</span>
                <span className="bg-steel-plate px-2 py-1 rounded">WCB</span>
                <span className="bg-steel-plate px-2 py-1 rounded">WCC</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
