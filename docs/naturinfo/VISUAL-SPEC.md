# Visual spec

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md). Geographic and species accuracy in that document override every visual preference here.

## Asset library

Sanity is the curated species asset library. Upload an asset once and select it for hero, gallery, detail sections, cards, puffs, and other uses. Do not duplicate a file in order to use it in a second place.

Keep approved useful assets even when they are not currently public.

Asset workflow state uses these internal values:

| Internal value | Meaning |
| --- | --- |
| `public` | Eligible for public use |
| `hidden` | Kept, but not currently public |
| `archive` | Retained for reference, not in active use |
| `rejected` | Unsuitable; retained so it is not reused by mistake |

These are conceptual states. Studio labels may be translated. The stored values stay stable.

## Image roles

Hero selection, card or puff selection, and gallery order are independent.

- The card or puff image may be selected explicitly.
- If it is not selected, it falls back to the hero.
- Never fill a missing hero merely because some image exists. A hero must be a suitable image for that role.

Galleries support manual drag-and-drop ordering.

## Bildgalleri

Images in Bildgalleri open in a lightbox. The gallery layout itself stays as designed.

- Click, tap, or keyboard activation opens the enlarged image on a dark overlay.
- A close control closes the viewer. Clicking or tapping the overlay outside the image also closes it. Escape closes it.
- When the gallery has more than one image, previous and next controls are available. Left Arrow and Right Arrow move between images. A horizontal swipe does the same.
- The controls are keyboard accessible, and the image keeps its existing alt text.
- A caption and a photographer credit are shown in the viewer when that asset provides them. Missing text is not invented. The caption under the gallery image stays.
- The enlarged image is requested when the viewer opens that image. The gallery grid keeps its responsive images.
- Deep-dive images are not opened in this viewer. Bilder från närområdet is a separate section and is not lightboxed.

Assets support flexible descriptive tags. Expected tags include habitat, food, tracks, droppings, behaviour, young or life stage, season, and interaction. Tags are not a closed list; add a precise tag when it describes the image. Tags do not replace the geographic and species checks in the master context.

Alt text and captions are linguistic. See [LOCALISATION.md](LOCALISATION.md).

## Before generating new media

Inventory existing suitable assets and identify meaningful gaps before generating a new image or video. Do not generate redundant portraits to increase the image count.

Generated imagery should be educational and varied: habitat, behaviour, tracks, life stage, season, and interaction where those gaps are real. Accuracy overrides visual style.

## Generated visual direction

Where an image is generated, follow the established Version B direction:

- warm golden morning light
- natural photographic character
- credible Swedish nature, in the Kustvägen geographic context

Do not fabricate an exact historical model name when the original tool cannot be recovered. Provenance fields are defined in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md). Existing evidence indicates Google Generative AI was used for at least some imagery and video. For production planning, assume standard Google generative tools were used for existing Google-produced visual material when the exact product cannot be recovered.

## Local photographer material

Material from the local photographer is intended for use. The photographer's name is not fixed in this spec; store whatever source identity is known.

If a suitable local photographer image exists for a species, it has priority as hero. Authentic local photography supplied by the customer or the local photographer has that priority only when it is suitable. A customer image is a replaceable editorial asset, not a permanent part of the page.

Do not assume that every species needs a local photograph. Do not infer that an image is local from its filename. A name such as `naromradet` is not that evidence.

A current prototype or preview image may be used as suitable temporary production material when it shows the correct species, is biologically plausible for this region, does not show an obviously wrong subspecies or population, and does not imply an inappropriate habitat or geographic context. Replace it later from the species asset library when a better authentic image exists. That replacement is an editorial change in Sanity. It must not require a frontend change.

Do not AI-restyle or recolour authentic photographer material to force it into the generated visual style.

Local images may also appear in Bilder från närområdet. That section appears only when suitable local images exist. A local hero image may also appear there. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

Photographer, source, and rights information is always retained internally. Public credit is hidden by default and must be possible to enable per asset or per use without losing the internal record.

## Hero preference

When choosing a hero:

1. A suitable local photographer image, if one exists.
2. Otherwise an approved authentic image.
3. Otherwise an approved generated image.

Skip an image that exists but is not suitable. An empty hero is a production gap, not a reason to publish a misleading image.
