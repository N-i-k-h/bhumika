import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product, Customer, Certificate } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to return static asset URL
function getBase64Image(filename) {
  return `/assets/products/${filename}`;
}

export async function seedDatabase(force = false) {
  try {
    const sourceDuplex = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\9d085671-49f0-4983-aac7-30e6f454091c\\media__1784066360373.png";
    const destDuplex = path.join(__dirname, "../public/assets/products/duplex_steel_logo.png");
    if (fs.existsSync(sourceDuplex)) {
      try {
        fs.copyFileSync(sourceDuplex, destDuplex);
        console.log("Successfully copied Duplex Steel logo.");
      } catch (err) {
        console.error("Failed to copy Duplex Steel logo:", err.message);
      }
    }
    const sourceIndo = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\9d085671-49f0-4983-aac7-30e6f454091c\\media__1784066455466.png";
    const destIndo = path.join(__dirname, "../public/assets/products/indo_logo.png");
    if (fs.existsSync(sourceIndo)) {
      try {
        fs.copyFileSync(sourceIndo, destIndo);
        console.log("Successfully copied Indo logo.");
      } catch (err) {
        console.error("Failed to copy Indo logo:", err.message);
      }
    }
    const sourceAstro = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\9d085671-49f0-4983-aac7-30e6f454091c\\media__1784066564043.png";
    const destAstro = path.join(__dirname, "../public/assets/products/astrotech_logo.png");
    if (fs.existsSync(sourceAstro)) {
      try {
        fs.copyFileSync(sourceAstro, destAstro);
        console.log("Successfully copied Astrotech logo.");
      } catch (err) {
        console.error("Failed to copy Astrotech logo:", err.message);
      }
    }
    const sourceLmw = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\9d085671-49f0-4983-aac7-30e6f454091c\\media__1784066595877.png";
    const destLmw = path.join(__dirname, "../public/assets/products/lmw_logo.png");
    if (fs.existsSync(sourceLmw)) {
      try {
        fs.copyFileSync(sourceLmw, destLmw);
        console.log("Successfully copied LMW logo.");
      } catch (err) {
        console.error("Failed to copy LMW logo:", err.message);
      }
    }
    const sourceTms = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\9d085671-49f0-4983-aac7-30e6f454091c\\media__1784066642382.png";
    const destTms = path.join(__dirname, "../public/assets/products/tms_logo.png");
    if (fs.existsSync(sourceTms)) {
      try {
        fs.copyFileSync(sourceTms, destTms);
        console.log("Successfully copied TMS logo.");
      } catch (err) {
        console.error("Failed to copy TMS logo:", err.message);
      }
    }
    const productCount = await Product.countDocuments();
    if (productCount === 0 || force) {
      if (force) {
        await Product.deleteMany({});
        console.log("Cleared products collection.");
      }
      console.log("Seeding products...");
      const productsData = [
        {
          id: 2,
          title: "Valve Body",
          category: "investment",
          image: getBase64Image("valve_body.png"),
          material: "Stainless Steel CF8M / CF3M",
          weight: "1.0 kg – 4.0 kg",
          dimensions: "Height 120 mm, Port Diameter 50 mm",
          description: "Precision investment cast food-grade stainless steel valve bodies. Designed with sanitary tolerances for regulation of high-purity liquids, food ingredients, and steam wash systems.",
          applications: "Food processing machinery lines, sanitary flow control valves, beverage liquid handling, and dairy processing systems.",
          industry: "food"
        },
        {
          id: 8,
          title: "ABS Bracket",
          category: "investment",
          image: getBase64Image("abs_bracket.png"),
          material: "Brass / Bronze Alloy",
          weight: "0.3 kg – 1.5 kg",
          dimensions: "Length 120 mm, Width 40 mm",
          description: "Precision lost-wax investment cast automobile ABS brackets. Engineered to secure anti-lock braking system sensors and components with absolute rigidity.",
          applications: "Automobile anti-lock braking system (ABS) assemblies, sensor mounting brackets, and chassis fittings.",
          industry: "automobile"
        },

        {
          id: 13,
          title: "Sensor Brackets",
          category: "investment",
          image: getBase64Image("image copy 15.png"),
          material: "Stainless Steel 304 / 316",
          weight: "0.3 kg – 0.9 kg",
          dimensions: "80 mm x 50 mm x 40 mm",
          description: "Precision lost-wax investment cast brackets designed for optical and electrical sensors. Cast with high dimensional stability to ensure accurate sensor alignment under extreme operational vibration.",
          applications: "Military defense instrumentation, electronic surveillance enclosures, and industrial automated alignment systems.",
          industry: "automobile"
        },
        {
          id: 14,
          title: "Flap",
          category: "investment",
          image: getBase64Image("flap.png"),
          material: "Inconel 718 / 17-4 PH Stainless Steel",
          weight: "0.5 kg – 2.2 kg",
          dimensions: "Height 100 mm, Outer Diameter 120 mm",
          description: "Precision investment cast automobile flap components. Designed with extreme heat tolerance to regulate high-velocity exhaust gases and bypass flow.",
          applications: "Exhaust gas recirculation (EGR) valves, automobile emission flow control, and engine turbo bypass gates.",
          industry: "automobile"
        },
        {
          id: 15,
          title: "Spindle",
          category: "investment",
          image: getBase64Image("spindle.png"),
          material: "Carbon Steel / Alloy Steel",
          weight: "0.2 kg – 1.0 kg",
          dimensions: "Length 150 mm, Shaft Diameter 20 mm",
          description: "Precision investment cast automotive spindle components. Engineered to withstand high rotational stresses and provide long-lasting alignment accuracy.",
          applications: "Automotive steering knuckle assemblies, wheel hub shafts, and power transmission linkages.",
          industry: "automobile"
        },
        {
          id: 16,
          title: "Camping Nut",
          category: "investment",
          image: getBase64Image("camping_nut.png"),
          material: "Stainless Steel CF8M / CF3M (Food Grade)",
          weight: "0.15 kg – 0.5 kg",
          dimensions: "M24 Hexagonal thread, outer width 46mm, height 28mm",
          description: "Precision investment cast food-grade stainless steel camping nut. Engineered to provide exceptional chemical resistance and structural integrity under sanitary cleaning and food process steam washdowns.",
          applications: "Sanitary processing pipelines, food preparation mixers, pharmaceutical production lines, and high-pressure fluid flow components.",
          industry: "food"
        },
        {
          id: 17,
          title: "Dosing Head",
          category: "investment",
          image: getBase64Image("dosing_head.png"),
          material: "Stainless Steel CF8M / CF3M (Food Grade)",
          weight: "1.2 kg – 4.5 kg",
          dimensions: "Diameter 180mm, Height 65mm",
          description: "Precision investment cast food-grade stainless steel dosing head. Designed for sanitary liquid filling, flow regulation, and precise dispensing systems with zero pocket areas to prevent bacterial growth.",
          applications: "Automated liquid filling machines, food & beverage packaging systems, dairy process plants, and pharmaceutical dosage equipment.",
          industry: "food"
        },
        {
          id: 18,
          title: "Tube",
          category: "investment",
          image: getBase64Image("tube.png"),
          material: "Stainless Steel CF8M / 316L (Chemical Grade)",
          weight: "2.5 kg – 8.0 kg",
          dimensions: "Outer Diameter 120mm, Inner Diameter 90mm, Length 140mm",
          description: "Precision investment cast chemical-grade stainless steel heavy tube section. Features exceptionally smooth internal and external finishes, engineered to withstand aggressive chemical dye flows and high pressure within textile processing systems.",
          applications: "Chemical dye transport lines, textile finishing machinery, print wash systems, and fluid mixing assemblies.",
          industry: "textile"
        },
        {
          id: 19,
          title: "Shearing Ring",
          category: "investment",
          image: getBase64Image("shearing_ring.png"),
          material: "Super Duplex Stainless Steel (UNS S32750 / 2507)",
          weight: "0.1 kg – 0.4 kg",
          dimensions: "Outer Diameter 210mm, Inner Diameter 198mm, Thickness 6mm",
          description: "Precision investment cast super duplex stainless steel shearing ring. Engineered with extreme tensile strength and excellent localized corrosion resistance to withstand high-velocity saline water flow and high pressure within reverse osmosis systems.",
          applications: "Reverse Osmosis (RO) high-pressure pumps, desalination plant separation housings, and industrial filtration components.",
          industry: "reverse_osmosis"
        },
        {
          id: 20,
          title: "Impeller",
          category: "investment",
          image: getBase64Image("impeller.png"),
          material: "Stainless Steel CF8M / Bronze Alloy",
          weight: "1.5 kg – 5.2 kg",
          dimensions: "Diameter 220mm, Height 55mm",
          description: "Precision investment cast closed-vane fluid impeller. Designed with hydraulically balanced curved vanes for optimal hydrodynamic flow efficiency, low turbulence, and wear-free fluid rotation in industrial pumping systems.",
          applications: "Centrifugal water pumps, chemical mixing systems, industrial cooling towers, and liquid circulation equipment.",
          industry: "others"
        },
        {
          id: 21,
          title: "FC Port",
          category: "investment",
          image: getBase64Image("fc_port.png"),
          material: "Low Temperature Carbon Steel (SA352 W2)",
          weight: "1.8 kg – 4.0 kg",
          dimensions: "Flange Outer Diameter 160mm, Port Bore 95mm, Height 110mm",
          description: "Precision investment cast low-temperature carbon steel flow control port flange. Features threaded neck and high-precision locking slots, designed for regulating flow rate and pressure control in high-pressure reverse osmosis water systems.",
          applications: "Reverse osmosis high-pressure filtration manifolds, saline water pressure control systems, and industrial water desalination ports.",
          industry: "reverse_osmosis"
        },
        {
          id: 22,
          title: "Hammer",
          category: "investment",
          image: getBase64Image("hammer.png"),
          material: "High-Tensile Carbon Steel / Alloy Steel",
          weight: "0.6 kg – 1.8 kg",
          dimensions: "Length 145mm, Face Diameter 40mm",
          description: "Precision investment cast high-tensile claw hammer head. Features a textured checkered striking face for slip prevention and a deep split claw designed for maximum nail-pulling leverage. Heat-treated for outstanding impact durability.",
          applications: "Heavy-duty construction hand tools, carpentry operations, manufacturing assembly processes, and general maintenance hardware.",
          industry: "others"
        },
        {
          id: 23,
          title: "Gland",
          category: "investment",
          image: getBase64Image("gland.png"),
          material: "Stainless Steel CF8M / CF8",
          weight: "0.8 kg – 2.5 kg",
          dimensions: "Inner Arc Diameter 150mm, Outer Flange Width 240mm, Height 160mm",
          description: "Precision investment cast stainless steel packing gland split flange. Designed to provide rigid shaft support and compressive seal pressure in heavy fluid pumps, valves, and rotating shafts.",
          applications: "Industrial centrifugal pumps, gland packing assemblies, process steam valves, and marine stern tube seals.",
          industry: "others"
        }
      ];

      await Product.insertMany(productsData);
      console.log(`Successfully seeded ${productsData.length} products!`);
    }

    const customerCount = await Customer.countDocuments();
    if (customerCount === 0 || force) {
      if (force) {
        await Customer.deleteMany({});
        console.log("Cleared customers collection.");
      }
      console.log("Seeding customers...");
      const customersData = [
        {
          company: "Pentair",
          logo: getBase64Image("image copy.png"),
          quote: "Consistently delivering high-precision valve bodies with zero defect tolerance and excellent consistency."
        },
        {
          company: "ProMinent",
          logo: getBase64Image("image copy 2.png"),
          quote: "Outstanding casting quality for critical pump housings with highly reliable lead times since 2018."
        },
        {
          company: "Bruker",
          logo: getBase64Image("image copy 3.png"),
          quote: "Excellent dimensional accuracy and sub-micron machining tolerances for our analytical chambers."
        },
        {
          company: "Trelleborg",
          logo: getBase64Image("image copy 4.png"),
          quote: "Exceptional metallurgical density and uniform crystallization structure across all our centrifugal sleeves."
        },
        {
          company: "Indo-MIM",
          logo: getBase64Image("indo_logo.png"),
          quote: "High-quality casting products and sub-assemblies for our demanding defense and automotive lines."
        },
        {
          company: "Astrotech Steels Private Limited",
          logo: getBase64Image("astrotech_logo.png"),
          quote: "Reliable high-quality casting products with exceptional metallurgical conformity and timely deliveries."
        },
        {
          company: "LMW (Lakshmi Machine Works)",
          logo: getBase64Image("lmw_logo.png"),
          quote: "High-grade precision components meeting our exacting textile machinery tolerances for long life."
        },
        {
          company: "TMS India",
          logo: getBase64Image("tms_logo.png"),
          quote: "Dense, defect-free casting components for our specialized industrial machinery with full traceability."
        }
      ];

      await Customer.insertMany(customersData);
      console.log(`Successfully seeded ${customersData.length} customers!`);
    }

    const certCount = await Certificate.countDocuments();
    if (certCount === 0 || force) {
      if (force) {
        await Certificate.deleteMany({});
        console.log("Cleared certificates collection.");
      }
      console.log("Seeding certificates...");
      const certificatesData = [
        {
          title: "Quality Policy (QP/01)",
          authority: "Bhumika Alloy Castings Pvt. Ltd.",
          scope: "Management commitment to deliver castings and components that meet customer expectations through continual improvement and providing training to all levels to achieve the quality objectives.",
          refNumber: "QP/01",
          validity: "Implemented June 2008 (Active)",
          image: getBase64Image("quality_policy.png")
        }
      ];

      await Certificate.insertMany(certificatesData);
      console.log(`Successfully seeded ${certificatesData.length} certificates!`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Support running directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  dotenv.config({ path: path.join(__dirname, '.env') });
  const URI = process.env.MONGO_URI || "mongodb+srv://nikhilkashyapkn_db_user:bhumika@cluster0.pblbglz.mongodb.net/?appName=Cluster0";
  mongoose.connect(URI)
    .then(async () => {
      console.log("Standalone seed connected to MongoDB. Seeding...");
      await seedDatabase(true);
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB.");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
