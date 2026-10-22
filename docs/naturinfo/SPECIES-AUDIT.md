# Species content audit (planning)

Audit date: 2026-10-17. Source: `/design` as read-only. No species was opened in a browser, and no media file was judged for biological accuracy.

"Usable" here means the text or file is present and structurally complete enough to migrate. It does not mean fact-checked, and it does not mean an AI-generated asset is final. The repository stores no provenance and no photographer credit.

Prototype code defaults are `full` for mammals, birds, and fish, and `core` for fungi, trees, and plants, with only Lodjur overridden. They are recorded so they are not mistaken for the approved levels. Niclas locked the classification on 2026-10-22. The canonical list is [the approved classification matrix](#approved-classification-matrix). It supersedes "recommended", "candidate", "proposed", and "start at rich". The tables before that matrix are the 2026-10-17 capability audit.

The older "Can support" column is capability from the 2026-10-17 audit. It is not `publishedLevel`. A template fungus, tree, or plant that can support Rich is approved Core unless the matrix says Rich. Mammals, birds, and fish are at least Rich. A missing module does not demote an approved Rich or Full species.

## Counts

| | Count |
| --- | --- |
| Species pages | 59 |
| Extra page key `lodjur-v2` | 1, not a second species |
| Archive cards | 64 |
| Cards with no page | 5 |
| Pages with Swedish, English and German introductions | 59 |
| Pages whose hero file exists | 59 |
| Pages with a video file | 33 |
| Pages with a Swedish documentary audio file | 11, plus v2 reusing Lodjur's file |
| English or German audio files on disk | 0 |
| Scripts or transcripts for that documentary audio | 0. The audio itself exists; the gap is "audio exists, script/transcript missing" |
| Species-sound files wired in the page component | 10 species |
| Ask prompts with real embedded facts | 20 species, plus the v2 prompt |
| Ask prompts that only point at "the page" | 14 |
| Ask prompts that are the placeholder `[AI RESPONSE DATA PLACEHOLDER]` | 25 |

## How to read a row

- Text: present in all three languages unless a row says otherwise. Status for EN/DE is migrated, not verified.
- Images: count of distinct image paths on the page whose files exist. All of them need a later visual review.
- Video: `file` means the mp4 exists. `no` means there is no video. `placeholder` means the data names a video that is not a file.
- Documentary: `audio exists, script missing` means the Swedish recording is in the repo and the script or transcript is not. That is not a missing documentary. `path only` means the data names audio files that are not in the repo, so the recording is absent. `no` means no narration recording was found.
- Sound: from the hardcoded map in `design/app/art/page.tsx`, not from the species record. `example` means the prototype label says "(exempel)".
- Ask: `review` means an imported prompt contains facts worth keeping in `legacyPrompt` for comparison. Production does not need that prompt. It uses one shared master prompt plus the species' structured Sanity fields, with an optional species supplement. `page-ref` means the prototype tells the model to use a page that is not sent. `placeholder` means the prototype prompt is empty. Neither of those needs to become its own full prompt.

## Mammals

Lodjur, Älg, Gråsäl, and Rödräv are approved Full. The other mammals are approved Rich, not Core. Where the documentary column says `audio exists, script missing`, the recording is present and the transcript is not. That gap does not lower the approved level. An example species sound stays a content gap.

| Species | Images | Video | Documentary | Sound | Ask | Can support |
| --- | --- | --- | --- | --- | --- | --- |
| Lodjur `lodjur` | 9 | file `lodjur.mp4` | audio exists, script missing | file | review | Confirmed initial Full reference. Also has spår content |
| Älg `alg` | 6 | file | audio exists, script missing | file | review | Full material. Has spår content |
| Brunbjörn `brunbjorn` | 3 | file | audio exists, script missing | example | review | Full material |
| Varg `varg` | 3 | file | audio exists, script missing | example | review | Full material |
| Järv `jarv` | 3 | file | audio exists, script missing | example | review | Full material |
| Grävling `gravling` | 3 | placeholder, no file | audio exists, script missing | example | review | Full audio, but video is missing |
| Rådjur `radjur` | 3 | file | audio exists, script missing | example | review | Full material |
| Gråsäl `grasal` | 3 | file | audio exists, script missing | file | review | Full material |
| Rödräv `rodrav` | 5 | file `rodrav-galleri.mp4` | audio exists, script missing | file | review | Full material |

`lodjur-v2` is not a row. See [MIGRATION-PLAN.md](MIGRATION-PLAN.md). Its text is longer than the current Lodjur introduction and disagrees on diet and size. Preserve it as a hidden variant.

## Birds

| Species | Images | Video | Documentary | Sound | Ask | Can support |
| --- | --- | --- | --- | --- | --- | --- |
| Havsörn `havsorn` | 5 | file `havsorn.mp4` | audio exists, script missing | file | review | Approved Full. Script/transcript still missing |
| Fiskgjuse `fiskgjuse` | 4 | file | no | no | review | Rich. Ask facts exist; narration file does not |
| Spillkråka `spillkraka` | 4 | file | no | no | review | Rich |
| Bofink `bofink` | 3 | file | path only, sv/en/de | no | page-ref | Rich |
| Gråtrut `gratrut` | 3 | file | path only | no | page-ref | Rich |
| Tjäder `tjader` | 3 | file | path only | no | page-ref | Rich |
| Gråspett `graspett` | 3 | file | path only | no | page-ref | Rich |
| Orre `orre` | 3 | file | path only | no | page-ref | Rich |
| Lappuggla `lappuggla` | 3 | file | path only | no | page-ref | Rich |
| Gråhäger `grahager` | 3 | file | path only | no | page-ref | Rich |
| Nattskärra `nattskarra` | 3 | file | path only | no | page-ref | Rich |
| Koltrast `koltrast` | 3 | file | path only | no | page-ref | Rich |
| Domherre `domherre` | 3 | file | path only | no | page-ref | Rich |
| Nötskrika `notskrika` | 3 | file | path only | no | page-ref | Rich |
| Smålom `smalom` | 3 | file | path only | no | page-ref | Rich |

The twelve birds from Bofink to Smålom share one template: three detail cards, a video whose filename contains `naromradet`, a broken Ask prompt, and audio paths with no files. The filename is not evidence that the video is a verified local-area or local-photographer asset. Their page text is still real and should migrate.

Havsörn is the only bird with both a narration file and a species sound.

## Fish

Species sound is not required for these species. None of them have one.

| Species | Images | Video | Documentary | Ask | Can support |
| --- | --- | --- | --- | --- | --- |
| Strömming `stromming` | 5 | file `stromming.mp4` | audio exists, script missing | review | Approved Full. Script/transcript still missing. Scientific name is a separate unresolved issue |
| Gädda `gadda` | 3 | file | no | review | Rich |
| Abborre `abborre` | 3 | file | no | review | Rich |
| Öring `oring` | 3 | file | no | review | Rich |
| Sik `sik` | 3 | file | no | review | Rich |
| Lax `lax` | 3 | file | no | review | Rich |
| Ål `al` | 3 | file | no | review | Rich |

Strömming's scientific name is unresolved and must stay flagged. The species page field `scientificName`, and the Ask prompt, say `Clupea harengus membras`. The archive card in `species-data.ts` says `Clupea harengus`. Migration must record both strings and their sources, leave the public `scientificName` empty, and must not silently choose either name. A later factual check decides.

## Fungi

No narration and no species sound. That is acceptable for Rich. Video is not required.

| Species | Images | Video | Ask | Can support |
| --- | --- | --- | --- | --- |
| Kantarell `kantarell` | 5 | file `kantarell.mp4` | review | Approved Rich. Video still needs review against the "no moving photograph" rule |
| Fjällig bläcksvamp `fjallig-blacksvamp` | 3 | no | placeholder | Rich |
| Fjällig taggsvamp `fjallig-taggsvamp` | 3 | no | placeholder | Rich |
| Röd flugsvamp `rod-flugsvamp` | 3 | no | placeholder | Rich |
| Fnöskticka `fnoskticka` | 3 | no | placeholder | Rich |
| Fårticka `farticka` | 3 | no | placeholder | Rich |
| Vårtig röksvamp `vartig-roksvamp` | 3 | no | placeholder | Rich |

## Trees

| Species | Images | Video | Deep dive | Ask | Can support |
| --- | --- | --- | --- | --- | --- |
| Tall `tall` | 5 | file `tall-kustvagen.mp4` | no cards; Swedish intro is about 960 characters | page-ref | Approved Rich. Fördjupning still needs to be structured |
| Rönn `ronn` | 3 | no | 3 cards | placeholder | Rich |
| Sälg `salg` | 3 | no | 3 cards | placeholder | Rich |
| Gråal `graal` | 3 | no | 3 cards | placeholder | Rich |
| Björk `bjork` | 3 | no | 3 cards | placeholder | Rich |
| Asp `asp` | 3 | no | 3 cards | placeholder | Rich |

Species sound is not relevant for these trees. Do not generate one to reach Full.

## Växter & Bär

| Species | Images | Video | Deep dive | Ask | Can support |
| --- | --- | --- | --- | --- | --- |
| Lin `lin` | 4 | file | 3 text sections, no image cards | page-ref | Approved Rich. Audio paths exist and the files do not |
| Skogssmultron `skogssmultron` | 3 | no | 3 cards | placeholder | Rich |
| Skogshallon `skogshallon` | 3 | no | 3 cards | placeholder | Rich |
| Enbär `enbar` | 3 | no | 3 cards | placeholder | Rich |
| Lingon `lingon` | 3 | no | 3 cards | placeholder | Rich |
| Kråkbär `krakbar` | 3 | no | 3 cards | placeholder | Rich |
| Linnéa `linnea` | 3 | no | 3 cards | placeholder | Rich |
| Humleblomster `humleblomster` | 3 | no | 3 cards | placeholder | Rich |
| Harsyra `harsyra` | 3 | no | 3 cards | placeholder | Rich |
| Ljung `ljung` | 3 | no | 3 cards | placeholder | Rich |
| Liten blåklocka `liten-blaklocka` | 3 | no | 3 cards | placeholder | Rich |
| Rundsileshår `rundsileshar` | 3 | no | 3 cards | placeholder | Rich |
| Rödblära `rodblara` | 3 | no | 3 cards | placeholder | Rich |
| Ängskovall `angskovall` | 3 | no | 3 cards | placeholder | Rich |
| Åkervädd `akervadd` | 3 | no | 3 cards | placeholder | Rich |

Lingon is one of the six homepage cards. That is surface priority, not a judgement that Lingon is the strongest plant page. Lin has the longer text and the only plant video.

## Archive cards without a page

Migrate as unpublished drafts. Image path only. No introduction, facts, translation, video, audio or Ask content.

| Species | Slug | Category |
| --- | --- | --- |
| Hjortron | `hjortron` | plants_and_berries |
| Blåbär | `blabar` | plants_and_berries |
| Havtorn | `havtorn` | plants_and_berries |
| Karljohan | `karljohan` | fungi |
| Gran | `gran` | trees |

Whether those image files are suitable heroes was not judged. The migration should check that the file exists and keep it either way.

## Homepage priority, not a quality ranking

Hardcoded in `design/components/species-section.tsx`:

1. Älg
2. Havsörn
3. Gädda
4. Kantarell
5. Tall
6. Lingon

Migrate these numbers to `homepagePriority`. Do not use this list as the Golden Set.

## Golden set

The Golden Set is a migration and QA control set, not a limit on who may be Full or Rich. Its six species are locked:

| Role in the control set | Species | Approved level |
| --- | --- | --- |
| Full mammal reference | Lodjur | FULL. Already implemented on staging |
| Full bird | Havsörn | FULL |
| Full fish | Strömming | FULL |
| Rich fungus | Kantarell | RICH |
| Rich tree | Tall | RICH |
| Rich plant | Lin | RICH |

Älg, Gråsäl, and Rödräv are also approved Full. They were not part of this control set. Björk, Rönn, and Lingon remain thinner template pages. Their approved level is Core. Do not swap them into the control set in place of Tall, Kantarell, or Lin.

## Approved classification matrix

This is the canonical migration list for all 64 catalogue species. Counts: 6 FULL, 28 RICH, 25 CORE, 5 UNCLASSIFIED DRAFT. Total 64. Real prototype pages: 59. Catalogue-only species: 5.

`publishedLevel` to store: `full`, `rich`, or `core`. The five drafts have no level yet. Only Lodjur is migrated, and its staging value is already `full`.

### Mammals

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Lodjur | Däggdjur | yes | FULL | Migrated to staging | Documentary script missing. v1 and v2 text disagree | Implemented Full reference. `lodjur-v2` is a hidden variant, not a second species |
| Älg | Däggdjur | yes | FULL | Not migrated | Documentary script missing | Homepage priority. Has tracks content |
| Brunbjörn | Däggdjur | yes | RICH | Not migrated | Documentary script missing. Species sound is marked example | |
| Varg | Däggdjur | yes | RICH | Not migrated | Documentary script missing. Species sound is marked example | |
| Järv | Däggdjur | yes | RICH | Not migrated | Documentary script missing. Species sound is marked example | |
| Grävling | Däggdjur | yes | RICH | Not migrated | Documentary script missing. Species sound is marked example. Video is a placeholder with no file | Do not invent a video |
| Rådjur | Däggdjur | yes | RICH | Not migrated | Documentary script missing. Species sound is marked example | |
| Gråsäl | Däggdjur | yes | FULL | Not migrated | Documentary script missing | Real species-sound file |
| Rödräv | Däggdjur | yes | FULL | Not migrated | Documentary script missing | Real species-sound file |

### Birds

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Havsörn | Fåglar | yes | FULL | Not migrated | Documentary script missing | Homepage priority. Only bird with narration and a species sound |
| Fiskgjuse | Fåglar | yes | RICH | Not migrated | No documentary audio file | Ask facts exist |
| Spillkråka | Fåglar | yes | RICH | Not migrated | No documentary audio file | |
| Bofink | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Template page. `naromradet` in a filename is not a local-photographer proof |
| Gråtrut | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Tjäder | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Gråspett | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Orre | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Lappuggla | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Gråhäger | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Nattskärra | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Koltrast | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Domherre | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Nötskrika | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |
| Smålom | Fåglar | yes | RICH | Not migrated | Documentary paths, no files. Ask prompt only points at the page | Same template |

### Fish

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Strömming | Fiskar | yes | FULL | Not migrated | Documentary script missing. Scientific name unresolved | Homepage is not this species. Do not choose between `Clupea harengus membras` and `Clupea harengus` during migration |
| Gädda | Fiskar | yes | RICH | Not migrated | No documentary audio | Homepage priority |
| Abborre | Fiskar | yes | RICH | Not migrated | No documentary audio | |
| Öring | Fiskar | yes | RICH | Not migrated | No documentary audio | |
| Sik | Fiskar | yes | RICH | Not migrated | No documentary audio | |
| Lax | Fiskar | yes | RICH | Not migrated | No documentary audio | |
| Ål | Fiskar | yes | RICH | Not migrated | No documentary audio | |

### Fungi

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Kantarell | Svampar | yes | RICH | Not migrated | No narration or species sound, which is acceptable at Rich. Video still needs the moving-photograph review | Homepage priority. Explicitly promoted above the Core default |
| Fjällig bläcksvamp | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Fjällig taggsvamp | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Röd flugsvamp | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Fnöskticka | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Fårticka | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Vårtig röksvamp | Svampar | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Karljohan | Svampar | no | UNCLASSIFIED DRAFT | Not migrated | No page text, facts, translation, video, audio, or Ask content | Do not assign Core while it is only a card |

### Trees

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Tall | Träd | yes | RICH | Not migrated | Deep-dive cards are not structured. Ask prompt only points at the page. Species sound is not relevant | Homepage priority. Explicitly promoted above the Core default |
| Rönn | Träd | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | Thinner template page. Not a substitute for Tall |
| Sälg | Träd | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Gråal | Träd | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Björk | Träd | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | Thinner template page. Not a substitute for Tall |
| Asp | Träd | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Gran | Träd | no | UNCLASSIFIED DRAFT | Not migrated | No page text, facts, translation, video, audio, or Ask content | Do not assign Core while it is only a card |

### Växter & Bär

| Species | Category | Has real prototype page? | Approved target level | Migration state | Important content gaps | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Lin | Växter & Bär | yes | RICH | Not migrated | Documentary audio paths have no files. Ask prompt only points at the page | Explicitly promoted above the Core default |
| Skogssmultron | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Skogshallon | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Enbär | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Lingon | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | Homepage priority. That priority is not a Rich classification |
| Kråkbär | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Linnéa | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Humleblomster | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Harsyra | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Ljung | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Liten blåklocka | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Rundsileshår | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Rödblära | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Ängskovall | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Åkervädd | Växter & Bär | yes | CORE | Not migrated | No video. Ask prompt is a placeholder | |
| Hjortron | Växter & Bär | no | UNCLASSIFIED DRAFT | Not migrated | No page text, facts, translation, video, audio, or Ask content | Do not assign Core while it is only a card |
| Blåbär | Växter & Bär | no | UNCLASSIFIED DRAFT | Not migrated | No page text, facts, translation, video, audio, or Ask content | Do not assign Core while it is only a card |
| Havtorn | Växter & Bär | no | UNCLASSIFIED DRAFT | Not migrated | No page text, facts, translation, video, audio, or Ask content | Do not assign Core while it is only a card |

## What the audit could not decide

- Which images or videos are the local photographer's. Filenames containing `naromradet` are not that evidence. A missing local photograph does not change the locked level. The regional check in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md) is required before production-ready and is not a reclassification
- Which generated files are accurate enough to stay public
- Whether videos, including those named `naromradet` and `kantarell.mp4`, show real change over time or are moving photographs
- Whether the example species sounds are biologically credible
- Whether English and German sentences match the Swedish master
- The correct Lodjur figures where v1 and v2 disagree
- Strömming's scientific name: `Clupea harengus membras` on the species page and in the Ask prompt, `Clupea harengus` on the archive card. Neither may be chosen silently at migration. The Full classification stands either way
- File-size limits for the mp4s in Sanity
