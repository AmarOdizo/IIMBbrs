import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import ClientNav from '@/components/ClientNav';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, siteMetadata, getOrganizationSchema, getWebSiteSchema } from '@/lib/seo';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#994106',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Indian Institute of Metals (IIM) • Bhubaneswar Chapter',
    template: '%s | IIM Bhubaneswar Chapter',
  },
  description: siteMetadata.description,
  applicationName: siteMetadata.shortName,
  authors: [{ name: 'The Indian Institute of Metals, Bhubaneswar Chapter', url: SITE_URL }],
  creator: 'IIM Bhubaneswar Chapter',
  publisher: 'The Indian Institute of Metals',
  keywords: [
    'Indian Institute of Metals',
    'IIM Bhubaneswar',
    'IIM Bhubaneswar Chapter',
    'CSIR-IMMT Bhubaneswar',
    'Odisha metallurgy',
    'green steel India',
    'hydrogen DRI metallurgy',
    'Advanced High-Strength Steels',
    'AHSS symposium',
    'materials engineering Odisha',
    'mineral processing Eastern India',
    'student chapters metallurgy',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The Indian Institute of Metals (IIM) • Bhubaneswar Chapter',
    description: siteMetadata.description,
    url: SITE_URL,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: 'website',
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'IIM Bhubaneswar Chapter — Metallurgical Science & Green Steel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Indian Institute of Metals (IIM) • Bhubaneswar Chapter',
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/images/logo1.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/assets/images/logo1.svg' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo1.svg" />
        <JsonLd data={[getOrganizationSchema(), getWebSiteSchema()]} />
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
        <Navbar />
        {children}
        <ClientNav />
        <script
          id="global-portal-bridge"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  // 1. Mobile Menu & Login Autofill Handler
  function h(e){
    var t=e.target;if(!t)return;
    var b=t.closest?t.closest("#mobile-menu-toggle"):null;
    var c=t.closest?t.closest("#mobile-menu-close"):null;
    var d=t.id==="mobile-menu-backdrop";
    if(b){
      e.preventDefault();e.stopPropagation();
      var all=document.querySelectorAll("#mobile-menu-drawer");
      var open=false;
      all.forEach(function(el){if(el.classList.contains("drawer-open")||el.style.visibility==="visible")open=true;});
      var next=!open;
      all.forEach(function(el){
        if(next){
          el.classList.add("drawer-open");
          el.style.setProperty("visibility","visible","important");
          el.style.setProperty("opacity","1","important");
          el.style.setProperty("pointer-events","auto","important");
          var p=el.querySelector("#mobile-menu-panel");
          if(p)p.style.setProperty("transform","translateX(0%)","important");
        }else{
          el.classList.remove("drawer-open");
          el.style.setProperty("visibility","hidden","important");
          el.style.setProperty("opacity","0","important");
          el.style.setProperty("pointer-events","none","important");
          var p=el.querySelector("#mobile-menu-panel");
          if(p)p.style.setProperty("transform","translateX(100%)","important");
        }
      });
      document.body.style.overflow=next?"hidden":"";
      return;
    }
    if(c||d){
      e.preventDefault();e.stopPropagation();
      var all=document.querySelectorAll("#mobile-menu-drawer");
      all.forEach(function(el){
        el.classList.remove("drawer-open");
        el.style.setProperty("visibility","hidden","important");
        el.style.setProperty("opacity","0","important");
        el.style.setProperty("pointer-events","none","important");
        var p=el.querySelector("#mobile-menu-panel");
        if(p)p.style.setProperty("transform","translateX(100%)","important");
      });
      document.body.style.overflow="";
      return;
    }
    var a=t.closest?t.closest("#mobile-menu-drawer a"):null;
    if(a){
      var all=document.querySelectorAll("#mobile-menu-drawer");
      all.forEach(function(el){
        el.classList.remove("drawer-open");
        el.style.setProperty("visibility","hidden","important");
        el.style.setProperty("opacity","0","important");
        el.style.setProperty("pointer-events","none","important");
        var p=el.querySelector("#mobile-menu-panel");
        if(p)p.style.setProperty("transform","translateX(100%)","important");
      });
      document.body.style.overflow="";
    }
  }
  document.addEventListener("click",h,true);

  // 2. Global ICS Download
  window.downloadSympIcs = function() {
    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IIM Bhubaneswar//Symposium AHSS 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:ahss-2026-' + Date.now() + '@iimbhubaneswar.in',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART;TZID=Asia/Kolkata:20260328T090000',
      'DTEND;TZID=Asia/Kolkata:20260329T180000',
      'SUMMARY:18th National Symposium on Advanced High-Strength Steels (AHSS-2026)',
      'DESCRIPTION:18th National Symposium on AHSS & Decarbonized Ironmaking at CSIR-IMMT Bhubaneswar.',
      'LOCATION:Dr. Nilamani Sen Auditorium, CSIR-IMMT, Bhubaneswar, Odisha',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'AHSS_2026_IIM_Bhubaneswar.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // 3. Symposium Specimen Switcher
  window.switchSympV3Image = function(idx) {
    var img = document.getElementById('symp-v3-bg-img');
    var b0 = document.getElementById('symp-v3-img-btn-0');
    var b1 = document.getElementById('symp-v3-img-btn-1');
    if (!img) return;
    img.style.opacity = '0.3';
    setTimeout(function() {
      if (idx === 0) {
        img.src = '/assets/images/hero_ahss_structure.jpg';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      } else {
        img.src = '/assets/images/hero_green_steel.jpg';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      }
      img.style.opacity = '1';
    }, 150);
  };

  // 4. Symposium Schedule Day Switcher
  window.switchDayTab = function(dayNumber) {
    var day1Panel = document.getElementById('day1Panel');
    var day2Panel = document.getElementById('day2Panel');
    var day1Btn = document.getElementById('tabDay1Btn');
    var day2Btn = document.getElementById('tabDay2Btn');
    if (!day1Panel || !day2Panel || !day1Btn || !day2Btn) return;
    if (dayNumber === 1) {
      day1Panel.classList.remove('hidden');
      day1Panel.classList.add('flex');
      day2Panel.classList.add('hidden');
      day2Panel.classList.remove('flex');
      day1Btn.className = "px-4 py-2 rounded font-label-md text-label-md font-semibold bg-primary text-on-primary transition-all shadow-sm";
      day2Btn.className = "px-4 py-2 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all";
    } else {
      day1Panel.classList.add('hidden');
      day1Panel.classList.remove('flex');
      day2Panel.classList.remove('hidden');
      day2Panel.classList.add('flex');
      day2Btn.className = "px-4 py-2 rounded font-label-md text-label-md font-semibold bg-primary text-on-primary transition-all shadow-sm";
      day1Btn.className = "px-4 py-2 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface transition-all";
    }
  };

  // 5. Homepage Hero Specimen Switcher
  window.switchHeroV3Image = function(idx) {
    var img = document.getElementById('hero-v3-bg-img');
    var b0 = document.getElementById('v3-img-btn-0');
    var b1 = document.getElementById('v3-img-btn-1');
    if (!img) return;
    img.style.opacity = '0.3';
    setTimeout(function() {
      if (idx === 0) {
        img.src = '/assets/images/hero_blast_furnace.jpg';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      } else {
        img.src = '/assets/images/hero_green_steel.jpg';
        if (b1) b1.className = 'px-2.5 py-1 rounded-lg bg-primary text-white font-semibold transition-all flex items-center gap-1 text-xs shadow-sm hover:scale-105';
        if (b0) b0.className = 'px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 font-medium transition-all flex items-center gap-1 text-xs hover:scale-105';
      }
      img.style.opacity = '1';
    }, 150);
  };

  // 6. Committee Term Switcher
  window.switchTerm = function(termYear, el) {
    var tabs = document.querySelectorAll('.term-tab');
    tabs.forEach(function(tab) {
      tab.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tab.classList.add('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container-high');
    });
    if (el) {
      el.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      el.classList.remove('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container-high');
    }
    var label = document.getElementById('activeTermLabel');
    if (label) label.textContent = termYear;
  };

  // 7. Committee Past Chairmen Filter & Export
  window.filterRoster = function(query) {
    var q = (query || '').toLowerCase().trim();
    var rows = document.querySelectorAll('#chairmenTable tbody tr');
    rows.forEach(function(row) {
      var text = (row.innerText || '').toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  };

  window.exportRoster = function() {
    try {
      var table = document.getElementById('chairmenTable');
      var csvContent = '\uFEFF';
      if (table) {
        var rows = table.querySelectorAll('tr');
        rows.forEach(function(row) {
          var cols = row.querySelectorAll('th, td');
          var rowData = [];
          cols.forEach(function(col) {
            var text = (col.textContent || '').trim();
            text = text.replace(/"/g, '""');
            rowData.push('"' + text + '"');
          });
          if (rowData.length > 0) {
            csvContent += rowData.join(',') + '\r\n';
          }
        });
      }
      if (csvContent.length <= 2) {
        csvContent = '\uFEFFTenure Period,Chairman Name,Parent Affiliation,Major Chapter Milestone / Landmark Event\r\n' +
          '"2024–2025","Dr. Barada K. Mishra","CSIR-IMMT Bhubaneswar","Inauguration of Decarbonized Ironmaking Technology Forum; expansion of regional SME membership by 42%."\r\n' +
          '"2022–2024","Prof. B. C. Ray","NIT Rourkela / Guest Chair","Co-hosting of International Conference on Composite Materials; establishment of IISER Berhampur student cell."\r\n' +
          '"2020–2022","Er. Sudhansu S. Mohapatra","Tata Steel (Kalinganagar Works)","Transition to fully digitized technical colloquiums during pandemic; established COVID emergency student distress fund."\r\n' +
          '"2017–2020","Dr. Vibhuti N. Misra","Director, RRL / IMMT (Ex)","Silver Jubilee Convention of IIM Bhubaneswar; release of commemorative monograph on Odisha Mineral Wealth."\r\n' +
          '"2014–2017","Prof. Swapan K. Das","IIT Bhubaneswar","Formal signing of tripartite academic knowledge exchange with JFE Steel & RDCIS Ranchi."\r\n' +
          '"2010–2014","Er. P. K. Rath","RINL / Regional Executive","Hosted 51st National Metallurgists\' Day (NMD-ATM 2013) bringing 1,200 international metallurgists to Bhubaneswar."\r\n' +
          '"2005–2010","Dr. Saroj K. Singh","Regional Research Laboratory","Initiation of Chapter Endowed Gold Medals for top graduating metallurgy scholars from regional colleges."\r\n' +
          '"1998–2005","Dr. H. S. Ray","Former Director, RRL Bhubaneswar","Founding charter reconstitution; acquisition of designated secretariat rooms at CSIR-IMMT complex."\r\n';
      }
      var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      var url = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'IIM_Bhubaneswar_Former_Chairmen_Historical_Roster_1998-2025.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      var btn = document.getElementById('btn-export-roster');
      if (btn) {
        var origHtml = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span><span class="text-emerald-700 font-semibold">Downloaded!</span>';
        setTimeout(function() {
          btn.innerHTML = origHtml;
        }, 2500);
      }
    } catch (e) {
      console.error('Error exporting roster:', e);
    }
  };

  // 8. Not Found Search
  window.handleRegistrySearch = function() {
    var inp = document.getElementById('registrySearchInput');
    if (inp && inp.value.trim()) {
      window.location.href = '/members?q=' + encodeURIComponent(inp.value.trim());
    }
  };
})();`
          }}
        />
      </body>
    </html>
  );
}
