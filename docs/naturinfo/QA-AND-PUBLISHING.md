# QA and publishing

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Sanity

Sanity is the canonical CMS for production species content.

Existing repository content should be migrated, not discarded. Preserve useful existing text, translations, and media even when they are not initially public and even when they still need improvement. Asset states are defined in [VISUAL-SPEC.md](VISUAL-SPEC.md).

Preservation is not the same as marking something final. Migration should keep useful content and still make it possible to identify text and media that need further production or improvement later. Use module state, asset state, and the species review date for that. Do not drop material only because it is incomplete.

Do not make migration depend on every species already having final images, video, narration, species sound, translations, or Full-level material. A species can be migrated, and published at Core or Rich, while higher modules remain `not_produced` or stored for later.

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

Use the strongest existing material. Do not create new material solely for testing.

Lodjur is the Full reference for mammals.

Select the strongest existing candidates later for:

- one Full bird
- one Full fish
- one Rich fungus
- one Rich tree
- one Rich Växter & Bär species

Determine those candidates from the actual existing content and assets. Do not invent them in advance, and do not copy the prototype's category-wide level defaults as a substitute for that selection. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

## Not in the first production implementation

- Sanity schema and application wiring, until an implementation task starts
- a required live API to Google, ElevenLabs, or another generator
- QR analytics or tracking
- rotating or monthly quizzes
- customer comments in the CMS
- custom version history beside Sanity's own
- per-section approval workflow
- translation staleness tracking, until a further language is actually introduced
