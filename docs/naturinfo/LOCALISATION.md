# Localisation and URLs

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Phase one

Phase-one production is Swedish. Swedish is the authoritative production master and the default fallback.

The architecture must support additional languages without rebuilding the species model and without a separate species document per language.

The prototype already stores Swedish, English, and German fields on one species object (`sv`, `en`, `de` in `design/lib/species-pages-data.ts`). Where English or German content exists, migrate it into the species document. Do not discard it, and do not reduce it to external reference material.

Existing English and German content is migrated translation content. It is not automatically a verified or final translation. Before those languages are treated as launch-ready, review and improve them against the approved Swedish master.

Migrating that text is not a decision to launch English or German in phase one. Missing or unreviewed translations must not block migration of the species.

## One species document

One canonical species document contains and manages its localised content. Do not create independent species documents for Swedish, English, and German.

Shared across languages:

- images and other non-linguistic media
- video, where the picture does not depend on language
- species sounds that are not speech
- internal ids, slug, scientific name
- taxonomy
- content level, module relevance, section order, and manual hiding
- geodata and other non-linguistic data
- internal provenance, rights, and source references

Localised:

- names, where the common name differs by language
- species text, quick facts, and public headings
- captions and alt text
- documentary scripts and documentary audio
- Ask the Species copy, preset questions, and prompt text
- other linguistic content, including quiz text when quiz is localised

A documentary voice identity may be shared. The audio file and script are not shared across languages.

Future CMS editing should make it easy to see and edit languages from the same species record, section by section.

Translation completion and staleness tracking may be added when additional languages are introduced. Do not build that tracking for Swedish-only phase one. The later review of migrated English and German against the Swedish master is an editorial pass. It is not a migration gate.

## Visitor language

When a visitor reaches a permanent species URL in the future, supported browser-language detection may select the language. Otherwise offer a language choice, or fall back to Swedish.

Swedish is always the default fallback. Missing translation for a field falls back to Swedish rather than to an empty string or to another species.

## Permanent URLs

Species need stable permanent URLs:

```text
/art/[slug]
```

Example: `/art/lodjur`.

Treat the slug as a long-lived identifier suitable for future printed QR codes. Do not change a published slug without a redirect from the old slug. Do not implement QR analytics or tracking now.

The slug is shared across languages. It is not translated when the display name is translated. Preserve existing prototype slugs that already identify a species, including ascii forms such as `lodjur` and `havsorn`.

Existing prototype URLs such as `/art?namn=lodjur` must redirect to the canonical URL `/art/lodjur`. A missing or unknown `namn` must not redirect to lodjur.

`lodjur-v2` exists in the prototype as a second key. It is not established here as a second public species. Do not mint `/art/lodjur-v2` as a permanent QR target unless a later editorial decision says it is a distinct species.
