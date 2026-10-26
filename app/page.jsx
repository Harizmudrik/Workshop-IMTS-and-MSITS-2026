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
} from "lucide-react";

/* ================================================================
   DATA
   ================================================================ */

const UNDP_MAP_URL = "https://maps.app.goo.gl/2bnKY1URW6v53eJJA";
const BPS_MAP_URL = "https://maps.app.goo.gl/6JR4BWwpmrwfWMvz9";

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
    title: "Monumen Nasional",
    en: "Historic Jakarta icon & national symbol",
    id: "Ikon bersejarah Jakarta & simbol nasional",
    distance: "2.3 km (~10 mnt)",
    tag: "National Monument",
    img: "/assets/monas.avif",
    mapUrl: "https://www.google.com/maps/search/Monumen+Nasional+Jakarta",
  },
  {
    title: "Istiqlal Mosque",
    en: "The largest mosque in Southeast Asia",
    id: "Masjid terbesar di Asia Tenggara",
    distance: "950 m (~7 mnt)",
    tag: "Religious & Cultural",
    img: "/assets/masjid.avif",
    mapUrl: "https://maps.app.goo.gl/vpEKerVSUuQd416x5",
  },
  {
    title: "Kota Tua",
    en: "Dutch colonial-era old town district",
    id: "Kawasan kota tua era kolonial Belanda",
    distance: "8.9 km (~35 mnt)",
    tag: "Colonial Heritage",
    img: "/assets/kotatua.avif",
    mapUrl:
      "https://google.com/maps/place/Kota+Tua,+Mangga+Besar,+Kec.+Taman+Sari,+Kota+Jakarta+Barat,+Daerah+Khusus+Ibukota+Jakarta",
  },
  {
    title: "Jakarta Cathedral",
    en: "Iconic neo-gothic catholic cathedral",
    id: "Katedral katolik bergaya neo-gotik",
    distance: "750 m (~5 mnt)",
    tag: "Free Entry",
    img: "/assets/katedral.avif",
    mapUrl: "https://maps.app.goo.gl/pEZuFN9YqkScvTVG8",
  },
  {
    title: "Grand Indonesia",
    en: "Premium shopping & lifestyle mall",
    id: "Pusat belanja & gaya hidup premium",
    distance: "6.0 km (~25 mnt)",
    tag: "Shopping & Dining",
    img: "/assets/GrandIndonesia.avif",
    mapUrl: "https://maps.app.goo.gl/vVLgdwHDWFzmkqkB8",
  },
  {
    title: "Pecenongan",
    en: "Famous night street food paradise",
    id: "Surga kuliner malam yang terkenal",
    distance: "3.3 km (~15 mnt)",
    tag: "Culinary Street",
    img: "/assets/pecenongan.avif",
    mapUrl: "https://maps.app.goo.gl/Mqg4ZAikx4H3f7oM6",
  },
];

const culinaryItems = [
  { name: "Nasi Goreng", en: "Indonesian fried rice", id: "Nasi goreng khas Indonesia", img: "/assets/nasigoreng.avif" },
  { name: "Soto Betawi", en: "Jakarta beef soup", id: "Sup daging khas Betawi", img: "/assets/sotobetawi.avif" },
  { name: "Sate Ayam", en: "Grilled chicken skewers", id: "Sate ayam bumbu kacang", img: "/assets/sateayam.avif" },
  { name: "Bakso", en: "Savory meatball soup", id: "Sup bakso daging sapi", img: "/assets/bakso.avif" },
  { name: "Kerak Telor", en: "Traditional Betawi omelette", id: "Omelet tradisional Betawi", img: "/assets/keraktelor.avif" },
  { name: "Martabak Manis", en: "Sweet stuffed pancake", id: "Martabak manis isi cokelat", img: "/assets/martabak.avif" },
];

const venueGallery = [
  {
    id: "facade",
    title: "Menara Thamrin Building",
    caption: "Jl. M.H. Thamrin Kav 3, Jakarta Pusat",
    src: "/assets/gedungTamrin.jpg",
    badge: "Building Facade",
  },
  {
    id: "workshop-1",
    title: "Workshop & Plenary Hall (Lantai 9)",
    caption: "UNDP Technical Workshop & Session Hall",
    src: "/assets/workshopRoom.jpeg",
    badge: "Floor 9 Venue",
  },
  {
    id: "workshop-2",
    title: "Technical Session & Working Area (Lantai 9)",
    caption: "Interactive deliberation hall for international delegates",
    src: "/assets/workshopRoom2.jpeg",
    badge: "Workshop Room",
  },
  {
    id: "interior",
    title: "Executive Meeting & Discussion Suite (Lantai 9)",
    caption: "High-level bilateral & collaborative discussion suite",
    src: "/assets/venueInterior.jpeg",
    badge: "Meeting Suite",
  },
  {
    id: "smoking",
    title: "Outdoor Smoking Area (Area Merokok)",
    caption: "Designated open-air smoking area behind the building",
    src: "/assets/SmokingArea.jpeg",
    badge: "Outdoor Belakang",
  },
  {
    id: "mushola",
    title: "Prayer Room (Mushola Menara Thamrin)",
    caption: "Spacious prayer facilities located in the basement",
    src: "/assets/mushala.jpeg",
    badge: "Basement",
  },
  {
    id: "money-changer",
    title: "Authorized Money Changer (Penukaran Valas)",
    caption: "Currency exchange services located on the LG floor",
    src: "/assets/MoneyCanger.jpeg",
    badge: "Lantai LG",
  },
  {
    id: "kantin",
    title: "Canteen & Cafeteria (Kantin Gedung)",
    caption: "Diverse local meals and refreshments on the LG floor",
    src: "/assets/Kantin.jpeg",
    badge: "Lantai LG",
  },
  {
    id: "indomaret",
    title: "Indomaret Convenience Store (Minimarket)",
    caption: "Daily essentials, snacks, and beverages on the LG floor",
    src: "/assets/Indomaret.jpeg",
    badge: "Lantai LG",
  },
  {
    id: "district",
    title: "M.H. Thamrin Business District",
    caption: "Central protocol avenue & prime business hub",
    src: "/assets/menaraThamrinHD.jpg",
    badge: "Strategic Area",
  },
];

const venueAmenities = [
  {
    id: "mushola",
    nameEn: "Prayer Room (Mushola)",
    nameId: "Mushola / Tempat Ibadah",
    locationEn: "Basement Level (B)",
    locationId: "Lantai Basement",
    floorBadge: "Basement",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    descEn: "Mushola is located in the basement.",
    descId: "Mushola ada di lantai basement.",
    detailEn: "Spacious and quiet prayer facilities for Muslim delegates and staff with dedicated ablution areas.",
    detailId: "Fasilitas tempat ibadah yang tenang dan bersih dengan tempat wudhu khusus di lantai basement.",
    img: "/assets/mushala.jpeg",
    galleryIndex: 5,
  },
  {
    id: "smoking",
    nameEn: "Outdoor Smoking Area",
    nameId: "Area Khusus Merokok",
    locationEn: "Outdoor Behind Building",
    locationId: "Outdoor Belakang Gedung",
    floorBadge: "Outdoor Belakang",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    descEn: "Smoking area is located outdoor behind the building.",
    descId: "Smoking area outdoor di belakang gedung.",
    detailEn: "Designated open-air green area equipped with benches and ashtrays situated behind the building.",
    detailId: "Area khusus merokok luar ruangan dengan bangku santai dan asbak di bagian belakang gedung.",
    img: "/assets/SmokingArea.jpeg",
    galleryIndex: 4,
  },
  {
    id: "money-changer",
    nameEn: "Money Changer (Currency Exchange)",
    nameId: "Penukaran Valuta Asing (Money Changer)",
    locationEn: "LG Floor (Lower Ground)",
    locationId: "Lantai LG",
    floorBadge: "Lantai LG",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    descEn: "Money Changer is located on the LG floor.",
    descId: "Money Changer ada di lantai LG.",
    detailEn: "Official foreign currency exchange counter for international delegates and foreign currency transactions.",
    detailId: "Layanan penukaran valuta asing (valas) resmi untuk kebutuhan transaksi para delegasi mancanegara.",
    img: "/assets/MoneyCanger.jpeg",
    galleryIndex: 6,
  },
  {
    id: "kantin",
    nameEn: "Canteen & Cafeteria (Food Court)",
    nameId: "Kantin & Pujasera Gedung",
    locationEn: "LG Floor (Lower Ground)",
    locationId: "Lantai LG",
    floorBadge: "Lantai LG",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-400/30",
    descEn: "Canteen is located on the LG floor.",
    descId: "Kantin ada di lantai LG.",
    detailEn: "Building food court offering diverse Indonesian dishes, fresh juices, coffee, and affordable lunch sets.",
    detailId: "Pujasera gedung dengan aneka sajian masakan khas Indonesia, kopi, dan minuman segar di lantai LG.",
    img: "/assets/Kantin.jpeg",
    galleryIndex: 7,
  },
  {
    id: "indomaret",
    nameEn: "Indomaret Convenience Store",
    nameId: "Minimarket Indomaret",
    locationEn: "LG Floor (Lower Ground)",
    locationId: "Lantai LG",
    floorBadge: "Lantai LG",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    descEn: "Indomaret is located on the LG floor.",
    descId: "Indomaret ada di lantai LG.",
    detailEn: "Convenience store providing bottled water, quick bites, snacks, toiletries, and daily essentials.",
    detailId: "Minimarket menyediakan air mineral, makanan ringan, perlengkapan pribadi, dan kebutuhan harian.",
    img: "/assets/Indomaret.jpeg",
    galleryIndex: 8,
  },
];

const hotels = [
  {
    id: "sari-pacific",
    name: "Sari Pacific Jakarta, Autograph Collection",
    address: "Jl. M.H. Thamrin No. 6, Jakarta Pusat 10340, Indonesia",
    tag: "PREMIUM",
    tagStyle: "bg-amber-500 text-white",
    priceRange: "Rp1.800.000 – Rp2.200.000",
    priceNoteEn: "per room / night (planning budget)",
    priceNoteId: "per kamar / malam (anggaran perencanaan)",
    distance: "0,3 – 0,7 km",
    walkTime: "4 – 10 min",
    carTime: "3 – 8 min",
    website: "https://www.marriott.com/en-us/hotels/jktak-sari-pacific-jakarta-autograph-collection/overview/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sari+Pacific+Jakarta+Autograph+Collection+Jl+MH+Thamrin+No+6",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20M.H.%20Thamrin%20No.%206%2C%20Jakarta%20Pusat%2010340%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelSariPacific.jpg",
    filename: "Directions-Sari-Pacific-Jakarta.png",
  },
  {
    id: "holiday-inn-express",
    name: "Holiday Inn Express Jakarta Wahid Hasyim by IHG",
    address: "Jl. K.H. Wahid Hasyim No. 123, Jakarta Pusat 10240, Indonesia",
    tag: "BUSINESS HOTEL",
    tagStyle: "bg-blue-600 text-white",
    priceRange: "Rp930.000 – Rp1.300.000",
    priceNoteEn: "per room / night (planning budget)",
    priceNoteId: "per kamar / malam (anggaran perencanaan)",
    distance: "1 – 1,3 km",
    walkTime: "13 – 18 min",
    carTime: "5 – 12 min",
    website: "https://www.ihg.com/holidayinnexpress/hotels/id/in/jakarta/jktwh/hoteldetail",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Holiday+Inn+Express+Jakarta+Wahid+Hasyim+Jl+KH+Wahid+Hasyim+No+123",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20K.H.%20Wahid%20Hasyim%20No.%20123%2C%20Jakarta%20Pusat%2010240%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelHolidayInn.jpg",
    filename: "Directions-Holiday-Inn-Express.png",
  },
  {
    id: "swiss-belinn",
    name: "Swiss-Belinn Wahid Hasyim",
    address: "Jl. K.H. Wahid Hasyim No. 135–137, Jakarta Pusat 10240, Indonesia",
    tag: "BUDGET FRIENDLY",
    tagStyle: "bg-emerald-600 text-white",
    priceRange: "Rp550.000 – Rp900.000",
    priceNoteEn: "per room / night (planning budget)",
    priceNoteId: "per kamar / malam (anggaran perencanaan)",
    distance: "1,2 – 1,5 km",
    walkTime: "15 – 22 min",
    carTime: "6 – 13 min",
    website: "https://www.swiss-belhotel.com/faqs/swiss-belinn-wahid-hasyim",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Swiss-Belinn+Wahid+Hasyim+Jl+KH+Wahid+Hasyim+No+135-137",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20K.H.%20Wahid%20Hasyim%20No.%20135-137%2C%20Jakarta%20Pusat%2010240%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelSwissBelinn.jpg",
    filename: "Directions-Swiss-Belinn-Wahid-Hasyim.png",
  },
  {
    id: "kosenda-hotel",
    name: "Kosenda Hotel",
    address: "Jl. K.H. Wahid Hasyim No. 127, Jakarta Pusat 10240, Indonesia",
    tag: "BOUTIQUE HOTEL",
    tagStyle: "bg-purple-600 text-white",
    priceRange: "Rp775.000 – Rp950.000",
    priceNoteEn: "per room / night (planning budget)",
    priceNoteId: "per kamar / malam (anggaran perencanaan)",
    distance: "1 – 1,3 km",
    walkTime: "13 – 18 min",
    carTime: "5 – 12 min",
    website: "https://kosendahotel.com/",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kosenda+Hotel+Jl+KH+Wahid+Hasyim+No+127",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&origin=Menara%20Thamrin%2C%20Jakarta%20Pusat%2C%20Indonesia&destination=Jl.%20K.H.%20Wahid%20Hasyim%20No.%20127%2C%20Jakarta%20Pusat%2010240%2C%20Indonesia&travelmode=walking",
    img: "/assets/hotelKosenda.jpg",
    filename: "Directions-Kosenda-Hotel.png",
  },
];

/* ================================================================
   HELPER — QR Code URL builder
   ================================================================ */
function qrUrl(targetUrl) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}&margin=1`;
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function BimpEagaLandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const handleCopyLink = (url) => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openQr = (title, subtitle, url) => {
    setQrModal({ title, subtitle, url });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-orange-500/20 selection:text-orange-700 overflow-x-clip text-sm">

      {/* ──────────────────────────────────────────────────────────
          NAVBAR (High-Contrast, Senior-Friendly & Fully Responsive)
          ────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/10 border-b border-slate-200"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Kiri (UNSD) - Ukuran lebih tegas dan proporsional */}
          <a
            href="#overview"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
          >
            <img
              src="/assets/logo.jpeg"
              onError={(e) => { e.currentTarget.src = "/assets/logo.jpeg"; }}
              alt="United Nations Statistics Division (UNSD) Logo"
              className="h-10 sm:h-12 w-auto object-contain max-w-[220px] sm:max-w-[280px] lg:max-w-[320px]"
            />
          </a>

          {/* Navigasi Desktop & Laptop: Font Tebal (Bold), Jelas, & Kontras Tinggi */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { label: "Overview", id: "overview" },
              { label: "Delegates", id: "delegates" },
              { label: "Dress Code", id: "dresscode" },
              { label: "Resources", id: "resources" },
              { label: "Hotels", id: "hotels" },
              { label: "Explore", id: "explorejakarta" },
              { label: "Culinary", id: "culinary" },
              { label: "Venue", id: "venue" },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[15px] font-extrabold text-slate-800 hover:text-orange-600 hover:bg-orange-50/80 active:bg-orange-100 rounded-xl transition-all duration-150 tracking-tight"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile & Tablet Button: Lebih Besar, Ada Tulisan "Menu" untuk Kemudahan Orang Tua */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileNav(!mobileNav)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold text-sm hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all shadow-sm active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileNav ? (
                <>
                  <X className="w-5 h-5 text-orange-600 stroke-[2.5]" />
                  <span className="font-extrabold text-orange-600 text-xs sm:text-sm">Tutup</span>
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5 text-orange-600 stroke-[2.5]" />
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown: Font Besar, Jelas & Mudah Ditekan untuk Layar HP/Tablet */}
        {mobileNav && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-2xl px-4 py-3 max-h-[calc(100vh-80px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                { label: "Overview", sub: "Ringkasan Acara", id: "overview" },
                { label: "Delegates", sub: "Negara Peserta", id: "delegates" },
                { label: "Dress Code", sub: "Panduan Busana", id: "dresscode" },
                { label: "Resources", sub: "Materi & Dokumen", id: "resources" },
                { label: "Hotels", sub: "Rekomendasi Penginapan", id: "hotels" },
                { label: "Explore Jakarta", sub: "Destinasi Wisata", id: "explorejakarta" },
                { label: "Culinary", sub: "Kuliner Khas", id: "culinary" },
                { label: "Venue & Guide", sub: "Lokasi Menara Thamrin", id: "venue" },
              ].map(({ label, sub, id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileNav(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-500/10 border border-slate-200/80 hover:border-orange-300 transition-all"
                >
                  <div>
                    <span className="block text-sm sm:text-base font-extrabold text-[#0B1E43]">
                      {label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {sub}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent layout shift beneath fixed header */}
      <div className="h-20" />

      {/* ──────────────────────────────────────────────────────────
          HERO
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
            {/* Teks Kiri */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-orange-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>United Nations Statistics Division (UNSD) &bull; BPS RI</span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl lg:text-[1.85rem] lg:leading-[1.25] font-extrabold text-white tracking-tight">
                  Workshop on International Merchandise Trade Statistics{" "}
                  <span className="text-orange-400 font-black">(IMTS 2026)</span>{" "}
                  and Statistics of International Trade in Services{" "}
                  <span className="text-orange-400 font-black">(SITS 2026)</span>
                </h1>
                <p className="text-slate-300/80 text-xs sm:text-sm mt-2 italic leading-relaxed">
                  UNSD Workshop &bull; Lokakarya Statistik Perdagangan Barang Internasional (IMTS 2026) dan Statistik Perdagangan Jasa Internasional (SITS 2026)
                </p>
              </div>

              {/* Badges Info */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/[0.10] rounded-xl px-3.5 py-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Date / Tanggal
                    </span>
                    <span className="text-xs font-bold text-white">
                      7 – 11 Desember 2026
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/[0.10] rounded-xl px-3.5 py-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Venue / Lokasi
                    </span>
                    <span className="text-xs font-bold text-white">
                      UNDP Indonesia, Lantai 9
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href="#resources"
                  className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200"
                >
                  <span>View Resources</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  onClick={() => openQr("Meeting Venue", "UNDP Indonesia, Lantai 9", UNDP_MAP_URL)}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/[0.20] text-white text-xs sm:text-sm font-bold hover:bg-white/[0.20] hover:scale-[1.02] transition-all duration-200"
                >
                  <QrCode className="w-4 h-4 text-orange-400" />
                  <span>Scan Code / QR Lokasi</span>
                </button>

                <a
                  href={UNDP_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-slate-300 text-xs sm:text-sm font-medium hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  <MapPinned className="w-3.5 h-3.5 text-orange-400" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Host Card Kanan */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/15 blur-xl scale-105 pointer-events-none" />

                <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-4 sm:p-5 shadow-xl text-center">
                  <div className="flex items-end justify-center gap-2 mb-3">
                    <div className="flex-1">
                      <img
                        src="/assets/salamLaki.avif"
                        alt="Host Pria BPS"
                        className="w-full max-h-52 sm:max-h-56 object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-200"
                        style={{ mixBlendMode: "luminosity" }}
                      />
                    </div>
                    <div className="flex-1">
                      <img
                        src="/assets/salamWadon.avif"
                        alt="Host Wanita BPS"
                        className="w-full max-h-52 sm:max-h-56 object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-200"
                        style={{ mixBlendMode: "luminosity" }}
                      />
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Users className="w-3 h-3" /> Official Host & Committee
                    </span>
                    <p className="text-[11px] text-slate-200 mt-1.5 leading-tight font-medium">
                      BPS-Statistics Indonesia Welcomes All Distinguished Delegates
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 italic">
                      Menyambut Seluruh Delegasi Terhormat
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
            <p className="text-slate-200/90 text-xs sm:text-sm leading-relaxed mt-2 max-w-2xl">
              Indonesia is honored to host the UNSD Workshop on IMTS 2026 and SITS 2026 in collaboration with the United Nations Statistics Division (UNSD) and BPS-Statistics Indonesia. We look forward to strengthening international statistical cooperation through collaboration, innovation, and knowledge sharing.
            </p>
            <p className="text-slate-400 text-xs mt-1 italic max-w-2xl leading-relaxed">
              Indonesia merasa terhormat menjadi tuan rumah kegiatan UNSD Workshop on IMTS 2026 and SITS 2026 yang diselenggarakan bekerja sama dengan United Nations Statistics Division (UNSD) dan BPS-Statistics Indonesia.
            </p>
          </div>

          <div className="bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-400" />
                <span className="text-xs uppercase font-bold tracking-wider text-orange-400">
                  Participating Delegations
                </span>
                <span className="text-[11px] text-slate-400 italic">
                  / Delegasi 11 Negara
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
                { val: "11", labelEn: "Delegations", labelId: "Delegasi" },
                { val: "5 Days", labelEn: "Working Sessions", labelId: "Hari Kerja" },
                { val: "UNDP", labelEn: "Meeting Venue", labelId: "Lokasi Pertemuan" },
              ].map(({ val, labelEn, labelId }, i) => (
                <div key={i}>
                  <span className="block text-xl sm:text-2xl font-black text-orange-400">
                    {val}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium block">
                    {labelEn}
                  </span>
                  <span className="text-[10px] text-slate-400 italic block">
                    {labelId}
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
              Recommended attire for delegates during the meeting sessions.
            </p>
            <p className="text-slate-400 text-xs italic mt-0.5">
              Pakaian yang disarankan untuk delegasi selama sesi pertemuan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Day 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0B1E43] to-[#153470] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white shadow-sm">
                    Day 1 / Hari 1
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Business Attire
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Formal business suit, blazer, or formal delegation uniform for the opening ceremony and plenary sessions.
                  </p>
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">
                    Jas formal, blazer, atau seragam resmi delegasi untuk pembukaan dan pleno.
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

            {/* Day 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0E275A] to-[#071533] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
              <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-slate-200 border border-white/10">
                    Day 2 - 5 / Hari 2 - 5
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Formal Casual
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Smart casual attire, batik, national dress, or collared shirts suitable for workshops and discussions.
                  </p>
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">
                    Pakaian kasual rapi, batik, pakaian nasional, atau kemeja berkerah.
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
          RESOURCES
          ────────────────────────────────────────────────────────── */}
      <section id="resources" className="py-12 lg:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              Delegate Portal
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Essential documents and schedules for delegates.
            </p>
            <p className="text-slate-400 text-xs italic mt-0.5">
              Dokumen penting dan jadwal untuk para delegasi.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { key: "agenda", label: "Agenda", labelId: "Jadwal", Icon: Calendar, color: "orange" },
              { key: "materials", label: "Materials", labelId: "Materi", Icon: Folder, color: "blue" },
              { key: "moments", label: "Moments", labelId: "Dokumentasi", Icon: Camera, color: "emerald" },
              { key: "certificate", label: "Certificate", labelId: "Sertifikat", Icon: Award, color: "amber" },
            ].map(({ key, label, labelId, Icon, color }) => (
              <button
                key={key}
                onClick={() => setActiveModal(key)}
                className="group flex items-center justify-between px-4 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-orange-300 transition-all duration-200 text-left"
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
                    <span className="text-[10px] text-slate-400 italic block truncate">
                      {labelId}
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
          HOTEL RECOMMENDATIONS FOR ASEAN GUESTS
          ────────────────────────────────────────────────────────── */}
      <section id="hotels" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200">
              <Hotel className="w-3.5 h-3.5" /> ASEAN Delegate Accommodations / Rekomendasi Hotel
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1E43] mt-2">
              Recommended Hotels Near UNDP Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl mx-auto">
              Curated comfortable accommodations located within walking and short driving distance from the workshop venue.
            </p>
            <p className="text-slate-400 text-xs italic mt-0.5 max-w-2xl mx-auto">
              Hotel pilihan dengan kenyamanan terbaik dan berjarak dekat dari Menara Thamrin (Kantor UNDP Indonesia).
            </p>
          </div>

          {/* Reference Starting Point Banner */}
          <div className="max-w-2xl mx-auto mb-8 p-3 sm:p-3.5 rounded-xl bg-orange-50/90 border border-orange-200/80 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-orange-700">
              <Compass className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                Reference Departure Point &bull; Titik Acuan Perjalanan:
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#0B1E43] mt-0.5">
              United Nations Development Programme (UNDP) Indonesia Country Office
            </p>
            <p className="text-[11px] text-slate-600">
              Menara Thamrin, Jl. M.H. Thamrin Kav. 3, Kebon Sirih, Menteng, Jakarta Pusat 10250, Indonesia
            </p>
            <p className="text-[10px] text-slate-500 italic mt-0.5">
              Seluruh informasi jarak dan perkiraan waktu tempuh mengacu pada lokasi tersebut.
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
                        {hotel.distance} ke UNDP
                      </span>
                      <button
                        onClick={() => setHotelModal(hotel)}
                        className="inline-flex items-center gap-1 bg-white/95 text-[#0B1E43] font-bold text-[10px] px-2 py-0.5 rounded-md shadow hover:bg-orange-500 hover:text-white transition-colors"
                        title="Scan QR Code Directions"
                      >
                        <QrCode className="w-3 h-3" /> QR Arah
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
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{hotel.address}</span>
                      </p>
                    </div>

                    {/* Estimated Price Box (High Visual Priority) */}
                    <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-100">
                      <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange-700">
                        Estimated Price per Night
                      </span>
                      <div className="text-base sm:text-lg font-black text-orange-600 tracking-tight mt-0.5">
                        {hotel.priceRange}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {hotel.priceNoteEn} &bull; <span className="italic">{hotel.priceNoteId}</span>
                      </div>
                    </div>

                    {/* Distance & Travel Time Details */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-orange-500" /> Jarak ke UNDP:
                        </span>
                        <span className="font-bold text-[#0B1E43]">{hotel.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1">
                          <Footprints className="w-3 h-3 text-slate-400" /> Jalan Kaki:
                        </span>
                        <span className="font-medium text-slate-700">{hotel.walkTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Car className="w-3 h-3 text-slate-400" /> Mobil / Taksi:
                        </span>
                        <span className="font-medium text-slate-700">{hotel.carTime}</span>
                      </div>
                    </div>
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
                      <span>Get Directions</span>
                    </a>
                    <a
                      href={hotel.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-[#0B1E43] hover:bg-[#153470] text-white text-xs font-bold hover:scale-[1.02] transition-all shadow-sm text-center"
                      title="Open hotel location in Google Maps"
                    >
                      <MapPinned className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>View on Google Maps</span>
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
                      <span>Scan QR Code</span>
                    </button>
                    <button
                      onClick={() => handleDownloadHotelQr(hotel)}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors border border-orange-200 text-center"
                      title="Download high-resolution scannable QR Code PNG"
                    >
                      <Download className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                      <span>Download QR Code</span>
                    </button>
                  </div>

                  {/* Official Website Row */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                    <span className="italic text-slate-400">Official Hotel Info</span>
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-orange-600 font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <span>Website Resmi</span>
                      <ExternalLink className="w-3 h-3 text-orange-500" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Disclaimer Box */}
          <div className="mt-8 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
              <Info className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Hotel Rate & Travel Time Disclaimer / Ketentuan Estimasi Tarif & Waktu</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
              &ldquo;Prices, distances, and travel times are indicative estimates for planning purposes only. Actual hotel rates depend on booking dates, occupancy, and room categories. Travel times may vary based on traffic conditions in Central Jakarta.&rdquo;
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 italic leading-relaxed pt-1.5 border-t border-slate-100">
              &ldquo;Harga, jarak, dan waktu tempuh merupakan perkiraan indikatif untuk keperluan perencanaan saja. Tarif hotel sebenarnya bergantung pada tanggal pemesanan, tingkat okupansi, dan kategori kamar. Waktu tempuh dapat bervariasi sesuai dengan kondisi lalu lintas di Jakarta Pusat.&rdquo;
            </p>
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
              Discover cultural heritage and landmarks of Indonesia&apos;s capital during your stay.
            </p>
            <p className="text-slate-400 text-xs italic mt-0.5">
              Jelajahi warisan budaya dan landmark ibu kota Indonesia selama kunjungan Anda.
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
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.en}
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      {item.id}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {item.distance}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* QR Code button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQr(item.title, item.en, item.mapUrl);
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
              Experience authentic local delicacies and renowned culinary traditions.
            </p>
            <p className="text-slate-400 text-xs italic mt-0.5">
              Rasakan kelezatan kuliner lokal autentik khas Jakarta.
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
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {food.en}
                  </p>
                  <p className="text-[10px] text-slate-400 italic line-clamp-1">
                    {food.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          MEETING VENUE — UNDP (Primary) + BPS (Secondary)
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
              <Building2 className="w-3.5 h-3.5" /> Official Locations & Venue Profile / Lokasi & Profil Venue
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Meeting Venue: Menara Thamrin & Host Organization
            </h2>
            <p className="text-xs text-slate-300 mt-1.5 max-w-lg mx-auto">
              United Nations Development Programme (UNDP) Lantai 9 &bull; Badan Pusat Statistik RI
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5">
              Profil resmi venue lokakarya di Menara Thamrin dan kantor pusat tuan rumah BPS RI.
            </p>
          </div>

          {/* ──────────────────────────────────────────────────────────
              VENUE SPOTLIGHT & INTRODUCTION: MENARA THAMRIN (LANTAI 9)
              ────────────────────────────────────────────────────────── */}
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] rounded-3xl p-5 sm:p-7 lg:p-8 mb-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

              {/* Kolom Kiri: Visual & Gallery Showcase */}
              <div className="lg:col-span-5 space-y-3">
                {/* Main Active Image Display */}
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src={venueGallery[activeVenueImg].src}
                    alt={venueGallery[activeVenueImg].title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061130] via-transparent to-transparent opacity-85 pointer-events-none" />

                  {/* Badge atas */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      <Sparkles className="w-3 h-3" /> {venueGallery[activeVenueImg].badge}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-semibold border border-white/10">
                      Menara Thamrin &bull; Lantai 9
                    </span>
                  </div>

                  {/* Caption bawah */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {venueGallery[activeVenueImg].title}
                      </h4>
                      <p className="text-[11px] text-slate-300 truncate">
                        {venueGallery[activeVenueImg].caption}
                      </p>
                    </div>
                    <button
                      onClick={() => openQr("UNDP Indonesia — Menara Thamrin", "Lantai 9, Jl. M.H. Thamrin Kav 3", UNDP_MAP_URL)}
                      className="p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-sm flex-shrink-0"
                      title="Scan QR Lokasi Menara Thamrin"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Fasilitas & Venue Gallery:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Klik foto untuk preview
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
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
                        <span className="absolute bottom-0 inset-x-0 text-[8px] font-bold text-white bg-black/75 p-0.5 truncate text-center">
                          {item.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Floor Directory & Venue Quick Guide (Mengisi ruang kosong di bawah thumbnail) ── */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-orange-400" />
                      Direktori Lantai & Panduan Fasilitas
                    </span>
                    <span className="text-[10px] text-orange-300 font-semibold bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-400/20">
                      Menara Thamrin
                    </span>
                  </div>

                  {/* Floor directory list */}
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <div
                      onClick={() => setActiveVenueImg(1)}
                      className="cursor-pointer flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-orange-400/40 transition-all"
                      title="Klik untuk lihat foto Workshop & Plenary Hall Lantai 9"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-orange-500 text-white font-black text-[10px]">
                          Lt. 9
                        </span>
                        <div>
                          <span className="font-semibold text-white block leading-tight">Workshop & Plenary Hall</span>
                          <span className="text-[10px] text-slate-300 italic">Ruang pertemuan utama delegasi (UNDP)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md">Venue Utama</span>
                    </div>

                    <div
                      onClick={() => setActiveVenueImg(7)}
                      className="cursor-pointer flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-sky-400/40 transition-all"
                      title="Klik untuk lihat fasilitas Lantai LG"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-sky-500/30 text-sky-300 border border-sky-400/30 font-black text-[10px]">
                          Lt. LG
                        </span>
                        <div>
                          <span className="font-semibold text-white block leading-tight">Kantin, Indomaret & Money Changer</span>
                          <span className="text-[10px] text-slate-400 italic">Pujasera, minimarket & penukaran valas</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-md">Fasilitas</span>
                    </div>

                    <div
                      onClick={() => setActiveVenueImg(5)}
                      className="cursor-pointer flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-emerald-400/40 transition-all"
                      title="Klik untuk lihat foto Mushola Basement"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 font-black text-[10px]">
                          Lt. B
                        </span>
                        <div>
                          <span className="font-semibold text-white block leading-tight">Mushola (Prayer Room)</span>
                          <span className="text-[10px] text-slate-400 italic">Tempat ibadah & wudhu di lantai basement</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md">Ibadah</span>
                    </div>

                    <div
                      onClick={() => setActiveVenueImg(4)}
                      className="cursor-pointer flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-amber-400/40 transition-all"
                      title="Klik untuk lihat foto Smoking Area Outdoor"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/30 text-amber-300 border border-amber-400/30 font-black text-[10px]">
                          Outdoor
                        </span>
                        <div>
                          <span className="font-semibold text-white block leading-tight">Smoking Area (Area Merokok)</span>
                          <span className="text-[10px] text-slate-400 italic">Area terbuka di bagian belakang gedung</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md">Outdoor</span>
                    </div>
                  </div>

                  {/* Access Protocol Note */}
                  <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-200 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong className="text-white">Akses Gedung:</strong> Registrasi & pengambilan tanda pengenal (ID Badge) delegasi di lobi utama (Ground Floor) untuk akses elevator menuju Lantai 9.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Teks Pengenalan Venue & Informasi Lengkap */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Building2 className="w-3 h-3" />
                    <span>Official Venue Spotlight &bull; Lantai 7–9</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Venue: Menara Thamrin, Jakarta, Indonesia
                  </h3>
                  <p className="text-xs text-orange-300 font-semibold mt-0.5">
                    United Nations Development Programme (UNDP) Indonesia Country Office
                  </p>
                </div>

                {/* English Description */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-400/20">
                      English
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300">Official Venue Profile</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                    Located in the heart of Central Jakarta, Menara Thamrin is a prominent office building situated along Jalan M.H. Thamrin, one of the city&apos;s key business districts. The building houses the United Nations Development Programme (UNDP) Indonesia Country Office on its 7th to 9th floors.
                  </p>
                  <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed">
                    With its central Jakarta location, Menara Thamrin provides a distinguished setting for international meetings, professional exchanges, and collaborative discussions. It will serve as the venue for the UNSD Workshop on International Merchandise Trade Statistics (IMTS 2026) and Statistics of International Trade in Services (SITS 2026), bringing together participants to share knowledge, exchange experiences, and strengthen cooperation in international trade statistics.
                  </p>
                </div>

                {/* Indonesian Description */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/20">
                      Bahasa Indonesia
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300">Profil Resmi Tempat Pertemuan</span>
                  </div>
                  <p className="text-xs sm:text-[12.5px] text-slate-300 italic leading-relaxed">
                    Menara Thamrin merupakan gedung perkantoran yang berlokasi di kawasan strategis Jalan M.H. Thamrin, Jakarta Pusat, salah satu kawasan bisnis utama di ibu kota. Gedung ini menjadi lokasi kantor United Nations Development Programme (UNDP) Indonesia Country Office yang menempati lantai 7 hingga 9.
                  </p>
                  <p className="text-xs sm:text-[12.5px] text-slate-300 italic leading-relaxed">
                    Dengan lokasinya di pusat Jakarta, Menara Thamrin menjadi tempat yang representatif untuk mendukung kegiatan pertemuan profesional, pertukaran pengetahuan, dan diskusi kolaboratif. Venue ini akan menjadi tempat penyelenggaraan UNSD Workshop on International Merchandise Trade Statistics (IMTS 2026) and Statistics of International Trade in Services (SITS 2026), yang mempertemukan para peserta untuk berbagi wawasan, bertukar pengalaman, dan memperkuat kerja sama di bidang statistik perdagangan internasional.
                  </p>
                </div>

                {/* Strategic Highlights & Sources */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-white/[0.06] px-2.5 py-1 rounded-md text-slate-300">
                      <MapPin className="w-3 h-3 text-orange-400" /> Jl. M.H. Thamrin Kav 3, Jakarta Pusat
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/[0.06] px-2.5 py-1 rounded-md text-slate-300">
                      <Users className="w-3 h-3 text-sky-400" /> Lantai 7–9 (UNDP Country Office)
                    </span>
                  </div>

                  <a
                    href="https://www.undp.org/indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                  >
                    <span>Source: UNDP Indonesia Directory</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* ───── BUILDING AMENITIES & FACILITIES NOTES (CATATAN FASILITAS PENDUKUNG) ───── */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-orange-500/20 border border-orange-400/30 text-orange-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white flex flex-wrap items-center gap-2">
                      Building Amenities & Facilities Notes
                      <span className="text-xs font-normal text-orange-300 italic">/ Catatan Fasilitas Menara Thamrin</span>
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Essential spots and support services for delegates during the workshop at Menara Thamrin
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-300 bg-white/10 border border-white/10 px-3 py-1 rounded-full w-fit">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  Klik kartu untuk preview foto di layar utama
                </span>
              </div>

              {/* 5 Amenity Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {venueAmenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    onClick={() => {
                      setActiveVenueImg(amenity.galleryIndex);
                      const venueEl = document.getElementById("venue");
                      if (venueEl) {
                        venueEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`group cursor-pointer rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] border transition-all duration-300 p-3.5 flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl ${
                      activeVenueImg === amenity.galleryIndex
                        ? "border-orange-400 ring-2 ring-orange-400/50 shadow-lg shadow-orange-500/20"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-2.5 bg-slate-900 border border-white/10">
                        <img
                          src={amenity.img}
                          alt={amenity.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border shadow-sm backdrop-blur-md ${amenity.badgeColor}`}>
                          {amenity.floorBadge}
                        </span>
                      </div>

                      {/* Header Titles */}
                      <h5 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                        {amenity.nameEn}
                      </h5>
                      <span className="text-[10px] text-slate-400 italic block mb-2">
                        {amenity.nameId}
                      </span>

                      {/* Notes: English & Indonesia */}
                      <div className="space-y-1.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <div className="text-[11px] text-slate-200 font-medium leading-snug">
                          <strong className="text-orange-300 font-bold block mb-0.5">English:</strong>
                          {amenity.descEn}
                        </div>
                        <div className="text-[10px] text-slate-300 italic leading-snug pt-1 border-t border-white/10">
                          <strong className="text-sky-300 font-bold not-italic block mb-0.5">Indonesia:</strong>
                          {amenity.descId}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-orange-300 transition-colors">
                      <span className="font-semibold">Preview Foto</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Symmetrical Location Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* ───── CARD 1: UNDP (Meeting Venue) ───── */}
            <div className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#0E275A] to-[#071638] border-2 border-orange-500/50 shadow-xl shadow-orange-500/10 flex flex-col justify-between transition-all duration-300 hover:border-orange-400">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">
                      Meeting Venue &bull; 7–11 Des 2026
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-white/95 uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full">
                    Primary Location
                  </span>
                </div>

                {/* Image */}
                <a
                  href={UNDP_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-52 sm:h-60 w-full overflow-hidden block bg-slate-900 cursor-pointer"
                >
                  <img
                    src="/assets/gedungTamrin.jpg"
                    alt="United Nations Development Programme (UNDP) Menara Thamrin"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071638] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[#0B1E43]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-xs shadow-xl">
                      <MapPinned className="w-4 h-4" /> Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    United Nations Development Programme (UNDP)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Menara Thamrin, Lantai 9, Jl. M.H. Thamrin Kav 3, Jakarta Pusat
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    Lokasi resmi seluruh sesi pertemuan lokakarya selama 5 hari kerja
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
                  <a
                    href={UNDP_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => openQr("UNDP — Meeting Venue", "Menara Thamrin, Lantai 9, Jakarta Pusat", UNDP_MAP_URL)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white/[0.12] border border-white/[0.20] text-white text-xs font-bold hover:bg-white/[0.20] transition-colors"
                    title="Scan QR Code UNDP"
                  >
                    <QrCode className="w-3.5 h-3.5 text-orange-400" />
                    <span>Scan QR</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ───── CARD 2: BPS RI (Host Organization HQ) ───── */}
            <div className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#0E275A] to-[#071638] border border-white/15 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-sky-400/60">
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between bg-gradient-to-r from-[#0B1E43] to-[#153470] px-4 py-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">
                      Host Organization HQ
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-sky-200 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
                    Kantor Pusat
                  </span>
                </div>

                {/* Image */}
                <a
                  href={BPS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-52 sm:h-60 w-full overflow-hidden block bg-slate-900 cursor-pointer"
                >
                  <img
                    src="/assets/gedungBPS.jpg"
                    alt="Badan Pusat Statistik (BPS RI) Headquarters"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071638] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-[#0B1E43]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs shadow-xl border border-white/20">
                      <MapPinned className="w-4 h-4" /> Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                    Badan Pusat Statistik (BPS RI)
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Jl. Dr. Sutomo No. 6-8, Pasar Baru, Jakarta Pusat 10710
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    Kantor pusat institusi tuan rumah dan panitia penyelenggara
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
                  <a
                    href={BPS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white/[0.14] border border-white/[0.20] text-white text-xs font-bold hover:bg-white/[0.22] hover:scale-[1.02] transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => openQr("BPS-Statistics Indonesia", "Jl. Dr. Sutomo No. 6-8, Jakarta Pusat", BPS_MAP_URL)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-white/[0.08] border border-white/[0.12] text-slate-300 text-xs font-bold hover:text-white hover:bg-white/[0.15] transition-colors"
                    title="Scan QR Code BPS"
                  >
                    <QrCode className="w-3.5 h-3.5 text-sky-400" />
                    <span>Scan QR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Legend / Clarification */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-orange-500 flex-shrink-0" />
              <span className="text-[11px] text-slate-200">
                <strong className="text-orange-400">Meeting Venue:</strong> All sessions held at UNDP Indonesia, Lantai 9
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-sky-500/60 flex-shrink-0" />
              <span className="text-[11px] text-slate-200">
                <strong className="text-sky-400">Host Organization:</strong> BPS-Statistics Indonesia (Penyelenggara)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          FOOTER
          ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#050D1F] text-white pt-10 pb-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/[0.08]">
            <div className="md:col-span-4 space-y-3">
              <img
                src="/assets/logo.jpeg"
                onError={(e) => { e.currentTarget.src = "/assets/logo.jpeg"; }}
                alt="United Nations Statistics Division (UNSD) Logo"
                className="h-9 w-auto object-contain bg-white/95 p-1.5 rounded-lg max-w-[220px]"
              />
              <h3 className="text-sm font-bold text-white">
                UNSD Workshop on IMTS 2026 & SITS 2026
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                United Nations Statistics Division (UNSD) international trade statistics workshop hosted by BPS-Statistics Indonesia.
              </p>
              <p className="text-[11px] text-slate-500 italic">
                Lokakarya statistik perdagangan internasional diselenggarakan bersama BPS-Statistics Indonesia.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-orange-400 block">
                Meeting Venue / Lokasi Pertemuan
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                United Nations Development Programme (UNDP)
                <br />
                Menara Thamrin, Lantai 9
                <br />
                Jl. M.H. Thamrin Kav 3, Jakarta Pusat, Indonesia
              </p>
              <div className="pt-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mt-2">
                  Host Organization / Tuan Rumah
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  BPS-Statistics Indonesia, Jl. Dr. Sutomo No. 6-8, Jakarta Pusat 10710
                </p>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-orange-400 block">
                Quick Links
              </span>
              <ul className="text-xs space-y-1.5 text-slate-400">
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
                    href={BPS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-sky-400" /> BPS HQ Maps
                  </a>
                </li>
                <li><a href="#overview" className="hover:text-orange-400 transition-colors">Overview / Ikhtisar</a></li>
                <li><a href="#resources" className="hover:text-orange-400 transition-colors">Resources / Materi</a></li>
                <li><a href="#hotels" className="hover:text-orange-400 transition-colors">Hotels / Akomodasi</a></li>
                <li><a href="#explorejakarta" className="hover:text-orange-400 transition-colors">Explore Jakarta</a></li>
                <li><a href="#venue" className="hover:text-orange-400 transition-colors">Venue & Amenities</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>&copy; 2026 UNSD Workshop on IMTS & SITS. Hosted by BPS-Statistics Indonesia & United Nations Statistics Division.</p>
            <p>IMTS 2026 &bull; SITS 2026 &bull; Jakarta, Indonesia</p>
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
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-[#0B1E43]">
              {qrModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {qrModal.subtitle}
            </p>
            <p className="text-[11px] text-slate-400 italic mt-0.5">
              Arahkan kamera smartphone Anda untuk membuka lokasi di Google Maps
            </p>

            {/* QR Code */}
            <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
              <img
                src={qrUrl(qrModal.url)}
                alt={`QR Code ${qrModal.title}`}
                className="w-44 h-44 rounded-lg bg-white p-2 shadow-inner"
              />
              <span className="text-[10px] text-slate-500 mt-2 font-mono break-all max-w-[220px]">
                {qrModal.url.replace(/^https?:\/\//, "").substring(0, 45)}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <a
                href={qrModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold hover:scale-[1.02] transition-transform shadow-md"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => handleCopyLink(qrModal.url)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Link Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3 text-slate-500" />
                    <span>Salin Tautan Lokasi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          HOTEL DIRECTIONS & QR CODE MODAL
          ────────────────────────────────────────────────────────── */}
      {hotelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setHotelModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative text-center max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setHotelModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Label */}
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 text-orange-700 border border-orange-200 mb-2 shadow-sm">
                <Navigation className="w-3 h-3 text-orange-600" />
                SCAN FOR DIRECTIONS
              </span>
              <span className={`inline-block ${hotelModal.tagStyle} text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2`}>
                {hotelModal.tag}
              </span>
            </div>

            {/* Hotel Name & Address */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1E43] leading-snug">
              {hotelModal.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto flex items-start justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>{hotelModal.address}</span>
            </p>

            {/* Route Summary Pill */}
            <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600">
              <span className="font-semibold text-[#0B1E43]">{hotelModal.distance} from UNDP</span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1"><Footprints className="w-3 h-3 text-orange-500" /> {hotelModal.walkTime}</span>
              <span className="text-slate-300">&bull;</span>
              <span className="flex items-center gap-1"><Car className="w-3 h-3 text-orange-500" /> {hotelModal.carTime}</span>
            </div>

            {/* QR Code Container (Crisp Black on White with quiet zone) */}
            <div className="my-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center max-w-[260px] mx-auto">
              <img
                src={hotelQrUrls[hotelModal.id] || qrUrl(hotelModal.directionsUrl)}
                alt={`Google Maps Walking Directions to ${hotelModal.name}`}
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
            <div className="mb-4 py-2 px-3 rounded-xl bg-orange-50/70 border border-orange-100 text-xs">
              <span className="text-slate-500 font-medium">Estimated Rate: </span>
              <strong className="text-orange-700 font-bold">{hotelModal.priceRange}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {hotelModal.priceNoteEn} &bull; <span className="italic">{hotelModal.priceNoteId}</span>
              </span>
            </div>

            {/* Action Buttons: View on Google Maps, Get Directions, Download QR Code */}
            <div className="space-y-2 pt-1 text-xs">
              <a
                href={hotelModal.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:scale-[1.02] transition-transform shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Buka Rute Jalan Kaki)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={hotelModal.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1E43] hover:bg-[#153470] text-white font-bold transition-colors shadow-sm"
              >
                <MapPinned className="w-4 h-4 text-sky-400" />
                <span>View on Google Maps (Lihat Lokasi)</span>
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
                <span>Visit Official Hotel Website / Situs Resmi</span>
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
                <p className="text-[11px] text-slate-400 italic">Jadwal Lokakarya</p>
                <p className="text-xs text-slate-500 mt-1">7 – 11 Desember 2026 &bull; UNDP Indonesia, Lantai 9</p>
                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  {[
                    { en: "Day 1: Opening & Plenary IMTS 2026", id: "Hari 1: Pembukaan & Pleno IMTS 2026", desc: "Welcome remarks, ministerial keynote, and IMTS methodology updates." },
                    { en: "Day 2–3: SITS 2026 & Trade in Services", id: "Hari 2–3: SITS 2026 & Perdagangan Jasa", desc: "Cross-border trade statistics and international database harmonization." },
                    { en: "Day 4–5: Recommendations & Closing", id: "Hari 4–5: Rekomendasi & Penutupan", desc: "Drafting joint statistics declaration and cultural tour." },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#0B1E43] block">{item.en}</span>
                      <span className="text-[10px] text-slate-400 italic block mb-1">{item.id}</span>
                      <span className="text-slate-500 text-[11px] block">{item.desc}</span>
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
                <h3 className="text-base font-bold text-[#0B1E43]">Session Materials</h3>
                <p className="text-[11px] text-slate-400 italic">Materi Lokakarya</p>
                <p className="text-xs text-slate-500 mt-1">Download presentations, guidelines, and manuals.</p>
                <div className="mt-4 space-y-2 text-xs">
                  {["IMTS 2026 Conceptual Framework.pdf", "SITS 2026 Implementation Guide.pdf", "UNSD Joint Declaration Draft.pdf"].map((file, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                        <span className="font-medium text-slate-700 truncate text-[11px]">{file}</span>
                      </div>
                      <button className="text-orange-600 font-semibold hover:underline flex items-center gap-1 flex-shrink-0 ml-2 text-[11px]">
                        <Download className="w-3 h-3" /> Unduh
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
                <p className="text-[11px] text-slate-400 italic">Dokumentasi & Momen Kegiatan</p>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {["kantorBPS", "jakartamonas", "masjid", "kotatua"].map((name, i) => (
                    <div key={i} className="rounded-lg overflow-hidden h-24 bg-slate-100">
                      <img src={`/assets/${name}.avif`} alt={`Moment ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-3 text-center">
                  Live photo gallery updated continuously &bull; <span className="italic">Diperbarui berkala</span>
                </p>
              </div>
            )}

            {activeModal === "certificate" && (
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B1E43]">Certificate of Attendance</h3>
                <p className="text-[11px] text-slate-400 italic">Sertifikat Kehadiran Peserta</p>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-3">
                  <p className="text-xs text-slate-600">
                    Certificates will be unlocked for registered delegates following the conclusion of Day 5 sessions.
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    Sertifikat tersedia setelah berakhirnya sesi Hari ke-5.
                  </p>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#0B1E43] text-white text-xs font-bold hover:bg-[#153470] transition-colors"
                  >
                    Check Eligibility / Cek Status
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
