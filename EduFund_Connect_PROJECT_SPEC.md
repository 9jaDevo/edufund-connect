
# EduFund Connect — Project Specification (MVP–50K User Ready)

**Tagline:** *Empowering Transparent Sponsorship for Students & Community Projects*  
**Core MVP Goal:** Enable verified sponsorships with full fund traceability and Monitoring Agent oversight.

---

## 1. Product Scope

### 1.1 MVP In-Scope
- Role onboarding: **Student, Donor, NGO, Monitoring Agent (MA), School, Admin**  
- KYC/KYB: Hybrid — manual upload + **SmileID** or **Stripe Identity**
- Funding workflow: **Donor → Escrow → School/Project**  
- Milestone-based disbursement (auto/manual switchable)  
- Monitoring (geo-matched MAs, pre/mid/final reports, public ratings)
- Transparency dashboards for each project (public view)
- Payments via **Paystack**, **Flutterwave**, **Stripe**
- File handling via **Cloudinary**
- Notifications: **Email + SMS + Push**
- Platform charge: % transaction fee (like GoFundMe)

### 1.2 Phase 2+ Features
- **Gramify:** Social visibility and campaign sharing  
- **Subscription model:** Schools/NGOs pay to be verified/listed  
- **Advanced donor CRM:** Pledges, leaderboards, impact maps  
- **Institutional integrations:** MIS & payment reconciliation APIs  

---

## 2. User Roles & Permissions

| Role | Core Actions |
|------|---------------|
| **Student** | Register, verify KYC, request sponsorship, track progress |
| **Donor** | KYC, browse projects, fund (full/partial), select MA, rate NGOs/MAs |
| **NGO** | Verify students, create proposals, manage disbursed funds, upload reports |
| **Monitoring Agent (MA)** | KYC, accept assignments, submit reports (pre/mid/final), earn milestone fees |
| **School** | Verify registration, confirm tuition receipt, upload progress |
| **Admin** | Verify KYC, approve projects, control disbursement, manage disputes, adjust fees |

> No hierarchy within roles in MVP (e.g., NGO Manager vs. Field Officer).

---

## 3. Architecture Overview

### 3.1 Core Stack
| Layer | Tech | Notes |
|-------|------|-------|
| Frontend | **Next.js (React + TypeScript)** | Static + server-rendered hybrid (Vercel or Netlify) |
| Backend | **Node.js (Fastify)** | Hosted on **Railway**, microservice pattern |
| Database | **Supabase (Postgres)** | Row-level security (RLS) + connection pooling |
| Storage | **Cloudinary** | Signed uploads, CDN delivery |
| Cache/Queue | **Upstash Redis** | Serverless Redis for caching + task queues |
| Notifications | **Resend (Email)**, **Termii (SMS)**, **Web Push (VAPID)** | Transactional alerts + engagement |
| Payments | **Paystack**, **Flutterwave**, **Stripe** | Multi-gateway fallback |
| Monitoring | **Sentry**, **Better Stack** | Logs, alerts, uptime, error tracing |

---

## 4. Hosting & Deployment Plan

| Service | Platform | Scaling Strategy |
|----------|-----------|-----------------|
| **Frontend (Next.js)** | Vercel or Netlify | ISR, CDN caching, global edge distribution |
| **Backend (Node/Fastify)** | Railway | 1–2 services (1–2 GB RAM) with auto-scaling |
| **Database (Supabase)** | Managed Postgres | Connection pooling, RLS, read replicas |
| **Cache/Queue** | Upstash Redis | Pay-per-use, scalable serverless |
| **Storage** | Cloudinary | Global CDN, auto compression & transform |
| **DNS/CDN** | Cloudflare | Optional, for caching & WAF protection |

💡 **Expected cost (MVP 0–50K users):** ≈ $30–$80 per month.

---

## 5. Data Model Overview

### Core Entities
- **User:** `id, role, email, phone, kyc_status, rating_avg, geo_location, verified_at`
- **Organization:** `id, type(NGO|School), name, docs[], status`
- **Project:** `id, owner_id, title, category, budget, escrow_policy, disbursement_mode`
- **Milestone:** `id, project_id, title, amount, order, status`
- **Contribution:** `id, donor_id, project_id, amount, gateway_ref, fee, status`
- **EscrowTransaction:** `id, contribution_id, project_id, held_amount, released_amount`
- **Disbursement:** `id, milestone_id, amount, status, beneficiary_type`
- **MonitoringAssignment:** `id, project_id, ma_id, mode(auto|donor|admin), proximity_km`
- **MonitoringReport:** `id, assignment_id, type(pre|mid|final), media[], geotag`
- **Rating:** `id, rater_id, target_type(NGO|MA), score, comment`
- **AuditLog / Dispute:** for compliance and traceability

---

## 6. Workflow Summary

### Student
1. Register → verify via KYC  
2. Request sponsorship → visible to NGOs/Donors  
3. Get assigned to school → tuition paid to school (not student)  
4. Track academic progress via MA reports  

### Donor
1. Register → complete KYC  
2. Browse verified students/NGOs → select project  
3. Choose MA (geo-matched or admin-delegated)  
4. Fund project → payment → **EscrowTransaction (HELD)**  
5. Funds released by milestone after MA reports  

### NGO
- Add verified student profiles, create community proposals, manage disbursed funds, report progress.

### Monitoring Agent (MA)
- Receives assignments → performs pre/mid/final verifications → uploads photos/reports → receives 3 milestone-based fees → rated publicly.

### School
- Verifies sponsorships, confirms tuition receipt, provides academic updates.

---

## 7. Disbursement Logic

| Batch | Trigger | Description |
|--------|----------|-------------|
| **1** | Pre-funding verification | MA confirms beneficiary/project validity |
| **2** | Midway monitoring | MA verifies fund utilization |
| **3** | Completion | MA confirms delivery (e.g., year complete, borehole functional) |

Disbursement = Auto by default; Admin can toggle to Manual.

---

## 8. KYC & Compliance

- **Providers:** SmileID (Africa), Stripe Identity (global)  
- **Mode:** Hybrid — manual upload fallback  
- **PII Security:** Encryption at rest (Postgres), TLS in transit  
- **Retention:** 5 years minimum for financial records  
- **Audit Trail:** Immutable logs for every disbursement/approval  
- **Regional compliance:** Start Nigeria (NGN); follow NDPR + GDPR Lite  

---

## 9. Payments & Fees

- **Gateways:** Paystack, Flutterwave, Stripe  
- **Escrow:** EduFund internal wallet ledger  
- **Platform Fee:** % + fixed per contribution (GoFundMe-style)  
- **Currency:** NGN → expand to USD later  
- **Receipts:** PDF + email confirmations  
- **Webhooks:** `POST /webhooks/payments/{gateway}` + signature validation  

---

## 10. Performance & Reliability Targets

| Metric | Target |
|---------|--------|
| API read p95 | < 250 ms |
| API write p95 | < 450 ms |
| Uptime | 99.9 % |
| Backup RPO | ≤ 24 h |
| DB read replica lag | ≤ 2 s |

---

## 11. Security & Access Control

- JWT-based auth, HTTP-only cookies  
- Row-level access via RLS policies  
- Signed Cloudinary uploads, MIME + size validation  
- Rate limiting via Redis  
- Webhook signature verification  
- Audit logging for every KYC, payment, and report action  

---

## 12. API Endpoints (v1)

**Auth & Users:** `/auth/register, /auth/login, /kyc/submit, /me`  
**Projects:** `/projects, /projects/:id, /projects/:id/milestones`  
**Contributions:** `/projects/:id/contributions, /webhooks/payments/:gateway`  
**Monitoring:** `/projects/:id/assign-ma, /assignments/:id/reports`  
**Ratings:** `/ratings, /ratings/:target_id`  
**Admin:** `/admin/approvals, /admin/disbursements/:id, /admin/config`

All paginated; rate-limited per role.

---

## 13. Notifications

| Channel | Provider | Trigger |
|----------|-----------|----------|
| Email | Resend/SMTP | KYC result, donation received, disbursement released |
| SMS | Termii/Twilio | Important milestone updates |
| Push | Web Push | Project status, report uploads |

---

## 14. Analytics & KPIs

- User activation rate (% completing KYC)  
- Projects funded / time to first fund  
- Average donation size  
- MA report compliance %  
- NGO credibility index  
- Dispute rate (%)  
- Uptime, error rate (Sentry metrics)

---

## 15. DevOps & Environments

| Env | Purpose | Notes |
|-----|----------|-------|
| **Dev** | Local Docker | .env.dev + mocks |
| **Staging** | Pre-production | Auto-deploy via GitHub Actions |
| **Prod** | Live | Railway backend + Vercel frontend + Supabase main DB |

- CI/CD: GitHub Actions → test → build → deploy  
- Logs: Sentry + Better Stack  
- Backups: Supabase daily snapshot  
- Secrets: Managed via Railway/Vercel secrets manager  

---

## 16. Feature Toggles (Configurable)

```json
{
  "payments.enabled_gateways": ["paystack", "flutterwave", "stripe"],
  "disbursement.mode": "auto",
  "monitoring.assignment": "geo_suggest_then_donor_confirm",
  "ratings.visibility": "donor_public",
  "fees.platform": { "pct": 5, "fixed": 200, "donor_can_cover": true }
}
```

---

## 17. Roadmap & Scaling Plan

### Phase 1 (MVP — 0–5K Users)
- Deploy base platform  
- Integrate one gateway (Paystack)  
- Enable KYC (manual + SmileID)  
- Simple MA monitoring flow  

### Phase 2 (Growth — 5K–50K Users)
- Add Stripe/Flutterwave fallback  
- Introduce Redis caching  
- Add Supabase read replica  
- Cloudflare CDN layer  

### Phase 3 (Enterprise — 50K+)
- Separate read/write APIs  
- Introduce Kubernetes cluster  
- Dedicated S3 alternative + CDN caching  
- Multi-region Supabase scaling  

---

## 18. Acceptance Criteria (MVP)

- A donor can fund a verified project, and see “Escrowed” status immediately.  
- MAs submit milestone reports with photos; donor notified.  
- Public dashboard shows verified funding breakdown.  
- Admin can toggle disbursement mode (auto/manual).  
- Project reports show MA rating and timeline.

---

## 19. Brand & UI Guidelines

- Palette: Royal Blue #1E40AF, Mint #D1FAE5, Neutral #F3F4F6  
- Typography: Poppins (headings), Inter (body)  
- Layout: Transparency-first → emphasize progress, receipts, and MA verification  
- Design Pattern: Clean cards, visible audit trail, “Escrowed / Released” badges  

---

## 20. Environment Variables (Example)

```bash
APP_URL=
NODE_ENV=production
JWT_SECRET=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYSTACK_SECRET=
FLUTTERWAVE_SECRET=
STRIPE_SECRET=

RESEND_API_KEY=
TERMII_API_KEY=
UPSTASH_REDIS_URL=
SENTRY_DSN=
```

---

### ✅ Recommended Architecture Summary

| Layer | Tool | Region |
|-------|------|---------|
| Frontend | **Next.js on Vercel** | Global (edge) |
| Backend | **Node/Fastify on Railway** | Europe/US East |
| Database | **Supabase Postgres** | Nearest to backend |
| Cache | **Upstash Redis** | Same region |
| Storage | **Cloudinary** | Global CDN |
| Monitoring | **Sentry + Better Stack** | Cloud |
