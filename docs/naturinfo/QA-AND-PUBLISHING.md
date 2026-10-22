# QA and publishing

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Sanity

Sanity is the canonical CMS for production species content.

Existing repository content should be migrated, not discarded. Preserve useful existing text, translations, and media even when they are not initially public and even when they still need improvement. Asset states are defined in [VISUAL-SPEC.md](VISUAL-SPEC.md).

Preservation is not the same as marking something final. Migration should keep useful content and still make it possible to identify text and media that need further production or improvement later. Use module state, asset state, and the species review date for that. Do not drop material only because it is incomplete.

Do not make migration depend on every species already having final images, video, narration, species sound, translations, or Full-level material. A species can be migrated, and published at its approved level, while a module remains `not_produced` or stored for later. That gap does not demote the level. The locked classification is the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

During initial migration, do not require Niclas to manually approve every imported field before it can exist in the CMS. Swedish content comes in as the working master. Existing English and German text comes in with it as migrated translation content, not as verified or final translation. See [LOCALISATION.md](LOCALISATION.md).

Sanity editing needs a direct preview-page path to staging. Staging and preview may expose the available Core, Rich, and Full versions and may show modules that are relevant but not produced. The live site must never show empty placeholders. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

Sanity changes should be visible in preview and must require an explicit publish action before they become public.

Use Sanity's native history and version capabilities. Do not create a separate custom versioning system.

Do not create a heavy per-section approval workflow.

High-level editorial state may be stored for a species, using concepts equivalent to:

1. Production ready
2. Internal revision
3. Customer revision
4. Done

Suggested internal values, if the state is implemented: `production_ready`, `internal_revision`, `customer_revision`, `done`. These are optional species-level markers, not a gate on every field. Revision completion may be tracked for the whole species.

Customer feedback happens outside the CMS. Do not build a customer commenting system.

## Regional biological QA

Before a species is treated as production-ready, make one lightweight check that its public text and media fit Kustvägen, Nordanstig, Hälsingland, and the adjacent Baltic and Bothnian coast, as defined in [MASTER-CONTEXT.md](MASTER-CONTEXT.md). General correctness for Sweden is not the whole check. Where a regional difference is documented and biologically relevant, the public material should show the species as it occurs here.

Look especially at regional occurrence, subspecies or population, seasonal appearance, local size or characteristics, habitat, coastal or freshwater context, and migratory or seasonal presence. The same standard applies to still images, video, and other media. See [VISUAL-SPEC.md](VISUAL-SPEC.md) and [TEXT-SPEC.md](TEXT-SPEC.md).

Do not invent a local difference where none is documented. The purpose is accuracy, not artificial localisation. A missing local photograph is not itself a failure. An obviously wrong subspecies, population, or habitat is.

Record, for the species:

- regional relevance checked: yes or no
- material issue found: yes or no
- a short note only when one is needed

If a meaningful uncertainty would affect what the public is told, flag it for review. Do not guess.

This check is separate from the locked content level, from `produced` / `not_produced` / `not_relevant`, from translation status, and from image rights and credits. It does not change `publishedLevel`. The classification in [SPECIES-AUDIT.md](SPECIES-AUDIT.md) stays as locked.

The current schema has no fields for these three records. Until they exist, keep the result in the species QA note for the migration. Do not hide it inside `publishedLevel`, `translationStatus`, or a credit field. A later admin-only field is described in [SANITY-CONTENT-MODEL.md](SANITY-CONTENT-MODEL.md). Do not add that field as part of stating this requirement.

## Sources and corrections

Store internal source references and a fact-check or review date per species.

Public source lists are not required by default.

AI must not automatically overwrite already published or approved content because it finds different information. Proposed later corrections should be reviewable and should explain why, with the source where that is appropriate.

If AI or an editor finds a discrepancy with older customer material:

1. Re-check the point against reliable information and the geographic and species rules in the master context.
2. Correct obvious errors during production or revision.
3. Escalate genuinely unresolved uncertainty.
4. Do not flag every difference as if it were an error.

Older customer or source material does not automatically replace newer Naturinfo content.

## Provenance

For generated assets, retain internal provenance where it is available:

- provider or tool
- model
- creation date
- prompt
- prompt or master-context version
- production or revision status
- relevant human review information

This metadata is internal by default. Do not invent missing history. In particular, do not fabricate exact historical model names.

Where existing visual material is known to come from Google and the exact product cannot be recovered, it is acceptable to record that standard Google generative tools were used, without naming a specific model. Where narration or species sound is known to come from ElevenLabs, record that. Leave unknown fields empty.

The master-context version for this document set is 2026-10-17, from [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Golden set

The Golden Set is a migration and QA control set. Use existing material. Do not create new material solely for testing.

Its original job was to exercise the range of the system: a Full mammal, a Full bird, a Full fish, a Rich fungus, a Rich tree, and a Rich plant. Those species are now locked, not candidates:

- Lodjur, Full, already the implemented reference
- Havsörn, Full
- Strömming, Full
- Kantarell, Rich
- Tall, Rich
- Lin, Rich

Membership in this set does not limit which other species may be Full or Rich. Älg, Gråsäl, and Rödräv are approved Full and are not in the original set. The other animal pages are approved Rich. The other non-animal pages are approved Core. The canonical list is the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

## Not in the first production implementation

- Sanity schema and application wiring, until an implementation task starts
- a required live API to Google, ElevenLabs, or another generator
- QR analytics or tracking
- rotating or monthly quizzes
- customer comments in the CMS
- custom version history beside Sanity's own
- per-section approval workflow
- translation staleness tracking, until a further language is actually introduced
