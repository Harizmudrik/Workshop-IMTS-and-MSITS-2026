import "./globals.css";

export const metadata = {
  title: "UNSD Workshop | IMTS 2026 & SITS 2026 — Jakarta, Indonesia",
  description: "United Nations Statistics Division (UNSD) Workshop on International Merchandise Trade Statistics (IMTS 2026) and Statistics of International Trade in Services (SITS 2026) hosted by BPS-Statistics Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN Fail-Safe Fallback */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      navy: {
                        900: '#0B1E43',
                        800: '#0F2B5B',
                        700: '#153470',
                      }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
