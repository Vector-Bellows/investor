// README.md
# Vector Bellows: 18GW Subterranean Infrastructure Network

## Overview

**Vector Bellows** is a distributed infrastructure utility deploying an **18,000-node hardened subterranean data grid** (18 gigawatts total capacity). The platform combines monolithic 3D-printed geopolymer construction, closed-loop geothermal cooling, and institutional-grade investment governance.

- **Total Capacity:** 18GW (18,000 × 1.0 MW nodes)
- **Primary Site:** Owosso, Michigan
- **Construction Method:** Monolithic 3D Additive Printing (3DCP)
- **Thermal Management:** Zero-water geothermal cooling
- **Hardening:** EMP + Solar Flare resilient (20ft earth shield)

---

## Architecture

### **The Iceberg Model**
The platform visualizes the contrast between surface operations and subterranean infrastructure:

1. **Surface (Ghost Office):** Low-profile staging building with BIPV photovoltaic skin
2. **The Shaft:** 20ft vertical 3D-printed geopolymer drop featuring:
   - Integrated spiral staircase (printed into walls)
   - Central Vertical Reciprocating Conveyor (VRC) lift
3. **The Hull:** Octagonal monolithic geopolymer vault housing the core grid infrastructure

### **10-Phase Strategic Rollout**
- **Phase 1 (Genesis):** Owosso Primary Hub — 1.8GW ✓ COMPLETE
- **Phase 2:** Great Lakes Cluster — 1.8GW (In Progress)
- **Phase 3:** Open Enrollment & Refinement — 1.8GW (Current - Spring Push)
- **Phases 4-10:** Continental expansion → 18GW saturation by Q4 2030

---

## Investment Structure

### **Equity Split**
- **60% Sovereign Block:** Held by A.V. Strategic Asset Trust (Internal - Not Exposed)
- **40% External Pool:** Distributed across investment classes

### **Investment Classes**

#### **Blue Chip Class**
- **Minimum:** $1M+
- **Equity Allocation:** 15% of external pool
- **Access Level:** Full technical roadmap + 18GW deployment visibility
- **Compliance:** SEC 506(c) Accredited Investor
- **Phases:** 1-10

#### **Partner Class**
- **Minimum:** $100K+
- **Equity Allocation:** 20% of external pool
- **Access Level:** Phase-specific roadmap + node expansion rights
- **Compliance:** SEC 506(c) Accredited Investor
- **Phases:** 3-10

#### **Common Class**
- **Minimum:** $1K+ (Fractional)
- **Equity Allocation:** 5% of external pool
- **Access Level:** High-level ROI & efficiency metrics
- **Compliance:** General onboarding
- **Phases:** 8-10

---

## Technology Stack

### **Backend**
- **Runtime:** Node.js (Fastify)
- **Database:** PostgreSQL
- **API:** RESTful + Secured endpoints
- **Controller Logic:** Drake AI (Automated capital calls, equity waterfall, compliance auditing)

### **Frontend**
- **Framework:** React 18+
- **Animation:** GSAP + ScrollTrigger
- **UI Pattern:** Glass-morphism (Glassmorphism design system)
- **Styling:** CSS-in-JS (Inline + Tailwind support)

### **Infrastructure**
- **Deployment:** Vercel (Edge + Serverless)
- **Database Hosting:** AWS RDS PostgreSQL
- **CI/CD:** GitHub Actions

---

## Repository Structure

```
Vector-Bellows/investor/
├── .github/
│   └── copilot-instructions.md    # AI governance manifest
├── src/
│   ├── backend/
│   │   ├── schema.js               # Partner tier + 10-phase roadmap definitions
│   │   ├── controllers/
│   │   │   └── drake.js            # Sovereign Block filtering + capital call automation
│   │   └── db/
│   │       └── migrations/
│   │           └── 001_partner_tiers.sql
│   └── frontend/
│       └── components/
│           ├── IcebergReveal.jsx   # GSAP scroll-trigger shaft/hull reveal
│           └── InvestmentGate.jsx  # SEC 506(c) accreditation flow
├── docs/
│   ├── specs/                      # Technical 3DCP geopolymer specifications
│   └── governance/                 # Equity & compliance documentation
├── assets/
│   └── brand/                      # Logo (image_f0fb5b.png), UI assets
├── package.json
└── README.md (this file)
```

---

## Key Features

### **Backend Features**

1. **Partner Management**
   - Class-based access control (Blue Chip, Partner, Common)
   - SEC 506(c) accreditation verification
   - Phase-locked enrollment

2. **Capital Call Automation**
   - Triggered at 80% phase deployment
   - Step-up escalation (10% increase per phase)
   - 30-day payment windows

3. **Rebuy Status Logic**
   - Non-payment triggers equity revert to Sovereign Block
   - Partner transitions to "Observer" status (no voting rights)
   - Automatic auditing and compliance tracking

4. **Sovereign Block Filtering**
   - 60% internal equity NEVER exposed in external APIs
   - All public responses filtered through Drake controller
   - Automated compliance audit logging

### **Frontend Features**

1. **Iceberg UI (GSAP Scroll-Reveal)**
   - Surface office fade + 20ft shaft expansion
   - Octagonal hull entrance with telemetry overlay
   - Real-time node/capacity metrics display

2. **Investment Gate (SEC 506(c))**
   - 3-step onboarding flow
   - Glass-morphism UI design
   - Net worth + income verification
   - Class selection with instant eligibility confirmation

3. **Node Telemetry Dashboard**
   - Live 18GW capacity tracking
   - Phase progress visualization
   - Phase-specific roadmap access (class-dependent)

---

## Deployment

### **Development**

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run database migrations
npm run db:migrate

# Run tests
npm run test
```

### **Production**

```bash
# Build frontend
npm run build

# Deploy to Vercel
vercel deploy

# Seed production database
npm run db:seed:prod
```

### **Environment Variables**

```
DATABASE_URL=postgresql://user:pass@host:5432/vectorbellows
DRAKE_CONTROLLER_SECRET=<secret>
SEC_COMPLIANCE_API_KEY=<key>
VERCEL_DEPLOYMENT_URL=https://investor-eight-swart.vercel.app
```

---

## Security & Compliance

### **Data Protection**
- ✓ Sovereign Block (60%) filtered from all external APIs
- ✓ Partner data encrypted at rest
- ✓ Capital call records audited
- ✓ SEC Rule 506(c) compliance verified on enrollment

### **Access Control**
- Class-based access control (RBAC)
- Phase-locked enrollment gates
- Automatic compliance audit logging
- Rebuy Status triggers on capital call default

### **Governance**
- Drake AI controller manages automated operations
- Manual oversight required for partner disputes
- Quarterly equity waterfall reconciliation
- Annual compliance certification

---

## Documentation

- **`docs/specs/`** — Technical 3DCP geopolymer specifications for ICON/LUYTEN RFQs
- **`docs/governance/`** — Equity structure, partner tier documentation, compliance policies
- **`.github/copilot-instructions.md`** — AI development manifest (maintain 18GW context)

---

## Contact & Governance

**Project Lead:** Alan (Vector Bellows)

**Governance:** Managed by Drake AI controller logic with manual oversight for strategic decisions.

**Compliance:** All external participation governed by SEC Rule 506(c) accreditation requirements.

---

## License

Proprietary — Vector Bellows Infrastructure Utility (2026)

---

**"The Ghost in the Grid" — 18,000 Nodes. Invisible. Unhackable. Infinite.**
