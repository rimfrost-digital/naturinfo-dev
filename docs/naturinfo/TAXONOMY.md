# Taxonomy

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md).

## Canonical categories

Naturinfo uses exactly these six categories. Store a stable internal id on each species. Display labels are localised and must not be used as the stored category value.

| Internal id | Swedish display label |
| --- | --- |
| `mammals` | Däggdjur |
| `birds` | Fåglar |
| `fish` | Fiskar |
| `fungi` | Svampar |
| `trees` | Träd |
| `plants_and_berries` | Växter & Bär |

These internal ids are the canonical values for the production model. They are independent of Swedish, English, German, or any later display label.

Species slug, scientific name, and category id are separate fields. The category id is not the URL slug. Slug rules are in [LOCALISATION.md](LOCALISATION.md).

## Labels

Swedish labels above are the phase-one public labels. Other languages may translate the display label later without changing the internal id or requiring a new species document.

Do not add, merge, or rename categories in the content model without changing this document. A species belongs to one canonical category.

## Prototype labels to map on migration

The prototype does not use one label per category. Map existing Swedish labels onto the ids above:

| Prototype label | Canonical id |
| --- | --- |
| Däggdjur | `mammals` |
| Fågel, Fåglar | `birds` |
| Fisk, Fiskar | `fish` |
| Svamp, Svampar | `fungi` |
| Träd | `trees` |
| Växt, Växter, Bär, Växter & Bär | `plants_and_berries` |

Do not keep the prototype's duplicate labels as separate categories.

The prototype also assigns default content levels by category. That is not taxonomy and must not be stored on the category or recreated in the frontend. Each species has its own `publishedLevel` from the locked matrix in [SPECIES-AUDIT.md](SPECIES-AUDIT.md). See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).
