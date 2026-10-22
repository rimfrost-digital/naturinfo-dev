# Content levels

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Internal values

Store only these stable internal values:

- `core`
- `rich`
- `full`

Public names and icons may change later. They are presentation and must not be hardcoded into the content model, Sanity schema values, or species data. A badge may display a later public name while the stored value stays `core`, `rich`, or `full`.

`full` ranks above `rich`, which ranks above `core`, but only for presentation. Level must not impose one universal sorting rule.

## What each level means

**Core.** A strong species introduction, facts, and curated imagery.

**Rich.** A solid enhanced species page: Core, plus richer imagery and details, and relevant video or other media when that material exists. Rich is a relatively achievable production level, not a demanding threshold. A species can be Rich without documentary narration, species sound, Ask the Species, or a complete set of extra media.

**Full.** The more complete experience for that species. This is where documentary narration, species sound, Ask the Species, and other relevant interactive or media modules belong, when they are relevant.

Full does not mean every species has the same modules. A module can be irrelevant for a species even when the species is Full. Plants, trees, and fungi, for example, must not receive a meaningless video just to match a mammal page. See [AUDIO-VIDEO-SPEC.md](AUDIO-VIDEO-SPEC.md).

Migration and publication do not require Full material. An animal stays at least Rich when a Rich or Full module is still missing. A non-animal may be published at Core or Rich only after an individual classification. A catalogue-only draft may stay unclassified. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

## Published level and stored content

Level controls presentation, not deletion.

A species may store Full assets and copy while its published level is Rich. Public visitors see the published level. Internal preview must be able to show the available Core, Rich, and Full presentations.

A species intended for Full may be published as Rich until the Full material is ready.

Switching the published level upward automatically enables relevant produced sections, unless an editor has explicitly hidden a section. Manual hiding overrides automatic level visibility. Hidden sections keep their content.

Switching the published level downward hides sections above that level. It does not delete them.

## Module relevance

Every section distinguishes three states:

| Internal value | Meaning |
| --- | --- |
| `produced` | Relevant, and the content exists |
| `not_produced` | Relevant, but not produced yet |
| `not_relevant` | Not relevant for this species |

On the live site, show a section only when it is `produced`, within the published level, and not manually hidden. Live must never show empty placeholders.

Preview and staging may show `not_produced` modules as labelled gaps, and may preview higher available levels than the published level. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

`not_relevant` modules stay out of both live and the level preview, except where an editor is managing the species and needs to see that the module was marked irrelevant.

## Where level appears

There are exactly three content levels: `core`, `rich`, and `full`. `core` is the baseline.

On public species cards, including archive cards, homepage species cards, and other species-card listings:

- `full` shows a FULL badge
- `rich` shows a RICH badge
- `core` shows no badge

`core` remains a real stored level. It stays available for filtering, logic, CMS and editorial use, and species classification. No card badge does not mean `core` is absent, and it is not a fourth level. The archive stays filterable by level, including `core`.

A species page shows the stored `publishedLevel`. The card rule does not remove that page badge.

A badge must be able to link to an explanation of the level system. The explanation destination is not fixed in this document.

In production, `publishedLevel` comes from canonical Sanity data. The frontend must not infer it from category, modules, or media, and must not recreate a category default.

Until a species has been migrated to Sanity, the customer-preview catalogue may use the locked classification in [SPECIES-AUDIT.md](SPECIES-AUDIT.md) as temporary preview metadata. That metadata is not Sanity data. Remove it for a species when that species is loaded from Sanity. This exception must not become permanent production architecture. Unclassified drafts still get no level and no badge.

Draft, published, and hidden status is separate from content level.

Different surfaces may use different editorial priority. Featured or prioritised species need per-surface editorial control. Do not derive homepage order, archive order, and related-species order from level alone.

## Species page sections

Use this default order. Editors may reorder sections per species.

CMS names stay human-readable even when the public heading differs. Public headings may be overridden per species and per language.

| Order | Section id | CMS name | Default level | Rule |
| --- | --- | --- | --- | --- |
| 1 | `hero` | Hero | `core` | Curated primary image and species identity |
| 2 | `introduction` | Introduktion | `core` | Main species introduction |
| 3 | `quick_facts` | Snabbfakta | `core` | Short factual points |
| 4 | `deep_dive` | Fördjupning | `rich` | Richer detail |
| 5 | `gallery` | Bildgalleri | `rich` | Ordered gallery beyond the core curated set |
| 6 | `local_gallery` | Bilder från närområdet | any | Only when suitable local images exist. Not a level reward |
| 7 | `video` | Video | `rich` | See [AUDIO-VIDEO-SPEC.md](AUDIO-VIDEO-SPEC.md) |
| 8 | `documentary` | Lyssna på dokumentären | `full` | Dedicated narration, not the page text read aloud |
| 9 | `species_sound` | Artens ljud | `full` | Only when relevant and credible |
| 10 | `ask_species` | Fråga djuret | `full` | See [AI-GUIDE-SPEC.md](AI-GUIDE-SPEC.md) |

Core curated imagery is the hero, the card image, and any assets explicitly included in the core set. Bildgalleri is the richer ordered gallery and is a Rich section. Hero and card selection are independent of gallery order. See [VISUAL-SPEC.md](VISUAL-SPEC.md).

Bilder från närområdet is shown at the published level whenever suitable local images exist and the section is not hidden. A local hero image may also appear in that section. A species does not need a local photograph to keep its approved level. The regional biological check in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md) does not change `publishedLevel`.

Sections can be hidden without deleting their content.

## Approved classification

Niclas locked this classification on 2026-10-22. It supersedes the earlier labels "recommended", "candidate", "proposed", and "start at rich" wherever this decision names a species. The species-by-species list is the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md).

| Statement | What it decides | What it does not decide |
| --- | --- | --- |
| Approved target level | The value to store as `publishedLevel` | Whether every module for that level already exists |
| Group floor or default | Animals are at least `rich`. A non-animal page is `core` unless this decision promotes it | A licence to invent a different level in the frontend |
| Capability | The 2026-10-17 audit note "Can support" | The stored level |
| Module status | `produced`, `not_produced`, or `not_relevant` for one section | The species level |

The stored value is explicit editorial metadata. Do not infer it from whichever modules exist. A Rich or Full species keeps that level when a module is temporarily `not_produced`.

### Animals

Mammals, birds, and fish are at least `rich`. Do not classify an animal as `core`.

Approved `full`: Lodjur, Älg, Gråsäl, Rödräv, Havsörn, and Strömming. Lodjur is the implemented Full reference. The other five are approved Full targets from the audited material. A missing documentary script does not lower them. Strömming's unresolved scientific name does not lower it.

Every other mammal, bird, and fish that has a prototype species page is approved `rich`.

### Fungi, trees, plants and berries

The default for a real prototype species page in these categories is `core`, unless this decision explicitly promotes the species.

Approved `rich`: Kantarell, Tall, and Lin. They are not a cap. A later editorial decision can promote another non-animal, but no other non-animal is Rich or Full in the locked list.

Every other fungus, tree, plant, or berry with a real prototype species page is approved `core`.

### Unpublished drafts

Hjortron, Blåbär, Havtorn, Karljohan, and Gran have a catalogue card and no species page. They stay unclassified while unpublished. Do not assign Core because the surrounding category defaults to Core. Give them a level only when enough editorial content exists.

## Do not copy the prototype code defaults

In `/design`, `lib/content-tiers.ts` defaults mammals, birds, and fish to `full`, and fungi, trees, and plants to `core`. Only `lodjur` and `lodjur-v2` are explicit overrides.

Do not migrate those code defaults, and do not recreate them in the frontend. Store the approved level from the matrix on each species. It is not a field on the category. See [TAXONOMY.md](TAXONOMY.md) and [SPECIES-AUDIT.md](SPECIES-AUDIT.md).

The prototype page order also differs from the table above: guide audio and Ask the Species are rendered before the introduction. Production uses the default order in this document unless an editor reorders a species.

## Prototype content to preserve without a new required section

The prototype has material that is not a canonical section in the table:

- Tracks and signs (`tracksSigns` on some species)
- Related species

Preserve that content during migration. Do not drop it, and do not add a new required public module for it in this specification. Tracks and signs can be carried as Fördjupning content and as tagged assets. Related species can remain a listing feature outside the level-controlled section list. The public presentation of both is intentionally unresolved.
