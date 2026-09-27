'use client';

import { ArrowRight, Calendar, Check, ChevronLeft, ChevronRight, Copy, Download, Eye, FileText, Filter, Globe, Heart, Home, Layers, MapPin, Menu, Percent, RotateCcw, Share2, ShoppingBag, Sparkles, Tag, User, Wallet, Wrench, X, ZoomIn } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/v2/ui/button";

const heroImage = "/images/v2/osqm-top-bg.jpg";
const justinImage = "/images/v2/justin-dog-sunset.jpg";
const merchImage = "/images/v2/merch-lineup.jpg";
const merchCollectionPoster = "/images/v2/collection-poster.jpg";
const merchLookbook = "/images/v2/lookbook-editorial.jpg";
const merchTee = "/images/v2/tee-presentation.jpg";

const merchShowcaseTabs = [
  {
    id: "collection",
    title: "Collection Poster",
    label: "Full Lineup",
    subtitle: "10 Pieces + Fabric & Macro Details",
    image: merchCollectionPoster,
    alt: "0SQM Full Streetwear Collection Poster — 10 pieces and macro details",
    badge: "Official Lineup",
    headline: "0SQM™ WEAR THE REALITY",
    tagline: "Same people. Smaller spaces. Bigger dreams.",
    quote: "Less square metres. More meaning. Good people. Small spaces. Brighter tomorrows.",
    specs: [
      "10 Signature Silhouettes & Everyday Essentials",
      "280 GSM Heavyweight Combed Cotton Tees",
      "420 GSM Brushed Fleece Oversized Hoodies",
      "Custom Woven Labels & 3D Embroidery",
    ],
  },
  {
    id: "lookbook",
    title: "Editorial Lookbook",
    label: "Street & Studio",
    subtitle: "Sydney Streetwear Editorial Shoot",
    image: merchLookbook,
    alt: "0SQM Editorial Lookbook featuring models in washed charcoal hoodies and tees",
    badge: "Lookbook Shoot",
    headline: "SAME CITY. DIFFERENT PERSPECTIVE.",
    tagline: "Real People. Real Progress. 0 Square Meters. Still Here.",
    quote: "A streetwear brand for a generation that's building more than just a wardrobe.",
    specs: [
      "Boxy drop-shoulder cut with sleeve detail: 'Portfolio: 0m²'",
      "Vintage washed charcoal & distressed black tones",
      "Breathable high-density water-based screenprint",
      "Unisex fit engineered for everyday street wear",
    ],
  },
  {
    id: "tee",
    title: "Signature 'Same Dream' Tee",
    label: "Hero Deep-Dive",
    subtitle: "Justin & Koogee Signature Presentation",
    image: merchTee,
    alt: "0SQM Signature Same Dream Different Budget T-shirt presentation",
    badge: "Hero Piece",
    headline: "SAME DREAM. DIFFERENT BUDGET.",
    tagline: "Justin & Koogee overlooking Sydney Harbour.",
    quote: "Streetwear for real plans. Less square metres. More life.",
    specs: [
      "280 GSM premium heavyweight combed cotton",
      "Hand-drawn illustrative back print built to last",
      "Reinforced ribbed collar that never sags",
      "Custom woven interior collar label",
    ],
  },
];

const merchProducts = [
  {
    id: "same-dream-tee",
    number: "01",
    name: '"Same Dream. Different Budget." Tee',
    price: "AUD $22.00",
    category: "tees",
    badge: "Signature Hero",
    gsm: "280 GSM Cotton",
    color: "Natural Cream",
    colorHex: "#F2EFE9",
    fit: "Boxy Streetwear Fit",
    image: "/images/v2/products/clean/hero_tee_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/signature_tee_front_clean.jpg", caption: "Minimalist Left-Chest 0SQM Branding" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_tee_clean.jpg", caption: "Justin & Koogee Signature Back Artwork (280 GSM)" },
    ],
    description: "Justin & Koogee illustrative back graphic with clean left-chest 0SQM branding. Combed heavy cotton with custom woven neck tag and reinforced collar.",
    tagline: "Streetwear for real plans",
  },
  {
    id: "still-0sqm-hoodie",
    number: "02",
    name: '"Still 0 SQM." Vintage Wash Hoodie',
    price: "AUD $39.00",
    category: "hoodies",
    badge: "Heavyweight 420 GSM",
    gsm: "420 GSM Fleece",
    color: "Washed Charcoal",
    colorHex: "#353434",
    fit: "Oversized Streetwear Silhouette",
    image: "/images/v2/products/clean/hero_hoodie_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_hoodie_clean.jpg", caption: "Washed Charcoal 420 GSM Brushed Fleece" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_hoodie_back.jpg", caption: "Oversized Streetwear Back Silhouette" },
    ],
    description: "Ultra-heavy brushed fleece with front kangaroo pocket, tonal chest logo, and sleeve detail: 'Portfolio: 0m²'. Garment washed for vintage texture.",
    tagline: "Same city. Different perspective.",
  },
  {
    id: "wen-1sqm-tee",
    number: "03",
    name: '"Wen 1m²?" Skyline Graphic Tee',
    price: "AUD $22.00",
    category: "tees",
    badge: "Back Print Graphic",
    gsm: "280 GSM Cotton",
    color: "Jet Black",
    colorHex: "#181818",
    fit: "Heavyweight Boxy Fit",
    image: "/images/v2/products/clean/hero_wen_1m2_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_wen_1m2_front.jpg", caption: "Minimalist Left-Chest Logo" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_wen_1m2_clean.jpg", caption: "Sydney Skyline Back Print — 'Same People Bigger Horizons'" },
    ],
    description: "Back print with city skyline silhouette and '0SQM SAME PEOPLE BIGGER HORIZONS'. Minimal front logo on vintage black cotton.",
    tagline: "Same people. Bigger horizons.",
  },
  {
    id: "i-own-0sqm-tee",
    number: "04",
    name: '"I Own 0 SQM." Vintage Black Tee',
    price: "AUD $22.00",
    category: "tees",
    badge: "Essential Statement",
    gsm: "280 GSM Cotton",
    color: "Vintage Black",
    colorHex: "#222222",
    fit: "Relaxed Drop-Shoulder",
    image: "/images/v2/products/clean/hero_i_own_0sqm_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_i_own_0sqm_clean.jpg", caption: "I Own 0 SQM Bold Front Print" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_i_own_0sqm_back.jpg", caption: "Vintage Black Clean Back Cut" },
    ],
    description: "Minimalist bold front statement tee with distressed typography. Thick ribbed collar that won't lose shape wash after wash.",
    tagline: "Wear the reality",
  },
  {
    id: "wen-house-tee",
    number: "05",
    name: '"Wen House?" Washed Olive Tee',
    price: "AUD $22.00",
    category: "tees",
    badge: "Signature Color",
    gsm: "280 GSM Cotton",
    color: "Washed Olive",
    colorHex: "#4E5343",
    fit: "Relaxed Drop-Shoulder",
    image: "/images/v2/products/clean/hero_wen_house_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_wen_house_clean.jpg", caption: "Handwritten Script Front Graphic" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_wen_house_back.jpg", caption: "Washed Olive Clean Back Cut" },
    ],
    description: "Handwritten script front graphic printed on premium washed olive cotton. The million dollar question on every renter's mind.",
    tagline: "The million dollar question",
  },
  {
    id: "0-today-tee",
    number: "06",
    name: '"0 Today. 1m² Someday." Tee',
    price: "AUD $22.00",
    category: "tees",
    badge: "Manifesting",
    gsm: "280 GSM Cotton",
    color: "Off-White Cream",
    colorHex: "#EFECE4",
    fit: "Classic Streetwear Fit",
    image: "/images/v2/products/clean/hero_0_today_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_0_today_clean.jpg", caption: "0 Today. 1m² Someday. Front Print" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_0_today_back.jpg", caption: "Off-White Cream Clean Back Cut" },
    ],
    description: "Typographic front print celebrating the daily grind. Combed heavyweight cotton built to endure daily wear.",
    tagline: "Progress over perfection",
  },
  {
    id: "wear-reality-cap",
    number: "07",
    name: '"0SQM" Washed Cotton Dad Cap',
    price: "AUD $15.00",
    category: "accessories",
    badge: "3D Embroidery",
    gsm: "Washed Cotton Twill",
    color: "Washed Charcoal",
    colorHex: "#2E2D2B",
    fit: "Adjustable Brass Clasp",
    image: "/images/v2/products/clean/cap_front_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/cap_front_clean.jpg", caption: "6-Panel Low Profile Washed Cotton Twill with 3D Embroidery" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/cap_back_clean.jpg", caption: "Vintage Washed Back with Custom Antiqued Brass Buckle" },
    ],
    description: "Low-profile 6-panel cap with high-density tonal 3D embroidery. Vintage washed finish with custom antiqued brass buckle.",
    tagline: "Quiet statement",
  },
  {
    id: "wear-reality-tote",
    number: "08",
    name: '"Wear The Reality." Canvas Tote',
    price: "AUD $13.00",
    category: "accessories",
    badge: "Heavy Canvas",
    gsm: "380 GSM Heavy Canvas",
    color: "Natural Ecru",
    colorHex: "#ECE7DA",
    fit: "Reinforced Handles",
    image: "/images/v2/products/clean/hero_tote_clean.jpg",
    angles: [
      { id: "front", label: "Front", image: "/images/v2/products/clean/hero_tote_clean.jpg", caption: "Wear The Reality Typography Front" },
      { id: "back", label: "Back", image: "/images/v2/products/clean/hero_tote_back.jpg", caption: "Natural Canvas Clean Back" },
    ],
    description: "Heavy-duty 100% natural cotton canvas with bold typography. Big enough for groceries, laptops, and broken housing dreams.",
    tagline: "Everyday essentials",
  },
  {
    id: "mugs-set",
    number: "09",
    name: '"Still 0 SQM" Ceramic Mug Duo',
    price: "AUD $9.00",
    category: "accessories",
    badge: "Ceramic Duo",
    gsm: "350ml Ceramic",
    color: "Off-White / Matte Black",
    colorHex: "#1C1C1C",
    fit: "Microwave & Dishwasher Safe",
    image: "/images/v2/products/clean/hero_mugs_clean.jpg",
    angles: [
      { id: "duo", label: "Duo", image: "/images/v2/products/clean/hero_mugs_clean.jpg", caption: "Off-White & Matte Black 350ml Ceramic Duo" },
    ],
    description: "Available in Off-White ('STILL 0 SQM.') and Matte Black ('Good Coffee. Bigger Dreams.'). Fuel for the morning reality check.",
    tagline: "Good coffee, bigger dreams",
  },
];

const australianCapitals = [
  {
    id: "sydney",
    flag: "NSW",
    name: "Sydney",
    country: "Australia (NSW)",
    landmark: "Harbour Bridge",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 4800,
    landValuePerSqm: "$4,800",
    medianHousePrice: "$1,490,000",
    rawMedianPrice: 1490000,
    typicalDeposit: "$298,000",
    rawDeposit: 298000,
    averageSalary: "$96,000",
    rawSalary: 96000,
    averageHourlyWage: 46.15,
    hyperLocal: {
      name: "Smashed Avo on Sourdough",
      price: 22,
      emoji: "🥑",
      unit: "toasts",
    },
    satiricalNote: "Congratulations. You own enough Sydney real estate to park half a corgi.",
  },
  {
    id: "melbourne",
    flag: "VIC",
    name: "Melbourne",
    country: "Australia (VIC)",
    landmark: "Flinders St & Laneways",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 3200,
    landValuePerSqm: "$3,200",
    medianHousePrice: "$920,430",
    rawMedianPrice: 920430,
    typicalDeposit: "$184,086",
    rawDeposit: 184086,
    averageSalary: "$92,000",
    rawSalary: 92000,
    averageHourlyWage: 44.23,
    hyperLocal: {
      name: "Magic Coffee in a Laneway",
      price: 5.50,
      emoji: "☕",
      unit: "coffees",
    },
    satiricalNote: "Splendid! You own just enough laneway bluestone to queue for an oat flat white in Fitzroy.",
  },
  {
    id: "brisbane",
    flag: "QLD",
    name: "Brisbane",
    country: "Australia (QLD)",
    landmark: "Story Bridge & River",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 2950,
    landValuePerSqm: "$2,950",
    medianHousePrice: "$1,180,000",
    rawMedianPrice: 1180000,
    typicalDeposit: "$236,000",
    rawDeposit: 236000,
    averageSalary: "$88,000",
    rawSalary: 88000,
    averageHourlyWage: 42.31,
    hyperLocal: {
      name: "Ice-Cold Craft Schooner",
      price: 11,
      emoji: "🍺",
      unit: "schooners",
    },
    satiricalNote: "A tropical patch of humidity right next to the Pacific Motorway.",
  },
  {
    id: "adelaide",
    flag: "SA",
    name: "Adelaide",
    country: "Australia (SA)",
    landmark: "Barossa & North Terrace",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 2100,
    landValuePerSqm: "$2,100",
    medianHousePrice: "$999,090",
    rawMedianPrice: 999090,
    typicalDeposit: "$199,818",
    rawDeposit: 199818,
    averageSalary: "$84,000",
    rawSalary: 84000,
    averageHourlyWage: 40.38,
    hyperLocal: {
      name: "Barossa Shiraz Bottle",
      price: 28,
      emoji: "🍷",
      unit: "bottles",
    },
    satiricalNote: "Exactly $910 away from a million dollars. Space for 3 bottles of Barossa Shiraz.",
  },
  {
    id: "perth",
    flag: "WA",
    name: "Perth",
    country: "Australia (WA)",
    landmark: "Cottesloe & Mining Hub",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 2450,
    landValuePerSqm: "$2,450",
    medianHousePrice: "$1,040,000",
    rawMedianPrice: 1040000,
    typicalDeposit: "$208,000",
    rawDeposit: 208000,
    averageSalary: "$104,000",
    rawSalary: 104000,
    averageHourlyWage: 50.00,
    hyperLocal: {
      name: "FIFO Hi-Vis Work Vest",
      price: 45,
      emoji: "🦺",
      unit: "vests",
    },
    satiricalNote: "A patch of red mining dust, exactly 4,000km away from everyone you know.",
  },
  {
    id: "combined-capitals",
    flag: "AU",
    name: "Combined Capitals",
    country: "Australia (National Average)",
    landmark: "Capital Cities Combined",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 3100,
    landValuePerSqm: "$3,100",
    medianHousePrice: "$1,120,000",
    rawMedianPrice: 1120000,
    typicalDeposit: "$224,000",
    rawDeposit: 224000,
    averageSalary: "$93,000",
    rawSalary: 93000,
    averageHourlyWage: 44.71,
    hyperLocal: {
      name: "Bunnings Snag with Onion",
      price: 3.50,
      emoji: "🌭",
      unit: "snags",
    },
    satiricalNote: "Across all Australian capitals, you officially own 0 SQM. A truly national achievement.",
  },
];

const globalCities = [
  {
    id: "sydney",
    flag: "AU",
    name: "Sydney",
    country: "Australia",
    landmark: "Opera House",
    image: "/images/v2/cities/sydney.jpg",
    alt: "Sydney Opera House and Harbour Bridge at sunset",
    rotation: "sm:-rotate-1",
    currency: "AUD",
    currencySymbol: "$",
    pricePerSqm: 4800,
    landValuePerSqm: "$4,800",
    medianHousePrice: "$1,490,000",
    rawMedianPrice: 1490000,
    typicalDeposit: "$298,000",
    rawDeposit: 298000,
    averageSalary: "$96,000",
    rawSalary: 96000,
    averageHourlyWage: 46.15,
    hyperLocal: {
      name: "Smashed Avo on Sourdough",
      price: 22,
      emoji: "🥑",
      unit: "toasts",
    },
    satiricalNote: "Congratulations. You own enough Sydney real estate to park half a corgi.",
  },
  {
    id: "london",
    flag: "GB",
    name: "London",
    country: "United Kingdom",
    landmark: "Big Ben",
    image: "/images/v2/cities/london.jpg",
    alt: "Big Ben and Palace of Westminster in London",
    rotation: "sm:rotate-1",
    currency: "GBP",
    currencySymbol: "£",
    pricePerSqm: 5200,
    landValuePerSqm: "£5,200",
    medianHousePrice: "£850,000",
    rawMedianPrice: 850000,
    typicalDeposit: "£170,000",
    rawDeposit: 170000,
    averageSalary: "£42,000",
    rawSalary: 42000,
    averageHourlyWage: 20.19,
    hyperLocal: {
      name: "Pint of Craft IPA in Soho",
      price: 7.50,
      emoji: "🍺",
      unit: "pints",
    },
    satiricalNote: "Splendid! You can stand upright between two damp Victorian brick walls.",
  },
  {
    id: "toronto",
    flag: "CA",
    name: "Toronto",
    country: "Canada",
    landmark: "CN Tower",
    image: "/images/v2/cities/toronto.jpg",
    alt: "Toronto skyline with CN Tower and Lake Ontario",
    rotation: "sm:-rotate-2",
    currency: "CAD",
    currencySymbol: "$",
    pricePerSqm: 3600,
    landValuePerSqm: "$3,600",
    medianHousePrice: "$1,150,000",
    rawMedianPrice: 1150000,
    typicalDeposit: "$230,000",
    rawDeposit: 230000,
    averageSalary: "$72,000",
    rawSalary: 72000,
    averageHourlyWage: 34.61,
    hyperLocal: {
      name: "Organic Maple Syrup (500ml)",
      price: 16.50,
      emoji: "🍁",
      unit: "bottles",
    },
    satiricalNote: "A patch of frozen slush in Liberty Village.",
  },
  {
    id: "vancouver",
    flag: "CA",
    name: "Vancouver",
    country: "Canada",
    landmark: "False Creek",
    image: "/images/v2/cities/vancouver.jpg",
    alt: "Vancouver skyline with False Creek marina and snowy mountains",
    rotation: "sm:rotate-2",
    currency: "CAD",
    currencySymbol: "$",
    pricePerSqm: 4100,
    landValuePerSqm: "$4,100",
    medianHousePrice: "$1,280,000",
    rawMedianPrice: 1280000,
    typicalDeposit: "$256,000",
    rawDeposit: 256000,
    averageSalary: "$68,000",
    rawSalary: 68000,
    averageHourlyWage: 32.69,
    hyperLocal: {
      name: "Arc'teryx Rain Shell Jacket",
      price: 280,
      emoji: "🧥",
      unit: "jackets",
    },
    satiricalNote: "A damp cedar plank overlooking a parking lot in Kitsilano.",
  },
  {
    id: "new-york",
    flag: "US",
    name: "New York",
    country: "United States",
    landmark: "Manhattan",
    image: "/images/v2/cities/new-york.jpg",
    alt: "New York Brooklyn Bridge and Manhattan skyline at sunset",
    rotation: "sm:-rotate-1",
    currency: "USD",
    currencySymbol: "$",
    pricePerSqm: 6250,
    landValuePerSqm: "$6,250",
    medianHousePrice: "$1,200,000",
    rawMedianPrice: 1200000,
    typicalDeposit: "$240,000",
    rawDeposit: 240000,
    averageSalary: "$85,000",
    rawSalary: 85000,
    averageHourlyWage: 40.86,
    hyperLocal: {
      name: "Corner Bodega Cheese Slice",
      price: 3.50,
      emoji: "🍕",
      unit: "slices",
    },
    satiricalNote: "A single subway grate on 14th Street. Warm in winter.",
  },
  {
    id: "istanbul",
    flag: "TR",
    name: "Istanbul",
    country: "Turkey",
    landmark: "Ortaköy & Bosphorus",
    image: "/images/v2/cities/istanbul.jpg",
    alt: "Istanbul Ortaköy Mosque and Bosphorus Bridge at sunset",
    rotation: "sm:rotate-1",
    currency: "USD",
    currencySymbol: "$",
    pricePerSqm: 1850,
    landValuePerSqm: "$1,850",
    medianHousePrice: "$220,000",
    rawMedianPrice: 220000,
    typicalDeposit: "$44,000",
    rawDeposit: 44000,
    averageSalary: "$14,500",
    rawSalary: 14500,
    averageHourlyWage: 7.20,
    hyperLocal: {
      name: "Çıtır Sokak Simiti & Çay",
      price: 1.25,
      emoji: "🥯",
      unit: "simit & çay",
    },
    satiricalNote: "Roughly the size of a small Turkish tea stool in Kadıköy.",
  },
  {
    id: "tokyo",
    flag: "JP",
    name: "Tokyo",
    country: "Japan",
    landmark: "Tokyo Tower & Fuji",
    image: "/images/v2/cities/tokyo.jpg",
    alt: "Tokyo Tower, Rainbow Bridge, Mount Fuji and pagoda in Tokyo",
    rotation: "sm:-rotate-2",
    currency: "USD",
    currencySymbol: "$",
    pricePerSqm: 5400,
    landValuePerSqm: "$5,400",
    medianHousePrice: "$560,000",
    rawMedianPrice: 560000,
    typicalDeposit: "$112,000",
    rawDeposit: 112000,
    averageSalary: "$38,000",
    rawSalary: 38000,
    averageHourlyWage: 18.25,
    hyperLocal: {
      name: "Konbini Salmon Onigiri",
      price: 1.50,
      emoji: "🍙",
      unit: "onigiri",
    },
    satiricalNote: "Just enough space to stand upright inside a capsule hotel pod in Shinjuku.",
  },
];

const PHYSICAL_METAPHORS = [
  { max: 0.05, title: "An iPad Pro Box", desc: "Do not attempt to stand up or take a deep breath." },
  { max: 0.20, title: "A Size 11 Shoebox", desc: "Perfect for storing exactly one shoe. No laces." },
  { max: 0.50, title: "A Welcome Doormat", desc: "Technically, you have arrived. You just cannot enter." },
  { max: 1.00, title: "Top of a Washing Machine", desc: "An actual luxury studio amenity in this housing market." },
  { max: 2.00, title: "A Single Yoga Mat", desc: "Namaste priced out. Keep your elbows strictly tucked in." },
  { max: 3.50, title: "A Standard Double Mattress", desc: "Hope you and your dog enjoy sleeping upright." },
  { max: 99999, title: "A Luxury Walk-in Closet", desc: "Still not a house, but your dog can finally lie down." },
];

function getMetaphor(sqm: number) {
  return PHYSICAL_METAPHORS.find((m) => sqm < m.max) || PHYSICAL_METAPHORS[PHYSICAL_METAPHORS.length - 1];
}

export default function V2Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [calculatorTab, setCalculatorTab] = useState<"australia" | "global">("australia");
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [savings, setSavings] = useState("25000");
  const [currentDateStr, setCurrentDateStr] = useState<string>("");

  useEffect(() => {
    setCurrentDateStr(
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  const polaroidScrollRef = useRef<HTMLDivElement>(null);

  const scrollPolaroids = (direction: "left" | "right") => {
    if (polaroidScrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      polaroidScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const activeCities = calculatorTab === "australia" ? australianCapitals : globalCities;
  const currentCity = activeCities[selectedCityIndex] || activeCities[0];

  // Clean numerical savings & dynamic calculation
  const numericSavings = Math.max(0, Number(savings.replace(/[^0-9.]/g, "")) || 0);
  const affordableSqm = currentCity.pricePerSqm > 0 ? numericSavings / currentCity.pricePerSqm : 0;
  const metaphor = getMetaphor(affordableSqm);

  // Dynamic values for card & breakdown
  const [intPart, decPart = "00"] = affordableSqm.toFixed(2).split(".");
  const dynamicStampDuty = Math.round(currentCity.rawMedianPrice * 0.045);
  const dynamicStrata = Math.round(currentCity.rawMedianPrice * 0.0028);
  const dynamicAgentCologne = Math.round(currentCity.pricePerSqm * 0.09);
  const dynamicStickyNote = affordableSqm < 0.1
    ? currentCity.satiricalNote
    : `Congratulations. You own enough ${currentCity.name} real estate for: ${metaphor.title}. Reality: still 0m²!`;

  // Satirical Calculations
  const depositPercent = Math.min(100, (numericSavings / Math.max(1, currentCity.rawDeposit)) * 100);
  const yearsToDeposit = Math.max(1, Math.round((currentCity.rawDeposit - numericSavings) / Math.max(1, currentCity.rawSalary * 0.2)));

  // Audit / Calculate animation states
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [hasAudited, setHasAudited] = useState(false);
  const [auditShake, setAuditShake] = useState(false);

  // Reality Score Card Ref, Export Ref and Download states
  const cardRef = useRef<HTMLDivElement>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);
  const savingsInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCard = async () => {
    const captureTarget = exportCardRef.current || cardRef.current;
    if (!captureTarget) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(captureTarget, {
        quality: 0.98,
        pixelRatio: 1.68372, // Produces exact 1448 x 1086 px
        backgroundColor: "#FAF9F5",
      });
      const link = document.createElement("a");
      link.download = `0sqm-reality-score-${currentCity.id || "sydney"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download card", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareOnX = () => {
    const cleanSqm = affordableSqm.toFixed(2);
    const tweetText = `#MySquareMeter is ${cleanSqm} m².\nI joined the @Own0SQM club too. #0SQM`;
    const shareUrl = `https://0sqm.com/share?city=${encodeURIComponent(currentCity.name)}&sqm=${cleanSqm}`;
    const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  const handleTryAgain = () => {
    if (savingsInputRef.current) {
      savingsInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      savingsInputRef.current.focus();
      savingsInputRef.current.select();
    }
  };



  // Renty corgi wisdom
  const [rentyIndex, setRentyIndex] = useState(0);
  const [rentyBarking, setRentyBarking] = useState(false);

  const auditMessages = [
    "Consulting the Reserve Bank of Australia... 🏦",
    "Auditing 14 years of your UberEats and flat white orders... 🍟",
    "Converting life savings into microscopic dust particles... 🔬",
    "Cross-referencing with offshore cash syndicates on WhatsApp... 📱",
    "Bank Algorithm Verdict Rendered: 0 SQM! ⚖️",
  ];

  const calculate = () => {
    if (!savings) setSavings("25000");
    if (isAuditing) return;

    setIsAuditing(true);
    setAuditStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < auditMessages.length) {
        setAuditStep(step);
      } else {
        clearInterval(interval);
        setIsAuditing(false);
        setHasAudited(true);
        setAuditShake(true);
        setTimeout(() => setAuditShake(false), 800);
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }, 320);
  };

  const handlePreset = (val: string) => {
    setSavings(val);
  };

  const rentyQuotes = [
    { text: "Woof! Rent is a construct. Sticks at the dog park are free and have 100% equity.", emoji: "🪵" },
    { text: "Arf! My dog bed is 0.4 m². Legally, I own more prime land than Justin.", emoji: "🛏️" },
    { text: "Bark! If you bury your savings in the backyard, at least the bank won't charge an account keeping fee.", emoji: "🦴" },
    { text: "Woof woof! Landlord said 'no pets', so technically I am a high-risk uninsured financial liability.", emoji: "🚨" },
    { text: "Awoo! Have you tried having rich boomer parents? Justin hasn't, and look where that got us.", emoji: "🥑" },
    { text: "Yip! Justin spent 4 hours on Excel yesterday. We still don't have a backyard, but the charts are very colorful.", emoji: "📊" },
  ];

  const handleAskRenty = () => {
    setRentyBarking(true);
    setRentyIndex((prev) => (prev + 1) % rentyQuotes.length);
    setTimeout(() => setRentyBarking(false), 500);
  };



  const getReceiptText = () => {
    return `==========================================
         0 SQM REALTY PTY LTD
    OFFICIAL SETTLEMENT TAX INVOICE
==========================================
Date: ${new Date().toLocaleDateString()}
Buyer: Justin (or You)
Location: ${currentCity.name}, ${currentCity.country}
------------------------------------------
ITEM                                AMOUNT
------------------------------------------
Base Land Acquired (0.00 m²)         ${currentCity.currencySymbol}0.00
Theoretical Land (${affordableSqm.toFixed(2)} m²)       ${currentCity.currencySymbol}${numericSavings.toLocaleString()}
Stamp Duty (on fresh air)       ${currentCity.currencySymbol}42,500.00
Strata Sinking Fund (broken pool) ${currentCity.currencySymbol}3,400.00
Landlord Mortgage Contribution        100%
Banker's Condescending Smile          FREE
Emotional Damage                 PRICELESS
------------------------------------------
TOTAL PROPERTY ACQUIRED:             0 SQM
TOTAL SAVINGS FORFEITED:        ${currentCity.currencySymbol}${numericSavings.toLocaleString()}
==========================================
||| | ||||| || |||||| |||| | ||||| |||
"Thank you for funding someone else's retirement!"
https://0sqm.fun
==========================================`;
  };

  const handleCopyReceipt = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(getReceiptText());
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2000);
    }
  };

  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [activePhoto, setActivePhoto] = useState<{
    image: string;
    caption: string;
    alt: string;
    angles?: { id: string; label: string; image: string; caption?: string }[];
    activeAngleIdx?: number;
  } | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [merchTab, setMerchTab] = useState<string>("collection");
  const [merchCategory, setMerchCategory] = useState<string>("all");
  const [productAngles, setProductAngles] = useState<Record<string, number>>({
    "same-dream-tee": 1,
    "wen-1sqm-tee": 1,
  });
  const [waitlistProduct, setWaitlistProduct] = useState<(typeof merchProducts)[0] | null>(null);
  const [waitlistAngleIdx, setWaitlistAngleIdx] = useState<number>(0);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSize, setWaitlistSize] = useState("L");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const justinPolaroids = [
    {
      id: "same-dream",
      image: "/images/v2/justin-laptop-harbour.jpg",
      alt: "Justin and Koogee checking the $0SQM Reality Check on their laptop at Sydney Harbour",
      caption: "Same dream. Different budget.",
      rotation: "-rotate-2",
      tapeRotation: "rotate-2",
      tapePosition: "-top-3 left-1/2 -translate-x-1/2",
    },
    {
      id: "hope",
      image: "/images/v2/justin-dog-sunset.jpg",
      alt: "Justin and his dog overlooking Sydney Harbour at sunset",
      caption: "Still 0m², but never 0 hope.",
      rotation: "rotate-1",
      tapeRotation: "-rotate-4",
      tapePosition: "-top-3 right-6",
    },
    {
      id: "open-home",
      image: "/images/v2/justin-open-home.jpg",
      alt: "Justin and Koogee queuing outside an open home",
      caption: "First open home. How bad could it be?",
      rotation: "-rotate-1",
      tapeRotation: "rotate-3",
      tapePosition: "-top-3 left-6",
    },
    {
      id: "brochure",
      image: "/images/v2/justin-brochure.jpg",
      alt: "Justin and Koogee looking at a $1,850,000 property brochure",
      caption: "$1.85M for 607m². Endless potential.",
      rotation: "rotate-2",
      tapeRotation: "-rotate-2",
      tapePosition: "-top-3 right-8",
    },
  ];

  const hasSurplusEquity = numericSavings > dynamicStampDuty && (numericSavings - dynamicStampDuty) / (currentCity.pricePerSqm || 1) >= 1;
  const equityDisplay = hasSurplusEquity
    ? `${((numericSavings - dynamicStampDuty) / currentCity.pricePerSqm).toFixed(2)} m²`
    : "0 m²";

  const renderCardContent = (isExport = false) => (
    <>
      {/* 1. Top Header */}
      <div className="flex items-start justify-between gap-3 pb-5">
        {/* Left: Brand Logo & Tagline */}
        <div>
          <div className="flex items-center text-4xl font-marker font-bold tracking-tight leading-none select-none">
            <span className="text-neutral-950">$</span>
            <span className="text-[#FFD452]">0</span>
            <span className="text-neutral-950">SQM</span>
          </div>
          <p className="text-[11px] font-mono font-bold tracking-[0.16em] text-neutral-800 uppercase mt-1.5 select-none">
            REAL DATA. REAL PRICES. SAME RESULT.
          </p>
        </div>

        {/* Right: The Australian Dream Badge */}
        <div className="text-right select-none">
          <div className="inline-flex flex-col items-end">
            <span className="font-marker text-sm font-bold text-neutral-900 tracking-wide -rotate-1">
              THE AUSTRALIAN DREAM
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-marker text-sm font-bold text-neutral-900">
                STILL STARTS AT
              </span>
              <span className="relative inline-flex items-center justify-center font-marker text-sm font-black bg-[#FFDE43] text-neutral-950 px-2 py-0.5 rounded-xs ml-1">
                0M².
                {/* Radiating comic lines \ | / */}
                <svg className="absolute -right-3 -top-2 w-3.5 h-3.5 text-neutral-900" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="2" y1="14" x2="6" y2="4" />
                  <line x1="8" y1="14" x2="10" y2="2" />
                  <line x1="14" y1="14" x2="14" y2="6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Grid (Left: 57%, Right: 43%) */}
      <div className={`grid ${isExport ? "grid-cols-[1.32fr_1fr]" : "grid-cols-1 md:grid-cols-[1.32fr_1fr]"} gap-3 sm:gap-4 items-start`}>
        {/* Left Column */}
        <div className="space-y-3.5">
          {/* Reality Score Dark Digital Display */}
          <div className="bg-[#14171A] rounded-2xl p-5 text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase pb-3 text-neutral-400">
                <span className="tracking-widest">REALITY SCORE</span>
                <span className="tracking-wider">
                  {currentCity.name.toUpperCase()}, {currentCity.flag && currentCity.flag.length <= 3 ? currentCity.flag : "NSW"}
                </span>
              </div>

              {/* Split-Flap Counter Tiles */}
              <div className="flex items-center gap-1.5 sm:gap-2 my-1 overflow-x-auto no-scrollbar">
                {/* Tile 1: Integer */}
                <div className="relative min-w-12 sm:min-w-16 h-16 sm:h-20 px-2 sm:px-2.5 bg-[#1C1F24] rounded-xl flex items-center justify-center shadow-md border border-white/5 overflow-hidden select-none">
                  <span className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tight">{intPart}</span>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/70 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
                </div>

                {/* Dot */}
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/90 self-end mb-3 sm:mb-4 mx-0.5" />

                {/* Tile 2: Dec 1 */}
                <div className="relative min-w-12 sm:min-w-16 h-16 sm:h-20 px-2 sm:px-2.5 bg-[#1C1F24] rounded-xl flex items-center justify-center shadow-md border border-white/5 overflow-hidden select-none">
                  <span className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tight">{decPart[0] || "0"}</span>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/70 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
                </div>

                {/* Tile 3: Dec 2 */}
                <div className="relative min-w-12 sm:min-w-16 h-16 sm:h-20 px-2 sm:px-2.5 bg-[#1C1F24] rounded-xl flex items-center justify-center shadow-md border border-white/5 overflow-hidden select-none">
                  <span className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tight">{decPart[1] || "0"}</span>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/70 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
                </div>

                {/* Tile 4: m² */}
                <div className="relative min-w-16 sm:min-w-20 h-16 sm:h-20 px-2 sm:px-2.5 bg-[#1C1F24] rounded-xl flex flex-col items-center justify-center shadow-md border border-white/5 overflow-hidden select-none ml-0.5 sm:ml-1">
                  <div className="relative inline-flex flex-col items-center">
                    <span className="font-sans font-black text-3xl sm:text-4xl text-white leading-none">m²</span>
                    <div className="h-1 sm:h-1.5 bg-[#FFDE43] rounded-full w-9 sm:w-11 mt-1 sm:mt-1.5" />
                  </div>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/70 shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2">
              <p className="font-bold text-lg text-white leading-snug">
                You own 0 square metres.
              </p>
              <p className="text-sm text-neutral-400 font-medium mt-0.5">
                But hey, at least the views are free.
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-mono font-black uppercase text-neutral-900 pb-1.5">
              <span className="tracking-wider">COST BREAKDOWN</span>
              <span className="text-neutral-500 font-medium text-[10px]">{currentCity.currency} ({currentCity.currencySymbol})</span>
            </div>

            <div className="border-b border-neutral-200 my-2" />

            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <FileText className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Land Value ({affordableSqm.toFixed(2)} m²)</span>
                </span>
                <span className="font-bold text-neutral-950">{currentCity.currencySymbol}{numericSavings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <FileText className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Stamp Duty (on fresh air)</span>
                </span>
                <span className="font-bold text-neutral-950">{currentCity.currencySymbol}{dynamicStampDuty.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Wrench className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Strata Sinking Fund (broken lift)</span>
                </span>
                <span className="font-bold text-neutral-950">{currentCity.currencySymbol}{dynamicStrata.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Agent Cologne Surcharge</span>
                </span>
                <span className="font-bold text-neutral-950">{currentCity.currencySymbol}{dynamicAgentCologne.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Percent className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Landlord Mortgage Gratitude</span>
                </span>
                <span className="font-bold text-neutral-950">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-neutral-800">
                  <Heart className="size-3.5 text-neutral-500 shrink-0" />
                  <span>Emotional Damage</span>
                </span>
                <span className="text-emerald-600 font-black">FREE</span>
              </div>
            </div>
          </div>

          {/* Total Equity Acquired (Separate White Card matching reality-score-card.png) */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 px-5 py-3.5 flex items-center justify-between shadow-2xs">
            <span className="text-sm font-mono font-black tracking-wider text-neutral-950 uppercase">
              TOTAL EQUITY ACQUIRED
            </span>
            <div className="bg-[#FFDE43] text-neutral-950 font-black text-2xl px-6 py-1.5 rounded-xl shadow-2xs font-sans tracking-tight">
              {equityDisplay}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3.5">
          {/* Location & Meta Info Card */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 flex flex-col justify-between shadow-2xs">
            {/* Location */}
            <div className="flex items-center gap-3 py-1">
              <MapPin className="size-5 text-neutral-900 shrink-0" />
              <div>
                <span className="block text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase">LOCATION</span>
                <strong className="text-sm font-bold text-neutral-900">
                  {currentCity.name}, {currentCity.flag && currentCity.flag.length <= 3 ? currentCity.flag : "NSW"}
                </strong>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 py-1.5 border-t border-neutral-100">
              <Calendar className="size-5 text-neutral-900 shrink-0" />
              <div>
                <span className="block text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase">DATE</span>
                <strong className="text-sm font-bold text-neutral-900">{currentDateStr || "20 Sep 2026"}</strong>
              </div>
            </div>

            {/* Property Type */}
            <div className="flex items-center gap-3 py-1.5 border-t border-neutral-100">
              <Home className="size-5 text-neutral-900 shrink-0" />
              <div>
                <span className="block text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase">PROPERTY TYPE</span>
                <strong className="text-sm font-bold text-neutral-900">Theoretical Land</strong>
              </div>
            </div>

          </div>

          {/* Yellow Koogee Sticky Note */}
          <div className="rounded-2xl border border-[#E5C41C] bg-[#FFDE43] p-4 pb-0 shadow-2xs flex items-end justify-between relative overflow-hidden min-h-[175px]">
            <div className="flex-1 pb-4 pr-2 z-10 max-w-[58%]">
              <span className="font-serif text-3xl leading-none text-neutral-900 select-none block -mb-0.5">“</span>
              <p className="font-marker font-bold text-xs sm:text-sm leading-snug tracking-wide text-neutral-950 uppercase">
                {dynamicStickyNote.toUpperCase()}
              </p>
              <span className="block font-mono text-[10px] font-black tracking-wider text-neutral-900 uppercase mt-2.5">
                — KOOGEE
              </span>
            </div>
            <div className="w-[42%] shrink-0 flex items-end justify-end self-end z-10 relative">
              {/* Comic lines above dog \ | / */}
              <svg className="absolute -top-3 right-3 w-4 h-4 text-neutral-900" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="2" y1="14" x2="5" y2="4" />
                <line x1="8" y1="14" x2="9" y2="2" />
                <line x1="14" y1="14" x2="13" y2="5" />
              </svg>
              <img
                src="/images/koogee-card-corgi.png"
                alt="Koogee the Corgi"
                className="w-full max-w-[155px] h-auto object-contain block drop-shadow-xs select-none pointer-events-none -mr-1"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleShareOnX}
              disabled={isDownloading}
              className="w-full h-11 rounded-xl bg-[#0F1419] hover:bg-black active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share on X</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadCard}
                disabled={isDownloading}
                className="h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>{isDownloading ? "Saving..." : "Download"}</span>
              </button>
              <button
                type="button"
                onClick={handleTryAgain}
                className="h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="border-t border-neutral-200/80 mt-6 pt-4 pb-1 px-1 flex items-center justify-between text-neutral-600 font-mono text-[11px] uppercase tracking-wider select-none">
        <span className="font-bold text-neutral-800">0SQM.COM</span>
        <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
          <span>DIFFERENT CITIES. SAME PORTFOLIO.</span>
          <Globe className="size-3.5 text-neutral-700 shrink-0" />
        </div>
      </div>
    </>
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-4 sm:px-6 lg:px-8">
          <a href="#home" className="font-marker text-3xl font-bold" aria-label="$0SQM home">
            $<span className="text-primary">0</span>SQM
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {[
              ["The Dream", "#dream"],
              ["Reality Check", "#reality"],
              ["The Journey", "#journey"],
              ["Community", "/community"],
              ["Merch", "#merch"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("/") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="hover:underline decoration-primary decoration-4 underline-offset-8"
              >
                {label}
              </a>
            ))}
            <Button variant="sunshine" asChild>
              <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer">
                Join on X <ArrowRight className="size-4" />
              </a>
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="grid border-t border-border bg-background px-4 py-4 text-lg font-bold md:hidden">
            {[
              ["The Dream", "#dream"],
              ["Reality Check", "#reality"],
              ["The Journey", "#journey"],
              ["Community", "/community"],
              ["Merch", "#merch"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3"
              >
                {label}
              </a>
            ))}
            <Button variant="sunshine" className="mt-3 w-full" asChild>
              <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer">
                Join on X (@Own0SQM) <ArrowRight className="size-4" />
              </a>
            </Button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px] scroll-mt-16 overflow-hidden pt-16"
      >
        <img
          src={heroImage}
          alt="Justin and Koogee looking across Sydney Harbour towards the Opera House and Harbour Bridge"
          width={1672}
          height={941}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-[24%_58%] sm:object-[25%_55%] lg:object-[28%_55%]"
        />
        <h1 className="sr-only">
          $0SQM — The Australian Dream Still Starts at 0m²
        </h1>

        {/* Hero Content positioned right to let Justin & Koogee shine on the left */}
        <div className="relative mx-auto flex min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] max-w-7xl items-start justify-end px-5 pt-6 sm:px-8 sm:pt-10 lg:pt-14">
          <div className="min-w-0 max-w-sm sm:max-w-md lg:max-w-md bg-background/90 backdrop-blur-xs p-4 sm:p-5 rounded-xl border border-foreground/10 shadow-lg">
            <p className="text-xs min-[360px]:text-sm sm:text-base font-bold leading-relaxed text-foreground">
              Just a guy, a dog, and a very expensive housing market. Documenting the journey from 0.00m² to a place we can call home.
            </p>
            <div className="mt-3.5 sm:mt-4">
              <Button
                variant="sunshine"
                size="default"
                className="px-5 py-2 sm:px-6 sm:py-2.5 text-xs min-[360px]:text-sm sm:text-base cursor-pointer shadow-md font-bold"
                asChild
              >
                <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer">
                  Follow the journey on X <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The Dream Section */}
      <section id="dream" className="scroll-mt-16 bg-background px-4 py-10 sm:py-12 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
            {/* Image Card with Polaroid & Tape styling */}
            <div className="relative">
              <div
                onClick={() =>
                  setActivePhoto({
                    image: "/images/v2/justin-laptop-harbour.jpg",
                    caption: "Better views. Smaller budgets. — Sydney Harbour, 2026",
                    alt: "Justin and Koogee checking the $0SQM Reality Check at Sydney Harbour",
                  })
                }
                className="group relative bg-paper p-3 pb-4 shadow-xl border border-border rounded-xs sm:-rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
              >
                {/* Masking tape top-center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 masking-tape -rotate-2 z-20 pointer-events-none rounded-xs" />

                <div className="relative aspect-[1024/839] w-full overflow-hidden rounded-xs bg-neutral-100">
                  <img
                    src="/images/v2/justin-laptop-harbour.jpg"
                    alt="Justin and Koogee checking $0SQM on their laptop overlooking Sydney Harbour"
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 text-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      Click to expand ↗
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span className="font-marker text-base sm:text-lg text-foreground font-bold">
                    &ldquo;Same dream. Different budget.&rdquo;
                  </span>
                  <span className="font-mono text-[11px] font-semibold">Sydney Harbour · 0 SQM</span>
                </div>
              </div>
            </div>

            {/* Content & Strategic Manifesto */}
            <div className="space-y-5">
              <div>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-xs inline-block mb-3">
                  The Official Philosophy
                </span>
                <h2 className="font-marker text-3xl font-bold uppercase min-[360px]:text-4xl sm:text-5xl leading-[0.95]">
                  Better views.
                  <br />
                  <span className="text-primary">Smaller budgets.</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
                  You don&apos;t need a $6,350,000 mortgage to sit on a park bench and watch the sunset over the Opera House.
                  Justin and Koogee are proving that owning <strong>0 SQM</strong> doesn&apos;t mean having 0 ambition.
                </p>
              </div>

              {/* Strategic 0SQM Manifesto Card */}
              <div className="rounded-xl border border-border/80 bg-paper p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-primary">
                    0SQM MANIFESTO
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">Sydney, 2026</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-foreground/90 leading-relaxed">
                  We might be priced out of the quarter-acre block, but we refuse to sacrifice our lifestyle or our sense of humor. 0SQM isn&apos;t defeat—it&apos;s reclaiming perspective, community, and freedom.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Zero mortgage debt
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Harbour views daily
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Unfiltered community
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button variant="sunshine" asChild>
                  <a href="#reality">
                    Check your reality ↓
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer">
                    Join the Movement on X ↗
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section id="reality" className="relative scroll-mt-16 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2 className="font-marker text-3xl font-bold uppercase min-[360px]:text-4xl sm:text-5xl">
                SQM Reality Check™
              </h2>
              <p className="mt-1 font-semibold">Real data. Real prices. Same result.</p>
            </div>
            <span className="text-xs text-muted-foreground font-semibold">
              {calculatorTab === "australia"
                ? "As of 31 Aug 2026 · Source: Cotality / Burnout Economics · AUD"
                : `Last updated: 15 Sep 2026 · ${currentCity.currency}`}
            </span>
          </div>

          <div className="mx-auto max-w-4xl space-y-3.5">
            {/* Sleek, Compact City & Country Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-1.5 rounded-xl border border-border bg-paper shadow-2xs">
              {/* Category Switcher (Australia / Global) */}
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-border/70 bg-background/80 p-0.5 shrink-0 sm:w-52">
                <button
                  type="button"
                  onClick={() => {
                    setCalculatorTab("australia");
                    setSelectedCityIndex(0);
                  }}
                  className={`rounded-md py-1 px-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    calculatorTab === "australia"
                      ? "bg-primary text-foreground shadow-2xs font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇦🇺 Australia
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalculatorTab("global");
                    setSelectedCityIndex(0);
                  }}
                  className={`rounded-md py-1 px-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    calculatorTab === "global"
                      ? "bg-primary text-foreground shadow-2xs font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌍 Global
                </button>
              </div>

              {/* City Pill Buttons (horizontal scrollable on mobile, flex-wrap on desktop) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
                {activeCities.map((city, index) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => setSelectedCityIndex(index)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      index === selectedCityIndex
                        ? "bg-foreground text-background shadow-xs scale-[1.02]"
                        : "bg-background/80 hover:bg-muted text-foreground border border-border/60"
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-80">{city.flag}</span>
                    <span>{city.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* City Details & Input Controls (Sleek & Compact) */}
            <div className="rounded-xl border border-border bg-background p-3.5 sm:p-4 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-border/70">
                <div>
                  <h3 className="font-marker text-lg sm:text-xl font-bold uppercase leading-tight">{currentCity.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{currentCity.country}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full border border-foreground/15 bg-paper px-2 py-0.5 text-[10px] font-bold">
                    {currentCity.flag} · {currentCity.currency} ({currentCity.currencySymbol})
                  </span>
                  <span className="text-[10px] font-semibold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
                    {currentCity.landValuePerSqm}/m²
                  </span>
                </div>
              </div>

              {/* Compact 4-Metric Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2.5 border-b border-border/70 text-xs">
                {[
                  ["Median House", currentCity.medianHousePrice],
                  ["Land Value", `${currentCity.landValuePerSqm}/m²`],
                  ["20% Deposit", currentCity.typicalDeposit],
                  ["Avg Salary", currentCity.averageSalary],
                ].map(([label, value]) => (
                  <div key={label} className="bg-paper/70 rounded-lg p-2 border border-border/50">
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
                    <strong className="mt-0.5 block text-xs sm:text-sm font-bold text-foreground">{value}</strong>
                  </div>
                ))}
              </div>

              {/* Input & Calculator Row */}
              <div className="pt-2.5 space-y-2">
                <div className="grid min-w-0 grid-cols-1 gap-2 min-[360px]:grid-cols-[minmax(0,1fr)_auto]">
                  <label className="flex h-9 sm:h-10 min-w-0 items-center rounded-lg border border-input bg-paper px-3 focus-within:ring-2 focus-within:ring-primary">
                    <span className="mr-1.5 font-bold text-xs text-muted-foreground">{currentCity.currencySymbol}</span>
                    <input
                      ref={savingsInputRef}
                      value={savings}
                      onChange={(e) => setSavings(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") calculate(); }}
                      inputMode="decimal"
                      aria-label="Savings amount"
                      placeholder="e.g. 25000"
                      className="w-full min-w-0 flex-1 bg-transparent outline-none font-semibold text-sm sm:text-base text-foreground"
                    />
                  </label>
                  <Button
                    variant="ink"
                    className="h-9 sm:h-10 px-4 text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 rounded-lg active:scale-95"
                    onClick={calculate}
                    disabled={isAuditing}
                  >
                    {isAuditing ? (
                      <>
                        <div className="size-3 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        <span>Auditing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3.5 text-amber-400" />
                        <span>Calculate</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Comedic Auditing Progress Banner */}
                {isAuditing && (
                  <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-foreground animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center justify-between mb-1 font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-amber-600 animate-ping" />
                        <span className="text-[11px]">{auditMessages[auditStep]}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {Math.round(((auditStep + 1) / auditMessages.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${((auditStep + 1) / auditMessages.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Range Slider */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">{currentCity.currencySymbol}0</span>
                  <input
                    type="range"
                    min="0"
                    max="150000"
                    step="2500"
                    value={Math.min(150000, numericSavings)}
                    onChange={(e) => setSavings(e.target.value)}
                    className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    aria-label="Savings slider"
                  />
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">{currentCity.currencySymbol}150k+</span>
                </div>

                {/* Quick Preset Chips */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  <span className="text-[10px] font-semibold text-muted-foreground mr-1">Presets:</span>
                  {["5000", "25000", "50000", "100000", "250000"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePreset(preset)}
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer ${
                        numericSavings === Number(preset)
                          ? "bg-primary text-foreground border-foreground/30 font-bold"
                          : "bg-paper hover:bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {currentCity.currencySymbol}{Number(preset).toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* THE REALITY SCORE CARD (Exact 1:1 match with reality-score-card.png) */}
            <div className="w-full flex justify-center">
              <div
                ref={cardRef}
                id="reality-score-card"
                className={`w-full max-w-[860px] bg-[#FAF9F5] rounded-[28px] border border-[#E7E2D6] p-4 sm:p-7 pb-6 shadow-xl shadow-black/5 relative overflow-hidden transition-all duration-300 text-neutral-900 select-none ${
                  auditShake ? "scale-[1.01] ring-2 ring-amber-400/40" : ""
                }`}
              >
                {renderCardContent(false)}
              </div>
            </div>

            {/* Off-screen Pristine Export Element (Fixed 860px width, captured at 1.68372 ratio => exact 1448x1086px) */}
            <div
              style={{
                position: "fixed",
                left: "-9999px",
                top: "0px",
                width: "860px",
                pointerEvents: "none",
                zIndex: -100,
              }}
              aria-hidden="true"
            >
              <div
                ref={exportCardRef}
                className="w-[860px] bg-[#FAF9F5] rounded-[28px] border border-[#E7E2D6] p-7 pb-6 shadow-xl shadow-black/5 text-neutral-900"
              >
                {renderCardContent(true)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section id="journey" className="scroll-mt-16 bg-background px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* MEET THE TEAM Card */}
          <div className="mb-12 rounded-2xl border border-border/90 bg-paper p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div>
                <h2 className="font-marker text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground">
                  Meet The Team
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  The visionary minds behind 0.00 m² of prime Australian real estate.
                </p>
              </div>
              <Button
                variant="sunshine"
                size="sm"
                className="self-start sm:self-auto cursor-pointer"
                onClick={() => setIsStoryModalOpen(true)}
              >
                Read Justin&apos;s story <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
              {/* Justin */}
              <div className="flex flex-col justify-between">
                <div className="flex items-start gap-4 sm:gap-5">
                  <img
                    src="/images/v2/team-justin.jpg"
                    alt="Justin - Future Homeowner"
                    className="size-24 sm:size-28 md:size-32 rounded-2xl object-cover shrink-0 border border-foreground/10 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-xl sm:text-2xl text-foreground leading-tight">Justin</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Future Homeowner</p>
                    <div className="w-full h-px bg-border/80 my-2.5" />
                    <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Current portfolio: <strong className="font-bold">0.00m²</strong></span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Expertise: looking at listings</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Strategy: hope, memes, patience</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Believes: one day... maybe</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-dashed border-border/70 text-center sm:text-left">
                  <p className="font-marker text-base sm:text-lg text-foreground italic">
                    &ldquo;Still 0m², but never 0 hope.&rdquo;
                  </p>
                </div>
              </div>

              {/* Koogee */}
              <div className="flex flex-col justify-between">
                <div className="flex items-start gap-4 sm:gap-5">
                  <img
                    src="/images/Koogee.jpeg"
                    alt="Koogee - Chief Financial Officer"
                    className="size-24 sm:size-28 md:size-32 rounded-2xl object-cover shrink-0 border border-foreground/10 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-xl sm:text-2xl text-foreground leading-tight">Koogee</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Chief Financial Officer</p>
                    <div className="w-full h-px bg-border/80 my-2.5" />
                    <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90 font-medium">
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Current contribution: <strong className="font-bold">$0</strong></span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Responsibilities: emotional support</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Investment strategy: snacks &amp; walks</span>
                      </li>
                      <li className="flex items-baseline gap-2">
                        <span className="text-muted-foreground text-xs">•</span>
                        <span>Risk management: barking at bills</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-dashed border-border/70 text-center sm:text-left">
                  <p className="font-marker text-base sm:text-lg text-foreground italic">
                    &ldquo;Good boys invest in treats.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Polaroid Kartı (Yatayda Serbestçe Kaydırılabilir & Ortalanmış) */}
          <div className="relative min-w-0 max-w-5xl lg:max-w-6xl mx-auto">
            {/* Horizontal Scroll Controls */}
            <div className="flex items-center justify-between pb-2 px-2 sm:px-4">
              <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                ← 4 Polaroids • Scroll to explore →
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollPolaroids("left")}
                  aria-label="Previous photo"
                  className="grid size-8 place-items-center rounded-full border border-border bg-paper hover:bg-muted text-foreground shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollPolaroids("right")}
                  aria-label="Next photo"
                  className="grid size-8 place-items-center rounded-full border border-border bg-paper hover:bg-muted text-foreground shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Polaroid Listesi */}
            <div
              ref={polaroidScrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-4 px-4 sm:px-6 items-center justify-start min-[1080px]:justify-center scroll-smooth snap-x snap-mandatory"
            >
              {justinPolaroids.map((polaroid, idx) => (
                <figure
                  key={polaroid.id}
                  onClick={() => setActivePhoto(polaroid)}
                  className={`relative w-[220px] sm:w-[240px] shrink-0 snap-center bg-paper p-3 pb-4 shadow-xl border border-border rounded-xs cursor-pointer ${polaroid.rotation} hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-30 transition-all duration-300 group`}
                >
                  {/* Masking Tape Effect on Top */}
                  <div
                    className={`absolute ${polaroid.tapePosition} w-20 h-6 masking-tape ${polaroid.tapeRotation} z-20 pointer-events-none rounded-xs`}
                  />

                  {/* Fotoğraf */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs">
                    <img
                      src={polaroid.image}
                      alt={polaroid.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* El Yazısı Açıklama */}
                  <figcaption className="pt-3 text-center font-marker text-base sm:text-lg leading-tight text-neutral-900">
                    {polaroid.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Alt Kısım: Same Cities Grid */}
          <div id="cities" className="mt-14 pt-10 border-t border-border/80">
            <h2 className="font-marker text-3xl font-bold uppercase min-[360px]:text-4xl">
              Same cities. Same result.
            </h2>
            <div className="mt-6 grid w-full min-w-0 grid-cols-2 gap-3 pb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {globalCities.map((city) => (
                <article
                  key={city.name}
                  onClick={() =>
                    setActivePhoto({
                      image: city.image,
                      caption: `${city.name} (${city.flag}) — ${city.landmark} • 0 SQM`,
                      alt: city.alt,
                    })
                  }
                  className={`min-w-0 bg-paper p-2 pb-3 shadow-md ${city.rotation} border border-border rounded-xs hover:rotate-0 hover:scale-105 hover:shadow-xl hover:z-20 transition-all duration-300 cursor-pointer group flex flex-col justify-between last:col-span-2 last:max-w-[calc(50%-0.375rem)] last:mx-auto last:w-full sm:last:col-span-1 sm:last:max-w-none`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-xs">
                    <img
                      src={city.image}
                      alt={city.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Country Code Pill */}
                    <span className="absolute top-1.5 left-1.5 rounded-full bg-background/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-black border border-foreground/20 text-foreground shadow-xs">
                      {city.flag}
                    </span>
                    {/* Landmark subtle overlay */}
                    <span className="absolute bottom-1.5 inset-x-1.5 truncate rounded-xs bg-black/65 backdrop-blur-xs px-1.5 py-0.5 text-[10px] font-medium text-white text-center">
                      {city.landmark}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="truncate text-xs min-[360px]:text-sm font-bold text-center text-foreground">
                      {city.name}
                    </p>
                    <p className="mt-1 bg-primary text-center font-marker text-base font-bold min-[360px]:text-lg py-0.5 rounded-xs border border-foreground/10 text-foreground shadow-2xs">
                      0 SQM
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="font-marker text-xl min-[360px]:text-2xl mt-4">
              Big cities. Bigger dreams. Same result. ↗
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 0SQM STREETWEAR & MERCH SECTION ==================== */}
      <section id="merch" className="torn-top scroll-mt-16 bg-[#FAF7F2] text-neutral-900 px-4 py-10 sm:py-12 sm:px-6 lg:px-8 border-b border-[#E5E0D4] relative">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD452] text-neutral-950 text-xs font-black tracking-wider uppercase mb-3 shadow-2xs">
                <Sparkles className="size-3.5 fill-current" />
                <span>0SQM™ Apparel &amp; Goods // Drop 01</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.92] text-neutral-950">
                WEAR THE
                <br />
                <span className="text-[#C69200]">REALITY.</span>
              </h2>
              <p className="font-caveat text-xl sm:text-2xl text-neutral-600 mt-2">
                &ldquo;Same people. Smaller spaces. Bigger dreams.&rdquo;
              </p>
            </div>

            {/* Elevated, Clean Editorial Copy */}
            <div className="max-w-md space-y-2">
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                A streetwear collection engineered for a generation priced out of 100m² blocks, but rich in perspective. Standalone heavyweight silhouettes, vintage washes, and water-based prints that outlast any 30-year mortgage.
              </p>
            </div>
          </div>

          {/* ==================== 1. CORE APPAREL & GOODS (TEKİL ÜRÜN KARTLARI) ==================== */}
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-[#C69200]">
                  Standalone Garments &amp; Goods
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-neutral-950 mt-1">
                  THE DROP 01 CAPSULE
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Individual studio garments engineered from heavyweight cotton and brushed fleece.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: "all", label: `All (${merchProducts.length})` },
                  { id: "tees", label: "Tees (5)" },
                  { id: "hoodies", label: "Hoodie (1)" },
                  { id: "accessories", label: "Goods (3)" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setMerchCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      merchCategory === cat.id
                        ? "bg-neutral-950 text-white font-black shadow-sm"
                        : "bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 shadow-2xs"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Product Studio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {merchProducts
                .filter((p) => merchCategory === "all" || p.category === merchCategory)
                .map((product) => {
                  const activeAngleIdx = productAngles[product.id] || 0;
                  const currentAngle = product.angles?.[activeAngleIdx] || product.angles?.[0];
                  const currentImage = currentAngle?.image || product.image;
                  const currentCaption = currentAngle?.caption
                    ? `${product.name} — ${currentAngle.label} (${currentAngle.caption})`
                    : `${product.name} — ${product.tagline} (${product.gsm})`;

                  return (
                    <article
                      key={product.id}
                      className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300"
                    >
                      {/* Individual Studio Image Container */}
                      <div
                        onClick={() => setActivePhoto({
                          image: currentImage,
                          caption: currentCaption,
                          alt: `${product.name} - ${currentAngle?.label || "Studio"}`,
                          angles: product.angles,
                          activeAngleIdx: activeAngleIdx,
                        })}
                        className="relative aspect-square bg-[#F0ECE4]/70 overflow-hidden flex items-center justify-center p-6 cursor-pointer border-b border-neutral-100"
                      >
                        <img
                          src={currentImage}
                          alt={`${product.name} - ${currentAngle?.label || "View"}`}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-neutral-900 border border-neutral-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-2xs">
                          PIECE #{product.number}
                        </span>
                        <span className="absolute top-3 right-3 bg-[#FFD452] text-neutral-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-2xs">
                          {product.badge}
                        </span>

                        {/* Front / Back Angle Switcher Tabs */}
                        {product.angles && product.angles.length > 1 && (
                          <div
                            className="absolute bottom-3 left-3 z-10 flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 border border-neutral-250 shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {product.angles.map((angle, idx) => {
                              const isSelected = activeAngleIdx === idx;
                              return (
                                <button
                                  key={angle.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setProductAngles((prev) => ({ ...prev, [product.id]: idx }));
                                  }}
                                  className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#FFD452] text-neutral-950 shadow-xs"
                                      : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/90"
                                  }`}
                                >
                                  {angle.label}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-neutral-700 text-[11px] font-bold px-2.5 py-1 rounded-sm border border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-xs">
                          <ZoomIn className="size-3 text-[#C69200]" />
                          <span>Inspect</span>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 font-medium">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="size-2.5 rounded-full border border-neutral-300 inline-block shrink-0"
                                style={{ backgroundColor: product.colorHex }}
                              />
                              <span>{product.color}</span>
                            </span>
                            <span className="font-mono text-[11px] text-neutral-400 font-bold">{product.gsm}</span>
                          </div>

                          <h4 className="text-base font-black text-neutral-950 group-hover:text-[#C69200] transition-colors leading-snug">
                            {product.name}
                          </h4>
                        </div>

                        <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3">
                          <div>
                            <span className="text-sm font-black text-neutral-950">
                              {product.price}
                            </span>
                            <span className="block text-[10px] text-neutral-400 font-medium">Pre-order Drop 01</span>
                          </div>

                          <Button
                            variant="sunshine"
                            size="sm"
                            onClick={() => {
                              setWaitlistProduct(product);
                              setWaitlistAngleIdx(productAngles[product.id] || 0);
                              setWaitlistSubmitted(false);
                            }}
                            className="cursor-pointer text-xs font-black flex items-center gap-1.5 px-3.5 py-2 shadow-xs hover:shadow-md"
                          >
                            <ShoppingBag className="size-3.5" />
                            <span>Pre-order</span>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>

          {/* ==================== 2. EDITORIAL LOOKBOOK & MASTER POSTERS ==================== */}
          <div className="mt-10 pt-8 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-[#C69200]">
                  Official Campaign Archive
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-neutral-950 mt-1">
                  OFFICIAL EDITORIAL POSTERS &amp; LOOKBOOK
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Full campaign photography, street styling in Sydney, and collection blueprints. Click any poster for full-screen inspection.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Poster 1: Lookbook Editorial */}
              <div
                onClick={() => setActivePhoto({
                  image: merchLookbook,
                  caption: "0SQM Editorial Streetwear Lookbook — Street & Studio Styling (Drop 01)",
                  alt: "0SQM Editorial Lookbook Shoot",
                })}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400 hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE4] flex items-center justify-center relative">
                  <img
                    src={merchLookbook}
                    alt="Editorial Streetwear Lookbook"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-black text-[#FFD452] flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-full backdrop-blur-xs">
                      <ZoomIn className="size-4" />
                      <span>View Full Lookbook Poster</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C69200]">Poster 01 // Editorial</span>
                    <h5 className="text-sm font-bold text-neutral-950 group-hover:text-[#C69200] transition-colors">
                      Sydney Street &amp; Studio Editorial
                    </h5>
                  </div>
                  <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Poster 2: Signature 'Same Dream' Presentation */}
              <div
                onClick={() => setActivePhoto({
                  image: merchTee,
                  caption: "0SQM Signature 'Same Dream. Different Budget.' Heavyweight Tee Blueprint",
                  alt: "Signature Same Dream Tee Presentation",
                })}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400 hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE4] flex items-center justify-center relative">
                  <img
                    src={merchTee}
                    alt="Signature Same Dream Tee Presentation"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-black text-[#FFD452] flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-full backdrop-blur-xs">
                      <ZoomIn className="size-4" />
                      <span>View Full Tee Blueprint</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C69200]">Poster 02 // Hero Piece</span>
                    <h5 className="text-sm font-bold text-neutral-950 group-hover:text-[#C69200] transition-colors">
                      Signature Hero Tee Blueprint
                    </h5>
                  </div>
                  <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Poster 3: Full Collection Poster */}
              <div
                onClick={() => setActivePhoto({
                  image: merchCollectionPoster,
                  caption: "0SQM Full Collection Overview Poster — All 10 Designs, Labels & Fabric Specs",
                  alt: "0SQM Full Collection Poster",
                })}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400 hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE4] flex items-center justify-center relative">
                  <img
                    src={merchCollectionPoster}
                    alt="Full Collection Overview Poster"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-black text-[#FFD452] flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-full backdrop-blur-xs">
                      <ZoomIn className="size-4" />
                      <span>View Full Collection Lineup</span>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#C69200]">Poster 03 // Master Lineup</span>
                    <h5 className="text-sm font-bold text-neutral-950 group-hover:text-[#C69200] transition-colors">
                      Full Collection Lineup &amp; Details
                    </h5>
                  </div>
                  <ArrowRight className="size-4 text-neutral-400 group-hover:text-neutral-950 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-paper px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <span className="font-marker text-2xl font-bold">
            $<span className="text-primary">0</span>SQM
          </span>
          <p className="text-xs text-muted-foreground">Big dreams. Small balance.</p>
          <div className="flex items-center gap-5 text-xs font-semibold">
            <a href="#reality" className="hover:text-primary transition-colors">
              Reality
            </a>
            <a href="#journey" className="hover:text-primary transition-colors">
              Journey
            </a>
            <a href="#merch" className="hover:text-primary transition-colors">
              Merch
            </a>
            <a
              href="https://x.com/Own0SQM"
              aria-label="Follow on X"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>@Own0SQM</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ==================== POLAROID & LOOKBOOK LIGHTBOX MODAL ==================== */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] bg-paper p-4 sm:p-6 pb-6 rounded-md shadow-2xl border border-border animate-in zoom-in-95 duration-200 flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo modal"
              className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-950 p-2 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer z-10 bg-paper/90 shadow-xs"
            >
              <X className="size-6" />
            </button>
            <div className="relative w-full flex-1 min-h-0 overflow-auto flex items-center justify-center bg-neutral-950/5 rounded-sm p-1">
              <img
                src={activePhoto.image}
                alt={activePhoto.alt}
                className="max-h-[76vh] w-auto max-w-full object-contain rounded-xs shadow-sm"
              />
            </div>
            {activePhoto.angles && activePhoto.angles.length > 1 && (
              <div className="mt-3 flex items-center gap-1.5 bg-neutral-100 p-1 rounded-full border border-neutral-300">
                {activePhoto.angles.map((ang, idx) => (
                  <button
                    key={ang.id}
                    type="button"
                    onClick={() => setActivePhoto({
                      ...activePhoto,
                      image: ang.image,
                      activeAngleIdx: idx,
                      caption: ang.caption || activePhoto.caption,
                    })}
                    className={`px-3.5 py-1 text-xs font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                      (activePhoto.activeAngleIdx ?? 0) === idx
                        ? "bg-[#FFD452] text-neutral-950 shadow-xs"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60"
                    }`}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-center font-marker text-xl sm:text-2xl text-neutral-900 shrink-0">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* ==================== DROP 01 PRE-ORDER / WAITLIST MODAL ==================== */}
      {waitlistProduct && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setWaitlistProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#181818] text-[#F5F2EB] max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-750 relative animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setWaitlistProduct(null)}
              aria-label="Close pre-order modal"
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>

            {!waitlistSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFD452] text-neutral-950 px-2 py-0.5 rounded-xs">
                    Drop 01 Pre-order
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    {waitlistProduct.gsm}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white leading-tight">
                  {waitlistProduct.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Color: <strong className="text-neutral-200">{waitlistProduct.color}</strong> • {waitlistProduct.fit}
                </p>

                <div className="mt-4 relative aspect-[16/9] w-full bg-neutral-950 rounded-lg overflow-hidden flex items-center justify-center p-2 border border-neutral-800">
                  <img
                    src={
                      waitlistProduct.angles?.[waitlistAngleIdx]?.image ||
                      waitlistProduct.image
                    }
                    alt={waitlistProduct.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  {waitlistProduct.angles && waitlistProduct.angles.length > 1 && (
                    <div className="absolute bottom-2 left-2 z-10 flex items-center bg-neutral-900/90 backdrop-blur-md rounded-full p-0.5 border border-neutral-700 shadow-xs">
                      {waitlistProduct.angles.map((angle, idx) => {
                        const isSelected = waitlistAngleIdx === idx;
                        return (
                          <button
                            key={angle.id}
                            type="button"
                            onClick={() => setWaitlistAngleIdx(idx)}
                            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#FFD452] text-neutral-950"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            {angle.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Size selector if it's apparel */}
                {waitlistProduct.category !== "accessories" && (
                  <div className="mt-4">
                    <label className="block text-xs font-black uppercase tracking-wider text-neutral-300 mb-2">
                      Select Preferred Size:
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {["S", "M", "L", "XL", "XXL"].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setWaitlistSize(sz)}
                          className={`py-2 text-xs font-bold rounded-md border cursor-pointer transition-all ${
                            waitlistSize === sz
                              ? "bg-[#FFD452] text-neutral-950 border-[#FFD452] font-black"
                              : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email submission form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (waitlistEmail.trim()) {
                      setWaitlistSubmitted(true);
                    }
                  }}
                  className="mt-5 space-y-3"
                >
                  <label htmlFor="waitlist-email" className="block text-xs font-black uppercase tracking-wider text-neutral-300">
                    Your Email (First access &amp; free sticker pack):
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="justin@0sqm.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFD452]"
                  />
                  <Button
                    type="submit"
                    variant="sunshine"
                    className="w-full cursor-pointer py-3 text-sm font-black flex items-center justify-center gap-2"
                  >
                    <span>Secure Priority Waitlist Spot</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </form>

                <p className="mt-3 text-[11px] text-center text-neutral-500">
                  No spam. We&apos;ll notify you the exact minute Drop 01 goes live.
                </p>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="size-14 rounded-full bg-[#FFD452]/20 border border-[#FFD452] text-[#FFD452] flex items-center justify-center mx-auto">
                  <Check className="size-8" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  YOU&apos;RE ON THE LIST!
                </h3>
                <p className="text-sm text-neutral-300 max-w-xs mx-auto leading-relaxed">
                  We&apos;ve registered <span className="text-[#FFD452] font-bold">{waitlistEmail}</span> for priority access to <strong>{waitlistProduct.name}</strong>.
                </p>
                <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-400">
                  Drop 01 includes custom woven label, sticker pack &amp; 0SQM certificate.
                </div>
                <button
                  type="button"
                  onClick={() => setWaitlistProduct(null)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-neutral-800 text-white text-xs font-bold hover:bg-neutral-700 cursor-pointer transition-colors"
                >
                  Back to Showroom
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== JUSTIN'S STORY MODAL ==================== */}
      {isStoryModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsStoryModalOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-300 relative animate-in zoom-in-95 duration-200 text-neutral-900"
          >
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              aria-label="Close story modal"
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 p-1 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>

            <div className="font-marker text-3xl text-neutral-900 mb-2">
              JUSTIN&apos;S STORY
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-4">
              Sydney • London • Toronto • Vancouver • New York
            </p>

            <div className="space-y-3 text-neutral-700 text-sm leading-relaxed">
              <p>
                Across the world&apos;s most vibrant metropolitan cities, average housing costs have skyrocketed by over <strong>300%</strong> compared to median salaries over the past two decades.
              </p>
              <p>
                Justin works 50 hours a week, saves every month, and lives responsibly. Yet in every major city, the dream of owning a home drifts further away each year.
              </p>
              <div className="bg-[#FFD452]/25 border-l-4 border-[#FFD452] p-3 rounded-r-lg font-medium text-neutral-900">
                &ldquo;The average young professional now needs 24 years just to save a standard 20% downpayment in these global cities.&rdquo;
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                className="bg-neutral-950 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
