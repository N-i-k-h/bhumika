import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Product, Customer, Certificate } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to convert local asset to base64
function getBase64Image(filename) {
  const assetPath = path.join(__dirname, '..', 'src', 'assets', filename);
  try {
    if (fs.existsSync(assetPath)) {
      const ext = path.extname(filename).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
      const fileBuffer = fs.readFileSync(assetPath);
      return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    }
  } catch (err) {
    console.error(`Error reading asset ${filename}:`, err);
  }
  return ''; // Fallback
}

export async function seedDatabase(force = false) {
  try {
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
          title: "Centrifugal Cylinder Sleeves",
          category: "centrifugal",
          image: getBase64Image("image.png"),
          material: "Stainless Steel ASTM A351 CF8M / CF3M",
          weight: "1.2 kg – 4.5 kg",
          dimensions: "Inside bore diameter up to 180 mm",
          description: "Centrifugally cast structural sleeves showing uniform grain structure and slag-free internal bores. Excellent resistance to wear and thermal corrosion.",
          applications: "Heavy pump housings, chemical dosing assemblies, and cylinder sleeve linings."
        },
        {
          id: 3,
          title: "Machined Outlet Rings",
          category: "investment",
          image: getBase64Image("DSC01046.JPG"),
          material: "Nickel Alloy Monel 400 / K500",
          weight: "0.8 kg – 3.2 kg",
          dimensions: "Outside diameter up to 150 mm",
          description: "Precision investment cast rings offering high resistance to marine corrosion and cracking. Finished to sub-micron flatness tolerances.",
          applications: "Sea-water pump systems, oil-drilling tools, and marine propeller shafts."
        },
        {
          id: 4,
          title: "Centrifugal Rotor Hubs",
          category: "centrifugal",
          image: getBase64Image("DSC01049.JPG"),
          material: "High-Tensile Carbon Steel 1045",
          weight: "15.0 kg – 45.0 kg",
          dimensions: "Length up to 600 mm, Outer Diameter up to 300 mm",
          description: "Centrifugally cast heavy rotor hubs offering high fatigue life and microstructural density. Ideal for high centrifugal stress environments.",
          applications: "Rotational coupling sleeves, high-speed industrial turbine hubs, and mechanical shafts."
        },
        {
          id: 5,
          title: "Austenitic Piston Insert Rings",
          category: "sand",
          image: getBase64Image("DSC01053.JPG"),
          material: "Austenitic Ni-Resist Cast Iron (Grade D2)",
          weight: "0.2 kg – 1.5 kg",
          dimensions: "Outer Diameter up to 220 mm",
          description: "High-nickel cast iron piston inserts built using sand casting. Guarantees matching thermal expansion rates with aluminum piston bodies to prevent ring-groove wear.",
          applications: "Turbocharged diesel engines, marine propulsion pistons, and automotive power units."
        },
        {
          id: 6,
          title: "Flanged Meter Bodies",
          category: "investment",
          image: getBase64Image("DSC01056.JPG"),
          material: "Hastelloy C276 / C22",
          weight: "3.5 kg – 12.0 kg",
          dimensions: "Bore sizes up to 100 mm (ANSI 150/300 class)",
          description: "Investment cast corrosion-proof flow meter bodies. Designed with uniform wall thickness to handle high flow turbulence and corrosive acid medium.",
          applications: "Electromagnetic flow meters, chemical plants acid lines, and industrial waste treatment pipelines."
        },
        {
          id: 7,
          title: "High-Manganese Wear Plates",
          category: "sand",
          image: getBase64Image("DSC01059.JPG"),
          material: "Austenitic Manganese Steel (Hadfield Steel)",
          weight: "5.0 kg – 28.0 kg",
          dimensions: "Custom plate configurations up to 450x450 mm",
          description: "High impact wear-resistant plates cast in sand molds. The alloy work-hardens dynamically during operation from 200 HB up to over 500 HB.",
          applications: "Mining jaw crushers chute linings, stone crushing hoppers, and cement factory hopper plates."
        },
        {
          id: 8,
          title: "Aerospace Bracket Fittings",
          category: "investment",
          image: getBase64Image("DSC01062.JPG"),
          material: "Precipitation Hardening Stainless Steel 17-4 PH",
          weight: "0.4 kg – 2.0 kg",
          dimensions: "Max dimension length up to 180 mm",
          description: "High-strength aerospace structural bracket components produced via lost-wax investment casting. Vacuum solution annealed for extreme stress resistance.",
          applications: "Aviation fuselage mounts, steering control hinge brackets, and military aerospace assemblies."
        },
        {
          id: 9,
          title: "Precision Machined Bronze Bushes",
          category: "centrifugal",
          image: getBase64Image("DSC01064.JPG"),
          material: "Phosphor Bronze ASTM B505 C90700",
          weight: "0.5 kg – 5.0 kg",
          dimensions: "Inside Diameter 30 mm to 150 mm",
          description: "High-density bronze bushing centrifugally cast to prevent microscopic voids. Deliver excellent anti-frictional properties under high loads.",
          applications: "Heavy hydraulic cylinders guide bushes, mining machinery sleeve bearings, and marine rudder shafts."
        },
        {
          id: 10,
          title: "Centrifugal Decanter Separator Bowls",
          category: "centrifugal",
          image: getBase64Image("DSC01066.JPG"),
          material: "Duplex Stainless Steel ASTM A890 Grade 4A / 5A",
          weight: "45.0 kg – 180.0 kg",
          dimensions: "Inner Diameter up to 450 mm, Length up to 1200 mm",
          description: "Heavy decanter bowls centrifugally cast for chemical separators. Extreme rotational forces during casting guarantee zero internal gas cavities.",
          applications: "Industrial centrifuge bowls, sludge dewatering hubs, and wastewater processing separation units."
        },
        {
          id: 11,
          title: "Flanged Valve Covers",
          category: "investment",
          image: getBase64Image("DSC01068.JPG"),
          material: "Stainless Steel ASTM A351 CF8 / CF3",
          weight: "1.5 kg – 6.5 kg",
          dimensions: "Cover diameter up to 200 mm",
          description: "High-precision investment cast control valve bonnet covers. Built to withstand high hydrostatic pressure ratings (ANSI Class 600/900).",
          applications: "Steam control valve assemblies, petroleum refinery pipelines, and industrial gas flow controls."
        },
        {
          id: 12,
          title: "Threaded Exhaust Nuts",
          category: "sand",
          image: getBase64Image("DSC01070.JPG"),
          material: "Heat-Resistant Ductile Iron (Si-Mo Grade)",
          weight: "0.3 kg – 1.2 kg",
          dimensions: "Internal thread sizes M24 to M48",
          description: "Specialized silicon-molybdenum ductile iron nuts cast in green sand. Designed to resist structural oxidation and thread deformation at temperatures up to 800°C.",
          applications: "Turbocharger turbine manifold fasteners, heavy exhaust pipe connectors, and furnace door clamps."
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
          quote: "Consistently delivering high-precision valve bodies with zero defect tolerance and excellent tap-to-tap consistency."
        },
        {
          company: "ProMinent",
          logo: getBase64Image("image copy 2.png"),
          quote: "Outstanding casting quality for critical pump housings with highly reliable lead times since 2018."
        },
        {
          company: "Bruker",
          logo: getBase64Image("image copy 3.png"),
          quote: "Excellent dimensional accuracy and sub-micron machining tolerances for our analytical instrument chambers."
        },
        {
          company: "Trelleborg",
          logo: getBase64Image("image copy 4.png"),
          quote: "Exceptional metallurgical density and uniform crystallization structure across all our centrifugal sleeves."
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
