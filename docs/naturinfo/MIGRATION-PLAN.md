# Migration plan (planning)

Status: proposal only. No migration has been run.

Read [SANITY-CONTENT-MODEL.md](SANITY-CONTENT-MODEL.md) for the target shape and [SPECIES-AUDIT.md](SPECIES-AUDIT.md) for the species-by-species state. Specs in this folder win over the prototype.

## Sources

| Source | What it is |
| --- | --- |
| `design/lib/species-pages-data.ts` | 59 species pages plus the `lodjur-v2` variant. Body text, facts, media paths, Ask copy, prompts |
| `design/lib/species-data.ts` | Archive cards for 64 slugs. Five of them have no page |
| `design/lib/content-tiers.ts` | Prototype tier defaults. Not content |
| `design/app/art/page.tsx` | Species-sound map, lodjur fallback, section order, staging behaviour. Mostly application logic |
| `design/components/species-section.tsx` | Homepage "Utvalda arter" list |
| `design/lib/quiz-data.ts` | Two site quizzes. Not species content |
| `design/public/images`, `audio`, `video` | Files. A path in data is not proof the file exists, and a file is not proof it is final |

## What migrates directly

For each real species page:

- slug, scientific name, Swedish category mapped to a category id
- `commonName`, introduction, quote, meta description and quick facts in `sv`, `en` and `de`
- deep-dive cards, including their images, alt text and captions
- hero image and its localised alt text
- gallery stills that point at a file which exists
- related species, once those species exist
- Ask title, intro and preset questions in all three languages
- homepage and archive priority where a list already exists

English and German text migrates whenever the field is non-empty. Set `translationStatus` to `migrated`. Do not set `approved`. Swedish stays the master. Do not drop a translation because it has not been reviewed.

## What must be transformed

| Prototype | Migration |
| --- | --- |
| Category labels `Fågel`/`Fåglar`, `Fisk`/`Fiskar`, `Svamp`/`Svampar`, `Växt`/`Bär` | One category id. See [TAXONOMY.md](TAXONOMY.md) |
| Category tier defaults in `content-tiers.ts` | Ignore that file. Store the approved `publishedLevel` from the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). Do not recreate those defaults in the frontend |
| Gallery items that are videos | Video assets, not gallery images |
| `gravling` item `gravling-video-placeholder` | Drop the placeholder. Do not create a video. Grävling has no video file |
| Audio URL with no file | Do not mark documentary `produced`. Keep the path in an import note |
| Gallery alt strings, Swedish only | Swedish alt. Leave `en` and `de` empty |
| Archive or homepage image path that differs from the page hero | Keep both files. Set `cardImage` only when the card path is actually different. The migration script must compare paths; this plan does not list every mismatch |
| Species sounds hardcoded in `app/art/page.tsx` | `speciesSound` on the species. UI labels containing "(exempel)" stay `workflow` not-final |
| Embedded fact prompts | `ask.legacyPrompt` for comparison. Production uses the shared master prompt plus structured species fields. Do not create 59 full prompts |
| `content.sections` on Lin | Deep-dive cards without images. Lin has no `detailsGrid` |
| Spår och spillning on Lodjur and Älg | Preserve the text and images as internal sign entries or deep-dive cards. Do not invent a new public section |
| Default section order | Spec order, not the prototype render order (audio and chat currently appear before the introduction) |
| Filenames containing `naromradet` | Keep the file. Do not set `localPhotographer`, and do not place it in Bilder från närområdet, based on the filename |

## What to preserve but mark for later review

- Every existing image that a page or card references. `workflow: public` is allowed for migration only as "eligible", not as "art-directed and fact-checked". Provenance stays empty
- Swedish documentary audio files that exist on disk. Record them as "audio exists, script/transcript missing". The documentary is not missing. The script field stays empty until a transcript is written or recovered. The module can be stored before it is published at Full
- Species-sound files. Several are explicitly example sounds in the prototype UI
- English and German copy, status `migrated`
- `lodjur-v2` text and its four images, as a non-public legacy variant on Lodjur
- Unused files under `design/public`, including `images/proposals`. Do not bulk-upload them onto species. Leave them in the repo until an editor attaches or rejects them
- Ask prompts that contain real facts, in `legacyPrompt`

A file existing does not make an AI-generated image, video or sound final. The repo contains no photographer credit and no model name. Never infer a verified local-photographer or local-area asset from a filename such as `naromradet`.

## What must not become content

- The lodjur fallback in `app/api/prata-med-naturen/route.ts` and the `namn = "lodjur"` default
- `mode=staging` as stored content. Preview is a delivery mode
- Hardcoded Swedish heading "Bilder från närområdet" on every gallery. That heading belongs only to the local-image section, and only after a local image is identified by source rather than by filename
- Mammal-only rule that hides guide audio except for Lodjur
- Tier display strings Core / Rich / Full as schema values
- The chat model name `openai/gpt-5.4-mini`
- The string `[AI RESPONSE DATA PLACEHOLDER]`
- Prompts that only say "använd bara fakta från X sida"
- Quiz questions, until a later site-level task
- Cycling fact icons, colours, and other layout

## Lodjur-v2

`lodjur-v2` is the only page key that is not an archive species. It is the same species: same scientific name, same Swedish name, different copy and a second image set (`lodjur-v2-hero.jpg`, unge, spår, spillning).

Do not create `/art/lodjur-v2`.

Keep the current `lodjur` document as the Swedish master. Attach the v2 images to that document with `workflow: hidden` and `legacyPath` set. Store the v2 text in `legacyVariants` so it is not discarded and cannot render.

The two texts disagree on details such as diet and body size. That is an editorial reconciliation against the Swedish master, not an automatic overwrite in either direction.

The v2 page reuses `/audio/lodjur-sv.mp3` and the lynx sound. Do not duplicate those files.

## English and German

All 59 species pages have a non-empty Swedish, English and German introduction. Migrate all three.

No English or German documentary audio file exists in `design/public/audio`. Thirteen later species (Lin and twelve birds from Bofink through Smålom) have `en` and `de` audio paths, and Swedish paths, but the files are not in the repo. Migrate the text. Do not mark those audio modules produced.

`translationStatus` starts at `migrated`. Launch-ready only after a later review against the approved Swedish master.

## Published level at import

Niclas locked the classification on 2026-10-22. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md) and the matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). This supersedes "recommended", "candidate", "proposed", and "start at rich" for the species named there.

The stored level and the production state of each module stay separate. A missing script, a missing video, or an example sound is a content gap. It does not demote an approved Rich or Full species. Strömming's unresolved scientific name does not change its Full classification.

Import `publishedLevel` from the matrix:

- `full`: Lodjur, Älg, Gråsäl, Rödräv, Havsörn, Strömming. Lodjur is already `full` on staging.
- `rich`: every other mammal, bird, and fish, plus Kantarell, Tall, and Lin.
- `core`: every other fungus, tree, plant, and berry that has a real prototype species page.
- Unclassified: Hjortron, Blåbär, Havtorn, Karljohan, and Gran. Unpublished drafts. Do not assign Core because the category default is Core.

Where documentary audio or a species sound exists, store it, including on a species whose approved level is `rich`. Preview can show a higher composition. The public level stays the approved value.

## Migration sequence

1. Categories, then Lodjur, including the hidden v2 variant. This proves one document, three languages, asset roles, level and preview.
2. The rest of the migration control set, with the levels already locked: Havsörn and Strömming as `full`, Kantarell, Tall, and Lin as `rich`. See the Golden Set note in the audit. Their levels are no longer recommendations.
3. Other mammals that already have Swedish documentary audio: Älg, Brunbjörn, Varg, Järv, Grävling, Rådjur, Gråsäl, Rödräv.
4. Remaining fish, plus Fiskgjuse and Spillkråka. They have real pages, video and Ask copy. They do not have a documentary audio file. Strömming does, and its missing piece is the script, not the recording.
5. The repeated template pages: remaining fungi, trees, plants and the later birds. One importer path should cover them. They are similar on purpose.
6. The five card-only drafts, last. They must not block the CMS or the frontend.

Frontend work can start after step 1 and 2. Steps 3–6 do not require new images, narration or species sounds.

A prototype or preview image may be imported as temporary production material when it passes the media rule in [VISUAL-SPEC.md](VISUAL-SPEC.md): correct species, biologically plausible for this coast and landscape, no obviously wrong subspecies or population, and no inappropriate habitat. Do not wait for a local photograph before import. Do not mark an image local because of its filename.

Before the species is called production-ready, complete the regional biological check in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md). That check does not change the locked `publishedLevel` in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). An unclassified draft stays unclassified.

## Gaps that can wait

- Scripts and transcripts. Where a Swedish documentary recording already exists, the gap is "audio exists, script/transcript missing", not a missing documentary
- English and German narration
- Species sounds beyond the files already in the repo
- Replacing a plausible prototype image with a later authentic one. Import need not wait for that replacement. The regional check is still required before the species is production-ready. A filename containing `naromradet` is not evidence that the file is local
- Identifying which images, if any, are the local photographer's. The repo does not say, and filenames must not be used as that identification
- Optional species-specific Ask supplements. The shared master prompt plus structured species content covers production. The 25 placeholders and 14 page-reference prompts do not need to be rewritten into 59 full prompts
- Page copy for the five card-only species
- Choosing public names and icons for the three levels
- Fact-check dates and source notes
- Reconciling Lodjur with the v2 text
- Verifying Strömming's scientific name. The species page and Ask prompt say `Clupea harengus membras`. The archive card says `Clupea harengus`. Migration must record both and their sources, leave `scientificName` empty, and must not silently pick either name
- Quiz in the CMS
- Bulk review of unreferenced prototype files

## Datasets

The earlier planning note that one dataset was enough is superseded. Naturinfo uses two datasets:

- `production` is the dataset for Vercel Production, which deploys from `main`.
- `staging` is the dataset for Vercel Preview and for local development.

Drafts and the native Publish action still separate an unpublished edit from the published document inside whichever dataset the deployment reads. The second dataset is the environment split, not a replacement for drafts.

The Lodjur pilot migration targets `staging` unless the script is given both `--dataset production` and `--confirm write-production-dataset`. See [SANITY-SETUP.md](SANITY-SETUP.md).

## What Syed needs to set up in Sanity

Infrastructure and access only. Not the content model. The project, both datasets, and the Vercel environments are already connected. The list below is the record of that setup, not a request to create a second project.

1. A Sanity project for Naturinfo.
2. Two datasets, `production` and `staging`, as described above.
3. Studio is mounted from this repository at `/studio`. The schema is not built by hand in Sanity's hosted studio.
4. CORS origins for local development (`http://localhost:3333` and the app's local origin) and, when the hostnames exist, the preview and public sites.
5. An editor or admin membership for the person who will deploy the Studio from this repository and run the migration.
6. Two API tokens, delivered outside chat through the team's secret store or a gitignored env file:
   - one write-capable token for migration and content writes where a token is required
   - one read-capable token for the public site
7. The project id, dataset name and Studio URL, which are not secrets and can be written down for the repo.

The Sanity schema lives in this repository, in the Studio code, and is deployed from there. A content token does not provide schema write access, and the schema should not be recreated through the Sanity API.

Confirm, without pasting secrets:

- the project can store the existing mp3 and mp4 files, or tell us the asset limit if it cannot
- who is admin
- which origins were added

Do not:

- create species, categories or objects in the Studio UI
- paste tokens into chat, issues or the repository
- choose a model vendor or generate media
- treat this planning document as something to retype as the schema
- describe or create a token whose purpose is "schema write access"

After those credentials exist, the schema is deployed from this repository and the migration is run from here.
