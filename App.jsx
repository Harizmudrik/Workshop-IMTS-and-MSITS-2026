"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  Calendar,
  MapPin,
  Folder,
  Camera,
  Award,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Download,
  X,
  FileText,
  MapPinned,
  Users,
  Building2,
  Globe,
  Menu,
  Utensils,
  Landmark,
  QrCode,
  Share2,
  Check,
  Navigation,
  Footprints,
  Car,
  Hotel,
  Compass,
  Info,
  Phone,
  Mail,
  ShieldCheck,
  Plane,
  Wifi,
  UserCheck,
} from "lucide-react";

/* ================================================================
   DATA
   ================================================================ */

const UNDP_MAP_URL = "https://maps.app.goo.gl/2bnKY1URW6v53eJJA";
const BPS_MAP_URL = "https://maps.app.goo.gl/6JR4BWwpmrwfWMvz9";
const REGISTRATION_URL = "http://s.bps.go.id/registform";

const delegates = [
  { name: "Indonesia", src: "/assets/benderaIndo.avif", isHost: true },
  { name: "Malaysia", src: "/assets/benderaMalay.avif" },
  { name: "Brunei Darussalam", src: "/assets/benderaBrunei.avif" },
  { name: "Philippines", src: "/assets/benderaPH.avif" },
  { name: "Singapore", src: "https://flagcdn.com/w320/sg.png" },
  { name: "Thailand", src: "https://flagcdn.com/w320/th.png" },
  { name: "Vietnam", src: "https://flagcdn.com/w320/vn.png" },
  { name: "Laos", src: "https://flagcdn.com/w320/la.png" },
  { name: "Myanmar", src: "https://flagcdn.com/w320/mm.png" },
  { name: "Cambodia", src: "https://flagcdn.com/w320/kh.png" },
  { name: "Timor-Leste", src: "https://flagcdn.com/w320/tl.png" },
];

const landmarks = [
  {
    title: "National Monument (Monas)",
    desc: "Historic Jakarta icon & towering national symbol commemorating independence.",
    distance: "2.3 km (~10 min)",
    tag: "National Monument",
    img: "/assets/monas.avif",
    mapUrl: "https://www.google.com/maps/search/Monumen+Nasional+Jakarta",
  },
  {
    title: "Istiqlal Mosque",
    desc: "The grandest mosque in Southeast Asia, showcasing modern Islamic architecture.",
    distance: "950 m (~7 min)",
    tag: "Religious & Cultural",
    img: "/assets/masjid.avif",
    mapUrl: "https://maps.app.goo.gl/vpEKerVSUuQd416x5",
  },
  {
    title: "Kota Tua (Old Batavia)",
    desc: "Historic Dutch colonial-era old town square and historic architecture district.",
    distance: "8.9 km (~35 min)",
    tag: "Colonial Heritage",
    img: "/assets/kotatua.avif",
    mapUrl:
      "https://google.com/maps/place/Kota+Tua,+Mangga+Besar,+Kec.+Taman+Sari,+Kota+Jakarta+Barat,+Daerah+Khusus+Ibukota+Jakarta",
  },
  {
    title: "Jakarta Cathedral",
    desc: "Striking neo-gothic Catholic cathedral standing directly opposite Istiqlal Mosque.",
    distance: "750 m (~5 min)",
    tag: "Historic Architecture",
    img: "/assets/katedral.avif",
    mapUrl: "https://maps.app.goo.gl/pEZuFN9YqkScvTVG8",
  },
  {
    title: "Grand Indonesia",
    desc: "Premier international shopping, culinary, and lifestyle complex near Bundaran HI.",
    distance: "6.0 km (~20 min)",
    tag: "Shopping & Dining",
    img: "/assets/GrandIndonesia.avif",
    mapUrl: "https://maps.app.goo.gl/vVLgdwHDWFzmkqkB8",
  },
  {
    title: "Pecenongan Culinary Street",
    desc: "Famous culinary street celebrated for legendary night food stalls and local dining.",
    distance: "3.3 km (~15 min)",
    tag: "Culinary Street",
    img: "/assets/pecenongan.avif",
    mapUrl: "https://maps.app.goo.gl/Mqg4ZAikx4H3f7oM6",
  },
];

const culinaryItems = [
  { name: "Nasi Goreng", desc: "Signature Indonesian fragrant fried rice with savory aromatics", img: "/assets/nasigoreng.avif" },
  { name: "Soto Betawi", desc: "Creamy traditional Jakarta aromatic spiced beef soup", img: "/assets/sotobetawi.avif" },
  { name: "Sate Ayam", desc: "Succulent charcoal-grilled chicken skewers with rich peanut sauce", img: "/assets/sateayam.avif" },
  { name: "Bakso", desc: "Hearty Indonesian savory meatball noodle soup", img: "/assets/bakso.avif" },
  { name: "Kerak Telor", desc: "Heritage Betawi toasted glutinous rice and egg omelette with coconut serundeng", img: "/assets/keraktelor.avif" },
  { name: "Martabak", desc: "Delectable thick sweet stuffed pancake with chocolate and cheese", img: "/assets/martabak.avif" },
];

const venueGallery = [
  {
    id: "facade",
    title: "Menara Thamrin Building",
    caption: "Jl. M.H. Thamrin Kav 3, Central Jakarta",
    src: "/assets/gedungTamrin.jpg",
    badge: "Building Facade",
  },
  {
    id: "workshop-1",
    title: "Workshop & Plenary Hall (9th Floor)",
    caption: "UNDP Technical Workshop & Session Hall",
    src: "/assets/workshopRoom.jpeg",
    badge: "Plenary Hall",
  },
  {
    id: "workshop-2",
    title: "Technical Session & Working Area (9th Floor)",
    caption: "Interactive deliberation hall for international delegates",
    src: "/assets/workshopRoom2.jpeg",
    badge: "Working Area",
  },
  {
    id: "interior",
    title: "Executive Meeting & Discussion Suite (9th Floor)",
    caption: "High-level bilateral & collaborative discussion suite",
    src: "/assets/venueInterior.jpeg",
    badge: "Meeting Suite",
  },
  {
    id: "mushola",
    title: "Prayer Room (Mushola Menara Thamrin)",
    caption: "Spacious prayer facilities located in the basement",
    src: "/assets/mushala.jpeg",
    badge: "Basement (B)",
  },
  {
    id: "kantin",
    title: "Canteen & Services Hub (LG Floor)",
    caption: "Cafeteria food court, convenience store & money changer on LG floor",
    src: "/assets/Kantin.jpeg",
    badge: "Floor LG",
  },
  {
    id: "smoking",
    title: "Outdoor Smoking Area",
    caption: "Designated open-air smoking area behind the building",
    src: "/assets/SmokingArea.jpeg",
    badge: "Ground Outdoor",
  },
  {
    id: "money-changer",
    title: "Authorized Money Changer (Floor LG)",
    caption: "Foreign currency exchange service on Lower Ground",
    src: "/assets/MoneyCanger.jpeg",
    badge: "Floor LG",
  },
];

const floorDirectory = [
  {
    floor: "9th Fl.",
    badge: "Primary Venue",
    badgeColor: "bg-orange-500 text-white",
    title: "Workshop & Plenary Hall (UNDP)",
    desc: "Main technical session hall, bilateral suites, and plenary deliberation area.",
    galleryIndex: 1,
  },
  {
    floor: "LG Fl.",
    badge: "Services Hub",
    badgeColor: "bg-sky-500/25 text-sky-300 border border-sky-400/30",
    title: "Canteen, Minimarket & Currency Exchange",
    desc: "Building cafeteria food court, Indomaret convenience store, and authorized foreign exchange counter.",
    galleryIndex: 5,
  },
  {
    floor: "B Fl.",
    badge: "Prayer Room",
    badgeColor: "bg-emerald-500/25 text-emerald-300 border border-emerald-400/30",
    title: "Mushola (Prayer Facilities)",
    desc: "Spacious, quiet prayer facilities with dedicated male and female ablution (wudhu) areas.",
    galleryIndex: 4,
  },
  {
    floor: "Ground",
    badge: "Lobby & Outdoor",
    badgeColor: "bg-amber-500/25 text-amber-300 border border-amber-400/30",
    title: "Security Reception & Outdoor Smoking Garden",
    desc: "Delegate badge check-in at the ground security lobby, plus open-air smoking area behind the building.",
    galleryIndex: 6,
  },
];

/* Official Suggested Hotels from Information Note */
const hotels = [
  {
    id: "sari-pacific",
    name: "Sari Pacific Jakarta, Autograph Collection",
    address: "Jl. M.H. Thamrin No. 6, Kb. Sirih, Menteng, Jakarta Pusat 10340",
    tag: "5-STAR HOTEL",
    tagStyle: "bg-amber-500 text-white",
    priceRange: "Rp1.800.000 – Rp2.200.000",
    priceNoteEn: "per room / night (indicative planning budget)",
    distance: "Approx. 700 m",
    walkTime: "10 min walk",
    carTime: "5 min drive",
    contactPerson: "Mr. Tommy Wijaya",
    contactEmail: "tommywijaya@saripacificjakarta.com",
    website: "https://www.marriott.com/en-us/hotels/jktak-sari-pacific-jakarta-autograph-collection/overview/",
    mapUrl: "https://maps.app.goo.gl/uzvDiL1x4ktBwBS26",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20M.H.%20Thamrin%20No.%206%2C%20Jakarta%20Pusat%2010340%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelSariPacific.jpg",
    filename: "Directions-Sari-Pacific-Jakarta.png",
  },
  {
    id: "four-points",
    name: "Four Points by Sheraton Jakarta, Thamrin",
    address: "Jl. M.H. Thamrin, Gondangdia, Menteng, Jakarta Pusat 10350",
    tag: "4-STAR HOTEL",
    tagStyle: "bg-blue-600 text-white",
    priceRange: "Rp1.400.000 – Rp1.800.000",
    priceNoteEn: "per room / night (indicative planning budget)",
    distance: "Approx. 450 m",
    walkTime: "6 min walk",
    carTime: "3 min drive",
    contactPerson: "Mr. Edwin Candra Saputra",
    contactEmail: "Edwin.Saputra@fourpoints.com",
    website: "https://www.marriott.com/en-us/hotels/jktft-four-points-jakarta-thamrin/overview/",
    mapUrl: "https://maps.app.goo.gl/ZA7gq9p3V5814qVB9",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Four%20Points%20by%20Sheraton%20Jakarta%20Thamrin&travelmode=walking",
    img: "/assets/hotelFourPoints.jpg",
    filename: "Directions-Four-Points-by-Sheraton.png",
  },
  {
    id: "kosenda-hotel",
    name: "Kosenda Hotel",
    address: "Jl. K.H. Wahid Hasyim No. 127, Kb. Kacang, Tanah Abang, Jakarta Pusat 10240",
    tag: "4-STAR BOUTIQUE",
    tagStyle: "bg-purple-600 text-white",
    priceRange: "Rp775.000 – Rp950.000",
    priceNoteEn: "per room / night (indicative planning budget)",
    distance: "Approx. 400 m",
    walkTime: "5 min walk",
    carTime: "3 min drive",
    website: "https://kosendahotel.com/",
    mapUrl: "https://maps.app.goo.gl/3j1YVwEd7qec4W9c8",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Kosenda%20Hotel%2C%20Jl.%20K.H.%20Wahid%20Hasyim%20No.127&travelmode=walking",
    img: "/assets/hotelKosenda.jpg",
    filename: "Directions-Kosenda-Hotel.png",
  },
  {
    id: "holiday-inn-express",
    name: "Holiday Inn Express Jakarta Wahid Hasyim by IHG",
    address: "Jl. K.H. Wahid Hasyim No. 123, Kb. Kacang, Tanah Abang, Jakarta Pusat 10240",
    tag: "3-STAR HOTEL",
    tagStyle: "bg-emerald-600 text-white",
    priceRange: "Rp930.000 – Rp1.300.000",
    priceNoteEn: "per room / night (indicative planning budget)",
    distance: "Approx. 350 m",
    walkTime: "5 min walk",
    carTime: "3 min drive",
    website: "https://www.ihg.com/holidayinnexpress/hotels/id/in/jakarta/jktwh/hoteldetail",
    mapUrl: "https://maps.app.goo.gl/QGdcbmwVWXK1Eaed6",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20K.H.%20Wahid%20Hasyim%20No.%20123%2C%20Jakarta%20Pusat%2010240%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelHolidayInn.jpg",
    filename: "Directions-Holiday-Inn-Express.png",
  },
];

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function BimpEagaLandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [guideDropdown, setGuideDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeVenueImg, setActiveVenueImg] = useState(0);

  // QR modal state: { title, subtitle, url }
  const [qrModal, setQrModal] = useState(null);

  // Hotel QR state
  const [hotelModal, setHotelModal] = useState(null);
  const [hotelQrUrls, setHotelQrUrls] = useState({});

  useEffect(() => {
    hotels.forEach(async (h) => {
      try {
        const url = await QRCode.toDataURL(h.directionsUrl, {
          width: 500,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
        setHotelQrUrls((prev) => ({ ...prev, [h.id]: url }));
      } catch (err) {
        console.error("QR Code generation error:", err);
      }
    });
  }, []);

  const handleDownloadHotelQr = async (hotel) => {
    try {
      let dataUrl = hotelQrUrls[hotel.id];
      if (!dataUrl) {
        dataUrl = await QRCode.toDataURL(hotel.directionsUrl, {
          width: 600,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
      }
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = hotel.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openQr = (title, subtitle, url) => {
    setQrModal({ title, subtitle, url });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-500/20 selection:text-orange-700 overflow-x-clip text-sm">

      {/* ──────────────────────────────────────────────────────────
          NAVBAR (Airy, Executive, Senior-Friendly & Fully Responsive)
          ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/10 border-b border-slate-200"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Official Partnership Logos: UNSD & BPS-Statistics Indonesia */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* UNSD Logo */}
            <a
              href="#overview"
              className="flex items-center hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-0.5"
              title="United Nations Statistics Division (UNSD)"
            >
              <img
                src="/assets/logo.jpeg"
                onError={(e) => { e.currentTarget.src = "/assets/logo.jpeg"; }}
                alt="United Nations Statistics Division (UNSD) Logo"
                className="h-6 sm:h-7.5 w-auto object-contain max-w-[110px] sm:max-w-[145px]"
              />
            </a>

            {/* Subtle Divider */}
            <div className="h-5 sm:h-6 w-px bg-slate-200" aria-hidden="true" />

            {/* BPS-Statistics Indonesia Logo & Label */}
            <a
              href="https://www.bps.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-0.5"
              title="BPS-Statistics Indonesia (Official Host)"
            >
              <img
                src="/assets/LogoBPS.svg"
                alt="BPS-Statistics Indonesia Logo"
                className="h-6 sm:h-7.5 w-auto object-contain drop-shadow-sm"
              />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] sm:text-[11.5px] font-black text-[#0B1E43] tracking-tight uppercase whitespace-nowrap">
                  <span className="inline sm:hidden">BPS RI</span>
                  <span className="hidden sm:inline">BPS-Statistics Indonesia</span>
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-bold text-orange-600 tracking-wider uppercase mt-0.5 whitespace-nowrap">
                  Host Country
                </span>
              </div>
            </a>
          </div>

          {/* Desktop & Laptop Navigation (Optimized starting from lg: 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {/* Primary Direct Links */}
            {[
              { label: "Overview", id: "overview" },
              { label: "Venue", id: "venue" },
              { label: "Hotels", id: "hotels" },
              { label: "Resources", id: "resources" },
              { label: "Delegates", id: "delegates" },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-2.5 py-1.5 xl:px-3 text-[13px] font-extrabold text-slate-700 hover:text-orange-600 hover:bg-orange-50/80 active:bg-orange-100 rounded-xl transition-all duration-150 tracking-tight"
              >
                {label}
              </a>
            ))}

            {/* Interactive Dropdown: Delegate Guide & City Info */}
            <div
              className="relative"
              onMouseEnter={() => setGuideDropdown(true)}
              onMouseLeave={() => setGuideDropdown(false)}
            >
              <button
                type="button"
                onClick={() => setGuideDropdown(!guideDropdown)}
                className={`flex items-center gap-1 px-2.5 py-1.5 xl:px-3 text-[13px] font-extrabold rounded-xl transition-all duration-150 tracking-tight cursor-pointer ${
                  guideDropdown
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-700 hover:text-orange-600 hover:bg-orange-50/80"
                }`}
                aria-expanded={guideDropdown}
              >
                <span>Guide & City</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    guideDropdown ? "rotate-180 text-orange-600" : "text-slate-400"
                  }`}
                />
              </button>

              {guideDropdown && (
                <div className="absolute right-0 top-full pt-1.5 w-72 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-2 space-y-1">
                    {[
                      {
                        label: "Dress Code & Guidelines",
                        desc: "Formal attire & cultural etiquette",
                        id: "dresscode",
                        icon: FileText,
                      },
                      {
                        label: "Logistics & Arrival",
                        desc: "Visa on arrival, airport taxi & contacts",
                        id: "logistics",
                        icon: Plane,
                      },
                      {
                        label: "Explore Jakarta",
                        desc: "Monas, Kota Tua & city attractions",
                        id: "explorejakarta",
                        icon: Landmark,
                      },
                      {
                        label: "Indonesian Culinary",
                        desc: "Rendang, satay & recommended dining",
                        id: "culinary",
                        icon: Utensils,
                      },
                    ].map(({ label, desc, id, icon: ItemIcon }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => setGuideDropdown(false)}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-orange-50/80 group transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            {label}
                          </span>
                          <span className="block text-[11px] text-slate-500 font-medium leading-tight">
                            {desc}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Header Registration CTA Button */}
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Register</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile & Tablet Controls (< lg: 1024px) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 rounded-lg bg-orange-600 text-white font-bold text-xs shadow-sm hover:bg-orange-700 active:scale-95 transition-all"
            >
              <span>Register</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 rounded-lg bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileNav ? (
                <>
                  <X className="w-4 h-4 text-orange-600 stroke-[2.5]" />
                  <span className="font-extrabold text-orange-600">Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-slate-800 stroke-[2.5]" />
                  <span className="font-extrabold text-slate-800">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer (< lg: 1024px) */}
        {mobileNav && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-2xl px-4 py-4 max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {/* Top Registration Highlight */}
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-3 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md font-bold"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm">Participant Registration Form</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Categorized Menu Grid for Tablet & Mobile */}
            <div className="space-y-3">
              {/* Conference Essentials */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase px-1">
                  Conference Essentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                  {[
                    { label: "Overview", sub: "Workshop Objectives & Theme", id: "overview", icon: Info },
                    { label: "Venue & Hall", sub: "Menara Thamrin 9th Floor (UNDP)", id: "venue", icon: Building2 },
                    { label: "Hotels & Stay", sub: "Sari Pacific & Four Points", id: "hotels", icon: Hotel },
                    { label: "Resources", sub: "Agenda, Files & Documentation", id: "resources", icon: Folder },
                    { label: "Delegates", sub: "Participating Delegations", id: "delegates", icon: Users },
                  ].map(({ label, sub, id, icon: ItemIcon }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileNav(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            {label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {sub}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Delegate Guide & Host City */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase px-1">
                  Delegate Guide & Host City
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                  {[
                    { label: "Guidelines", sub: "Recommended Dress Code & Etiquette", id: "dresscode", icon: FileText },
                    { label: "Logistics", sub: "Visa, Airport Taxi & Contacts", id: "logistics", icon: Plane },
                    { label: "Explore Jakarta", sub: "Historic Monuments & Sights", id: "explorejakarta", icon: Landmark },
                    { label: "Indonesian Culinary", sub: "Authentic Delicacies & Dining", id: "culinary", icon: Utensils },
                  ].map(({ label, sub, id, icon: ItemIcon }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileNav(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-orange-600 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            {label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {sub}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent layout shift beneath fixed header */}
      <div className="h-16 sm:h-20" />

      {/* ──────────────────────────────────────────────────────────
          HERO (Symmetrical & Non-Redundant Layout)
          ────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        className="relative overflow-hidden bg-gradient-to-br from-[#061130] via-[#0B1E43] to-[#0F2A66] py-10 lg:py-14"
      >
        <div className="absolute top-10 left-[20%] w-[450px] h-[450px] bg-orange-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-[15%] w-[400px] h-[400px] bg-sky-400/[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Workshop Introduction & Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-orange-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>United Nations Statistics Division (UNSD) &bull; Host: BPS-Statistics Indonesia</span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl lg:text-[1.85rem] lg:leading-[1.25] font-extrabold text-white tracking-tight">
                  Workshop on International Merchandise Trade Statistics, Concepts, and Definitions{" "}
                  <span className="text-orange-400 font-black">(IMTS 2026)</span>{" "}
                  and Manual on Statistics of International Trade in Services{" "}
                  <span className="text-orange-400 font-black">(MSITS 2026)</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2.5 leading-relaxed">
                  Joint international capacity-building workshop organized by the United Nations Statistics Division (UNSD) and hosted by BPS-Statistics Indonesia for ASEAN delegates and international statistical experts.
                </p>
              </div>

              {/* Badges Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/[0.10] rounded-xl px-3.5 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Date & Schedule
                    </span>
                    <span className="text-xs font-bold text-white">
                      7 – 11 December 2026 (Starts 9:00 AM)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/[0.10] rounded-xl px-3.5 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Meeting Venue
                    </span>
                    <span className="text-xs font-bold text-white">
                      UNDP Office, Menara Thamrin 9th Floor
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Conference Highlights (Balances Left Height) */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                  <Globe className="w-3 h-3 text-sky-400" /> 11 ASEAN Delegations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                  <Users className="w-3 h-3 text-orange-400" /> In-Person Deliberations
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                  <Building2 className="w-3 h-3 text-emerald-400" /> Central Jakarta Venue
                </span>
              </div>

              {/* Action Buttons: Unified 2x2 Layout Without Orphan Wrapping */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Participant Registration</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#resources"
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white/[0.12] backdrop-blur-md border border-white/[0.20] text-white text-xs sm:text-sm font-bold hover:bg-white/[0.20] hover:scale-[1.02] transition-all"
                >
                  <span>View Resources & Files</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={UNDP_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/[0.07] border border-white/[0.12] text-slate-200 text-xs font-semibold hover:text-white hover:bg-white/[0.14] transition-all"
                >
                  <MapPinned className="w-3.5 h-3.5 text-orange-400" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={() => openQr("Meeting Venue", "UNDP Indonesia, Menara Thamrin 9th Floor", UNDP_MAP_URL)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white/[0.07] border border-white/[0.12] text-slate-200 text-xs font-semibold hover:text-white hover:bg-white/[0.14] transition-all"
                >
                  <QrCode className="w-3.5 h-3.5 text-orange-400" />
                  <span>Scan Venue QR Code</span>
                </button>
              </div>
            </div>

            {/* Right Column: Host Committee Card (Clean, Non-Duplicated) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] lg:max-w-[380px]">
                {/* Ambient Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 via-sky-500/15 to-blue-600/20 blur-2xl scale-105 pointer-events-none" />

                <div className="relative bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] rounded-3xl p-5 shadow-2xl text-center space-y-3.5">
                  {/* Framed Portrait Box */}
                  <div className="relative rounded-2xl bg-gradient-to-b from-sky-900/30 via-slate-900/40 to-slate-950/70 border border-white/10 overflow-hidden pt-3 px-2 pb-0 shadow-inner group">
                    {/* Top indicator */}
                    <div className="absolute top-2.5 inset-x-0 flex justify-center z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-orange-300 uppercase tracking-wider shadow-sm">
                        <Users className="w-3 h-3 text-orange-400" /> Official Host Committee
                      </span>
                    </div>

                    <div className="flex items-end justify-center pt-4">
                      <img
                        src="/assets/salamBPS.png"
                        alt="Official Host & Committee - BPS-Statistics Indonesia"
                        className="w-full max-h-56 sm:max-h-64 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Clean, Non-Duplicated Caption */}
                  <div className="space-y-1.5 pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md shadow-orange-500/20">
                      BPS-Statistics Indonesia
                    </span>
                    <h3 className="text-xs sm:text-[13px] text-white font-bold leading-snug">
                      Welcoming All Distinguished Delegates
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium">
                      National Statistical Office of the Republic of Indonesia & Organizing Committee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ──────────────────────────────────────────────────────────
          WELCOME & DELEGATES
          ────────────────────────────────────────────────────────── */}
      <section
        id="delegates"
        className="relative bg-[#0B1E43] text-white py-12 lg:py-14 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-7">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Jakarta!
              </span>
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mt-2 max-w-2xl">
              Indonesia is honored to host the UNSD Workshop on IMTS 2026 and MSITS 2026, jointly organized by the United Nations Statistics Division (UNSD) and BPS-Statistics Indonesia. We warmly look forward to advancing international trade statistics concepts, methodologies, and multilateral statistical cooperation.
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-400" />
                <span className="text-xs uppercase font-bold tracking-wider text-orange-400">
                  Participating Delegations
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-semibold bg-white/[0.08] px-3 py-1 rounded-full w-fit">
                11 Countries
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-x-2 gap-y-3.5">
              {delegates.map((country, idx) => (
                <div key={idx} className="group flex flex-col items-center">
                  <div
                    className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-full overflow-hidden transition-all duration-200 group-hover:scale-110 ${
                      country.isHost
                        ? "ring-[2.5px] ring-orange-500 ring-offset-2 ring-offset-[#0B1E43] shadow-[0_0_18px_rgba(249,115,22,0.5)]"
                        : "ring-1.5 ring-white/20 group-hover:ring-white/50 shadow-md shadow-black/20"
                    }`}
                  >
                    <img
                      src={country.src}
                      alt={`${country.name} Flag`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {country.isHost && (
                      <div className="absolute bottom-0 inset-x-0 flex justify-center">
                        <span className="inline-block px-1.5 py-px text-[7px] font-black uppercase tracking-widest bg-orange-500 text-white rounded-t-sm shadow-sm">
                          Host
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="mt-1.5 text-[10px] sm:text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors text-center leading-tight">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-4 text-center">
              {[
                { val: "11", labelEn: "Member Delegations" },
                { val: "5 Days", labelEn: "Technical Sessions" },
                { val: "UNDP", labelEn: "Meeting Venue" },
              ].map(({ val, labelEn }, i) => (
                <div key={i}>
                  <span className="block text-xl sm:text-2xl font-black text-orange-400">
                    {val}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium block">
                    {labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          DRESS CODE
          ────────────────────────────────────────────────────────── */}
      <section id="dresscode" className="py-12 lg:py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              Meeting Guidelines
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Dress Code
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Recommended attire for delegates during the workshop sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Day 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1E43] to-[#153470] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white shadow-sm">
                    Day 1 (Monday, 7 Dec)
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Business Attire
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Formal business suit, blazer, or formal delegation attire for the opening ceremony and plenary sessions.
                  </p>
                </div>
                <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-white/[0.08] backdrop-blur-md border border-white/10 p-2 flex items-center justify-center">
                  <img
                    src="/assets/blazerbiru.avif"
                    alt="Day 1 Business Attire"
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Day 2-5 */}
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0E275A] to-[#071533] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-slate-200 border border-white/10">
                    Day 2 – 5 (8 – 11 Dec)
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Formal Casual & Batik
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Smart casual attire, traditional batik, national dress, or collared shirts suitable for workshops and discussions.
                  </p>
                </div>
                <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-white/[0.08] backdrop-blur-md border border-white/10 p-1 flex items-center justify-center">
                  <img
                    src="/assets/batik.avif"
                    alt="Day 2 Formal Casual Batik"
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          RESOURCES & REGISTRATION
          ────────────────────────────────────────────────────────── */}
      <section id="resources" className="py-12 lg:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              Delegate Portal
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Resources & Participant Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Essential registration link, workshop schedules, and documentation for delegates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 max-w-5xl mx-auto">
            {/* Direct Registration Card */}
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-xs sm:text-sm block truncate text-white">
                    Registration
                  </span>
                  <span className="text-[10px] text-orange-100 block truncate">
                    Official Participant Form
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-1" />
            </a>

            {[
              { key: "agenda", label: "Agenda", sub: "Workshop Schedule", Icon: Calendar, color: "orange" },
              { key: "materials", label: "Materials", sub: "Presentations & Files", Icon: Folder, color: "blue" },
              { key: "moments", label: "Moments", sub: "Photo Gallery", Icon: Camera, color: "emerald" },
              { key: "certificate", label: "Certificate", sub: "Attendance Certificate", Icon: Award, color: "amber" },
            ].map(({ key, label, sub, Icon, color }) => (
              <button
                key={key}
                onClick={() => setActiveModal(key)}
                className="group flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-orange-300 transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      color === "orange"
                        ? "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                        : color === "blue"
                        ? "bg-blue-50 text-[#0B1E43] group-hover:bg-[#0B1E43] group-hover:text-white"
                        : color === "emerald"
                        ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                        : "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-slate-800 block truncate group-hover:text-orange-600 transition-colors">
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {sub}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transition-all flex-shrink-0 ml-1" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          HOTEL RECOMMENDATIONS FOR PARTICIPANTS (From Information Note)
          ────────────────────────────────────────────────────────── */}
      <section id="hotels" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              <Hotel className="w-3.5 h-3.5" /> Participant Accommodations
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Recommended Hotels Near Workshop Venue
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
              Suggested hotels as outlined in the official Information Note. Participants are kindly requested to make their own reservations.
            </p>
          </div>

          {/* Reference Starting Point Banner */}
          <div className="max-w-2xl mx-auto mb-8 p-3 sm:p-3.5 rounded-xl bg-orange-50/90 border border-orange-200/80 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-orange-700">
              <Compass className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                Reference Departure Point:
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0B1E43] mt-0.5">
              UNDP Office, Menara Thamrin 9th Floor (Workshop Venue)
            </p>
            <p className="text-[11px] text-slate-600">
              Jl. M.H. Thamrin Kav. 3, Kebon Sirih, Menteng, Jakarta Pusat 10250, Indonesia
            </p>
            <p className="text-[10px] text-slate-500 italic mt-0.5">
              All walking and driving distance estimates are calculated from this reference venue.
            </p>
          </div>

          {/* 4 Hotel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Hotel Image with 4:3 ratio & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={hotel.img}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                    {/* Category Badge (Top-left) */}
                    <span
                      className={`absolute top-3 left-3 ${hotel.tagStyle} text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md`}
                    >
                      {hotel.tag}
                    </span>

                    {/* Walking Time Pill (Top-right) */}
                    <span className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Footprints className="w-3 h-3 text-orange-400" />
                      {hotel.walkTime}
                    </span>

                    {/* Distance overlay (Bottom bar) */}
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-[11px]">
                      <span className="inline-flex items-center gap-1 font-semibold bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        {hotel.distance}
                      </span>
                      <button
                        onClick={() => setHotelModal(hotel)}
                        className="inline-flex items-center gap-1 bg-white/95 text-[#0B1E43] font-bold text-[10px] px-2 py-0.5 rounded-md shadow hover:bg-orange-500 hover:text-white transition-colors"
                        title="Scan QR Code Directions"
                      >
                        <QrCode className="w-3 h-3" /> Route QR
                      </button>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Hotel Title & Address */}
                    <div>
                      <h3 className="text-base font-bold text-[#0B1E43] group-hover:text-orange-600 transition-colors leading-snug line-clamp-2 min-h-[44px]">
                        {hotel.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{hotel.address}</span>
                      </p>
                    </div>

                    {/* Estimated Price Box */}
                    <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100">
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
                        Estimated Budget Rate
                      </span>
                      <div className="text-base sm:text-lg font-black text-orange-600 tracking-tight mt-0.5">
                        {hotel.priceRange}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {hotel.priceNoteEn}
                      </div>
                    </div>

                    {/* Distance & Travel Time Details */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-orange-500" /> Venue Distance:
                        </span>
                        <span className="font-bold text-[#0B1E43]">{hotel.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1">
                          <Footprints className="w-3 h-3 text-slate-400" /> Walking:
                        </span>
                        <span className="font-medium text-slate-700">{hotel.walkTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Car className="w-3 h-3 text-slate-400" /> Taxi / Car:
                        </span>
                        <span className="font-medium text-slate-700">{hotel.carTime}</span>
                      </div>
                    </div>

                    {/* Official Hotel Contact Person if available */}
                    {hotel.contactPerson && (
                      <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] space-y-1">
                        <div className="text-slate-500 font-medium">Hotel Contact:</div>
                        <div className="font-bold text-[#0B1E43]">{hotel.contactPerson}</div>
                        <a
                          href={`mailto:${hotel.contactEmail}`}
                          className="text-orange-600 hover:underline flex items-center gap-1 truncate text-[10.5px]"
                        >
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{hotel.contactEmail}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0 space-y-2.5">
                  {/* Primary Navigation Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={hotel.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold hover:scale-[1.02] transition-transform shadow-sm text-center"
                      title="Get walking directions from UNDP to this hotel"
                    >
                      <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Directions</span>
                    </a>
                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-[#0B1E43] hover:bg-[#153470] text-white text-xs font-bold hover:scale-[1.02] transition-all shadow-sm text-center"
                      title="Open hotel location in Google Maps"
                    >
                      <MapPinned className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>Google Maps</span>
                    </a>
                  </div>

                  {/* Secondary QR Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHotelModal(hotel)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-200 text-center"
                      title="View scannable QR Code modal"
                    >
                      <QrCode className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>Scan QR</span>
                    </button>
                    <button
                      onClick={() => handleDownloadHotelQr(hotel)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors border border-orange-200 text-center"
                      title="Download high-resolution scannable QR Code PNG"
                    >
                      <Download className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>Save QR</span>
                    </button>
                  </div>

                  {/* Official Website Row */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span className="text-slate-400 font-medium">Hotel Booking</span>
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-orange-600 font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Official Website</span>
                      <ExternalLink className="w-3 h-3 text-orange-500" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hotel Rate & Travel Time Disclaimer */}
          <div className="mt-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
              <Info className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Hotel Reservation & Indicative Rate Disclaimer</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
              &ldquo;Participants are kindly requested to make their own hotel reservations directly with the hotels. Prices, distances, and travel times are indicative estimates for planning purposes only. Actual rates depend on booking dates, occupancy, and room categories.&rdquo;
            </p>
          </div>
        </div>
      </section>

            {/* ──────────────────────────────────────────────────────────
          MEETING VENUE — REDESIGNED & BALANCED (Zero Duplication & No Void)
          ────────────────────────────────────────────────────────── */}
      <section
        id="venue"
        className="relative bg-gradient-to-br from-[#061130] via-[#0B1E43] to-[#0F2A66] text-white py-12 lg:py-16 overflow-hidden"
      >
        <div className="absolute top-0 right-[10%] w-[350px] h-[350px] bg-orange-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[15%] w-[300px] h-[300px] bg-sky-400/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-1">
              <Building2 className="w-3.5 h-3.5" /> Official Workshop Venue
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Meeting Venue: Menara Thamrin (UNDP Indonesia)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl mx-auto">
              All plenary sessions, technical workshops, and delegate meetings will be held on the 9th Floor of Menara Thamrin.
            </p>
          </div>

          {/* Unified Venue Spotlight: Perfectly Symmetrical 2-Column Architecture */}
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">

              {/* Left Column: Visual Showcase & Direct Venue Actions */}
              <div className="lg:col-span-6 space-y-4">
                {/* Active Main Photo Display */}
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-slate-900 aspect-[16/10]">
                  <img
                    src={venueGallery[activeVenueImg].src}
                    alt={venueGallery[activeVenueImg].title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061130] via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3 h-3" /> {venueGallery[activeVenueImg].badge}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-semibold border border-white/10">
                      Menara Thamrin &bull; 9th Floor
                    </span>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div className="min-w-0 pr-2 text-left">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {venueGallery[activeVenueImg].title}
                      </h4>
                      <p className="text-[11px] text-slate-300 truncate">
                        {venueGallery[activeVenueImg].caption}
                      </p>
                    </div>
                    <button
                      onClick={() => openQr("UNDP Indonesia — Menara Thamrin", "9th Floor, Jl. M.H. Thamrin Kav 3", UNDP_MAP_URL)}
                      className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm flex-shrink-0"
                      title="Scan Venue QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Gallery Selector Thumbnails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Interactive Photo Tour:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Select photo to preview
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 xl:grid-cols-8 gap-1.5">
                    {venueGallery.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveVenueImg(idx)}
                        className={`group relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-200 ${
                          activeVenueImg === idx
                            ? "ring-2 ring-orange-400 border-orange-400 scale-[1.03] shadow-md shadow-orange-500/30"
                            : "border-white/15 opacity-70 hover:opacity-100 hover:border-white/30"
                        }`}
                        title={item.title}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-0 inset-x-0 text-[8px] font-bold text-white bg-black/80 p-0.5 truncate text-center">
                          {item.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Venue Action Buttons */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={UNDP_MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => openQr("UNDP Indonesia — Meeting Venue", "Menara Thamrin, 9th Floor, Central Jakarta", UNDP_MAP_URL)}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.12] hover:bg-white/[0.18] text-white font-bold text-xs border border-white/15 transition-all"
                    >
                      <QrCode className="w-3.5 h-3.5 text-orange-400" />
                      <span>Scan Venue QR Code</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-300 pt-1 border-t border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                    <span className="truncate">Menara Thamrin, 9th Floor, Jl. M.H. Thamrin Kav 3, Jakarta 10250</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Venue Profile & Integrated Floor Guide (Matches Left Height Exactly) */}
              <div className="lg:col-span-6 space-y-4 text-left">
                {/* Header Profile */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Building2 className="w-3 h-3" />
                    <span>UNDP Indonesia Country Office &bull; 9th Floor</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Menara Thamrin, Jakarta, Indonesia
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Situated along Jalan M.H. Thamrin in the core of Central Jakarta&apos;s diplomatic and business corridor, Menara Thamrin houses the United Nations Development Programme (UNDP) Country Office. The 9th Floor plenary facilities provide a dedicated international setting equipped with audiovisual systems and high-speed Wi-Fi.
                  </p>
                </div>

                {/* Integrated Floor Directory & Amenities (Clicking updates the gallery!) */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Floor Directory & Building Facilities
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Click to view photo
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {floorDirectory.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveVenueImg(item.galleryIndex)}
                        className={`cursor-pointer p-2.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                          activeVenueImg === item.galleryIndex
                            ? "bg-white/[0.09] border-orange-400/60 shadow-md ring-1 ring-orange-400/30"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white leading-snug">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md flex-shrink-0 ${item.badgeColor}`}>
                          {item.floor}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Access Protocol Highlight */}
                  <div className="mt-2 p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-200 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong className="text-white">Security Badge Access:</strong> All international delegates must register at the Ground Floor security reception to obtain visitor access badges for the 9th-floor elevators.
                    </p>
                  </div>
                </div>

                {/* Directory Link Footer */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>UNSD Workshop IMTS 2026 &bull; MSITS 2026</span>
                  <a
                    href="https://www.undp.org/indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                  >
                    <span>UNDP Indonesia Directory</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Host Organization Headquarters Reference (Clear, Dignified & Non-Confusing) */}
          <div className="mt-8 rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/10 relative">
                <img
                  src="/assets/gedungBPS.jpg"
                  alt="BPS-Statistics Indonesia Headquarters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#0B1E43]/90 backdrop-blur-md text-sky-300 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/30 shadow-sm">
                  Host Organization Headquarters
                </span>
              </div>

              <div className="lg:col-span-8 space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                    Host Institution & Organizing Secretariat
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Badan Pusat Statistik (BPS-Statistics Indonesia)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    BPS-Statistics Indonesia is the National Statistical Office of Indonesia and the official host organizing institution for the IMTS 2026 and MSITS 2026 workshop in cooperation with the United Nations Statistics Division (UNSD).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs space-y-1">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Jl. Dr. Sutomo No. 6-8, Pasar Baru, Sawah Besar, Jakarta Pusat 10710, Indonesia</span>
                  </div>
                  <p className="text-[11px] text-amber-300/90 italic pl-5.5">
                    * Note: Workshop sessions take place at the UNDP Office (Menara Thamrin 9th Floor). The Pasar Baru address is the national BPS headquarters.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={BPS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-white/[0.12] hover:bg-white/[0.20] text-white text-xs font-bold transition-all border border-white/15"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span>BPS HQ on Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => openQr("BPS-Statistics Indonesia HQ", "Jl. Dr. Sutomo No. 6-8, Jakarta Pusat", BPS_MAP_URL)}
                    className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-white/10"
                  >
                    <QrCode className="w-3.5 h-3.5 text-sky-400" />
                    <span>Scan BPS QR Code</span>
                  </button>
                  <a
                    href="https://www.bps.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-orange-400 text-xs font-medium transition-colors ml-auto"
                  >
                    <span>Visit Official BPS Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ──────────────────────────────────────────────────────────
          INFORMATION NOTE & TRAVEL LOGISTICS (New Section from DOCX)
          ────────────────────────────────────────────────────────── */}
      <section id="logistics" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              <FileText className="w-3.5 h-3.5" /> Official Information Note
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Travel Logistics, Visa & Secretariat Contacts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
              Essential administrative, transportation, and contact guidelines for all attending delegates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1. Visa Arrangements */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">
                  Entry Visa for Indonesia
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Visa applications are administered by the Indonesian Directorate General of Immigration. Delegates requiring a visa are advised to apply well in advance through the official online e-Visa portal.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <a
                  href="https://evisa.imigrasi.go.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition-colors"
                >
                  <span>Official e-Visa Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.imigrasi.go.id/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <span>Official Immigration Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* 2. Airport to UNDP Office Transportation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Plane className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">
                  Airport Transfer to Venue
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Participants are responsible for arranging their local transportation between Soekarno-Hatta International Airport (CGK) and the workshop venue.
                </p>
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Recommended Taxi:</span>
                    <strong className="text-blue-700">Bluebird Group</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Estimated Fare:</span>
                    <strong className="text-slate-700">IDR 152,000 – 300,000 (USD 10–20)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Cash Advice:</span>
                    <span className="text-slate-700 font-medium">Prepare ~IDR 300,000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-3 h-3 text-orange-500" />
                  <span>Bluebird Center: +62-21 7917 1234 / 798 1234</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Mail className="w-3 h-3 text-orange-500" />
                  <span>customercare@bluebirdgroup.com</span>
                </div>
              </div>
            </div>

            {/* 3. Meeting Documentation & Secretariat Contacts */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">
                  Workshop Secretariat Contacts
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  For administrative or technical inquiries regarding the workshop, please contact the BPS-Statistics Indonesia organizing committee:
                </p>

                <div className="mt-3 space-y-2 text-xs">
                  {/* Angie Almira Manurung */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-[#0B1E43]">Ms. Angie Almira Manurung</div>
                    <div className="text-[10px] text-slate-500">Junior Statistician, Directorate of Distribution Statistics</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                      <a href="https://wa.me/6282226085451" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> +62 822 2608 5451
                      </a>
                      <a href="mailto:angie.almira@bps.go.id" className="text-orange-600 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> angie.almira@bps.go.id
                      </a>
                    </div>
                  </div>

                  {/* Clara Lusiana Pangaribuan */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="font-bold text-[#0B1E43]">Ms. Clara Lusiana Pangaribuan</div>
                    <div className="text-[10px] text-slate-500">Junior Public Relations Officer, Bureau of Planning & Cooperation</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                      <a href="https://wa.me/6285321151797" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> +62 853 2115 1797
                      </a>
                      <a href="mailto:clara.lusiana@bps.go.id" className="text-orange-600 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> clara.lusiana@bps.go.id
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Complimentary high-speed Wi-Fi is available in the plenary room.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          EXPLORE JAKARTA (with QR code button per card)
          ────────────────────────────────────────────────────────── */}
      <section id="explorejakarta" className="py-12 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              <Landmark className="w-3 h-3" /> City Highlights
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Explore Jakarta
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Discover cultural heritage, architecture, and landmarks of Indonesia&apos;s capital during your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {landmarks.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                {/* Clickable image → Maps */}
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-44 w-full overflow-hidden bg-slate-100 block cursor-pointer"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-[#0B1E43]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-[#0B1E43] text-[11px] font-bold shadow-md">
                      <MapPinned className="w-3 h-3 text-orange-500" />
                      Open Maps <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                    </span>
                  </div>
                </a>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0B1E43] group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {item.distance}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQr(item.title, item.desc, item.mapUrl);
                        }}
                        className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        title={`QR Code: ${item.title}`}
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={item.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 font-bold hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5"
                      >
                        Directions <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          A TASTE OF JAKARTA
          ────────────────────────────────────────────────────────── */}
      <section id="culinary" className="py-12 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              <Utensils className="w-3 h-3" /> Authentic Flavors
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              A Taste of Jakarta
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Experience authentic local delicacies and renowned culinary traditions during your visit.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {culinaryItems.map((food, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={food.img}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1E43] group-hover:text-orange-500 transition-colors truncate">
                    {food.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-snug">
                    {food.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          FOOTER
          ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#050D1F] text-white pt-10 pb-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/[0.08]">
            <div className="md:col-span-5 space-y-3">
              {/* Joint Organizers Logos: UNSD + BPS-Statistics Indonesia */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="bg-white/95 p-1.5 rounded-lg flex items-center shadow-sm">
                  <img
                    src="/assets/logo.jpeg"
                    onError={(e) => { e.currentTarget.src = "/assets/logo.jpeg"; }}
                    alt="United Nations Statistics Division (UNSD) Logo"
                    className="h-8 sm:h-9 w-auto object-contain max-w-[160px]"
                  />
                </div>
                <div className="h-6 w-px bg-white/20 hidden sm:block" aria-hidden="true" />
                <a
                  href="https://www.bps.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/95 p-1.5 rounded-lg flex items-center gap-1.5 px-2.5 shadow-sm hover:bg-white transition-colors"
                  title="BPS-Statistics Indonesia"
                >
                  <img
                    src="/assets/LogoBPS.svg"
                    alt="BPS-Statistics Indonesia Logo"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[11px] font-black text-[#0B1E43] tracking-wider uppercase">
                      BPS-Statistics Indonesia
                    </span>
                    <span className="text-[8px] font-bold text-orange-600 uppercase tracking-widest mt-0.5">
                      Host Country
                    </span>
                  </div>
                </a>
              </div>

              <h3 className="text-sm font-bold text-white pt-1">
                Workshop on IMTS 2026 & MSITS 2026
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                United Nations Statistics Division (UNSD) workshop on International Merchandise Trade Statistics and Manual on Statistics of International Trade in Services, proudly hosted by BPS-Statistics Indonesia.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-orange-400 block">
                Meeting Venue & Secretariat
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                United Nations Development Programme (UNDP)
                <br />
                Menara Thamrin, 9th Floor
                <br />
                Jl. M.H. Thamrin Kav 3, Central Jakarta 10250, Indonesia
              </p>
              <div className="pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mt-2">
                  Host Organization Headquarters
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  BPS-Statistics Indonesia, Jl. Dr. Sutomo No. 6-8, Central Jakarta 10710
                </p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-orange-400 block">
                Delegate Quick Links
              </span>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <UserCheck className="w-3 h-3" /> Registration Form
                  </a>
                </li>
                <li>
                  <a
                    href={UNDP_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-orange-400" /> UNDP Venue Maps
                  </a>
                </li>
                <li>
                  <a
                    href="https://evisa.imigrasi.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-sky-400" /> Indonesia e-Visa Portal
                  </a>
                </li>
                <li><a href="#overview" className="hover:text-orange-400 transition-colors">Overview</a></li>
                <li><a href="#resources" className="hover:text-orange-400 transition-colors">Resources & Files</a></li>
                <li><a href="#hotels" className="hover:text-orange-400 transition-colors">Accommodations</a></li>
                <li><a href="#venue" className="hover:text-orange-400 transition-colors">Venue & Amenities</a></li>
                <li><a href="#logistics" className="hover:text-orange-400 transition-colors">Logistics & Contacts</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>&copy; 2026 UNSD Workshop on IMTS 2026 & MSITS 2026. Hosted by BPS-Statistics Indonesia & United Nations Statistics Division.</p>
            <p>Jakarta, Indonesia &bull; 7 – 11 December 2026</p>
          </div>
        </div>
      </footer>

      {/* ──────────────────────────────────────────────────────────
          UNIVERSAL QR CODE MODAL (for any Google Maps link)
          ────────────────────────────────────────────────────────── */}
      {qrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={() => setQrModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 mb-3">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="text-base font-extrabold text-[#0B1E43] leading-snug">
              {qrModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {qrModal.subtitle}
            </p>

            {/* QR Image Container */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 inline-block mb-4 shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                  qrModal.url
                )}&margin=2`}
                alt={`QR Code for ${qrModal.title}`}
                className="w-48 h-48 rounded-xl bg-white p-1"
              />
              <span className="text-[10px] text-slate-400 block mt-1.5">
                Scan with smartphone camera to open Google Maps
              </span>
            </div>

            <div className="space-y-2">
              <a
                href={qrModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs hover:scale-[1.02] transition-transform shadow-md"
              >
                <MapPinned className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
                  qrModal.url
                )}&margin=2`}
                download={`${qrModal.title.replace(/[^a-zA-Z0-9]/g, "-")}-QR.png`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR Code Image</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          HOTEL DIRECTIONS & QR CODE MODAL
          ────────────────────────────────────────────────────────── */}
      {hotelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={() => setHotelModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHotelModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge Category & Distance */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${hotelModal.tagStyle}`}
              >
                {hotelModal.tag}
              </span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {hotelModal.distance} from Venue
              </span>
            </div>

            <h3 className="text-base font-extrabold text-[#0B1E43] leading-snug">
              {hotelModal.name}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">
              {hotelModal.address}
            </p>

            {/* QR Code Container */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 inline-flex flex-col items-center mb-3 shadow-inner">
              <img
                src={
                  hotelQrUrls[hotelModal.id] ||
                  `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
                    hotelModal.directionsUrl
                  )}&margin=2`
                }
                alt={`Walking Directions QR Code for ${hotelModal.name}`}
                className="w-48 h-48 rounded-lg bg-white p-1"
              />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mt-2">
                Origin: Menara Thamrin &bull; UNDP Indonesia
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                Scan with smartphone camera to start walking navigation
              </span>
            </div>

            {/* Price reference */}
            <div className="mb-3 py-2 px-3 rounded-xl bg-orange-50/70 border border-orange-100 text-xs">
              <span className="text-slate-500 font-medium">Estimated Rate: </span>
              <strong className="text-orange-700 font-bold">{hotelModal.priceRange}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {hotelModal.priceNoteEn}
              </span>
            </div>

            {/* Hotel Contact if available */}
            {hotelModal.contactPerson && (
              <div className="mb-3 py-1.5 px-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-left">
                <span className="text-slate-500">Contact Person: </span>
                <strong className="text-[#0B1E43]">{hotelModal.contactPerson}</strong>
                <a href={`mailto:${hotelModal.contactEmail}`} className="block text-orange-600 hover:underline truncate mt-0.5">
                  {hotelModal.contactEmail}
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-1 text-xs">
              <a
                href={hotelModal.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:scale-[1.02] transition-transform shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={hotelModal.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1E43] hover:bg-[#153470] text-white font-bold transition-colors shadow-sm"
              >
                <MapPinned className="w-4 h-4 text-sky-400" />
                <span>View on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handleDownloadHotelQr(hotelModal)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors border border-slate-200"
              >
                <Download className="w-4 h-4 text-orange-600" />
                <span>Download QR Code (PNG File)</span>
              </button>

              <a
                href={hotelModal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-slate-500 hover:text-orange-600 font-medium transition-colors text-[11px]"
              >
                <span>Visit Official Hotel Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          RESOURCE MODALS (AGENDA, MATERIALS, MOMENTS, CERTIFICATE)
          ────────────────────────────────────────────────────────── */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === "agenda" && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">Workshop Agenda</h3>
                <p className="text-xs text-slate-500 mt-1">7 – 11 December 2026 &bull; UNDP Indonesia, 9th Floor</p>
                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  {[
                    { en: "Day 1 (Monday, 7 Dec): Opening & Plenary IMTS 2026", desc: "Commencing at 9:00 AM. Opening remarks, ministerial keynote, and IMTS 2026 conceptual framework." },
                    { en: "Day 2–3 (8–9 Dec): MSITS 2026 & Trade in Services", desc: "Statistics of International Trade in Services concepts, data sources, and international database harmonization." },
                    { en: "Day 4–5 (10–11 Dec): Recommendations & Closing", desc: "Drafting joint statistics declaration, action points, and concluding on Friday afternoon." },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#0B1E43] block mb-1">{item.en}</span>
                      <span className="text-slate-500 text-[11px] block leading-relaxed">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "materials" && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B1E43] flex items-center justify-center mb-3">
                  <Folder className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">Session Materials & Documents</h3>
                <p className="text-xs text-slate-500 mt-1">Circulated guidelines, manuals, and presentation decks.</p>
                <div className="mt-4 space-y-2 text-xs">
                  {["IMTS 2026 Concepts and Definitions.pdf", "MSITS 2026 Compilation Guide.pdf", "UNSD Technical Discussion Draft.pdf"].map((file, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span className="font-medium text-slate-700 truncate text-[11px]">{file}</span>
                      </div>
                      <button className="text-orange-600 font-semibold hover:underline flex items-center gap-1 flex-shrink-0 ml-2 text-[11px]">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "moments" && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">Documentation & Moments</h3>
                <p className="text-xs text-slate-500 mt-1">Photo highlights from session deliberations and cultural tours.</p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {["kantorBPS", "jakartamonas", "masjid", "kotatua"].map((name, i) => (
                    <div key={i} className="rounded-lg overflow-hidden h-24 bg-slate-100">
                      <img src={`/assets/${name}.avif`} alt={`Moment ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-3 text-center">
                  Live photo gallery updated continuously throughout the event
                </p>
              </div>
            )}

            {activeModal === "certificate" && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">Certificate of Attendance</h3>
                <p className="text-xs text-slate-500 mt-1">Official United Nations Statistics Division & BPS certificate.</p>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-3">
                  <p className="text-xs text-slate-600">
                    Certificates will be available for all officially registered delegates following the conclusion of Friday sessions.
                  </p>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#0B1E43] text-white text-xs font-bold hover:bg-[#153470] transition-colors"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
