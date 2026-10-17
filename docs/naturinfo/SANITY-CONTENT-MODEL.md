# Sanity content model (planning)

Status: proposal only. Nothing in this file has been created in Sanity.

Governed by the specs in this folder, especially [CONTENT-LEVELS.md](CONTENT-LEVELS.md), [LOCALISATION.md](LOCALISATION.md), [VISUAL-SPEC.md](VISUAL-SPEC.md) and [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

This model is intentionally small: `category`, `species`, and one shared `askSettings` document. One species document holds every language. Locale objects replace a document per language.

## Document types

### `category`

Six documents, one per canonical category. Species store a reference, not a translated label.

| Field | Kind | Notes |
| --- | --- | --- |
| `id` | string | `mammals`, `birds`, `fish`, `fungi`, `trees`, `plants_and_berries` |
| `title` | locale string | Swedish labels are Däggdjur, Fåglar, Fiskar, Svampar, Träd, Växter & Bär |
| `sortOrder` | number | Archive filter order |

No level lives on the category. The prototype's category-wide tiers must not be recreated.

### `askSettings`

One document for the whole site. It holds the shared Ask the Species master prompt. Species documents do not duplicate that prompt. See Ask the Species below.

### `species`

One document per species. Swedish, English and German are fields on that document.

Suggested stable id: `species.<slug>`, for example `species.lodjur`.

## Locale shape

Use one object shape everywhere a string is translated:

```text
{ sv: string, en: string, de: string }
```

`sv` is the authoritative master. `en` and `de` are optional. Empty does not mean "copy Swedish into the field".

A fourth language later is an added field on the same document, not a new species document. An open-ended array of locales would be more flexible and a worse editing experience for the three languages that already exist. The object shape is the practical choice.

Editors should see `sv`, `en` and `de` beside each other on the same section. Do not split languages into tabs that hide the Swedish master.

## Species fields

### Shared, public

| Field | Purpose |
| --- | --- |
| `slug` | Permanent `/art/[slug]` id. Not translated |
| `scientificName` | Shared scientific name. Leave empty when sources disagree, and record the candidates in `sourceNotes` until they are verified |
| `category` | Reference to `category` |
| `publishedLevel` | `core`, `rich` or `full`. Public badge value. Not a display name |
| `hero` | Reference into this species' asset library |
| `cardImage` | Optional. Falls back to `hero` when empty |
| `gallery` | Ordered asset references for Bildgalleri |
| `localGallery` | Ordered asset references for Bilder från närområdet. Empty means the section is absent |
| `videos` | Ordered list. Each item has an asset reference, a localised title, and `primary` |
| `speciesSound.asset` | The sound file, when relevant |
| `relatedSpecies` | Ordered references to other species |
| `quickFacts` | Ordered items. Structure is shared; label and value are localised |

### Localised, public

| Field | Purpose |
| --- | --- |
| `commonName` | Lodjur / Eurasian Lynx / Eurasischer Luchs |
| `metaDescription` | Page description |
| `introduction` | Introduktion body |
| `quote` | Optional pull quote |
| `quickFacts[].label` and `value` | Snabbfakta |
| `deepDive[]` | Fördjupning cards: localised heading, body, caption, shared image reference |
| `sectionSettings[].publicHeading` | Optional override. CMS name stays fixed |
| `documentary.script` | Listening script or transcript, not the page text. Empty when no script exists |
| `documentary.audio` | One asset reference per language that has a file. Audio without a script is still existing documentary audio |
| `speciesSound.label` | Public label for the player |
| `ask.title`, `ask.intro`, `ask.presetQuestions` | Fråga djuret copy |

Alt text and captions live on the asset, not as a separate public document.

### Admin only

These must not be rendered on the public site.

| Field | Purpose |
| --- | --- |
| `editorialStatus` | `production_ready`, `internal_revision`, `customer_revision`, `done` |
| `reviewedAt` | Fact-check / review date |
| `sourceNotes` | Internal sources. No public source list |
| `translationStatus.en` and `.de` | `missing`, `migrated`, `in_review`, `approved` |
| `sectionSettings[]` | Order, `relevance` (`produced`, `not_produced`, `not_relevant`), `hidden` |
| `homepagePriority` | Number or empty. Empty means not featured on the homepage |
| `archivePriority` | Number or empty. Independent from homepage priority |
| `assets[]` | The species library, including non-public items |
| `ask.supplement` | Optional species-specific addition to the shared master prompt. Empty for most species |
| `ask.legacyPrompt` | Imported prototype prompt, kept for review. Not a required production prompt, and not sent to the model |
| `ask.personaNote` | Optional short note for a subtle species personality |
| `legacyVariants[]` | Non-public imported copies that must not overwrite the master. Used for `lodjur-v2` |
| Asset `provenance`, `rightsNote`, `workflow` | See below |

`publishedLevel` is public. The decision to change it is editorial, but the value itself is shown as the badge.

## Sections

`sectionSettings` is the only order and visibility control. Default order, seeded on create:

1. `hero`
2. `introduction`
3. `quick_facts`
4. `deep_dive`
5. `gallery`
6. `local_gallery`
7. `video`
8. `documentary`
9. `species_sound`
10. `ask_species`

Editors reorder this list per species. Content stays in the fields above, so reordering does not duplicate body text.

CMS names stay the Swedish names in [CONTENT-LEVELS.md](CONTENT-LEVELS.md). Public headings come from the CMS name unless `publicHeading` is set.

`hidden: true` overrides level visibility and does not delete content.

`local_gallery` is not a level reward. Relevance is `produced` only when `localGallery` has suitable images that are known to be local. It is `not_relevant` until that is established from a source, credit or editorial decision. A filename such as `naromradet` never makes an asset a verified local-photographer or local-area asset.

Level still controls presentation:

- Core shows hero, introduction, quick facts, and the curated image selection.
- Rich adds deep dive, gallery and relevant video.
- Full adds documentary, species sound and Ask the Species when those modules are relevant and produced.

The frontend hides anything above `publishedLevel`, anything `not_relevant`, anything `not_produced`, and anything `hidden`. Preview may show `not_produced` as a labelled gap. Live must not.

## Asset library

Assets are objects inside the species document, not a third document type. That keeps upload, hero, gallery and credit on one editing screen. The same file is selected for several roles by referencing its key. It is not uploaded twice.

Cross-species reuse is rare. A related card uses the other species' hero or card image through the species reference.

Each asset:

| Field | Kind | Public? |
| --- | --- | --- |
| `key` | string | no |
| `file` | Sanity image or file | when `workflow` is `public` and a role selects it |
| `kind` | `image`, `video`, `documentary_audio`, `species_sound` | no |
| `alt`, `caption` | locale string | yes, when the asset is shown |
| `tags` | strings such as habitat, food, tracks, droppings, behaviour, life stage, season, interaction | no |
| `workflow` | `public`, `hidden`, `archive`, `rejected` | no |
| `localPhotographer` | boolean, default false. Set only from a known source or credit, never from a filename | no |
| `showCredit` | boolean, default false | the credit text is public only when this is true |
| `credit` | locale string | only if `showCredit` |
| `rightsNote` | text | no |
| `provenance` | provider, model, createdAt, prompt, promptVersion, review note | no |
| `legacyPath` | original `/images/...` or `/audio/...` path | no |

Leave provenance fields empty when the repo does not know them. Do not invent a model name.

Video items point at `kind: video` assets. Only one item has `primary: true`. Extra videos can be stored with `workflow: hidden`.

Documentary audio is per language because speech is linguistic. Species sound is one shared file.

Audio and script are separate. When a recording exists and the script or transcript does not, store the audio and leave `documentary.script` empty. That state is "audio exists, script/transcript missing". It is not a missing documentary.

## Ask the Species

Use one shared master prompt, plus the approved structured content of the species being asked. Do not keep 59 independently maintained full prompts.

The shared prompt lives once, on a single `askSettings` document: voice, safety, geographic scope, and the instruction to answer as the species. Species documents do not each carry a copy of it.

At request time the application sends that master prompt together with the approved Sanity fields for the resolved species: common name, introduction, quick facts and deep dive, in the active language. An optional `ask.supplement` or `ask.personaNote` on the species can add a specific boundary or a subtle personality. Most species need neither.

Public copy on the species is still localised: title, intro and preset questions.

`ask.legacyPrompt` preserves an imported prototype prompt that contains facts, for comparison only. It is not required in production and is not sent to the model. Placeholder text and prompts that only point at "the page" are not produced Ask content. The page-reference prompts are the defect this structure replaces: the model receives the structured fields, not an instruction to look at a page it was never given.

Unknown slug handling is application behaviour, not a schema fallback. There is no lodjur prompt to fall back to.

## Publishing

Use Sanity drafts and the native Publish action. Preview reads the draft. Live reads the published document. Do not add a custom version history or a per-section approval workflow.

`publishedLevel` can be `rich` while Full assets sit on the document, hidden by level. Storing them is not the same as showing them.

Lodjur is the initial Full reference, not a permanent cap. Any species may later be published as Full once its relevant Full material is complete and verified. Full still does not mean every module exists for every species.

## Left out on purpose

- A species document per language
- Quiz as species content. The two quizzes stay site-level and can remain in code until a later task
- QR analytics
- Customer comments
- A global media database
- Public source lists
- Category default levels
- Hardcoded display names for Core, Rich and Full

## Editor shape

The Studio form should read in this order: identity and level, Swedish text with English and German beside it, quick facts, deep dive, asset library, role pickers (hero, card, galleries, video, audio), the small Ask the Species supplement, then the admin group (sources, review date, translation status, provenance, legacy variant). The shared Ask prompt is edited on `askSettings`, not on each species.

Section order is one sortable list, not ten scattered booleans.
