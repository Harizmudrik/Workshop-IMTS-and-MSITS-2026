import "./globals.css";

export const metadata = {
  title: "UNSD Workshop | IMTS 2026 & SITS 2026 — Jakarta, Indonesia",
  description: "United Nations Statistics Division (UNSD) Workshop on International Merchandise Trade Statistics (IMTS 2026) and Statistics of International Trade in Services (SITS 2026) hosted by BPS-Statistics Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
