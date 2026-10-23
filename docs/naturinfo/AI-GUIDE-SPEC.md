# AI guide spec

Governed by [MASTER-CONTEXT.md](MASTER-CONTEXT.md). This spec covers Ask the Species and the site quiz. It does not define page copy; see [TEXT-SPEC.md](TEXT-SPEC.md).

## Ask the Species

CMS section name: Fråga djuret. Section id: `ask_species`. It is a Full-level module when it is relevant. See [CONTENT-LEVELS.md](CONTENT-LEVELS.md).

This is a species-specific nature-guide experience, not a general chatbot.

It should:

- answer in first person as the species
- have a subtle, species-appropriate personality
- remain factual rather than becoming a cartoon character
- primarily use approved Naturinfo species content and verified facts
- allow safe, well-established complementary biological knowledge when appropriate
- stay anchored to the species and to the Naturinfo geographic context
- redirect or refuse irrelevant questions
- explicitly admit uncertainty rather than inventing an answer
- use simpler family- and child-friendly language than the main adult species content

Language for the conversation follows the active locale. Swedish is the fallback. See [LOCALISATION.md](LOCALISATION.md).

### Context the model must actually receive

Production must provide the model with the approved species context it is allowed to use: the relevant approved text for that species, and any explicitly approved facts. Scope and safety instructions alone are not enough.

Do not tell the model to use page content that is not included in the request.

Unknown species or slug must never silently fall back to lodjur. If the species cannot be resolved, the experience fails clearly. It must not answer as a lynx.

### What the prototype does, and what not to copy

The prototype route `design/app/api/prata-med-naturen/route.ts` defaults a missing `namn` to `lodjur`, and uses the lodjur system prompt when the slug is unknown. The species page also defaults a missing `namn` query to lodjur. Do not reproduce either fallback. Canonical routing is `/art/[slug]`; see [LOCALISATION.md](LOCALISATION.md).

Many later prototype prompts say to use only the facts on that species page ("använd bara fakta från tallens sida" and the same pattern for lin, bofink, and others). The route does not send the page content. Those prompts are the defect this spec forbids.

Earlier mammal prompts embed a short fact list and a strongly child-directed voice, including emoji and playful wording. Reuse the useful behaviour: first person, regional anchoring, short clear answers, off-topic redirection, and an honest "I don't know". Do not treat the cartoon tone, the emoji instruction, or a hardcoded fact list as the production design. Personality stays subtle. Facts should come from approved species content supplied to the model, with complementary biological knowledge only when it is safe and well established.

The prototype UI for the conversation may be reused where it still fits Fråga djuret. The prototype public label "Prata med naturen" is not the required public heading. Public headings can be overridden per species.

### Opening line

The animal speaks as one individual of the species, not as if the species name were its personal name. Swedish uses the indefinite form, for example "Jag är ett lodjur", "Jag är en havsörn", "Jag är en älg", and "Jag är en gädda". Do not produce that form by guessing `en` or `ett` from the name. The indefinite wording is editorial. The Lodjur customer preview opens with "Hej! Jag är ett lodjur. Vad vill du veta?"

### Species sound and page ending

When a produced species sound exists and Fråga djuret is shown, the sound control sits in the Fråga djuret header. It is not a separate block above the section. If there is no sound, show no empty control. The audio file is loaded when the visitor plays it.

Fråga djuret is the last major interactive section. After it, the page leaves clear space on the paper background before the catalogue return and the site footer, so the conversation does not run into that ending.

No production model vendor is chosen in this document. The prototype calls `openai/gpt-5.4-mini`. That is not a requirement.

## Quiz

Quiz is a site-level experience, not a per-species module.

The prototype has two static quizzes on the quiz page:

| Id | Title | Role |
| --- | --- | --- |
| `easy` | Lilla naturquizet | Simpler variant, 5 questions |
| `challenge` | Naturutmaningen | Harder variant, 10 questions |

Keep these as two static difficulty variants. Do not generate a quiz per species.

The homepage may promote the quiz.

Future rotating or monthly quizzes, and QR-code entry, may be added later. Do not build them now. Do not add QR analytics.

Quiz copy may use simpler family-friendly language. Questions and explanations still have to be factually correct for the Naturinfo geographic context.
