# 🚀 Phase 1: MVP Core (Goal: Uploads working, admin UI working)

## ✅ Auth & User System
- [x] Auth setup (Clerk, Auth.js, or custom)
- [x] Create user on signup (store in DB)

## ✅ Project Management
- [x] Users can create/delete Projects
- [ ] Each Project gets:
  - [x] A unique ID
  - [X] Secret API key
  - [ ] Upload config (file types, max size, etc.)

## ✅ Upload API
- [x] `POST /api/upload-url` (via tRPC or REST)
  - [x] Validates project + file
  - [x] Generates pre-signed S3 URL
  - [x] Returns URL + key
- [ ] `POST /api/upload-complete`
  - [ ] Saves file metadata to DB
  - [ ] Associates upload with project

## ✅ S3 Setup
- [ ] S3 bucket (or R2/Supabase)
- [ ] CORS config
- [ ] `@aws-sdk/s3` set up for signed URLs

## ✅ Admin Dashboard (Next.js + tRPC)
- [ ] Project list + create UI
- [ ] Project detail page
  - [ ] View API keys
  - [ ] Regenerate keys
  - [ ] Configure upload settings
- [ ] Upload logs (list of uploaded files)

## ✅ Client SDK / Dev Integration
- [ ] Simple `UploadButton` component
- [ ] Docs for how to use the API
- [ ] Example with cURL / fetch / Next.js frontend

---

# ✨ Phase 2: UX + Polishing

## ✅ Dashboard Features
- [ ] Drag-n-drop file uploader (test uploads)
- [ ] Preview uploaded images
- [ ] Search / filter uploads

## ✅ Security / Permissions
- [ ] Rate limiting per project
- [ ] API key verification middleware
- [ ] Optional upload expiration / delete after X days

## ✅ Webhooks (Optional)
- [ ] Projects can define webhook URLs
- [ ] Send POST after upload complete

## ✅ Email Notifications (Optional)
- [ ] Email on failed uploads, daily upload summary, etc.

---

# 💸 Phase 3: SaaS Features

## ✅ Billing + Plans
- [ ] Stripe integration (Free, Pro, etc.)
- [ ] Usage-based limits (monthly uploads, file size cap)
- [ ] Project limits per plan

## ✅ Multi-Storage Support (Advanced)
- [ ] Allow custom S3 buckets per project
- [ ] Support R2, Backblaze, Supabase, etc.

## ✅ Background Jobs
- [ ] Virus scanning
- [ ] Image resizing / thumbnails
- [ ] Async webhook retries

---

# 🧪 Phase 4: Launch Readiness
- [ ] Docs site (with usage examples, SDK reference)
- [ ] CLI tool? (Optional)
- [ ] GitHub project repo
- [ ] Landing page (marketing site)
- [ ] Logging & monitoring (e.g. Sentry, Logtail)
