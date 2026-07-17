export type ProductCategory = "pharma" | "health" | "cosmetics";

export type Product = {
  slug: string;
  category: ProductCategory;
  name: string;
  descriptionFr: string;
  descriptionEn: string;
};

// Nomi di prodotto invariati (identità di marca), descrizioni riscritte da zero
// — nessun testo copiato dal sito precedente.
export const products: Product[] = [
  {
    slug: "tramabuona",
    category: "pharma",
    name: "Tramabuona",
    descriptionFr: "Antalgique destiné à la prise en charge de la douleur modérée à sévère, disponible en pharmacie sur prescription.",
    descriptionEn: "Painkiller for the management of moderate to severe pain, available in pharmacies on prescription.",
  },
  {
    slug: "gentabuona",
    category: "pharma",
    name: "Gentabuona",
    descriptionFr: "Antibiotique à usage topique, indiqué dans le traitement des infections cutanées localisées.",
    descriptionEn: "Topical antibiotic, indicated for the treatment of localized skin infections.",
  },
  {
    slug: "ecovaril",
    category: "pharma",
    name: "Ecovaril",
    descriptionFr: "Traitement antifongique destiné aux mycoses cutanées courantes.",
    descriptionEn: "Antifungal treatment for common skin mycoses.",
  },
  {
    slug: "clobederm",
    category: "pharma",
    name: "Clobèderm",
    descriptionFr: "Crème dermocorticoïde indiquée dans la prise en charge de certaines affections cutanées inflammatoires.",
    descriptionEn: "Dermocorticoid cream indicated for the management of certain inflammatory skin conditions.",
  },
  {
    slug: "betabuona",
    category: "pharma",
    name: "Betabuona",
    descriptionFr: "Traitement à visée cardiovasculaire, à utiliser selon les recommandations du prescripteur.",
    descriptionEn: "Cardiovascular treatment, to be used according to the prescriber's recommendations.",
  },
  {
    slug: "buonadol",
    category: "pharma",
    name: "Buonadol",
    descriptionFr: "Antalgique et antipyrétique d'usage courant pour le soulagement de la douleur légère à modérée et de la fièvre.",
    descriptionEn: "Everyday painkiller and antipyretic for the relief of mild to moderate pain and fever.",
  },
  {
    slug: "fluovaril",
    category: "pharma",
    name: "Fluovaril",
    descriptionFr: "Traitement antiviral destiné à certaines infections courantes, sur prescription médicale.",
    descriptionEn: "Antiviral treatment for certain common infections, on medical prescription.",
  },
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
