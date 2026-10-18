# Sanity setup

This is the implemented dataset, preview, and migration setup. It supersedes the older planning note that one dataset was enough.

## Datasets

| Environment | Sanity dataset |
| --- | --- |
| Vercel Production, from `main` | `production` |
| Vercel Preview | `staging` |
| Local development | `staging` |

Inside a dataset, Sanity drafts and the native Publish action still decide whether a change is public. Preview reads the draft. The published page reads the published document.

The Lodjur pilot was published to `staging` only.

## Env vars

Names already used by the project and by Vercel:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_PROJECT_ID`
- `SANITY_API_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

Server-only names added for this pilot. They did not already exist. They are set for local development and for Vercel Preview and Development. They are not set on Vercel Production yet.

- `SANITY_PREVIEW_SECRET`
- `SANITY_REVALIDATE_SECRET`

Project id and dataset name are public. Tokens and the two secrets are not. Do not put tokens in `NEXT_PUBLIC_` variables or in Git. `.env.example` lists the names with empty values.

Local values come from the Preview environment, which points at `staging`:

```text
npx vercel env pull .env.local --environment=preview
```

The website uses `SANITY_API_READ_TOKEN` on the server. `SANITY_API_WRITE_TOKEN` is used only by the migration script.

## Migration

The script migrates Lodjur, the six category documents, and one empty `askSettings` document. It does not migrate any other species. Dry-run is the default and does not contact the dataset for writes.

```text
npm run migrate:lodjur
npm run migrate:lodjur -- --write
```

`--write` publishes to `staging`. A second `--write` reuses assets by their original prototype path and replaces `species.lodjur` with the same source mapping. `askSettings` is created only when it is missing, so an editorial master prompt is not wiped.

Production is refused unless both of these are present:

```text
--dataset production --confirm write-production-dataset
```

Do not use that pair for this pilot.

To compare draft preview with the published staging page:

```text
npm run migrate:lodjur -- --write --preview-draft
```

That adds one obvious preview sentence to `drafts.species.lodjur` only. Discard that draft in Studio when the comparison is done. A later `--write` without `--preview-draft` replaces the published document and leaves the draft as it is.

Missing files are logged and skipped. English and German text is stored with `translationStatus` `migrated`, never `approved`.

## Draft preview

Open the published page at `/art/lodjur`.

Enable draft mode with the server-only preview secret:

```text
/api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=lodjur
```

Leave draft mode at `/api/disable-draft?slug=lodjur`.

Draft mode reads with the read token and `perspective: "drafts"`, and it does not use the published cache. An unknown slug renders the not-found page. It is not redirected to Lodjur.

## Revalidation

Published species pages are cached in Next.js with the tags `species` and `species:<slug>`, for up to an hour if no webhook arrives. A Sanity webhook expires those tags immediately, so a publish does not need a new deployment.

The webhook route is `POST /api/revalidate?dataset=staging` on the preview deployment, and `?dataset=production` on the production deployment. The `dataset` value must match that deployment's dataset. The route checks the Sanity signature in `SANITY_REVALIDATE_SECRET` and ignores document ids that start with `drafts.`.

Next.js 16 requires a cache profile for `revalidateTag`. The route passes `{ expire: 0 }`, which drops the tagged cache now. A profile such as `"max"` would keep serving the previous page, so it does not fit on-demand publishing.

The scaffold's Sanity Live client is not mounted. Live updates fit an open Studio session. The published site stays cached until the webhook says a published document changed.

Create the webhook in Sanity against the deployed URL, with the same secret, and include the dataset query parameter. Filter it to publish events for `species` and `category`.

## Ask the Species

One `askSettings` document holds the shared master prompt. It is empty until an editor approves the wording. A species can add `ask.supplement` and `ask.personaNote`. The request is the master prompt, those optional notes, and the species' approved public fields. `ask.legacyPrompt` is stored for comparison and is not part of that request. This pilot does not call a model.
