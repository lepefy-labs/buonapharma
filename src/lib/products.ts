export type ProductCategory = "pharma" | "health" | "cosmetics";

export type Product = {
  slug: string;
  category: ProductCategory;
  name: string;
  descriptionFr: string;
  descriptionEn: string;
};

export type Pathology = {
  slug: string;
  nameFr: string;
  nameEn: string;
  medicines: {
    name: string;
    dosages: string[]; // es. ["1,25mg", "2,5mg", "3,25mg", "5mg"]
  }[];
};

export const pathologies: Pathology[] = [
  {
    slug: "paludisme",
    nameFr: "Paludisme",
    nameEn: "Malaria",
    medicines: [
      { name: "Artésunate", dosages: [] },
      { name: "Artésunate + Dihydroartémisinine phosphate", dosages: [] },
    ],
  },
  {
    slug: "hypertension",
    nameFr: "Hypertension",
    nameEn: "Hypertension",
    medicines: [
      { name: "Bisoprolol", dosages: ["1,25mg", "2,5mg", "3,25mg", "5mg"] },
      { name: "Acide acétylsalicylique", dosages: ["100mg"] },
      { name: "Amlodipine", dosages: ["5mg", "10mg"] },
      { name: "Ramipril", dosages: ["2,5mg", "5mg", "10mg"] },
      { name: "Doxazosine", dosages: ["2mg", "4mg"] },
    ],
  },
  {
    slug: "diabete",
    nameFr: "Diabète",
    nameEn: "Diabetes",
    medicines: [
      { name: "Metformine", dosages: ["500mg", "850mg", "1000mg"] },
      { name: "Gliclazide", dosages: ["30mg", "60mg"] },
    ],
  },
  {
    slug: "anti-inflammatoires-antalgiques",
    nameFr: "Anti-inflammatoires et antalgiques",
    nameEn: "Anti-inflammatories and pain relief",
    medicines: [
      { name: "Tramadol", dosages: ["50mg", "100mg"] },
      { name: "Kétorolac", dosages: ["30mg"] },
      { name: "Ibuprofène", dosages: ["200mg", "400mg", "600mg"] },
      { name: "Kétoprofène", dosages: ["80mg"] },
      { name: "Nimésulide", dosages: ["100mg"] },
      { name: "Paracétamol", dosages: ["500mg", "1000mg"] },
    ],
  },
  {
    slug: "gastroprotecteurs",
    nameFr: "Gastroprotecteurs",
    nameEn: "Gastric protection",
    medicines: [
      { name: "Lansoprazole", dosages: ["15mg", "30mg"] },
      { name: "Oméprazole", dosages: ["10mg", "20mg"] },
      { name: "Pantoprazole", dosages: ["20mg", "40mg"] },
      { name: "Ranitidine", dosages: ["150mg", "300mg"] },
    ],
  },
  {
    slug: "antibiotiques",
    nameFr: "Antibiotiques",
    nameEn: "Antibiotics",
    medicines: [
      { name: "Benzylpénicilline benzathine", dosages: ["1,2 M UI", "2,4 M UI"] },
      { name: "Céfotaxime", dosages: ["1g/4ml"] },
      { name: "Amoxicilline", dosages: ["1g"] },
      { name: "Ciprofloxacine", dosages: ["250mg", "500mg", "750mg"] },
      { name: "Lévofloxacine", dosages: ["250mg", "500mg", "750mg"] },
      { name: "Azithromycine", dosages: ["500mg"] },
      { name: "Clarithromycine", dosages: ["500mg"] },
      { name: "Amoxicilline + acide clavulanique", dosages: ["1g"] },
    ],
  },
  {
    slug: "vitamines",
    nameFr: "Vitamines",
    nameEn: "Vitamins",
    medicines: [
      { name: "Acide folique", dosages: ["1mg", "5mg"] },
      { name: "Fer + acide folique", dosages: ["sirop", "flacon"] },
    ],
  },
];

// Nomi di prodotto invariati (identità di marca), descrizioni riscritte da zero
// — nessun testo copiato dal sito precedente.
export const products: Product[] = [
  {
    slug: "ferbuona",
    category: "health",
    name: "Ferbuona",
    descriptionFr: "Complément à base de fer, formulé pour prévenir et accompagner la prise en charge des carences martiales.",
    descriptionEn: "Iron-based supplement, formulated to help prevent and support the management of iron deficiency.",
  },
  {
    slug: "magnesium-100",
    category: "health",
    name: "Magnésium 100%",
    descriptionFr: "Complément en magnésium pour accompagner la vitalité au quotidien et réduire la fatigue.",
    descriptionEn: "Magnesium supplement to support everyday vitality and reduce fatigue.",
  },
  {
    slug: "befolique",
    category: "health",
    name: "Befolique",
    descriptionFr: "Supplémentation en acide folique, particulièrement recommandée avant et pendant la grossesse.",
    descriptionEn: "Folic acid supplementation, particularly recommended before and during pregnancy.",
  },
  {
    slug: "vitabuona",
    category: "health",
    name: "Vitabuona",
    descriptionFr: "Complexe multivitaminé conçu pour soutenir les défenses naturelles de toute la famille.",
    descriptionEn: "Multivitamin complex designed to support the natural defenses of the whole family.",
  },
  {
    slug: "buonaderma-gel-aloe",
    category: "cosmetics",
    name: "Buonaderma Gel Douche Aloé",
    descriptionFr: "Gel douche à l'aloe vera, formulé pour nettoyer en douceur les peaux sensibles.",
    descriptionEn: "Aloe vera shower gel, formulated to gently cleanse sensitive skin.",
  },
  {
    slug: "buonaderma-gel-miel",
    category: "cosmetics",
    name: "Buonaderma Gel Douche Miel",
    descriptionFr: "Gel douche enrichi au miel, pour une peau nourrie et apaisée après chaque douche.",
    descriptionEn: "Honey-enriched shower gel, for nourished, soothed skin after every shower.",
  },
  {
    slug: "buonaderma-gel-ph-neutre",
    category: "cosmetics",
    name: "Buonaderma Gel Douche pH Neutre",
    descriptionFr: "Gel douche à pH neutre, adapté à un usage quotidien même sur peau réactive.",
    descriptionEn: "pH-neutral shower gel, suited to daily use even on reactive skin.",
  },
  {
    slug: "buonaderma-intime",
    category: "cosmetics",
    name: "Buonaderma Intime",
    descriptionFr: "Soin lavant dédié à l'hygiène intime, à la formule douce respectueuse de l'équilibre naturel de la peau.",
    descriptionEn: "Cleansing care dedicated to intimate hygiene, with a gentle formula that respects the skin's natural balance.",
  },
];
