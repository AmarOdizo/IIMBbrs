# IIM Bhubaneswar Chapter - Backend Architecture (MongoDB + Next.js)

Complete enterprise backend architecture with **MongoDB (Mongoose)**, **Controllers**, **Middleware**, **Authentication (JWT & Bcrypt)**, and **Next.js App Router API Routes**.

---

## 📁 Architecture Directory Structure

```
backend/
├── db.ts                          # Cached MongoDB Connection
├── seed.ts                        # Database Seeder (Seeds Admin, Members, Committee, etc.)
├── utils/
│   ├── auth.ts                    # JWT Token generation, verification & password hashing
│   └── apiResponse.ts             # Standardized API response helpers (success, error)
├── middleware/
│   └── authMiddleware.ts          # Admin authentication check for Next.js API requests
├── controllers/                   # Pure business logic and CRUD handlers
│   ├── authController.ts          # Admin login, registration, session profile
│   ├── adminController.ts         # Secretariat KPI metrics, stats & audit logs
│   ├── memberController.ts        # Member directory CRUD & search filtering
│   ├── membershipApplicationController.ts # Scrutiny queue, status updates & auto-enroll
│   ├── committeeController.ts     # Executive Council leadership CRUD
│   ├── symposiumController.ts     # AHSS-2026 delegate bookings & paper peer reviews
│   ├── eventController.ts         # Memorial lectures, seminars & workshops
│   ├── newsController.ts          # Gazette circulars & bulletins
│   ├── contactController.ts       # Public transmission inquiries & docket IDs
│   ├── galleryController.ts       # Photo gallery & media CRUD
│   └── studentChapterController.ts# Collegiate student chapters across Odisha
└── models/                        # 12 Mongoose Models
    ├── Admin.ts
    ├── Member.ts
    ├── MembershipApplication.ts
    ├── CommitteeMember.ts
    ├── SymposiumRegistration.ts
    ├── PaperSubmission.ts
    ├── Event.ts
    ├── NewsCircular.ts
    ├── ContactInquiry.ts
    ├── GalleryItem.ts
    ├── StudentChapter.ts
    ├── AuditLog.ts
    └── index.ts
```

---

## 🌐 Complete API Endpoints Map (`/api/...`)

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/login` | Admin login with email & password (returns JWT) | Public |
| `POST` | `/api/auth/register` | Register new secretariat officer / admin | Public / Admin |
| `GET` | `/api/auth/me` | Fetch currently authenticated admin profile | Protected (JWT) |

### 2. Members Directory (`/api/members`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/members?category=...&search=...` | List members with category & search filter | Public |
| `POST` | `/api/members` | Enroll new member into roster | Protected (Admin) |
| `GET` | `/api/members/:id` | Get member by ID | Public |
| `PUT` | `/api/members/:id` | Update member record | Protected (Admin) |
| `DELETE` | `/api/members/:id` | Delete member record | Protected (Admin) |

### 3. Membership Applications & Scrutiny (`/api/membership-applications`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/membership-applications` | Submit new application or chapter transfer | Public |
| `GET` | `/api/membership-applications?status=...` | List pending applications in scrutiny queue | Protected (Admin) |
| `PUT` | `/api/membership-applications/:id` | Update status (Approve, Seal, Flag, Auto-Enroll) | Protected (Admin) |

### 4. Executive Committee (`/api/committee`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/committee?category=...` | List officers (Apex, Office Bearers, Advisory) | Public |
| `POST` | `/api/committee` | Add executive committee member | Protected (Admin) |
| `PUT` | `/api/committee/:id` | Update committee member profile | Protected (Admin) |
| `DELETE` | `/api/committee/:id` | Remove committee member | Protected (Admin) |

### 5. Symposium & Conferences (`/api/symposium`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/symposium/registrations` | Register delegate & generate ticket QR pass | Public |
| `GET` | `/api/symposium/registrations` | List registered delegates | Protected (Admin) |
| `POST` | `/api/symposium/papers` | Submit research paper/abstract to one of 4 tracks | Public |
| `GET` | `/api/symposium/papers?track=...` | List submitted papers for peer review | Protected (Admin) |
| `PUT` | `/api/symposium/papers/:id` | Update paper review status (Accepted/Rejected) | Protected (Admin) |

### 6. Events & Programmes (`/api/events`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/events?status=Upcoming&featured=true` | List upcoming or featured events | Public |
| `POST` | `/api/events` | Create new seminar, workshop or lecture | Protected (Admin) |
| `GET` | `/api/events/:id` | Get event details | Public |
| `PUT` | `/api/events/:id` | Update event | Protected (Admin) |
| `DELETE` | `/api/events/:id` | Delete event | Protected (Admin) |

### 7. Gazette Circulars & News (`/api/news`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/news?category=...&search=...` | List gazetted circulars & articles | Public |
| `POST` | `/api/news` | Publish gazette circular / technical bulletin | Protected (Admin) |
| `GET` | `/api/news/:id` | Get single circular (auto-increments views) | Public |
| `PUT` | `/api/news/:id` | Update circular | Protected (Admin) |
| `DELETE` | `/api/news/:id` | Delete circular | Protected (Admin) |

### 8. Contact & Dispatch Enquiries (`/api/contact`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/contact` | Submit inquiry (auto-generates Docket ID) | Public |
| `GET` | `/api/contact?category=...&status=...` | List inquiries for secretariat review | Protected (Admin) |
| `PUT` | `/api/contact/:id` | Update inquiry status & reply notes | Protected (Admin) |
| `DELETE` | `/api/contact/:id` | Delete inquiry | Protected (Admin) |

### 9. Photo Gallery (`/api/gallery`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/gallery?category=...` | List photos by category | Public |
| `POST` | `/api/gallery` | Add photo item | Protected (Admin) |
| `PUT` | `/api/gallery/:id` | Update photo details | Protected (Admin) |
| `DELETE` | `/api/gallery/:id` | Delete photo | Protected (Admin) |

### 10. Student Chapters (`/api/student-chapters`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/student-chapters` | List collegiate chapters (IIT BBS, NIT RKL, etc.) | Public |
| `POST` | `/api/student-chapters` | Add new student chapter | Protected (Admin) |
| `PUT` | `/api/student-chapters/:id` | Update chapter | Protected (Admin) |
| `DELETE` | `/api/student-chapters/:id` | Delete chapter | Protected (Admin) |

### 11. Secretariat Dashboard Metrics & Audit (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Live KPI stats (Cadre count, Scrutiny queue, etc.) | Protected (Admin) |
| `GET` | `/api/admin/audit-logs` | Official council audit trail of all actions | Protected (Admin) |

### 12. Instant Database Seeder (`/api/seed`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/seed` | One-click seed database with initial records & admin | Public / Dev |

---

## 🔒 Protected Route Authorization

For protected routes, pass the JWT token in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

Or as a cookie named `admin_token`.

---

## 🔑 Default Super Admin Credentials

| Field | Value |
|---|---|
| **Email** | `admin@iimbhubaneswar.in` |
| **Password** | `Admin@123` |
| **Designation** | `Hony. Jt. Secretary & Data Steward` |
| **Role** | `super_admin` |

---

## 🚀 Helpful NPM Scripts

```bash
# 1. Run Next.js Development Server
npm run dev

# 2. Seed All 12 Collections into MongoDB
npm run seed

# 3. Run Automated Backend Integration Test (Tests all 12 models + Auth)
npm run test:backend
```

