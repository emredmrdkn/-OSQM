'use client';

import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/v2/ui/button";

const heroImage = "/images/v2/sydney-hero.jpg";
const justinImage = "/images/v2/justin-dog.jpg";
const merchImage = "/images/v2/merch-lineup.jpg";

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

  // Satirical Calculations
  const depositPercent = Math.min(100, (numericSavings / Math.max(1, currentCity.rawDeposit)) * 100);
  const hyperLocalCount = Math.floor(numericSavings / Math.max(0.01, currentCity.hyperLocal.price));
  const hoursTo1Sqm = Math.round(currentCity.pricePerSqm / Math.max(1, currentCity.averageHourlyWage));
  const monthsTo1Sqm = Number((currentCity.pricePerSqm / Math.max(1, currentCity.averageHourlyWage * 8 * 21.67)).toFixed(1));
  const yearsToDeposit = Math.max(1, Math.round((currentCity.rawDeposit - numericSavings) / Math.max(1, currentCity.rawSalary * 0.2)));

  const calculate = () => {
    if (!savings) setSavings("25000");
  };

  const handlePreset = (val: string) => {
    setSavings(val);
  };

  const [activePhoto, setActivePhoto] = useState<{
    image: string;
    caption: string;
    alt: string;
  } | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const justinPolaroids = [
    {
      id: "same-dream",
      image: "/images/v2/justin-laptop-harbour.jpg",
      alt: "Justin and Renty checking the $0SQM Reality Check on their laptop at Sydney Harbour",
      caption: "Same dream. Different budget.",
      rotation: "-rotate-2",
      tapeRotation: "rotate-2",
      tapePosition: "-top-3 left-1/2 -translate-x-1/2",
    },
    {
      id: "hope",
      image: "/images/v2/justin-dog.jpg",
      alt: "Justin and his dog overlooking Sydney Harbour at sunset",
      caption: "Still 0m², but never 0 hope.",
      rotation: "rotate-1",
      tapeRotation: "-rotate-4",
      tapePosition: "-top-3 right-6",
    },
    {
      id: "open-home",
      image: "/images/v2/justin-open-home.jpg",
      alt: "Justin and Renty queuing outside an open home",
      caption: "First open home. How bad could it be?",
      rotation: "-rotate-1",
      tapeRotation: "rotate-3",
      tapePosition: "-top-3 left-6",
    },
    {
      id: "brochure",
      image: "/images/v2/justin-brochure.jpg",
      alt: "Justin and Renty looking at a $1,850,000 property brochure",
      caption: "$1.85M for 607m². Endless potential.",
      rotation: "rotate-2",
      tapeRotation: "-rotate-2",
      tapePosition: "-top-3 right-8",
    },
  ];

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
              ["Community", "#cities"],
              ["Merch", "#merch"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
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
        className="relative min-h-[760px] scroll-mt-16 overflow-hidden pt-16 sm:min-h-[780px] lg:min-h-[720px]"
      >
        <img
          src={heroImage}
          alt="A man and his dog looking across Sydney Harbour"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-foreground/30 lg:bg-gradient-to-r lg:from-background/90 lg:via-background/30 lg:to-transparent" />
        <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-start px-5 pt-12 sm:px-8 lg:items-center lg:pt-0">
          <div className="min-w-0 max-w-xl">
            <h1 className="font-marker text-5xl font-bold leading-[0.83] min-[360px]:text-6xl sm:text-7xl lg:text-8xl">
              $<span className="text-primary">0</span>SQM
            </h1>
            <p className="mt-4 max-w-lg font-marker text-2xl font-bold uppercase leading-tight min-[360px]:text-3xl sm:text-4xl">
              The Australian dream
              <br />
              still starts at <mark className="bg-primary px-2 text-foreground">0m²</mark>
            </p>
            <p className="mt-5 max-w-sm text-sm font-semibold leading-relaxed sm:text-base">
              Just a guy, a dog, and a very expensive housing market. Documenting the journey from 0.00m² to a place we can call home.
            </p>
            <Button
              variant="sunshine"
              size="lg"
              className="mt-6 max-w-full px-5 text-xs min-[360px]:text-sm"
              asChild
            >
              <a href="https://x.com/Own0SQM" target="_blank" rel="noreferrer">
                Follow the journey on X <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Dream Section */}
      <section id="dream" className="scroll-mt-16 bg-background px-4 py-16 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            {/* Image Card with Polaroid & Tape styling */}
            <div className="relative">
              <div
                onClick={() =>
                  setActivePhoto({
                    image: "/images/v2/justin-laptop-harbour.jpg",
                    caption: "Better views. Smaller budgets. — Sydney Harbour, 2026",
                    alt: "Justin and Renty checking the $0SQM Reality Check at Sydney Harbour",
                  })
                }
                className="group relative bg-paper p-3 pb-4 shadow-2xl border border-border rounded-xs sm:-rotate-1 hover:rotate-0 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
              >
                {/* Masking tape top-center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 masking-tape -rotate-2 z-20 pointer-events-none rounded-xs" />
                
                <div className="relative aspect-[1024/839] w-full overflow-hidden rounded-xs bg-neutral-100">
                  <img
                    src="/images/v2/justin-laptop-harbour.jpg"
                    alt="Justin and Renty checking $0SQM on their laptop overlooking Sydney Harbour"
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

            {/* Content & Justin's Plan */}
            <div className="space-y-6">
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
                  Justin and Renty are proving that owning <strong>0 SQM</strong> doesn&apos;t mean having 0 ambition.
                </p>
              </div>

              {/* Spiral Notebook Plan Card */}
              <div className="rounded-lg border-2 border-dashed border-foreground/20 bg-paper p-5 shadow-sm relative">
                <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                  <span className="font-marker text-lg font-bold text-foreground">
                    📓 Justin&apos;s Master Plan
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">Updated: Today</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-medium">
                  {[
                    ["☑", "Save more (theoretically)"],
                    ["☑", "Find cheaper suburb (now 4 hours away)"],
                    ["☑", "Go to more open homes (for the free pens)"],
                    ["☑", "Get 1 m² of land (the dream)"],
                    ["☑", "More walks with Renty"],
                    ["☐", "Don't give up ☺"],
                  ].map(([check, item]) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{check}</span>
                      <span className={check === "☐" ? "font-bold text-foreground underline decoration-primary decoration-2" : "text-foreground/90"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
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
      <section id="reality" className="paper-grid relative scroll-mt-16 bg-paper px-4 py-12 sm:px-6 lg:px-8">
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

          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[200px_minmax(0,1fr)_210px]">
            {/* Cities Sidebar */}
            <div className="flex flex-col gap-2">
              {/* Category Switcher */}
              <div className="grid grid-cols-2 gap-1 rounded-md border border-border bg-paper p-1">
                <button
                  type="button"
                  onClick={() => {
                    setCalculatorTab("australia");
                    setSelectedCityIndex(0);
                  }}
                  className={`rounded-xs py-1.5 px-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    calculatorTab === "australia"
                      ? "bg-primary text-foreground shadow-xs font-black"
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
                  className={`rounded-xs py-1.5 px-2 text-center text-xs font-bold transition-all cursor-pointer ${
                    calculatorTab === "global"
                      ? "bg-primary text-foreground shadow-xs font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🌍 Global
                </button>
              </div>

              {/* City Buttons */}
              <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:content-start">
                {activeCities.map((city, index) => (
                  <Button
                    variant={index === selectedCityIndex ? "sunshine" : "ghost"}
                    key={city.name}
                    onClick={() => setSelectedCityIndex(index)}
                    className={`h-auto min-w-0 justify-start px-3 py-3 text-left text-xs min-[360px]:text-sm cursor-pointer transition-all duration-150 ${
                      index === selectedCityIndex
                        ? "font-bold shadow-xs scale-[1.02] border border-foreground/30"
                        : "hover:bg-muted/80 text-foreground"
                    } ${index === activeCities.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-sm border border-foreground/20 bg-background text-[10px] font-black">
                      {city.flag}
                    </span>
                    <span className="truncate">{city.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* City Details & Calculator */}
            <div className="min-w-0 rounded-lg border border-border bg-background p-4 shadow-sm sm:p-6">
              <div className="border-b border-border pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-marker text-3xl font-bold uppercase">{currentCity.name}</h3>
                    <p className="text-xs text-muted-foreground">{currentCity.country}</p>
                  </div>
                  <span className="rounded-full border border-foreground/20 bg-paper px-3 py-1 text-xs font-bold">
                    {currentCity.flag} · {currentCity.currency} ({currentCity.currencySymbol})
                  </span>
                </div>
                <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 min-[350px]:grid-cols-2 md:grid-cols-4">
                  {[
                    ["Median House Price", currentCity.medianHousePrice],
                    ["Land Value (per sqm)", currentCity.landValuePerSqm],
                    ["Typical Deposit (20%)", currentCity.typicalDeposit],
                    ["Average Full-time Salary", currentCity.averageSalary],
                  ].map(([label, value]) => (
                    <div key={label} className="border-l-2 border-primary pl-3">
                      <p className="text-[11px] text-muted-foreground">{label}</p>
                      <strong className="mt-1 block text-xl">{value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator Form & Controls */}
              <div className="pt-5 space-y-5">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-marker text-xl font-bold uppercase">
                      How much of {currentCity.name} can you afford?
                    </h4>
                    <span className="text-[11px] font-semibold text-primary-foreground bg-primary px-2 py-0.5 rounded-xs">
                      Theoretical Rate: {currentCity.landValuePerSqm}/m²
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enter your savings in {currentCity.currency} ({currentCity.currencySymbol}) or drag the slider to see how many square metres you theoretically afford.
                  </p>

                  <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 min-[360px]:grid-cols-[minmax(0,1fr)_auto]">
                    <label className="flex h-11 min-w-0 items-center rounded-md border border-input bg-paper px-3 focus-within:ring-2 focus-within:ring-primary">
                      <span className="mr-2 font-bold text-muted-foreground">{currentCity.currencySymbol}</span>
                      <input
                        value={savings}
                        onChange={(e) => setSavings(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") calculate(); }}
                        inputMode="decimal"
                        aria-label="Savings amount"
                        placeholder="e.g. 25000"
                        className="w-full min-w-0 flex-1 bg-transparent outline-none font-medium text-base text-foreground"
                      />
                    </label>
                    <Button
                      variant="ink"
                      className="h-11 w-full min-[360px]:w-auto cursor-pointer font-bold"
                      onClick={calculate}
                    >
                      Calculate
                    </Button>
                  </div>

                  {/* Range Slider for immediate live interactive fun */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[11px] font-bold text-muted-foreground">{currentCity.currencySymbol}0</span>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="2500"
                      value={Math.min(150000, numericSavings)}
                      onChange={(e) => setSavings(e.target.value)}
                      className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-amber-400"
                      aria-label="Savings slider"
                    />
                    <span className="text-[11px] font-bold text-muted-foreground">{currentCity.currencySymbol}150k+</span>
                  </div>

                  {/* Quick Preset Chips */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground mr-1">Quick Presets:</span>
                    {["5000", "25000", "50000", "100000", "250000"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handlePreset(preset)}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors cursor-pointer ${
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

                {/* 20% Deposit Reality Progress Meter */}
                <div className="rounded-md border border-border bg-paper p-3">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-foreground flex items-center gap-1">
                      <span>🏦</span> Deposit Progress ({depositPercent.toFixed(1)}% of 20% downpayment)
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {currentCity.currencySymbol}{numericSavings.toLocaleString()} / {currentCity.typicalDeposit}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300 rounded-full"
                      style={{ width: `${depositPercent}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between items-center text-[10px] text-muted-foreground">
                    <span className="italic">
                      {depositPercent < 10
                        ? "Living rent-free in the comments 🛋️"
                        : depositPercent < 30
                        ? "One foot in the foyer (barefoot) 🦶"
                        : depositPercent < 60
                        ? "Halfway to an inspection brochure 📄"
                        : depositPercent < 100
                        ? "Your landlord is sweating 😰"
                        : "Wait, you actually made it?! 🤯"}
                    </span>
                    <span className="font-semibold text-foreground">
                      {numericSavings >= currentCity.rawDeposit
                        ? "Deposit reached!"
                        : `~${yearsToDeposit} yrs of saving needed`}
                    </span>
                  </div>
                </div>

                {/* 3-Column Satirical Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* 1. Physical Reality */}
                  <div className="rounded-md border border-border bg-paper/90 p-3 text-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        📐 Physical Reality
                      </span>
                      <strong className="text-sm font-marker text-foreground block">
                        {metaphor.title}
                      </strong>
                      <p className="text-muted-foreground mt-1 italic leading-snug">
                        &ldquo;{metaphor.desc}&rdquo;
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/60 text-[10px] font-mono text-foreground font-semibold">
                      {affordableSqm.toFixed(2)} m² (≈ {(affordableSqm * 10.764).toFixed(1)} sq ft)
                    </div>
                  </div>

                  {/* 2. Boomer Currency Equivalent */}
                  <div className="rounded-md border border-border bg-paper/90 p-3 text-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        {currentCity.hyperLocal.emoji} Boomer Currency
                      </span>
                      <strong className="text-sm font-marker text-foreground block">
                        {hyperLocalCount.toLocaleString()} {currentCity.hyperLocal.unit}
                      </strong>
                      <p className="text-muted-foreground mt-1 italic leading-snug">
                        Or you could have bought {hyperLocalCount.toLocaleString()} {currentCity.hyperLocal.name}.
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
                      {currentCity.currencySymbol}{currentCity.hyperLocal.price} per item
                    </div>
                  </div>

                  {/* 3. Brutal Timeline */}
                  <div className="rounded-md border border-border bg-paper/90 p-3 text-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        ⏳ Brutal Timeline
                      </span>
                      <strong className="text-sm font-marker text-red-600 block">
                        {hoursTo1Sqm.toLocaleString()} Working Hours
                      </strong>
                      <p className="text-muted-foreground mt-1 italic leading-snug">
                        {monthsTo1Sqm} months of 100% saved salary to buy 1 m².
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
                      Settlement: {numericSavings >= currentCity.rawDeposit ? "TODAY" : "NEVER ☺"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Yellow Reality Note */}
            <aside className="relative min-w-0 self-start rounded-sm bg-primary p-5 text-center shadow-xl sm:rotate-1 border border-foreground/10 flex flex-col justify-between">
              {/* Masking tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 masking-tape -rotate-2 z-20 pointer-events-none rounded-xs" />

              <div>
                <span className="font-mono text-[9px] font-black uppercase tracking-wider text-foreground/75 block">
                  Official Reality Audit
                </span>

                <p className="mt-1 font-marker text-xl font-bold uppercase text-foreground">
                  In Reality, You Own
                </p>

                {/* The 0 SQM Punchline */}
                <div className="my-2 py-3 bg-background/30 rounded-xs border border-foreground/15">
                  <strong className="block font-marker text-6xl leading-none text-foreground">
                    0
                  </strong>
                  <p className="font-marker text-2xl font-bold text-foreground tracking-wider">
                    SQM
                  </p>
                </div>

                {/* Theoretical vs Reality */}
                <p className="text-xs font-bold text-foreground">
                  Theoretically: <span className="underline decoration-2 font-black">{affordableSqm.toFixed(2)} m²</span>
                </p>
                <p className="text-[11px] text-foreground/80 italic mt-0.5 leading-tight">
                  {numericSavings >= currentCity.rawDeposit
                    ? "Wait, you actually have a 20% deposit?! Why are you here?!"
                    : `Bank verdict: "Come back when you have ${currentCity.typicalDeposit}."`}
                </p>
              </div>

              {/* Satirical Roast Quote */}
              <div className="my-3 border-y border-foreground/15 py-2.5">
                <p className="font-marker text-base sm:text-lg leading-tight text-foreground">
                  &ldquo;{currentCity.satiricalNote}&rdquo;
                </p>
              </div>

              {/* Share Reality on X Button */}
              <div className="space-y-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=I%20saved%20${currentCity.currencySymbol}${numericSavings.toLocaleString()}%20and%20officially%20own%200%20SQM%20in%20${currentCity.name}%20(${affordableSqm.toFixed(2)}m%C2%B2%20theoretically).%20Same%20dream.%20Different%20budget.%20%40Own0SQM%20%230SQM&url=https://x.com/Own0SQM`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xs bg-foreground px-3 py-2 text-xs font-bold text-background shadow-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Share Reality on X</span>
                </a>
                <p className="font-marker text-xs text-foreground/75">
                  Different cities. Same portfolio. ☺
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section id="journey" className="scroll-mt-16 bg-background px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Üst Kısım: Meet Justin & 3 Polaroid Kartı */}
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] lg:items-center">
            {/* Justin Story Text */}
            <div>
              <h2 className="font-marker text-4xl font-bold uppercase">Meet Justin.</h2>
              <div className="mt-4 space-y-1 text-sm font-medium">
                <p>Justin works.</p>
                <p>Justin saves.</p>
                <p>Justin pays rent.</p>
                <p>Justin watches property prices go up.</p>
                <p className="font-bold pt-1">Justin owns 0 SQM.</p>
              </div>
              <p className="mt-5 font-semibold text-neutral-800">
                Justin is doing great.
                <br />
                His landlord is doing better.
              </p>
              <Button
                variant="sunshine"
                className="mt-5 cursor-pointer"
                onClick={() => setIsStoryModalOpen(true)}
              >
                Read Justin&apos;s story <ArrowRight className="size-4" />
              </Button>
            </div>

            {/* 4 Polaroid Kartı (Yatayda Serbestçe Kaydırılabilir) */}
            <div className="relative min-w-0">
              {/* Yatay Kaydırma Kontrolleri */}
              <div className="flex items-center justify-between pb-2 px-1">
                <span className="text-[11px] font-mono font-semibold text-muted-foreground">
                  ← 4 Polaroid • Kaydırarak incele →
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => scrollPolaroids("left")}
                    aria-label="Önceki görsel"
                    className="grid size-8 place-items-center rounded-full border border-border bg-paper hover:bg-muted text-foreground shadow-xs transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollPolaroids("right")}
                    aria-label="Sonraki görsel"
                    className="grid size-8 place-items-center rounded-full border border-border bg-paper hover:bg-muted text-foreground shadow-xs transition-colors cursor-pointer"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Polaroid Listesi */}
              <div
                ref={polaroidScrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-4 px-4 sm:px-6 items-center justify-start scroll-smooth snap-x snap-mandatory"
              >
                {justinPolaroids.map((polaroid, idx) => (
                  <figure
                    key={polaroid.id}
                    onClick={() => setActivePhoto(polaroid)}
                    className={`relative w-[220px] sm:w-[240px] shrink-0 snap-start bg-paper p-3 pb-4 shadow-xl border border-border rounded-xs cursor-pointer ${polaroid.rotation} hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-30 transition-all duration-300 group`}
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

      {/* Merch Section */}
      <section id="merch" className="torn-top scroll-mt-16 bg-muted px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
          <div>
            <h2 className="text-5xl font-black uppercase leading-[0.9]">
              Wear
              <br />
              the reality.
            </h2>
            <p className="mt-4 text-sm font-medium">
              Merch for the generation that&apos;s priced out.
            </p>
            <Button variant="sunshine" className="mt-5 cursor-pointer">
              Visit Merch Store <ArrowRight className="size-4" />
            </Button>
          </div>
          <img
            src={merchImage}
            alt="$0SQM clothing and accessories"
            loading="lazy"
            width={1600}
            height={912}
            className="h-auto min-w-0 max-w-full rounded-md mix-blend-multiply"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-paper px-4 py-7 sm:px-6">
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

      {/* ==================== POLAROID LIGHTBOX MODAL ==================== */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-paper p-4 pb-6 rounded-sm shadow-2xl border border-border animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo modal"
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-950 p-1.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs mt-4">
              <img
                src={activePhoto.image}
                alt={activePhoto.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-center font-marker text-2xl text-neutral-900">
              {activePhoto.caption}
            </p>
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
