# Buonapharma

Sito vetrina + forum comunitario per laboratorio farmaceutico (Camerun), bilingue FR/EN.

## Stack
- **Next.js 14** (App Router) + TypeScript — hosting **Vercel**
- **Neon Postgres** + **Prisma** — database
- **Auth.js (NextAuth v5)** — autenticazione, ruoli: `PATIENT`, `PHARMACIST_PENDING`, `PHARMACIST_VERIFIED`, `ADMIN`
- **next-intl** — i18n, routing `/fr/...` e `/en/...`
- **DeepL API** — traduzione on-demand dei contenuti del forum (cache in DB, non traduzione automatica)

## Architettura forum
- **Espace Pharmaciens** (`/forum/pharmaciens`): privato, accesso server-side ristretto a `PHARMACIST_VERIFIED`/`ADMIN`
- **Espace Patients** (`/forum/patients`): pubblico in lettura/scrittura domande; le risposte marcate come "da farmacista" richiedono `PHARMACIST_VERIFIED`
- **Verifica farmacisti**: registrazione con numero d'albo + documento → coda admin (`/admin/verification`) → approvazione manuale (non esiste un'API pubblica dell'Ordre National des Pharmaciens du Cameroun per la verifica automatica)
- **Traduzione**: ogni post/commento resta salvato nella lingua originale in cui è stato scritto (`originalLocale`). Il pulsante "Traduire/Translate" chiama `/api/translate`, che interroga DeepL solo la prima volta e mette in cache il risultato nella tabella `Translation`.

## Setup locale

```bash
npm install
cp .env.example .env
# compila DATABASE_URL (Neon), AUTH_SECRET, DEEPL_API_KEY
npx prisma migrate dev --name init
npm run dev
```

## Deploy (GitHub + Vercel)
1. Push del repo su GitHub
2. Su vercel.com → "New Project" → importa il repo
3. Su Neon.tech → crea un progetto Postgres → copia la connection string in `DATABASE_URL` nelle env vars di Vercel
4. Aggiungi `AUTH_SECRET` e `DEEPL_API_KEY` nelle env vars di Vercel
5. Deploy — Vercel builda automaticamente ad ogni push su `main`

## Stato del progetto
Questo è lo scaffold iniziale: struttura, schema DB, auth, i18n e le pagine chiave del forum sono impostate.
Da completare: form di registrazione/login, upload documento verifica, form nuovo post/commento,
migrazione contenuti dal sito WordPress esistente (produits, ligne santé, cosmétiques, à propos, ecc.),
styling definitivo.
