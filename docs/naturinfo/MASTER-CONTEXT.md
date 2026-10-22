# Naturinfo master context

Document set version: 2026-10-17.

This file is the top-level source of truth for the Naturinfo production build. Detailed rules live in the linked specs. If a summary here and a detailed spec disagree, the detailed spec wins for its own subject. If `/design` and these documents disagree, these documents win.

`/design` is a read-only reference implementation. Do not modify it. Reuse its good UI and components in the production application instead of rebuilding working visual behaviour only because the content source changes.

## What Naturinfo is

Naturinfo is a digital nature guide for Kustvägen.

Primary geographic context: Kustvägen, Nordanstig and Hälsingland, together with the adjacent Baltic and Bothnian coastal environment, and Västernorrland where that is the same coastal and inland landscape.

Secondary context may include ecologically appropriate nearby parts of southern Norrland. It is not a licence to use generic northern, alpine, or foreign nature.

Species content must be accurate for this area, not only generally correct for Sweden. Where a difference is documented and biologically relevant, text and media represent the species as it occurs here: regional occurrence, subspecies or population, seasonal appearance, local size or characteristics, habitat, coastal or freshwater context, and migratory or seasonal presence. Do not invent a local difference where none is documented. The purpose is accuracy, not artificial localisation. See [TEXT-SPEC.md](TEXT-SPEC.md), [VISUAL-SPEC.md](VISUAL-SPEC.md), and the regional check in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

All text, images, video, species sounds, and AI interactions must respect this geographic and ecological context. Verify species, morphology, habitat, season, behaviour, and surrounding vegetation. Avoid North American or other foreign lookalikes, exotic vegetation, generic AI wilderness, anatomical errors, and invented facts.

When uncertain: verify first. Do not invent. If a meaningful uncertainty would affect what the public is told, flag it for review.

## Content authority

Existing Naturinfo content is the working master content. Older customer or source material is primarily a verification source and must not automatically overwrite newer Naturinfo content.

If a discrepancy appears, re-check it against reliable information and these geographic and species rules. Correct obvious errors during production or revision. Escalate genuinely unresolved uncertainty. Do not flood editors with unnecessary flags.

The production application should progressively replace hardcoded prototype data with Sanity-backed data. Migrate useful content that already exists, including English and German text, and keep it possible to see what still needs production or improvement. Do not block migration or the production architecture on final images, video, narration, species sound, translations, or Full-level material.

## Decisions that apply everywhere

- Swedish is the authoritative production master. Existing English and German content is migrated when it exists, as translation content, not as verified final copy. See [LOCALISATION.md](LOCALISATION.md).
- Use six canonical categories, with stable internal ids kept separate from translated labels. See [TAXONOMY.md](TAXONOMY.md).
- Content levels are the stable internal values `core`, `rich`, and `full`, stored per species as `publishedLevel`. Niclas locked the classification on 2026-10-22. Mammals, birds, and fish are at least `rich`. Approved Full species are Lodjur, Älg, Gråsäl, Rödräv, Havsörn, and Strömming. Every other animal page is `rich`. Fungi, trees, and plants and berries with a real page are `core` unless explicitly promoted. Approved Rich non-animals are Kantarell, Tall, and Lin. Hjortron, Blåbär, Havtorn, Karljohan, and Gran stay unclassified while unpublished. The frontend must read the stored level and must not infer it from modules or from a category default. `produced`, `not_produced`, and `not_relevant` describe modules, not the species level. Public names and icons must not be hardcoded into the content model. The canonical list is the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).
- A species has one canonical document and one permanent URL, `/art/[slug]`. Example: `/art/lodjur`. See [LOCALISATION.md](LOCALISATION.md).
- Sanity is the canonical CMS. Migrate useful existing content, and do not wait for every species to be final. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).
- Normal species descriptions, facts, and documentary narration are for adults: engaging and easy to read, not academic and not childified. Quiz and Ask the Species may use simpler family-friendly language. See [TEXT-SPEC.md](TEXT-SPEC.md) and [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md).
- Accuracy overrides visual style. Generated imagery follows the Version B direction only when it stays biologically credible for this region. See [VISUAL-SPEC.md](VISUAL-SPEC.md).
- Regional biological accuracy is required before a species is production-ready. The check is separate from `publishedLevel`, module status, translation status, and image rights. It does not change the locked classification in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).
- Video, documentary narration, and species sound are specified in [AUDIO-VIDEO-SPEC.md](AUDIO-VIDEO-SPEC.md).
- Generated assets keep internal provenance. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

## How to read the specs

| Subject | Document |
| --- | --- |
| Levels, modules, section order, badges, filtering, editorial priority | [CONTENT-LEVELS.md](CONTENT-LEVELS.md) |
| Categories and stable ids | [TAXONOMY.md](TAXONOMY.md) |
| Images, asset library, local photography, generated visual direction | [VISUAL-SPEC.md](VISUAL-SPEC.md) |
| Audience, tone, and factual writing | [TEXT-SPEC.md](TEXT-SPEC.md) |
| Video, documentary narration, species sounds | [AUDIO-VIDEO-SPEC.md](AUDIO-VIDEO-SPEC.md) |
| Ask the Species and quiz | [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md) |
| Languages, one species document, permanent URLs | [LOCALISATION.md](LOCALISATION.md) |
| Sanity, preview, publish, sources, regional biological QA, migration, golden set, provenance | [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md) |
| Datasets, env vars, Lodjur migration, draft preview, revalidation | [SANITY-SETUP.md](SANITY-SETUP.md) |

## Working rules for implementation

- Preserve and reuse the prototype's good UI where the docs allow it.
- Do not blindly reproduce the prototype's code-level defaults, prompt wiring, or URL shape. Store the locked classification from [SPECIES-AUDIT.md](SPECIES-AUDIT.md). Known conflicts are called out in the relevant spec.
- Future API integrations with Google, ElevenLabs, or other production tools are allowed. They are not required for the first production implementation. Media may be produced externally and imported into Sanity.
- Do not build QR analytics, rotating or monthly quizzes, a customer commenting system, a custom versioning system, or a heavy per-section approval workflow unless a later task explicitly asks for them.
