# AGENTS.md — therian-app

## Context

Before implementing anything, read the project notes in the Obsidian vault:

**Vault path:** `/Users/marcjaner/Documents/marcjaner/marcjaner/therian-app/`

Files:
- `project-summary.md` — what this is and why
- `mvp-spec.md` — full feature spec, scope, and constraints
- `design.md` — visual design decisions (colors, typography, layout)
- `agent-notes.md` — implementation notes and decisions log

## Key Decisions (quick ref)

- **Stack:** Next.js (App Router) + Vercel + Stripe + `@vercel/og`
- **Audio:** Server-side analysis via Next.js API route — MFCC + pitch + spectral features
- **Reference data:** FreeSound clips pre-computed into static JSON feature vectors
- **Animals (8):** Wolf, Fox, Cat, Dog, Bear, Raven, Deer, Rabbit — top 3 shown per result
- **Design:** Pure black `#000000` + electric amber `#FFAA00`, Space Grotesk font, sharp edges
- **No:** HuggingFace, kids app, user accounts for MVP

## Repo Structure

```
app/
  page.tsx          # Record screen (MediaRecorder, 5s countdown)
  result/
    page.tsx        # Result screen (top 3 animals, share, waitlist CTA)
  api/
    analyze/
      route.ts      # POST — audio analysis (currently mock, real vectors TBD)
  layout.tsx
  globals.css
public/
  data/             # Feature vectors JSON will live here (TBD)
```

## What's Mock / What's Real

- UI screens: real
- Audio recording: real (MediaRecorder)
- Analysis scores: **mock** — returns Wolf 94%, Raven 71%, Fox 58% hardcoded
- FreeSound reference vectors: **not yet built**

## Next Steps

1. Curate ~80 FreeSound clips (8 species × ~10 clips)
2. Pre-compute feature vectors → `public/data/vectors.json`
3. Wire `app/api/analyze/route.ts` to real comparison logic
4. Deploy to Vercel
5. Add Stripe payment link to waitlist CTA
