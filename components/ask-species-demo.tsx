"use client";

import { useRef, useState } from "react";
import { PawPrint, Send } from "lucide-react";
import { SpeciesImage } from "@/components/species-image";
import { SpeciesSoundButton } from "@/components/species-sound-button";
import type { PublicImage } from "@/sanity/lib/types";

type Fact = { label: string; value: string };
type Turn = { id: number; role: "visitor" | "species"; text: string };

/**
 * Presentation of the approved Fråga djuret conversation.
 * Answers are assembled from the species page already loaded in the browser.
 * This is not the production guide and does not call a model.
 */
export function AskSpeciesDemo({
  title,
  intro,
  questions,
  speciesName,
  avatar,
  facts,
  cards,
  sound = null,
}: {
  title: string;
  intro: string | null;
  questions: string[];
  speciesName: string;
  avatar: PublicImage | null;
  facts: Fact[];
  cards: Fact[];
  sound?: { src: string; label: string | null } | null;
}) {
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const nextId = useRef(0);
  const welcome = openingGreeting(speciesName);
  const soundLabel = listenLabel(speciesName, sound?.label ?? null);

  function ask(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const visitorId = nextId.current + 1;
    const replyId = visitorId + 1;
    nextId.current = replyId;
    setTurns((current) => [...current, { id: visitorId, role: "visitor", text: question }]);
    setDraft("");
    setBusy(true);
    window.setTimeout(() => {
      setTurns((current) => [
        ...current,
        { id: replyId, role: "species", text: answerFromPage(question, speciesName, facts, cards) },
      ]);
      setBusy(false);
    }, 450);
  }

  return (
    <section className="bg-paper pb-20 sm:pb-28" data-ask-presentation="page-facts">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="rounded-3xl bg-forest p-6 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                <PawPrint className="h-4 w-4 text-paper" aria-hidden="true" />
                Prata med naturen
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-paper sm:text-5xl">{title}</h2>
              {intro ? <p className="mt-3 max-w-2xl leading-relaxed text-paper/80">{intro}</p> : null}
              <p className="mt-2 text-sm italic text-brass">
                En lekfull guide för barn – svaren skapas av en digital {speciesName.toLowerCase()}skompis.
              </p>
            </div>
            {sound ? (
              <div className="shrink-0 sm:pt-10">
                <SpeciesSoundButton src={sound.src} label={soundLabel} />
              </div>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-paper shadow-inner">
            <div className="flex max-h-96 min-h-[16rem] flex-col gap-4 overflow-y-auto p-5">
              <SpeciesBubble avatar={avatar} text={welcome} />
              {turns.map((turn) =>
                turn.role === "visitor" ? (
                  <div key={turn.id} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-forest px-4 py-3 text-paper">
                      {turn.text}
                    </div>
                  </div>
                ) : (
                  <SpeciesBubble key={turn.id} avatar={avatar} text={turn.text} />
                ),
              )}
              {busy ? (
                <div className="flex items-end gap-3">
                  <Avatar avatar={avatar} />
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-[#E8E5DA] px-4 py-4">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-moss [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-moss [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-moss" />
                  </div>
                </div>
              ) : null}
              {questions.length ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {questions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => ask(question)}
                      disabled={busy}
                      className="rounded-full border border-moss px-3 py-1.5 text-sm text-forest transition-colors hover:bg-moss hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask(draft);
              }}
              className="flex items-center gap-2 border-t border-moss/30 p-3"
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Skriv din fråga här..."
                aria-label={`Skriv din fråga till ${speciesName}`}
                className="flex-1 rounded-full border border-moss bg-paper px-4 py-2.5 text-ink outline-none placeholder:text-moss/70 focus:border-brass"
              />
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Skicka fråga"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brass text-forest-deep transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpeciesBubble({ avatar, text }: { avatar: PublicImage | null; text: string }) {
  return (
    <div className="flex items-end gap-3">
      <Avatar avatar={avatar} />
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[#E8E5DA] px-4 py-3 text-ink">{text}</div>
    </div>
  );
}

function Avatar({ avatar }: { avatar: PublicImage | null }) {
  if (!avatar) {
    return <span className="h-10 w-10 shrink-0 rounded-full bg-moss/30" aria-hidden="true" />;
  }
  return (
    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
      <SpeciesImage
        image={{ ...avatar, alt: "" }}
        fill
        sizes="40px"
        quality={60}
        className="object-cover"
      />
    </span>
  );
}

const UNKNOWN = "Det vet jag faktiskt inte utifrån det som finns berättat om mig här.";

/** Editorial indefinite greeting. Do not guess en/ett from the species name. */
const OPENING_GREETING: Record<string, string> = {
  lodjur: "Hej! Jag är ett lodjur. Vad vill du veta?",
};

const LISTEN_LABEL: Record<string, string> = {
  lodjur: "Lyssna på lodjuret",
};

function openingGreeting(speciesName: string) {
  return OPENING_GREETING[speciesName.toLocaleLowerCase("sv")] ?? "Hej! Vad vill du veta?";
}

function listenLabel(speciesName: string, storedLabel: string | null) {
  return LISTEN_LABEL[speciesName.toLocaleLowerCase("sv")] ?? (storedLabel?.trim() || "Lyssna");
}

function answerFromPage(question: string, speciesName: string, facts: Fact[], cards: Fact[]) {
  if (asksForSpeed(question) && !mentionsSpeed(facts, cards)) return UNKNOWN;

  const fact = facts.find((item) => matchesFact(question, item.label));
  if (fact) return speakFact(fact, speciesName);

  const card = bestCard(question, cards);
  if (!card) return UNKNOWN;
  return speakAboutMyself(relevantPassage(question, card), speciesName);
}

function asksForSpeed(question: string) {
  return /spring|snabb|hastighet|\bkm\b/i.test(question);
}

function mentionsSpeed(facts: Fact[], cards: Fact[]) {
  return [...facts, ...cards].some((item) => /spring|hastighet|\bkm\b/i.test(`${item.label} ${item.value}`));
}

function speakFact(fact: Fact, speciesName: string) {
  const label = fact.label.toLocaleLowerCase("sv");
  const value = fact.value.trim().replace(/\s+/g, " ");
  if (/vikt/.test(label)) {
    const range = value.match(/^(\d+)\s*[–—-]\s*(\d+)\s*kg\.?$/i);
    if (range) return `Jag väger vanligtvis mellan ${range[1]} och ${range[2]} kilo.`;
    return `Jag väger vanligtvis ${value.replace(/kg/gi, "kilo")}.`;
  }
  if (/föda|mat/.test(label)) {
    const diet = value.match(/^köttätare\s*\((.+)\)\.?$/i);
    if (diet) {
      const detail = diet[1].replace(/\s*&\s*/g, " och ").trim();
      return `Jag är köttätare, ${lowerFirst(detail)}.`;
    }
    return /[.!?]$/.test(value) ? speakAboutMyself(value, speciesName) : `Jag är ${lowerFirst(value)}.`;
  }
  if (/spår/.test(label)) return `Mina spår är ${lowerFirst(value)}.`;
  if (/liv|miljö|hem|biotop/.test(label)) return `Jag lever i ${lowerFirst(value)}.`;
  return /[.!?]$/.test(value)
    ? speakAboutMyself(value, speciesName)
    : `Om ${label} kan jag säga att det är ${lowerFirst(value)}.`;
}

function lowerFirst(value: string) {
  return (value.charAt(0).toLocaleLowerCase("sv") + value.slice(1)).replace(/\.+$/, "");
}

function bestCard(question: string, cards: Fact[]) {
  const words = keywords(question);
  let best: Fact | null = null;
  let score = 0;
  for (const card of cards) {
    const heading = card.label.toLocaleLowerCase("sv");
    const body = card.value.toLocaleLowerCase("sv");
    const hits = words.filter((word) => heading.includes(word) || body.includes(word)).length;
    const alias = APPEARANCE.test(question) && /utseende|kännetecken/.test(heading) ? 2 : 0;
    const total = hits + alias;
    if (total > score) {
      best = card;
      score = total;
    }
  }
  return score > 0 ? best : null;
}

function relevantPassage(question: string, card: Fact) {
  const words = keywords(question);
  const sentences = card.value
    .split(/\n+/)
    .flatMap((paragraph) => paragraph.split(/(?<=[.!?])\s+/))
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const picked = sentences.filter((sentence) =>
    words.some((word) => sentence.toLocaleLowerCase("sv").includes(word)),
  );
  if (picked.length) return picked.join(" ");
  return card.value;
}

function keywords(question: string) {
  return question
    .toLocaleLowerCase("sv")
    .split(/[^\p{L}]+/u)
    .filter((word) => word.length > 3 && !STOP_WORDS.has(word));
}

const APPEARANCE = /ser du ut|hur ser|utseende|din päls|päls|kännetecken|din färg|färg har du|färg är du/i;

const STOP_WORDS = new Set([
  "något",
  "direkt",
  "fråga",
  "denna",
  "detta",
  "vilken",
  "vilket",
  "varför",
  "mycket",
  "snabbt",
  "ofta",
  "oftast",
  "mellan",
  "genom",
  "också",
  "deras",
  "andra",
  "samma",
  "själva",
  "under",
  "över",
  "efter",
  "innan",
  "från",
  "med",
  "som",
  "att",
  "det",
  "den",
  "kan",
  "hur",
  "vad",
  "när",
  "inte",
  "här",
  "där",
]);

function speakAboutMyself(text: string, speciesName: string) {
  const name = speciesName.trim();
  if (!name) return tidy(text);
  const lower = name.toLocaleLowerCase("sv");
  const titled = name.charAt(0).toLocaleUpperCase("sv") + name.slice(1);
  const stems = [...new Set([name, lower, titled])];
  let output = text;
  for (const stem of stems) {
    output = output.replace(new RegExp(`${escapeRegExp(stem)}(?:ets|ens)\\b`, "g"), "§GEN§");
  }
  for (const stem of stems) {
    output = output.replace(new RegExp(`${escapeRegExp(stem)}(?:et|en)\\b`, "g"), "§NAME§");
  }
  for (const stem of stems) {
    output = output.replace(new RegExp(`\\b${escapeRegExp(stem)}\\b`, "g"), "§NAME§");
  }
  output = output.replace(/§GEN§(\s+)(\S+)/g, (_, space: string, noun: string, offset: number, source: string) => {
    const rest = source.slice(offset + `§GEN§${space}${noun}`.length);
    return `${possessive(noun, rest)}${space}${noun}`;
  });
  output = output.replace(
    /(^|[.!?]\s+)§NAME§\s+känns\s+lätt\s+igen\s+på\s+sina\b/g,
    "$1Du känner lätt igen mig på mina",
  );
  output = output.replace(/§NAME§\s+känns\s+lätt\s+igen\s+på\s+sina\b/g, "du känner lätt igen mig på mina");
  output = output.replace(/(^|[.!?]\s+)§NAME§/g, "$1Jag");
  output = output.replace(/§NAME§/g, (_, offset: number, source: string) => {
    const before = source.slice(Math.max(0, offset - 24), offset);
    return /(?:hjälper|ser|möt(?:er|te)|hör|följer|jagar|känner|träffar)\s+$/i.test(before) ? "mig" : "jag";
  });
  output = output.replace(/(^|[.!?]\s+)Den\b(\s+[^.!?]*)/g, (full, pre: string, rest: string) => {
    if (/\b(?:vanligen|cm|lång)\b/i.test(rest)) return full;
    return `${pre}Jag${rest}`;
  });
  output = output.replace(/\boch den\s+(?![\p{L}]*(?:a|e)\b)/gu, "och jag ");
  output = output.replace(/\b([\p{L}]+)\s+sig\s+jag\b/gu, "$1 jag mig");
  output = output.replace(/\brör sig\b/g, "rör mig");
  output = output
    .split(/(?<=[.!?])\s+/)
    .map((sentence) =>
      /\bjag\b/i.test(sentence)
        ? sentence.replace(/\bsig\b/g, "mig").replace(/\bsina\b/g, "mina").replace(/\bsitt\b/g, "mitt").replace(/\bsin\b/g, "min")
        : sentence,
    )
    .join(" ");
  output = output.replace(
    /(^|[.!?]\s+)Jag känns(?: (lätt|lättast))? igen\b/g,
    (_, pre: string, adverb: string | undefined) =>
      `${pre}Du känner${adverb ? ` ${adverb}` : ""} igen mig`,
  );
  output = output.replace(/\bkänns jag igen\b/g, "känner du igen mig");
  return tidy(output);
}

function possessive(noun: string, rest: string) {
  const word = noun.toLocaleLowerCase("sv");
  if (/(?:or|ar|er|arna|erna|orna)$/.test(word)) return "Mina";
  if (/\sär\s+\p{L}+a\b/u.test(rest.slice(0, 48))) return "Mina";
  if (["tassavtryck", "språng", "ljud", "revir", "hem", "byte", "djur"].includes(word)) return "Mitt";
  return "Min";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tidy(text: string) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function matchesFact(question: string, label: string) {
  const q = question.toLocaleLowerCase("sv");
  const name = label.toLocaleLowerCase("sv");
  if (name.length > 2 && q.includes(name)) return true;
  if (/vikt/.test(name) && /väger|vikt|kilo|tung/.test(q)) return true;
  if (/föda|mat/.test(name) && /äter|äta|föda|mat|byte/.test(q)) return true;
  if (/spår/.test(name) && /spår|tass|fot/.test(q)) return true;
  if (/liv|miljö|hem|biotop/.test(name) && /bor|vinter|lever|hem|skog|miljö/.test(q)) return true;
  return false;
}
