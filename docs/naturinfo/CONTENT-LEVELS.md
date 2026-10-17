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

Migration and publication do not require Full material. A species may be migrated and published at Core or Rich while Full modules are still missing or still need improvement. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

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

Level badges appear on species pages, archive cards, homepage species cards, and other species listings. A badge must be able to link to an explanation of the level system. The explanation destination is not fixed in this document.

The archive is filterable by level.

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

Bilder från närområdet is shown at the published level whenever suitable local images exist and the section is not hidden. A local hero image may also appear in that section.

Sections can be hidden without deleting their content.

## Do not copy prototype level defaults

In `/design`, `lib/content-tiers.ts` defaults whole categories to a tier: mammals, birds, and fish to `full`; fungi, trees, and plants to `core`. Only `lodjur` and `lodjur-v2` are explicit overrides. A comment in that file also says animals are minimum Rich, which does not match the code.

Do not migrate those category defaults as production levels. Set each species level from an editorial decision. Until that decision is made, do not invent levels for the golden-set candidates. Lodjur remains the Full mammal reference. See [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

The prototype page order also differs from the table above: guide audio and Ask the Species are rendered before the introduction. Production uses the default order in this document unless an editor reorders a species.

## Prototype content to preserve without a new required section

The prototype has material that is not a canonical section in the table:

- Tracks and signs (`tracksSigns` on some species)
- Related species

Preserve that content during migration. Do not drop it, and do not add a new required public module for it in this specification. Tracks and signs can be carried as Fördjupning content and as tagged assets. Related species can remain a listing feature outside the level-controlled section list. The public presentation of both is intentionally unresolved.
