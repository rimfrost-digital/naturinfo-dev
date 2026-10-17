# Audio and video spec

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md). Level visibility is in [CONTENT-LEVELS.md](CONTENT-LEVELS.md). Provenance fields are in [QA-AND-PUBLISHING.md](QA-AND-PUBLISHING.md).

## Video

The data model must support multiple videos per species. Public presentation initially publishes a maximum of one primary video per species. Additional videos may be stored without being public.

A video must add something still imagery cannot show: behaviour, movement, time, transformation, lifecycle, seasonal change, ecological interaction, feeding, or an equivalent change over time.

For plants, trees, and fungi, do not create meaningless moving-photograph videos. Use lifecycle, flowering, seed dispersal, decomposition, seasonal change, or ecological interaction when a video is relevant. If none of those is appropriate, mark video `not_relevant` rather than filling the module.

Apply the same geographic, species, and Version B accuracy rules as still images. See [VISUAL-SPEC.md](VISUAL-SPEC.md). Do not restyle authentic local footage to match generated imagery.

Existing evidence indicates Google Generative AI was used for at least some video. Do not fabricate an exact historical model name when it cannot be recovered.

## Documentary narration

Documentary narration is a dedicated listening script, not the page text read aloud.

Tone: accessible adult nature documentary. It must not be childified. See [TEXT-SPEC.md](TEXT-SPEC.md).

Aim for a consistent documentary voice identity across species and, where it remains technically convincing, across languages.

Store both the script or transcript and the finished audio. The script is linguistic and follows localisation rules. A shared voice identity does not mean one audio file serves every language.

Existing narration is known to contain ElevenLabs-generated material. ElevenLabs is an acceptable production tool. It is not a required API for the first production implementation. Audio may be produced externally and imported.

The prototype labels some of this audio "Lyssna på guiden" and hides mammal guide audio except for lodjur. Production uses the section CMS name Lyssna på dokumentären, shows it when the module is relevant, produced, and inside the published level, and does not copy the mammal-only exception.

## Species sounds

Species sounds may be AI-generated. They still have to be biologically credible for the correct species and for the regional context, and they must be reviewed before publication.

A subtle natural environment may be included. The species sound remains the clear focus. Do not turn it into a cinematic soundscape.

Documentary narration and species sounds do not need to use the same generation tool.

Do not publish a species-sound module for a species that has no credible sound, including trees and many plants and fungi, unless a real and relevant sound exists. Mark the module `not_relevant` instead of generating a decorative noise. The prototype contains empty sound entries for some species; empty entries are not produced content.

## Tools

Google generative tools and ElevenLabs are acceptable production tools. Other tools are allowed if the result meets this spec. No external generation API is required for the first production implementation.
