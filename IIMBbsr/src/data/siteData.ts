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
  { label: 'Awards', href: '/awards' },
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
  social: {
    facebook: "https://www.facebook.com/TheIndianInstituteofMetals",
    twitter: "https://twitter.com/IIM_HeadOffice",
    instagram: "https://www.instagram.com/indianinstituteofmetals",
    youtube: "https://www.youtube.com/@theindianinstituteofmetals4921",
    linkedin: "https://www.linkedin.com/company/the-indian-institute-of-metals/",
  },
  stats: [
    { label: "Active Members", value: "750+" },
    { label: "Charter Life Members", value: "238+" },
    { label: "Partner Institutions", value: "30+" },
    { label: "Student Chapters", value: "4" },
    { label: "National Symposia", value: "18" }
  ],
  foundation: {
    year: 1976,
    charterYear: 1978,
    founderChairman: "Prof. P. K. Jena (Director, RRL / CSIR-IMMT - 12 consecutive years)",
    inauguralCohorts: "25-30 Scientists & Engineers inducted from RRL Bhubaneswar",
    foundingCorporatePartners: [
      "Industrial Development Corporation of Odisha (IDCOL)",
      "Ferro Alloys Corporation (FACOR)",
      "Indian Metals & Ferro Alloys (IMFA)",
      "Industrial Promotion and Investment Corporation of Odisha (IPICOL)",
      "National Aluminium Company (NALCO)"
    ]
  }
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
    name: "Dr. Bankim Chandra Tripathy",
    role: "Chairman",
    category: "Apex",
    title: "Scientist-G",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "bctripathy@immt.res.in",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: "/assets/images/chairman_dr_b_c_tripathy.png"
  },
  {
    name: "Dr. Bimal Prasad Singh",
    role: "Vice-Chairman",
    category: "Apex",
    title: "Ex Scientist-G",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Chaturmukha Pattnaik",
    role: "Vice-Chairman",
    category: "Apex",
    title: "Executive Vice-Chairman",
    institution: "IIM Bhubaneswar Chapter",
    email: "",
    location: "Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Sisir Mantry",
    role: "Secretary",
    category: "Apex",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "secretary@iimbhubaneswar.in",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: "/assets/images/secretary_dr_sisir_mantry.png"
  },
  {
    name: "Dr. Deepak Nayak",
    role: "Joint Secretary",
    category: "Office Bearer",
    title: "Scientist-E",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Ajit Panigrahi",
    role: "Joint Secretary",
    category: "Office Bearer",
    title: "Scientist-E",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Manoj Kumar",
    role: "Joint Secretary",
    category: "Office Bearer",
    title: "Scientist-D",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. K. J. Sankaran",
    role: "Treasurer",
    category: "Office Bearer",
    title: "Scientist-E",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "treasurer@iimbhubaneswar.in",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Benadict Rakesh",
    role: "Joint Treasurer",
    category: "Office Bearer",
    title: "Scientist-D",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. S. Anwar",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Shri S N Das",
    role: "EC Member",
    category: "Executive Member",
    title: "Executive",
    institution: "NALCO",
    email: "",
    location: "NALCO",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. S. K. Singh",
    role: "EC Member",
    category: "Executive Member",
    title: "Ex Scientist-G",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Anil Chaubey",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-G",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Pradyut Sengupta",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-E",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Shri Debidutta Debasish",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Bhima Rao",
    role: "EC Member",
    category: "Executive Member",
    title: "Ex Scientist-G",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Prof. Animesh Mandal",
    role: "EC Member",
    category: "Executive Member",
    title: "Professor",
    institution: "IIT Bhubaneswar",
    email: "",
    location: "IIT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Silani Sahoo",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Priyanka Rajput",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. J. N. Rath",
    role: "EC Member",
    category: "Executive Member",
    title: "Council Member",
    institution: "IIM Bhubaneswar Chapter",
    email: "",
    location: "Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Barsha Dash",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. P. R. Choudhury",
    role: "EC Member",
    category: "Executive Member",
    title: "Executive",
    institution: "NALCO",
    email: "",
    location: "NALCO",
    bio: "",
    tags: [],
    image: ""
  },
  {
    name: "Dr. Shivakumar Angadi",
    role: "EC Member",
    category: "Executive Member",
    title: "Scientist-F",
    institution: "CSIR-IMMT Bhubaneswar",
    email: "",
    location: "CSIR-IMMT Bhubaneswar",
    bio: "",
    tags: [],
    image: ""
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
  },
  {
    id: 7,
    title: "National Science Day Assembly at CSIR-IMMT",
    category: "Lectures",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    desc: "Distinguished address by DCP Sagarika Nath, IPS addressing the gathering of metallurgists and researchers."
  },
  {
    id: 8,
    title: "Annual General Body Meeting & Chapter Research Award",
    category: "Ceremonies",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    desc: "Conferment of the IIM Bhubaneswar Chapter Award to Dr. Sisir Mantry in recognition of outstanding materials science contributions."
  },
  {
    id: 9,
    title: "Prof. Brahm Prakash Memorial Materials Quiz (BPMMQ)",
    category: "Ceremonies",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    desc: "Inter-collegiate metallurgical competition with enthusiastic student chapters participating from across Odisha."
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
