# Christ Life API

Express + MongoDB Atlas backend for the Christ Life admin dashboard: real
authentication (Milestone 2) plus a small CMS for events, the Bible Study
schedule, gallery items, testimonials, and site/contact settings
(Milestone 3). Every mutation reuses the same `requireAuth` middleware from
Milestone 2 — there's still exactly one way in (the admin account created
by `create-admin`), no public registration.

## Architecture

```
React dashboard  --(fetch, credentials: include)-->  Express API  --(mongoose)-->  MongoDB Atlas
```

The browser never talks to MongoDB directly. Authentication is a signed,
`httpOnly` cookie holding a JWT — not something readable or forgeable from
frontend JavaScript, and not stored in `localStorage`.

In local development, the frontend's Vite dev server proxies `/api/*` to
this server (see `../vite.config.ts`), so the browser sees everything as
same-origin and no CORS configuration is needed for local dev.

## One-time setup

1. **Create a MongoDB Atlas cluster** (the free tier is enough for this):
   - Sign in at <https://cloud.mongodb.com>, create a project, and create a
     free (M0) cluster.
   - Under **Database Access**, create a database user with a username and
     password (not your Atlas login).
   - Under **Network Access**, add an IP allowlist entry. For local dev,
     "Allow access from anywhere" (`0.0.0.0/0`) is the simplest option; a
     real production deployment should scope this down instead.
   - Under **Database → Connect**, choose "Drivers" and copy the connection
     string — it looks like
     `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/`.

2. **Install dependencies:**

   ```sh
   cd server
   npm install
   ```

3. **Create your local env file:**

   ```sh
   cp .env.example .env
   ```

   Then edit `server/.env` and fill in:
   - `MONGODB_URI` — the connection string from step 1.
   - `JWT_SECRET` — a long random string, e.g.
     `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
   - `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — only needed for the next
     step; the running server never reads these.

   `server/.env` is gitignored — never commit it.

4. **Create the first administrator account:**

   ```sh
   npm run create-admin
   ```

   This is the *only* way an admin account gets created — there is no
   public sign-up page or endpoint. The script is idempotent: running it
   again with the same email does nothing (it won't overwrite a password).
   Once it succeeds, you can remove the `ADMIN_*` lines from `server/.env`.

5. **Run the API:**

   ```sh
   npm run dev
   ```

   It listens on `PORT` (default `4000`) and reconnects nothing special —
   restart it if you change `.env`.

6. **Run the frontend** (in the repo root, a separate terminal):

   ```sh
   npm run dev
   ```

   Visit `http://localhost:8080/login` and sign in with the admin account
   from step 4.

7. **Seed the real Christ Life content** (events, testimonials, the Bible
   Study schedule, contact/settings — the same text/links already on the
   public site):

   ```sh
   npm run seed-content
   ```

   Safe to run anytime: each collection is only seeded while it's
   completely empty, so this never duplicates or overwrites content an
   admin has since created or edited through the dashboard.

## How authentication works

- `POST /api/auth/login` — validates the email/password, looks up the
  admin, compares the password with `bcrypt`, and on success signs a JWT
  (`{ sub: adminId, role: "admin" }`) and sets it as an `httpOnly` cookie.
  Every failure mode (wrong password, unknown email) returns the exact same
  `401 Invalid email or password.` — the response never reveals whether the
  email exists. Login is rate-limited per IP (10 attempts / 15 minutes).
- `GET /api/auth/me` — behind the `requireAuth` middleware. Verifies the
  cookie, loads the admin, and returns `{ user: { id, name, email, role } }`
  — never the password/hash. Returns `401` if there's no valid session.
  The frontend calls this once on load to decide loading/authenticated/
  unauthenticated, rather than assuming a visit to `/dashboard` means
  someone is logged in.
- `POST /api/auth/logout` — clears the cookie. Stateless JWTs can't be
  server-side "revoked" the way a database session can; see the security
  notes below.
- `requireAuth` (`src/middleware/auth.ts`) is the reusable gate: it reads
  the cookie, verifies the JWT, and attaches `{ id, role }` to `req.user`.
  Milestone 3's CRUD routes should mount this the same way `/me` does,
  rather than re-implementing auth checks.

## The CMS

Content lives in five collections, each following the same shape:

| Collection | Endpoints | Notes |
| --- | --- | --- |
| Events | `GET/POST /api/events`, `GET/PATCH/DELETE /api/events/:id` | `featured: boolean` marks the one shown in the public page's "Featured Event" slot |
| Gallery items | `GET/POST /api/gallery`, `GET/PATCH/DELETE /api/gallery/:id` | One model, `type: "photo" \| "video"` |
| Testimonials | `GET/POST /api/testimonials`, `GET/PATCH/DELETE /api/testimonials/:id` | |
| Bible Study | `GET/PATCH /api/bible-study` | Singleton (fixed `_id`) — no create/delete |
| Site Settings | `GET/PATCH /api/settings` | Singleton (fixed `_id`) — organization/contact/social info |

**Published vs. draft, on the same endpoint.** Events/gallery/testimonials
have a `published: boolean`. The list/detail GET routes use
`attachUserIfPresent` (`src/middleware/auth.ts`) instead of `requireAuth`:
if the request carries a valid session cookie, it sees everything
(drafts included) — that's what the dashboard's own fetches get, since
they carry the cookie automatically. Without a valid cookie — the public
site — the same endpoint silently filters to `published: true` only, and
`GET /:id` on an unpublished item 404s instead of revealing it exists.
All create/update/delete routes require `requireAuth` unconditionally.

**The CRUD boilerplate is shared.** `src/utils/crudFactory.ts` builds
list/getOne/create/update/remove handlers from a Mongoose model + Zod
schemas, so `src/controllers/events.controller.ts` (etc.) are a few lines
each. The two singletons (`bibleStudy.controller.ts`, `settings.controller.ts`)
don't fit that shape (no list, no delete) and are written out directly —
each does a small "get-or-create" against a fixed `_id` so there is ever
only one document, instead of needing admins to track a random settings id.

**Media is a URL field, not a file upload.** `GalleryItem.mediaUrl` (and
`Event.coverImageUrl`) are plain strings — either a site-relative path
(e.g. `/gallery/photos/group1.jpeg`, served from this repo's `public/`) or
a full `https://` URL. There is no upload endpoint and no cloud storage
provider configured. See "Media storage" below for why, and what a real
upload would need.

**Seeding.** `npm run seed-content` (`src/scripts/seedContent.ts`) inserts
the real content already on the public site — the actual event
descriptions, the two real testimonials, the actual Monday/Tuesday/Thursday
schedule, the real contact/social links — nothing invented. It's gated per
collection ("only seed while empty"), so it's safe to run again later; it
just won't do anything once real content exists.

## Media storage

Gallery photos/videos are served as static files from this repo's
`public/gallery/` (photos and videos that were already shipped with the
public site, just moved/copied there so they have a stable URL a database
record can point to — see the repo root's `public/gallery/` folder).
Anything an admin adds through the dashboard today is entered as a URL,
not uploaded — there's no file picker wired to a backend upload endpoint.

This was a deliberate Milestone 3 scope decision, not an oversight: adding
real uploads means picking and paying for a storage provider (S3-compatible
bucket, Cloudinary, etc.), which needs real credentials this project
doesn't have yet and shouldn't have invented. The data model is already
shaped for it — `mediaUrl`/`coverImageUrl` are just strings — so adding
uploads later means adding an upload endpoint that returns a URL and
storing that URL in the existing field, not a schema change.

## Environment variables

See `.env.example` for the full list with explanations. The short version:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | yes | Atlas connection string |
| `JWT_SECRET` | yes | Signs/verifies session tokens — 32+ random characters |
| `MONGODB_DB_NAME` | no (default `christ_life`) | Database name, independent of the URI's own path |
| `AUTH_SESSION_DAYS` | no (default `7`) | How long a login stays valid |
| `CLIENT_ORIGINS` | no (default `http://localhost:8080`) | Comma-separated frontend origins allowed to call the API with cookies |
| `COOKIE_SAMESITE` | no (default `lax`) | `none` only if the dashboard and API end up on different domains (needs HTTPS) |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | only for `create-admin` | Not read by the running server |

Never commit real values for any of these — `server/.env` is gitignored,
`server/.env.example` is the tracked, placeholder-only template.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the API locally with auto-restart on file changes |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start` | Runs the compiled `dist/index.js` (production) |
| `npm run create-admin` | One-time admin account creation (see above) |
| `npm run seed-content` | Seeds the real Christ Life content (see above) |
| `npm run smoke-test` | End-to-end auth check against an in-memory MongoDB — no Atlas credentials needed |
| `npm run smoke-test-content` | Same idea, for the CMS endpoints: create/read/update/delete, published-vs-draft filtering, singleton persistence |

## Security notes (read before deploying)

- Passwords are hashed with `bcrypt` (cost factor 12) and the `password`
  field is `select: false` on the model — a plain `Admin.find()` never
  returns it.
- Sessions are stateless JWTs in an `httpOnly` cookie. `secure` is enabled
  automatically once `NODE_ENV=production` (requires HTTPS). Logging out
  clears the cookie, but **a copy of the token taken before logout remains
  valid until it expires** (`AUTH_SESSION_DAYS`) — this is a standard
  limitation of stateless JWTs, not something Milestone 2 attempts to solve
  with a server-side revocation list. If that's ever a real concern, the
  fix is a session/token-version store (e.g. a `tokenVersion` field on the
  admin document, checked in `requireAuth`).
- The login rate limiter (`src/middleware/rateLimit.ts`) is in-memory —
  fine for a single small deployment, but it resets on restart and isn't
  shared across multiple server instances. A multi-instance deployment
  should move this to Redis or a platform-level rate limiter.
- CORS is configured from `CLIENT_ORIGINS`; there is no `*` wildcard for
  credentialed requests.
- The final production domain isn't connected yet (see the SEO milestone's
  notes) — once it is, revisit `CLIENT_ORIGINS`, `COOKIE_SAMESITE`, and the
  frontend's `VITE_API_URL` together if the dashboard and API end up on
  different subdomains.
