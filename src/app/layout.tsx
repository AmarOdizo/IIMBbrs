import type { Metadata } from 'next';
import ClientNav from '@/components/ClientNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Indian Institute of Metals (IIM) • Bhubaneswar Chapter',
  description: 'Official portal of The Indian Institute of Metals (IIM) Bhubaneswar Chapter.',
  icons: {
    icon: '/assets/images/logo1.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo1.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          id="tailwind-config"
          dangerouslySetInnerHTML={{
            __html: "tailwind.config = {\n      darkMode: \"class\",\n      theme: {\n        extend: {\n          \"colors\": {\n            \"surface-container-low\": \"#eef4ff\",\n            \"on-primary\": \"#ffffff\",\n            \"secondary\": \"#516071\",\n            \"surface-tint\": \"#9d4409\",\n            \"surface-variant\": \"#dbe3f0\",\n            \"on-secondary\": \"#ffffff\",\n            \"on-background\": \"#141c25\",\n            \"tertiary-fixed\": \"#ffdea7\",\n            \"on-error-container\": \"#93000a\",\n            \"tertiary\": \"#795600\",\n            \"on-secondary-fixed\": \"#0e1d2c\",\n            \"on-tertiary-fixed-variant\": \"#5e4200\",\n            \"outline-variant\": \"#dcc1b5\",\n            \"outline\": \"#897268\",\n            \"primary-fixed-dim\": \"#ffb692\",\n            \"surface-bright\": \"#f8f9ff\",\n            \"on-surface\": \"#141c25\",\n            \"surface-container-high\": \"#e1e9f6\",\n            \"primary\": \"#994106\",\n            \"on-surface-variant\": \"#56433a\",\n            \"tertiary-container\": \"#986d00\",\n            \"tertiary-fixed-dim\": \"#f4be55\",\n            \"on-error\": \"#ffffff\",\n            \"on-secondary-container\": \"#566476\",\n            \"secondary-fixed\": \"#d5e4f9\",\n            \"surface-container\": \"#e7eefc\",\n            \"primary-fixed\": \"#ffdbcb\",\n            \"on-secondary-fixed-variant\": \"#3a4859\",\n            \"on-tertiary\": \"#ffffff\",\n            \"inverse-primary\": \"#ffb692\",\n            \"on-tertiary-container\": \"#fffbff\",\n            \"on-primary-fixed\": \"#341100\",\n            \"secondary-container\": \"#d2e1f6\",\n            \"on-primary-container\": \"#fffbff\",\n            \"error-container\": \"#ffdad6\",\n            \"on-tertiary-fixed\": \"#271900\",\n            \"surface-dim\": \"#d3dbe7\",\n            \"on-primary-fixed-variant\": \"#793000\",\n            \"inverse-surface\": \"#29313b\",\n            \"primary-container\": \"#b95920\",\n            \"error\": \"#ba1a1a\",\n            \"surface-container-highest\": \"#dbe3f0\",\n            \"secondary-fixed-dim\": \"#b9c8dc\",\n            \"surface-container-lowest\": \"#ffffff\",\n            \"surface\": \"#f8f9ff\",\n            \"inverse-on-surface\": \"#e9f1fe\",\n            \"background\": \"#f8f9ff\"\n          },\n          \"borderRadius\": {\n            \"DEFAULT\": \"0.125rem\",\n            \"lg\": \"0.25rem\",\n            \"xl\": \"0.5rem\",\n            \"full\": \"0.75rem\"\n          },\n          \"spacing\": {\n            \"margin-mobile\": \"1.25rem\",\n            \"margin\": \"3rem\",\n            \"space-sm\": \"0.5rem\",\n            \"gutter-mobile\": \"1rem\",\n            \"space-xs\": \"0.25rem\",\n            \"gutter\": \"1.5rem\",\n            \"space-2xl\": \"4rem\",\n            \"space-md\": \"1rem\",\n            \"space-xl\": \"2.5rem\",\n            \"space-lg\": \"1.5rem\"\n          },\n          \"fontFamily\": {\n            \"headline-lg\": [\n              \"EB Garamond\"\n            ],\n            \"label-md\": [\n              \"Hanken Grotesk\"\n            ],\n            \"display-lg-mobile\": [\n              \"EB Garamond\"\n            ],\n            \"label-sm\": [\n              \"Hanken Grotesk\"\n            ],\n            \"headline-sm\": [\n              \"EB Garamond\"\n            ],\n            \"headline-lg-mobile\": [\n              \"EB Garamond\"\n            ],\n            \"title-lg\": [\n              \"Hanken Grotesk\"\n            ],\n            \"body-sm\": [\n              \"Hanken Grotesk\"\n            ],\n            \"body-lg\": [\n              \"Hanken Grotesk\"\n            ],\n            \"body-md\": [\n              \"Hanken Grotesk\"\n            ],\n            \"display-lg\": [\n              \"EB Garamond\"\n            ],\n            \"title-md\": [\n              \"Hanken Grotesk\"\n            ],\n            \"headline-md\": [\n              \"EB Garamond\"\n            ]\n          },\n          \"fontSize\": {\n            \"headline-lg\": [\n              \"40px\",\n              {\n                \"lineHeight\": \"48px\",\n                \"letterSpacing\": \"-0.015em\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"label-md\": [\n              \"12px\",\n              {\n                \"lineHeight\": \"16px\",\n                \"letterSpacing\": \"0.05em\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"display-lg-mobile\": [\n              \"36px\",\n              {\n                \"lineHeight\": \"44px\",\n                \"letterSpacing\": \"-0.01em\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"label-sm\": [\n              \"11px\",\n              {\n                \"lineHeight\": \"14px\",\n                \"letterSpacing\": \"0.08em\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"headline-sm\": [\n              \"24px\",\n              {\n                \"lineHeight\": \"32px\",\n                \"fontWeight\": \"500\"\n              }\n            ],\n            \"headline-lg-mobile\": [\n              \"28px\",\n              {\n                \"lineHeight\": \"36px\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"title-lg\": [\n              \"20px\",\n              {\n                \"lineHeight\": \"28px\",\n                \"letterSpacing\": \"-0.01em\",\n                \"fontWeight\": \"700\"\n              }\n            ],\n            \"body-sm\": [\n              \"13px\",\n              {\n                \"lineHeight\": \"20px\",\n                \"fontWeight\": \"400\"\n              }\n            ],\n            \"body-lg\": [\n              \"18px\",\n              {\n                \"lineHeight\": \"28px\",\n                \"fontWeight\": \"400\"\n              }\n            ],\n            \"body-md\": [\n              \"15px\",\n              {\n                \"lineHeight\": \"24px\",\n                \"fontWeight\": \"400\"\n              }\n            ],\n            \"display-lg\": [\n              \"56px\",\n              {\n                \"lineHeight\": \"64px\",\n                \"letterSpacing\": \"-0.02em\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"title-md\": [\n              \"17px\",\n              {\n                \"lineHeight\": \"24px\",\n                \"fontWeight\": \"600\"\n              }\n            ],\n            \"headline-md\": [\n              \"30px\",\n              {\n                \"lineHeight\": \"38px\",\n                \"fontWeight\": \"500\"\n              }\n            ]\n          }\n        },\n      },\n    };",
          }}
        />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary selection:text-white" suppressHydrationWarning>
        {children}
        <ClientNav />
      </body>
    </html>
  );
}
