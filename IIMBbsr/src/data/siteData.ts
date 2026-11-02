export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Committee', href: '/committee' },
  { label: 'Members', href: '/members' },
  { label: 'Events', href: '/events' },
  { label: 'Symposium', href: '/symposium' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Student Chapters', href: '/student-chapters' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' }
];

export const siteConfig = {
  name: "The Indian Institute of Metals",
  chapter: "Bhubaneswar Chapter",
  fullName: "The Indian Institute of Metals • Bhubaneswar Chapter",
  tagline: "Advancing Metallurgy, Mineral Processing & Advanced Materials in Odisha",
  affiliation: "Affiliated to IIM Head Office, Kolkata (iim-india.net)",
  secretariat: "CSIR – Institute of Minerals and Materials Technology (CSIR-IMMT), Acharya Vihar, Bhubaneswar - 751013, Odisha, India",
  email: "secretary@iimbhubaneswar.in",
  symposiumEmail: "symposium2026@iimbhubaneswar.in",
  membershipEmail: "membership@iimbhubaneswar.in",
  phone: "+91 674 237 9401 / +91 674 237 4112",
  timing: "Mon - Fri: 9:30 AM - 5:30 PM IST",
  stats: [
    { label: "Active Members", value: "750+" },
    { label: "Partner Institutions", value: "30+" },
    { label: "Student Chapters", value: "4" },
    { label: "National Symposia", value: "18" }
  ]
};

export interface Officer {
  name: string;
  role: string;
  category: 'Apex' | 'Office Bearer' | 'Executive Member' | 'Advisory';
  title: string;
  institution: string;
  email: string;
  location: string;
  bio: string;
  tags: string[];
  image: string;
}

export const committeeMembers: Officer[] = [
  {
    name: "Dr. Alok R. Mohanty",
    role: "Chapter Chairman",
    category: "Apex",
    title: "Chief Scientist & Head of Pyrometallurgy",
    institution: "CSIR – Institute of Minerals and Materials Technology (CSIR-IMMT)",
    email: "armohanty@immt.res.in",
    location: "Room 204, Pyrometallurgy Complex, CSIR-IMMT, Bhubaneswar",
    bio: "Leading national initiatives on decarbonizing heavy extractive metallurgy with over 28 years of research pedigree. Dr. Mohanty oversees strategic planning, industry-academia research consortia, and apex liaison with public sector steel enterprises.",
    tags: ["Flash Smelting", "Hydrogen Direct Reduction", "Slag Valorization"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD05GWEFDdn5JGTkwz4DVGZuhBfAS8TXYzB7N4mzqTB9wpGALerOHBWsNkwSv8KHiPch858r9VV_1_EnkKS3d8uAaiouz0reOjRMpNyP-LGyuMzalXAbqk2PTy5R538LG5TIzZOsUhzhaqZp7puvMX_g7hhoGFfC9vzTrtBqRCLJHpSzCegIwEait36uK-aFDI9F_G8dnEGiAUXnL0wstS7aHJ7EdUe88xEed4jAaNwOS39wgZDTiGf"
  },
  {
    name: "Prof. S. N. Pattnaik",
    role: "Honorary Secretary",
    category: "Apex",
    title: "Professor of Materials Engineering",
    institution: "School of Minerals, Metallurgical & Materials Engineering, IIT Bhubaneswar",
    email: "secretary@iimbhubaneswar.in",
    location: "Academic Block 4, IIT Bhubaneswar Campus, Argul",
    bio: "Custodianship of all chapter secretarial administration, national council coordination, institutional registries, student chapter mentoring, and peer-reviewed technical publications under the aegis of IIM Kolkata.",
    tags: ["Phase Transformations", "High-Entropy Alloys", "Additive Metallurgy"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDua7ye_u7gwkOmtHDs3qk8atOFgb2EX7nGba-Mi7C-v4XNJonO6B-_iZ1nmUV-e4YwTnVWj4EL0NH5LBLn0DaCWdF0l5J4uLV4Bll_FUrxCVHubMl1D_zkYrJAXcNR_oOnXC-P2t_vK_AXEmnBnTbBFmnDaj6jqZfneLuGsWQto-y5PBKKR2N5o8dENpstieenZuXTTtYbJCNxCGRVahMHUBWqiEbDpegcTLLVG8yWFqEt7QOlFOm2"
  },
  {
    name: "Dr. Debasis Chaira",
    role: "Vice Chairman (Academic)",
    category: "Office Bearer",
    title: "Professor & Head of Metallurgical & Materials Engg",
    institution: "National Institute of Technology (NIT) Rourkela",
    email: "dchaira@nitrkl.ac.in",
    location: "Dept of MME, NIT Rourkela",
    bio: "Pioneering researcher in spark plasma sintering, nanostructured alloys, and composite materials. Fosters academic research collaboration across universities in Eastern India.",
    tags: ["Powder Metallurgy", "Nanocomposites", "Spark Plasma Sintering"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Er. Bimal K. Sahoo",
    role: "Vice Chairman (Industry)",
    category: "Office Bearer",
    title: "Vice President - Technology & Raw Materials",
    institution: "Tata Steel Meramandali, Dhenkanal",
    email: "bimal.sahoo@tatasteel.com",
    location: "Tata Steel Meramandali Plant",
    bio: "30+ years in ironmaking, blast furnace optimization, and alternative decarbonized iron production technologies. Steers industrial engagement programs.",
    tags: ["Blast Furnace", "Pelletizing", "Decarbonization"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Saroj K. Singh",
    role: "Honorary Treasurer",
    category: "Office Bearer",
    title: "Senior Principal Scientist",
    institution: "CSIR – Institute of Minerals and Materials Technology",
    email: "treasurer@iimbhubaneswar.in",
    location: "Hydro & Electrometallurgy Division, CSIR-IMMT",
    bio: "Specializing in mineral characterization and hydrometallurgical recovery of strategic metals. Manages statutory financial accounts, audits, and chapter grants.",
    tags: ["Hydrometallurgy", "Critical Minerals", "Financial Management"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Archana Mallik",
    role: "Joint Secretary",
    category: "Office Bearer",
    title: "Associate Professor",
    institution: "School of Minerals, Metallurgical & Materials Engineering, IIT Bhubaneswar",
    email: "archana@iitbbs.ac.in",
    location: "IIT Bhubaneswar Campus",
    bio: "Electrodeposition, electrochemistry, and functional surface engineering. Coordinates women in metallurgy initiatives and student chapter colloquia.",
    tags: ["Electrochemistry", "Corrosion Science", "Surface Coating"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  }
];

export const symposiumData = {
  edition: "18th National Symposium",
  title: "Advanced High Strength Steels & Decarbonized Metallurgy",
  theme: "Sustainable Mineral Beneficiation, Green Hydrogen Ironmaking & Advanced Materials for Energy Transition",
  dates: "March 28–29, 2026",
  mode: "Hybrid (Physical at CSIR-IMMT Auditorium & Virtual)",
  venue: "SS Bhatnagar Auditorium, CSIR – Institute of Minerals & Materials Technology, Acharya Vihar, Bhubaneswar",
  description: "The 18th National Symposium unites India's foremost metallurgists, materials scientists, industry leaders, and research scholars to chart the roadmap for green steelmaking and critical materials security.",
  importantDates: [
    { title: "Call for Extended Abstracts", date: "Jan 15, 2026", status: "Closed" },
    { title: "Abstract Submission Deadline", date: "Feb 28, 2026", status: "Extended" },
    { title: "Acceptance Intimation", date: "Mar 10, 2026", status: "Upcoming" },
    { title: "Early Bird Registration Closes", date: "Mar 18, 2026", status: "Upcoming" },
    { title: "Symposium Inauguration", date: "Mar 28, 2026", status: "Event Day" }
  ],
  tracks: [
    { name: "Track 1: Green Steel & Hydrogen Metallurgy", topics: ["H2-Direct Reduction", "Electric Arc Furnace optimization", "CCUS in steel"] },
    { name: "Track 2: Advanced High Strength Steels (AHSS)", topics: ["3rd Gen AHSS", "Crashworthiness & formability", "Microstructural characterization"] },
    { name: "Track 3: Critical & Rare Minerals", topics: ["Lithium, Nickel & Cobalt recovery", "Red mud valorization", "Urban mining"] },
    { name: "Track 4: Sustainable Mineral Processing", topics: ["Low-grade iron ore beneficiation", "Flotation & agglomeration", "Zero-liquid discharge"] }
  ],
  pricing: [
    { tier: "IIM Members", fee: "₹ 3,500", desc: "Access to all technical sessions, conference kit, banquet dinner" },
    { tier: "Non-Members", fee: "₹ 5,000", desc: "Full symposium access, monograph kit, meals & networking" },
    { tier: "Student Delegates", fee: "₹ 1,500", desc: "Valid student ID required, access to student competition & sessions" },
    { tier: "Corporate / Industry", fee: "₹ 10,000", desc: "Includes 2 delegates, exhibition booth discount & branding" }
  ]
};

export const studentChaptersData = [
  {
    institution: "IIT Bhubaneswar Student Chapter",
    estd: "2013",
    advisor: "Prof. S. N. Pattnaik",
    location: "Argul, Jatni, Odisha",
    members: "140+ Students",
    highlights: ["Annual Materials Conclave (MatX)", "Industrial Visits to Jindal Stainless & NALCO", "Technical Quizzes & Seminars"],
    badge: "Active Chapter"
  },
  {
    institution: "NIT Rourkela Student Chapter",
    estd: "2008",
    advisor: "Dr. Debasis Chaira",
    location: "Rourkela, Sundargarh, Odisha",
    members: "210+ Students",
    highlights: ["Metallurgy Olympiad", "Hands-on Sintering Workshop", "Alumni Mentorship Series"],
    badge: "Premier Chapter"
  },
  {
    institution: "VSSUT Burla Student Chapter",
    estd: "2016",
    advisor: "Dr. B. K. Mishra",
    location: "Burla, Sambalpur, Odisha",
    members: "95+ Students",
    highlights: ["Foundry Technology Demonstrations", "National Science Day Colloquium"],
    badge: "Active Chapter"
  },
  {
    institution: "OUTR Bhubaneswar Student Chapter",
    estd: "2019",
    advisor: "Dr. R. K. Mohapatra",
    location: "Ghatikia, Bhubaneswar, Odisha",
    members: "80+ Students",
    highlights: ["Additive Manufacturing Hands-on", "Paper Presentation Contest"],
    badge: "Growing Chapter"
  }
];

export const newsList = [
  {
    id: "news-1",
    title: "18th National Symposium Call for Papers: Abstract Submission Extended",
    date: "Feb 22, 2026",
    category: "Symposium",
    summary: "Due to overwhelming requests from research institutes and industry, the abstract submission deadline for the 18th National Symposium has been extended to Feb 28, 2026.",
    author: "Symposium Secretariat",
    featured: true
  },
  {
    id: "news-2",
    title: "IIM Bhubaneswar Chapter Awarded Best Chapter Citation by Kolkata Head Office",
    date: "Jan 18, 2026",
    category: "Achievement",
    summary: "At the National Council Meeting in Kolkata, Bhubaneswar Chapter was conferred the citation for exemplary technical programming and student chapter mentoring in 2025.",
    author: "Chapter Council",
    featured: true
  },
  {
    id: "news-3",
    title: "National Metallurgists Day & Endowment Lecture Announced",
    date: "Dec 14, 2025",
    category: "Lecture",
    summary: "Dr. B. K. Satpathy Endowment Lecture on 'Decarbonized Mineral Processing in Eastern India' scheduled at CSIR-IMMT Auditorium.",
    author: "Honorary Secretary",
    featured: false
  },
  {
    id: "news-4",
    title: "Call for New Life Memberships (2026 Cycle)",
    date: "Nov 28, 2025",
    category: "Membership",
    summary: "Applications are invited for Life Membership and Corporate Benefactor enrollment. Enjoy lifetime journal access, voting rights, and discounted conference registrations.",
    author: "Membership Desk",
    featured: false
  }
];

export const galleryItems = [
  {
    id: 1,
    title: "Delegates at 17th Annual Technical Conference",
    category: "Symposium",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    desc: "Plenary session on Hydrogen direct reduction technologies."
  },
  {
    id: 2,
    title: "Advanced Materials Electron Microscopy Session",
    category: "Lectures",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800",
    desc: "Hands-on demonstration at CSIR-IMMT Central Characterization Facility."
  },
  {
    id: 3,
    title: "Executive Council Meeting & Annual General Body",
    category: "Ceremonies",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    desc: "Ratification of chapter programs and financial audits."
  },
  {
    id: 4,
    title: "Industrial Visit to Tata Steel Blast Furnace",
    category: "Field Visits",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
    desc: "Student members and faculty observing modern blast furnace tapping."
  },
  {
    id: 5,
    title: "Student Metallurgy Quiz & Awards Presentation",
    category: "Ceremonies",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    desc: "Winners of inter-college materials science challenge awarded medals."
  },
  {
    id: 6,
    title: "High Strength Steel Tensile Testing Demonstration",
    category: "Lectures",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    desc: "Mechanical property evaluation of prototype automotive steels."
  }
];

export const membersList = [
  { id: "LM-001", name: "Dr. Alok R. Mohanty", category: "Life Member", org: "CSIR-IMMT", city: "Bhubaneswar" },
  { id: "LM-002", name: "Prof. S. N. Pattnaik", category: "Life Member", org: "IIT Bhubaneswar", city: "Bhubaneswar" },
  { id: "LM-003", name: "Dr. Debasis Chaira", category: "Life Member", org: "NIT Rourkela", city: "Rourkela" },
  { id: "LM-004", name: "Dr. Saroj K. Singh", category: "Life Member", org: "CSIR-IMMT", city: "Bhubaneswar" },
  { id: "LM-005", name: "Er. Bimal K. Sahoo", category: "Life Member", org: "Tata Steel Meramandali", city: "Dhenkanal" },
  { id: "LM-006", name: "Dr. Archana Mallik", category: "Life Member", org: "IIT Bhubaneswar", city: "Bhubaneswar" },
  { id: "LM-007", name: "Dr. L. D. Besra", category: "Life Member", org: "CSIR-IMMT", city: "Bhubaneswar" },
  { id: "LM-008", name: "Dr. Bankim Chandra Tripathy", category: "Life Member", org: "CSIR-IMMT", city: "Bhubaneswar" },
  { id: "LM-009", name: "Prof. Subhasisa Rath", category: "Life Member", org: "VSSUT Burla", city: "Sambalpur" },
  { id: "LM-010", name: "Dr. Santosh Kumar Sahoo", category: "Life Member", org: "IIT Bhubaneswar", city: "Bhubaneswar" },
  { id: "CM-101", name: "Tata Steel Meramandali", category: "Corporate Member", org: "Tata Steel Ltd", city: "Dhenkanal" },
  { id: "CM-102", name: "Jindal Stainless Ltd", category: "Corporate Member", org: "JSL Jajpur", city: "Jajpur" },
  { id: "CM-103", name: "National Aluminium Company (NALCO)", category: "Corporate Member", org: "NALCO", city: "Bhubaneswar" },
  { id: "SM-201", name: "Priyadarshi Mohapatra", category: "Student Member", org: "IIT Bhubaneswar", city: "Bhubaneswar" },
  { id: "SM-202", name: "Ananya Routray", category: "Student Member", org: "NIT Rourkela", city: "Rourkela" },
  { id: "SM-203", name: "Subham Kumar Jena", category: "Student Member", org: "VSSUT Burla", city: "Sambalpur" }
];
