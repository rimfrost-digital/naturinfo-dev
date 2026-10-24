# Start here

Read this before changing Naturinfo. It is the entry point and decision map. It does not replace the detailed specifications.

Naturinfo is a digital nature guide for Kustvägen: Nordanstig, Hälsingland, the adjacent Baltic and Bothnian coast, and Västernorrland where that is the same landscape. The detailed source of truth is [MASTER-CONTEXT.md](MASTER-CONTEXT.md). For a subject, the detailed spec wins. If two specifications conflict, stop and report the conflict. Do not pick a winner. If `/design` and the documents disagree, follow the documents.

`/design` is read-only. Do not edit it.

## What is already decided

### Product and design

`/design` is the approved UX and design reference. Production work implements that experience. It does not redesign it.

Do not silently change navigation, heroes, section structure or order, cards, badges, calls to action, galleries, quiz, Fråga djuret, Kustvägen integration, mobile UX, content hierarchy, or other product behaviour.

Suggestions are welcome. A material product, design, or UX change needs Niclas's explicit approval before implementation.

### Content source

Sanity is the production content source of truth. Do not simplify or change the Sanity architecture to make the frontend easier. See [SANITY-CONTENT-MODEL.md](SANITY-CONTENT-MODEL.md).

### Content levels

There are exactly three frontend content levels: CORE, RICH, and FULL. CORE is the baseline. RICH is richer. FULL is the showcase, the richest experience that is relevant for that species.

Mammals, birds, and fish are at least RICH. The canonical classification for all 64 catalogue species is the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). `publishedLevel` is explicit editorial metadata. Never infer it from category, available modules, or media.

On public species cards, FULL and RICH show a badge. CORE shows no badge. CORE remains a real stored level for filtering, logic, CMS and editorial use, and classification. No card badge does not mean CORE is absent, and it is not a fourth level. Unclassified drafts get no level and no badge.

In production, `publishedLevel` comes from canonical Sanity data. Until a species has been migrated, the customer-preview catalogue may use the locked classification in [SPECIES-AUDIT.md](SPECIES-AUDIT.md) as temporary preview metadata. That exception must not become permanent production architecture.

Draft, published, and hidden status is separate from content level. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md) and [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

### Regional biological accuracy

Content and media must be biologically plausible for Kustvägen, Nordanstig, Hälsingland, and the adjacent Baltic and Bothnian coast. Do not invent a local difference.

A suitable authentic local customer or photographer image has priority. Not every species needs a local photograph. Media stays replaceable in Sanity without a frontend change.

The regional check is in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md). It does not change `publishedLevel`.

### Fråga djuret

Fråga djuret is a conversation. The animal speaks naturally in the first person. The visitor can use suggested questions, ask a free-form question, and continue with follow-ups.

Ground answers in approved species content. Never invent a fact. If what the guide is allowed to use cannot support an answer, say so naturally. The customer preview demonstrates the approved conversation. The production AI runtime comes later. See [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md).

### Quiz

Quiz is site-level. It is not one quiz per species. Preserve the approved quiz unless a task explicitly changes it. See [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md).

### Media and performance

Keep the approved visual design while productionizing assets. Use optimized, responsive images. Lazy-load media below the fold. Prioritize only true LCP media. Keep video and audio deferred until playback needs them.

A species video shows an existing suitable poster or still before play. Do not load the video file merely to obtain that still. Use a still already associated with the video when one exists. Otherwise use an existing species image.

Do not copy prototype technical debt, and do not copy `/design/public` wholesale.

### Languages

Swedish is authoritative. Migrated English and German content is not automatically editorially approved. See [LOCALISATION.md](LOCALISATION.md).

### Migration

Lodjur is the implemented Full reference and pilot. The Golden Set is the migration and QA control set, not a cap on who may be Full or Rich. Bulk migration stays behind the technical review and approval process.

Do not bulk-migrate, and do not write production data, unless the task explicitly authorizes it. See [MIGRATION-PLAN.md](MIGRATION-PLAN.md) and [SANITY-SETUP.md](SANITY-SETUP.md).

## How to work

The canonical local development port is **3010**. `npm run dev` starts Next.js at http://localhost:3010. Keep local development on that port.

Implement approved decisions. Do not make a silent product decision.

If an improvement would materially change approved UX or product behaviour, report it and wait for approval. Technical improvements that preserve the approved behaviour are allowed inside the assigned task. Do not fix unrelated things along the way.

## If you are working on this, read that

| Working on | Read |
| --- | --- |
| Overall context | [MASTER-CONTEXT.md](MASTER-CONTEXT.md) |
| Content levels | [CONTENT-LEVELS.md](CONTENT-LEVELS.md) |
| Species inventory and classification | [SPECIES-AUDIT.md](SPECIES-AUDIT.md) |
| Visual design and images | [VISUAL-SPEC.md](VISUAL-SPEC.md) |
| Text and editorial content | [TEXT-SPEC.md](TEXT-SPEC.md) |
| Audio and video | [AUDIO-VIDEO-SPEC.md](AUDIO-VIDEO-SPEC.md) |
| Fråga djuret and quiz | [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md) |
| Languages and URLs | [LOCALISATION.md](LOCALISATION.md) |
| Sanity content model | [SANITY-CONTENT-MODEL.md](SANITY-CONTENT-MODEL.md) |
| Migration | [MIGRATION-PLAN.md](MIGRATION-PLAN.md) |
| Datasets, preview, and the Lodjur pilot | [SANITY-SETUP.md](SANITY-SETUP.md) |
| QA and publishing, including regional QA | [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md) |
| Taxonomy | [TAXONOMY.md](TAXONOMY.md) |
