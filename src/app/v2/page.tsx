'use client';

import { ArrowRight, Calendar, Check, ChevronLeft, ChevronRight, Copy, Download, FileText, Heart, Home, MapPin, Menu, Percent, RotateCcw, Share2, Sparkles, Tag, User, Wallet, Wrench, X } from "lucide-react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
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

  // Audit / Calculate animation states
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [hasAudited, setHasAudited] = useState(false);
  const [auditShake, setAuditShake] = useState(false);

  // Reality Score Card Ref and Download / Share states
  const cardRef = useRef<HTMLDivElement>(null);
  const savingsInputRef = useRef<HTMLInputElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#FAF9F5',
      });
      const link = document.createElement('a');
      link.download = `0sqm-reality-score-${currentCity.id || 'sydney'}.png`;
      link.href = dataUrl;
      link.click();
      return dataUrl;
    } catch (err) {
      console.error('Failed to download card', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareOnX = async () => {
    // 1. Download card PNG
    await handleDownloadCard();

    // 2. Try copying image to clipboard if supported
    if (cardRef.current && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      try {
        const blob = await new Promise<Blob | null>((resolve) => {
          if (!cardRef.current) return resolve(null);
          toPng(cardRef.current, { pixelRatio: 2, backgroundColor: '#FAF9F5' })
            .then((url) => fetch(url))
            .then((r) => r.blob())
            .then(resolve)
            .catch(() => resolve(null));
        });
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setShareToast("Card downloaded & copied to clipboard! Attach or paste it on X.");
        } else {
          setShareToast("Card image downloaded! Attach it to your post on X.");
        }
      } catch {
        setShareToast("Card image downloaded! Attach it to your post on X.");
      }
    } else {
      setShareToast("Card image downloaded! Attach it to your post on X.");
    }

    // 3. Open Twitter / X intent matching reference
    const formattedSavings = `${currentCity.currencySymbol}${numericSavings.toLocaleString()}`;
    const tweetText = `I saved ${formattedSavings} and officially own 0 SQM in ${currentCity.name} (${affordableSqm.toFixed(2)}m² theoretically).\n\nSame dream. Different budget.\n\n@Own0SQM #0SQM\nhttps://x.com/Own0SQM`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => setShareToast(null), 6000);
  };

  const handleTryAgain = () => {
    if (savingsInputRef.current) {
      savingsInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      savingsInputRef.current.focus();
      savingsInputRef.current.select();
    }
  };

  // Sub-tabs under the calculator
  const [activeCalcTab, setActiveCalcTab] = useState<"receipt" | "boomer" | "auction">("receipt");
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  // Boomer simulator toggles
  const [boomerSacrifices, setBoomerSacrifices] = useState({
    coffee: true,
    avo: true,
    streaming: false,
    walking: false,
    noHeating: false,
  });

  // Auction simulator state
  const [auctionState, setAuctionState] = useState<"idle" | "bidding" | "outbid" | "sold">("idle");
  const [auctionLog, setAuctionLog] = useState<string[]>([]);

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

  const getSliderRoast = (val: number, symbol: string) => {
    if (val <= 0) return "Pure freedom (and negative net worth) 🧘";
    if (val < 2500) return `With ${symbol}${val.toLocaleString()}, you can afford 2 days of Sydney CBD parking & an iced flat white ☕`;
    if (val < 10000) return `Enough for 1 doormat in Bondi, but strictly during off-peak hours 🚪`;
    if (val < 25000) return `Justin tier: a nice laptop, a corgi harness, and exactly 0 m² 💻`;
    if (val < 50000) return `The air rights directly between the fridge and the wall in an unrenovated studio 🧊`;
    if (val < 80000) return `Enough to cover strata legal fees for your neighbour's leaking balcony 🌧️`;
    if (val < 120000) return `You can now inhale the oxygen at a Saturday open inspection without coughing 👃`;
    if (val < 150000) return `Almost enough for stamp duty on a cardboard box in Surry Hills 📦`;
    return `Offshore cash buyer laughing in the background on speakerphone 📞`;
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

  const boomerItems = [
    { key: "coffee" as const, label: "Skip Daily Flat White", saving: 2007, desc: "+$5.50 / day" },
    { key: "avo" as const, label: "Stop Eating Smashed Avocado", saving: 1144, desc: "+$22 / week" },
    { key: "streaming" as const, label: "Cancel Netflix, Disney+ & Spotify", saving: 540, desc: "+$45 / month" },
    { key: "walking" as const, label: "Walk 30km to Work (No Opal/Train)", saving: 2860, desc: "+$55 / week" },
    { key: "noHeating" as const, label: "Zero Winter Heating (Wear 4 Jumpers)", saving: 600, desc: "+$150 / winter mo" },
  ];

  const totalBoomerSaving = boomerItems.reduce((acc, item) => {
    return acc + (boomerSacrifices[item.key] ? item.saving : 0);
  }, 0);

  const boomerApprovalScore = Math.min(100, Math.round((totalBoomerSaving / 7151) * 100));

  const monthlyBaseSaving = (currentCity.rawSalary * 0.2) / 12;
  const monthlyTotalSaving = monthlyBaseSaving + (totalBoomerSaving / 12);
  const monthsWithSacrifices = (currentCity.pricePerSqm / Math.max(1, monthlyTotalSaving)).toFixed(1);

  const runAuctionSimulation = () => {
    const bidAmount = numericSavings > 0 ? numericSavings.toLocaleString() : "25,000";
    setAuctionState("bidding");
    setAuctionLog([
      `📢 Auctioneer: "Opening bid of ${currentCity.currencySymbol}${bidAmount} from the young hopeful in the back row!"`
    ]);

    setTimeout(() => {
      setAuctionState("outbid");
      setAuctionLog((prev) => [
        ...prev,
        `📱 Offshore Phone Bidder: "Raise to $1,850,000 CASH, unconditional, 7-day settlement!"`,
        `👨‍💼 Auctioneer: "Going once, going twice..."`
      ]);
    }, 1100);

    setTimeout(() => {
      setAuctionState("sold");
      setAuctionLog((prev) => [
        ...prev,
        `🔨 GAVEL SLAMS: "SOLD to the phone bidder who hasn't stepped foot in the Southern Hemisphere!"`,
        `🏆 Verdict: You won 0 SQM (and 1 free bottle of lukewarm auction water).`
      ]);
    }, 2300);
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
        className="relative min-h-[450px] sm:min-h-[650px] lg:min-h-[720px] scroll-mt-16 overflow-hidden pt-16"
      >
        <img
          src={heroImage}
          alt="A man and his dog looking across Sydney Harbour"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-[27%_bottom] sm:object-[58%_center]"
        />
        {/* Subtle vignette so the image looks natural and not washed out */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/20 pointer-events-none" />
        <h1 className="sr-only">
          $0SQM — The Australian Dream Still Starts at 0m²
        </h1>
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

          <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
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

            {/* Main Area: City Details, Calculator Form & THE REALITY SCORE CARD */}
            <div className="min-w-0 space-y-6">
              {/* City Details & Input Controls */}
              <div className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6">
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
                          ref={savingsInputRef}
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
                        className="h-11 w-full min-[360px]:w-auto cursor-pointer font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                        onClick={calculate}
                        disabled={isAuditing}
                      >
                        {isAuditing ? (
                          <>
                            <div className="size-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                            <span>Auditing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-4 text-amber-400" />
                            <span>Calculate</span>
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Comedic Auditing Progress Banner */}
                    {isAuditing && (
                      <div className="mt-3 p-3 rounded-md bg-amber-500/15 border border-amber-500/30 text-xs font-mono text-foreground animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex items-center justify-between mb-1.5 font-bold">
                          <span className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-amber-600 animate-ping" />
                            <span>{auditMessages[auditStep]}</span>
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {Math.round(((auditStep + 1) / auditMessages.length) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${((auditStep + 1) / auditMessages.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Range Slider */}
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

                    {/* Dynamic Live Slider Roaster */}
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs text-foreground transition-all">
                      <span className="text-sm shrink-0">🔥</span>
                      <span className="font-semibold italic leading-snug">
                        {getSliderRoast(numericSavings, currentCity.currencySymbol)}
                      </span>
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
                </div>
              </div>

              {/* ========================================================================= */}
              {/* THE REALITY SCORE BILLBOARD (Sydney Harbour Scene with Renty) */}
              {/* ========================================================================= */}
              <div className="flex justify-center w-full">
                <div
                  ref={cardRef}
                  id="reality-score-card"
                  className={`w-full max-w-3xl rounded-[32px] sm:rounded-[40px] border border-neutral-300 shadow-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
                    auditShake ? "scale-[1.02] ring-4 ring-amber-400/40" : ""
                  }`}
                  style={{
                    backgroundImage: "url('/images/v2/cities/sydney.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center 42%",
                  }}
                >
                  {/* Subtle bright sky vignette to ensure top text and billboard stand out */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/10 to-black/25 pointer-events-none" />

                  {/* Top Scene Header (Sky Area) */}
                  <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 pb-8 sm:pb-12 md:pb-14">
                    {/* Left: Logo & Subtitle */}
                    <div className="drop-shadow-sm">
                      <div className="flex items-center text-3xl sm:text-5xl font-marker font-bold tracking-tight">
                        <span className="text-neutral-900">$</span>
                        <span className="text-[#F5C842]">0</span>
                        <span className="text-neutral-900">SQM</span>
                      </div>
                      <p className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-neutral-800 uppercase mt-0.5">
                        REAL DATA. REAL PRICES. SAME RESULT.
                      </p>
                    </div>

                    {/* Middle: Slogan with yellow brush underline */}
                    <div className="hidden sm:block text-center pt-1 drop-shadow-xs -rotate-1">
                      <p className="font-marker text-xs sm:text-sm md:text-base font-bold tracking-wide text-neutral-900 uppercase leading-tight">
                        THE AUSTRALIAN DREAM
                      </p>
                      <div className="inline-block relative">
                        <p className="font-marker text-xs sm:text-sm md:text-base font-bold tracking-wide text-neutral-900 uppercase leading-tight">
                          STILL STARTS AT 0M².
                        </p>
                        <div className="h-1 sm:h-1.5 bg-[#F5C842] rounded-full w-full -mt-0.5" />
                      </div>
                    </div>

                    {/* Right spacer to balance top row while leaving room for Renty */}
                    <div className="w-24 sm:w-36 md:w-44 shrink-0" />
                  </div>

                  {/* THE BILLBOARD CONTAINER */}
                  <div className="relative z-20 mt-4 sm:mt-6">
                    {/* Renty Peeking over Billboard with Sunglasses & "RENTY APPROVES." */}
                    <div className="absolute -top-[70px] sm:-top-[90px] md:-top-[110px] right-4 sm:right-10 md:right-14 z-30 flex items-end select-none pointer-events-none">
                      <img
                        src="/images/v2/renty-peeking.png"
                        alt="Renty the Corgi Approves"
                        className="w-28 sm:w-36 md:w-44 object-contain drop-shadow-2xl"
                      />
                      <div className="flex flex-col items-start -ml-1 sm:-ml-2 mb-6 sm:mb-10 select-none">
                        <span className="font-marker text-[10px] sm:text-xs md:text-sm font-bold text-neutral-900 -rotate-6 leading-tight whitespace-nowrap drop-shadow-xs">
                          RENTY
                          <br />
                          APPROVES.
                        </span>
                        <svg className="w-5 h-5 sm:w-7 sm:h-7 text-neutral-900 -rotate-12 mt-0.5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6a9 9 0 0 1-10 10l-4-2m0 0l3-4m-3 4l4 2" />
                        </svg>
                      </div>
                    </div>

                    {/* THE BILLBOARD STRUCTURE */}
                    <div className="rounded-[24px] sm:rounded-[32px] border-[6px] sm:border-[8px] border-[#363A40] bg-[#1E2024] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
                      {/* 4 Corner Metallic Screws / Rivets */}
                      <div className="absolute top-2.5 left-2.5 size-2.5 sm:size-3 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 border border-neutral-800 shadow-inner z-30" />
                      <div className="absolute top-2.5 right-2.5 size-2.5 sm:size-3 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 border border-neutral-800 shadow-inner z-30" />
                      <div className="absolute bottom-2.5 left-2.5 size-2.5 sm:size-3 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 border border-neutral-800 shadow-inner z-30" />
                      <div className="absolute bottom-2.5 right-2.5 size-2.5 sm:size-3 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 border border-neutral-800 shadow-inner z-30" />

                      {/* Upper Half: Dark Digital Sign Display */}
                      <div className="bg-[#202328] p-4 sm:p-6 border-b-4 border-[#33373D] text-white">
                        <div className="flex items-center justify-between text-xs font-mono font-bold uppercase pb-3">
                          <span className="text-neutral-300 tracking-widest">REALITY SCORE</span>
                          <span className="text-neutral-400 text-[11px] tracking-wider">
                            {currentCity.name.toUpperCase()}, {currentCity.flag && currentCity.flag.length <= 3 ? currentCity.flag : "NSW"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-4 items-center">
                          {/* Left: Split-Flap Flip Counter */}
                          <div>
                            <div className="flex items-center gap-1 sm:gap-1.5 my-1">
                              {/* Tile 1: 0 */}
                              <div className="relative w-12 h-18 sm:w-15 sm:h-22 bg-[#121417] rounded-[8px] sm:rounded-[10px] flex items-center justify-center shadow-lg border border-black/50 overflow-hidden select-none">
                                <span className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight">0</span>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0A0C0E] shadow-[0_1px_0_rgba(255,255,255,0.18)]" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-r-xs" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-l-xs" />
                              </div>

                              {/* Dot */}
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#121417] self-end mb-3 sm:mb-4 mx-0.5 shadow-sm" />

                              {/* Tile 2: 0 */}
                              <div className="relative w-12 h-18 sm:w-15 sm:h-22 bg-[#121417] rounded-[8px] sm:rounded-[10px] flex items-center justify-center shadow-lg border border-black/50 overflow-hidden select-none">
                                <span className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight">0</span>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0A0C0E] shadow-[0_1px_0_rgba(255,255,255,0.18)]" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-r-xs" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-l-xs" />
                              </div>

                              {/* Tile 3: 0 */}
                              <div className="relative w-12 h-18 sm:w-15 sm:h-22 bg-[#121417] rounded-[8px] sm:rounded-[10px] flex items-center justify-center shadow-lg border border-black/50 overflow-hidden select-none">
                                <span className="font-sans font-black text-4xl sm:text-6xl text-white tracking-tight">0</span>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0A0C0E] shadow-[0_1px_0_rgba(255,255,255,0.18)]" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-r-xs" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-l-xs" />
                              </div>

                              {/* Tile 4: m² with flip line and yellow underline */}
                              <div className="relative w-16 h-18 sm:w-20 sm:h-22 bg-[#121417] rounded-[8px] sm:rounded-[10px] flex flex-col items-center justify-center shadow-lg border border-black/50 overflow-hidden select-none ml-1">
                                <div className="relative inline-block">
                                  <span className="font-bold text-3xl sm:text-5xl text-white select-none">m²</span>
                                  <div className="h-1 bg-[#F5C842] rounded-full w-full -mt-0.5" />
                                </div>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#0A0C0E] shadow-[0_1px_0_rgba(255,255,255,0.18)]" />
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-r-xs" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 sm:w-1.5 h-2.5 bg-[#0A0C0E] rounded-l-xs" />
                              </div>
                            </div>

                            <div className="mt-3">
                              <p className="font-bold text-base sm:text-xl text-white leading-tight">
                                You own 0 square metres.
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-0.5">
                                But hey, at least the views are free.
                              </p>
                            </div>
                          </div>

                          {/* Right: Metadata Card */}
                          <div className="rounded-2xl border border-black/10 bg-[#FAF8F2] p-3.5 sm:p-4 text-neutral-900 shadow-sm space-y-2.5">
                            {/* Location */}
                            <div className="flex items-start gap-2.5">
                              <MapPin className="size-4 text-neutral-800 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                                  LOCATION
                                </span>
                                <strong className="text-xs sm:text-sm font-bold text-neutral-900">
                                  {currentCity.name}, {currentCity.flag && currentCity.flag.length <= 3 ? currentCity.flag : currentCity.country}
                                </strong>
                              </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-start gap-2.5">
                              <Calendar className="size-4 text-neutral-800 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                                  DATE
                                </span>
                                <strong className="text-xs sm:text-sm font-bold text-neutral-900">
                                  20 Sep 2026
                                </strong>
                              </div>
                            </div>

                            {/* Property Type */}
                            <div className="flex items-start gap-2.5">
                              <Home className="size-4 text-neutral-800 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                                  PROPERTY TYPE
                                </span>
                                <strong className="text-xs sm:text-sm font-bold text-neutral-900">
                                  Theoretical Land
                                </strong>
                              </div>
                            </div>

                            {/* Your Savings */}
                            <div className="flex items-start gap-2.5">
                              <Wallet className="size-4 text-neutral-800 shrink-0 mt-0.5" />
                              <div>
                                <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                                  YOUR SAVINGS
                                </span>
                                <strong className="text-xs sm:text-sm font-bold text-neutral-900">
                                  {currentCity.currencySymbol}{numericSavings.toLocaleString()}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lower Half: Cream Board with Cost Breakdown & Sticky Note */}
                      <div className="bg-[#FAF8F2] p-4 sm:p-6 text-neutral-900">
                        <div className="grid grid-cols-1 sm:grid-cols-[1.3fr_1fr] gap-4 items-start">
                          {/* Left: Cost Breakdown */}
                          <div className="flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
                                <span className="text-neutral-800 tracking-wider">COST BREAKDOWN</span>
                                <span className="text-neutral-500 text-[10px]">{currentCity.currency} ({currentCity.currencySymbol})</span>
                              </div>

                              <div className="border-b border-neutral-300 my-2" />

                              <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
                                <div className="flex items-center justify-between text-neutral-800">
                                  <span className="flex items-center gap-1.5">
                                    <Tag className="size-3 text-neutral-600 shrink-0" />
                                    <span>Land Value ({affordableSqm.toFixed(2)} m²)</span>
                                  </span>
                                  <span className="font-semibold">{currentCity.currencySymbol}{numericSavings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-800">
                                  <span className="flex items-center gap-1.5">
                                    <FileText className="size-3 text-neutral-600 shrink-0" />
                                    <span>Stamp Duty (on fresh air)</span>
                                  </span>
                                  <span className="font-semibold">{currentCity.currencySymbol}42,500</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-800">
                                  <span className="flex items-center gap-1.5">
                                    <Wrench className="size-3 text-neutral-600 shrink-0" />
                                    <span>Strata Sinking Fund (broken lift)</span>
                                  </span>
                                  <span className="font-semibold">{currentCity.currencySymbol}3,400</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-800">
                                  <span className="flex items-center gap-1.5">
                                    <User className="size-3 text-neutral-600 shrink-0" />
                                    <span>Agent Cologne Surcharge</span>
                                  </span>
                                  <span className="font-semibold">{currentCity.currencySymbol}450</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-800">
                                  <span className="flex items-center gap-1.5">
                                    <Percent className="size-3 text-neutral-600 shrink-0" />
                                    <span>Landlord Mortgage Gratitude</span>
                                  </span>
                                  <span className="font-semibold">100%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-1.5 text-neutral-800">
                                    <Heart className="size-3 text-neutral-600 shrink-0" />
                                    <span>Emotional Damage</span>
                                  </span>
                                  <span className="text-emerald-600 font-bold">FREE</span>
                                </div>
                              </div>

                              <div className="border-b border-neutral-300 my-2" />
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-xs sm:text-sm font-mono font-black tracking-wider text-neutral-900 uppercase">
                                TOTAL EQUITY ACQUIRED
                              </span>
                              <span className="text-xl sm:text-2xl font-black text-neutral-900">
                                0 m²
                              </span>
                            </div>
                          </div>

                          {/* Right: Yellow Sticky Note & Action Buttons */}
                          <div className="flex flex-col justify-between gap-3">
                            {/* Bright Yellow Sticky Note */}
                            <div className="rounded-xl border border-[#EAC200] bg-[#FFDE43] p-4 sm:p-5 -rotate-1 shadow-[2px_4px_12px_rgba(0,0,0,0.12)] flex flex-col justify-between">
                              <div>
                                <span className="font-serif text-3xl leading-none text-neutral-800 select-none block -mb-2">“</span>
                                <p className="font-marker font-bold text-xs sm:text-[13px] leading-snug tracking-wide text-neutral-900 uppercase">
                                  {currentCity.satiricalNote.toUpperCase()}
                                </p>
                              </div>
                              <span className="text-right font-mono text-[10px] font-bold tracking-wider text-neutral-800 uppercase mt-2">
                                — RENTY
                              </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                              {/* Share on X Button */}
                              <button
                                type="button"
                                onClick={handleShareOnX}
                                disabled={isDownloading}
                                className="w-full h-11 rounded-xl bg-[#0F1419] hover:bg-black active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                              >
                                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>Share on X</span>
                              </button>

                              {/* Download & Try Again Buttons */}
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={handleDownloadCard}
                                  disabled={isDownloading}
                                  className="h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                                >
                                  <Download className="size-3.5" />
                                  <span>{isDownloading ? "Saving..." : "Download"}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleTryAgain}
                                  className="h-10 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                                >
                                  <RotateCcw className="size-3.5" />
                                  <span>Try Again</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Concrete Pedestal Base */}
                      <div className="bg-gradient-to-b from-[#B2B6BD] via-[#A2A7AE] to-[#92979E] border-t-4 border-[#7A7E85] px-4 sm:px-6 py-3.5 text-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                        <div className="inline-block relative -rotate-0.5">
                          <p className="font-marker text-sm sm:text-base font-bold text-neutral-900 tracking-wide">
                            BETTER VIEWS. SMALLER BUDGETS.
                          </p>
                          <div className="h-1 bg-[#F5C842] rounded-full w-full -mt-0.5" />
                        </div>
                        <div className="text-center sm:text-right">
                          <p className="font-mono text-[9px] sm:text-[10px] font-semibold text-neutral-800 tracking-wider uppercase">
                            A GUY, A DOG, AND A VERY EXPENSIVE HOUSING MARKET.
                          </p>
                          <p className="font-mono text-xs sm:text-sm font-black tracking-widest text-neutral-900 uppercase">
                            0SQM.COM.AU
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 20% Deposit Reality Progress Meter */}
              <div className="rounded-2xl border border-border bg-background p-4 sm:p-6 shadow-sm">
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
                <div className="rounded-xl border border-border bg-paper/90 p-4 text-xs flex flex-col justify-between shadow-xs">
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
                <div className="rounded-xl border border-border bg-paper/90 p-4 text-xs flex flex-col justify-between shadow-xs">
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
                <div className="rounded-xl border border-border bg-paper/90 p-4 text-xs flex flex-col justify-between shadow-xs">
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

              {/* Interactive Comedy Sub-Tabs (Boomer Advice, Auction Simulator) */}
              <div className="rounded-2xl border border-border bg-paper p-4 sm:p-6 shadow-sm">
                {/* Tab Selector Buttons */}
                <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveCalcTab("boomer")}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeCalcTab === "boomer"
                        ? "bg-foreground text-background shadow-xs"
                        : "bg-muted hover:bg-neutral-200 text-muted-foreground"
                    }`}
                  >
                    <span>🥑</span> Boomer Advice Simulator
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCalcTab("auction")}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeCalcTab === "auction"
                        ? "bg-foreground text-background shadow-xs"
                        : "bg-muted hover:bg-neutral-200 text-muted-foreground"
                    }`}
                  >
                    <span>🔨</span> Sydney Auction Simulator
                  </button>
                </div>

                {/* Sub-tab: Boomer Advice Simulator */}
                {activeCalcTab === "boomer" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="font-marker text-base font-bold text-foreground">
                        Boomer Financial Wisdom: How to Buy 1 m²
                      </h5>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Check off the lifestyle sacrifices boomers recommend to see how many decades it shaves off your first square metre.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {boomerItems.map((item) => {
                        const isChecked = boomerSacrifices[item.key];
                        return (
                          <label
                            key={item.key}
                            className={`flex items-start gap-2.5 p-2.5 rounded-sm border cursor-pointer transition-all ${
                              isChecked
                                ? "bg-amber-500/10 border-amber-500/40 text-foreground"
                                : "bg-paper/80 border-border text-muted-foreground hover:bg-muted/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                setBoomerSacrifices((prev) => ({
                                  ...prev,
                                  [item.key]: e.target.checked,
                                }))
                              }
                              className="mt-0.5 size-4 rounded accent-amber-500 cursor-pointer"
                            />
                            <div className="text-xs">
                              <strong className="block font-medium text-foreground">{item.label}</strong>
                              <span className="text-[11px] font-mono text-muted-foreground">
                                {item.desc} (saves ~${item.saving.toLocaleString()}/yr)
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* Dynamic Boomer Sacrifice Output */}
                    <div className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs space-y-2">
                      <div className="flex justify-between items-center font-mono">
                        <span className="font-bold text-foreground">Total Annual Sacrifices:</span>
                        <span className="font-black text-sm text-green-700">
                          +${totalBoomerSaving.toLocaleString()} / year
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-muted-foreground">Months of 100% saving to 1 m²:</span>
                        <span className="font-bold text-foreground">
                          {monthsWithSacrifices} months (was {monthsTo1Sqm} months)
                        </span>
                      </div>

                      {/* Boomer Approval Meter */}
                      <div className="pt-1">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1">
                          <span>BOOMER APPROVAL RATING: {boomerApprovalScore}%</span>
                          <span>
                            {boomerApprovalScore < 30
                              ? "Unforgivable Avocado Addict 🥑"
                              : boomerApprovalScore < 70
                              ? "Acceptable, but cut the sourdough 🍞"
                              : "Certified 1982 Hard Worker 👴"}
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                            style={{ width: `${boomerApprovalScore}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] italic text-muted-foreground pt-1 border-t border-amber-500/20">
                        &ldquo;Back in 1982, interest rates were 17.5% and we walked uphill both ways to the bank! If you just stop breathing restaurant air, you will afford a studio by 2145.&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {/* Sub-tab: Live Sydney Auction Simulator */}
                {activeCalcTab === "auction" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h5 className="font-marker text-base font-bold text-foreground">
                        Sydney Saturday 11 AM Auction Simulator
                      </h5>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Experience the thrill of raising your bidder paddle with {currentCity.currencySymbol}
                        {numericSavings > 0 ? numericSavings.toLocaleString() : "25,000"} in hand against cash syndicates.
                      </p>
                    </div>

                    {/* Auction Stage Display */}
                    <div className="min-h-[140px] rounded-sm border border-border bg-paper/90 p-3 text-xs space-y-2 font-mono">
                      {auctionLog.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                          <span className="text-3xl mb-1">🔨</span>
                          <p className="font-bold">The front lawn is packed. 42 people registered.</p>
                          <p className="text-[11px] mt-0.5">Click below to raise your paddle and make your opening bid.</p>
                        </div>
                      ) : (
                        auctionLog.map((line, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-xs animate-in fade-in slide-in-from-bottom-1 duration-200 ${
                              line.includes("SOLD")
                                ? "bg-red-500/15 text-red-700 font-bold border border-red-500/30"
                                : line.includes("GAVEL")
                                ? "bg-amber-500/15 text-foreground font-black"
                                : "bg-white text-neutral-800 border border-neutral-200"
                            }`}
                          >
                            {line}
                          </div>
                        ))
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ink"
                        onClick={runAuctionSimulation}
                        disabled={auctionState === "bidding" || auctionState === "outbid"}
                        className="h-10 text-xs font-bold cursor-pointer flex items-center gap-2"
                      >
                        {auctionState === "bidding" || auctionState === "outbid" ? (
                          <>
                            <div className="size-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                            <span>Auction in Progress...</span>
                          </>
                        ) : auctionState === "sold" ? (
                          <>
                            <RotateCcw className="size-3.5" />
                            <span>Bid Again (Glutton for punishment)</span>
                          </>
                        ) : (
                          <>
                            <span>🙋 Raise Paddle (Bid {currentCity.currencySymbol}{numericSavings > 0 ? numericSavings.toLocaleString() : "25,000"})</span>
                          </>
                        )}
                      </Button>
                      {auctionState === "sold" && (
                        <span className="text-xs font-marker text-red-600 animate-in fade-in">
                          Outcome: 0 SQM won! ☺
                        </span>
                      )}
                    </div>
                  </div>
                )}
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

              {/* CFO */}
              <div className="flex flex-col justify-between">
                <div className="flex items-start gap-4 sm:gap-5">
                  <img
                    src="/images/v2/team-cfo.jpg"
                    alt="CFO - Chief Financial Officer"
                    className="size-24 sm:size-28 md:size-32 rounded-2xl object-cover shrink-0 border border-foreground/10 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-xl sm:text-2xl text-foreground leading-tight">CFO</h3>
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

      {/* Share / Download Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F1419] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Sparkles className="size-4 text-amber-400 shrink-0" />
          <span>{shareToast}</span>
        </div>
      )}
    </main>
  );
}
