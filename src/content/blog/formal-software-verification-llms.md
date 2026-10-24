---
title: "LLMs Are Making Formal Software Verification Feasible"
description: "Formal verification used to require years of expert effort. Anthropic's research shows LLMs can now write proofs at scale — here's what it means for coding agents."
pubDate: 2026-10-25
category: coding-agents
tags: ["formal-verification", "coding-agents", "eval-tooling", "llm-apis"]
author: "Evalbranch Editorial"
sources:
  - title: "Anthropic Research — LLMs are making formal software verification feasible at a much larger scale"
    url: "https://www.anthropic.com/research/formal-verification"
  - title: "Anthropic — Building effective agents"
    url: "https://www.anthropic.com/research/building-effective-agents"
mentionsPublisher: false
---

Formal software verification is the practice of proving, mathematically, that a program satisfies a specification — for example, that it can never crash, never read out of bounds, or always obey a protocol. For decades it has been the gold standard of correctness and also its least practical tool: writing proofs was a niche, expert craft so expensive that it was reserved for mission-critical systems like avionics code and operating-system microkernels. Anthropic's research shows this calculus is changing. Their team used large language models to write formal proofs at a scale that was previously unattainable, and the results carry real lessons for anyone building coding agents, evaluation pipelines, or AI dev-tools. This post explains what formal verification is, how LLMs lower its cost, and what it means for the tooling you build.

## What formal verification actually is

Before we talk about the LLM angle, it helps to be precise about the term. Formal verification is not testing. A test suite exercises a finite set of inputs and hopes they are representative; a formal proof is an argument that a property holds for *all* inputs in a stated domain. If the proof succeeds, the property is guaranteed rather than sampled.

The catch has always been cost. Proofs are often many times larger than the code they verify, and producing them demands both deep expertise and enormous patience. The classic example is seL4: the operating-system kernel took about two person-years to implement but roughly twenty person-years to formally verify. As Anthropic's research notes, this is why formal verification historically has been practical only in rare, safety-critical domains.

## Where LLMs change the economics

The core insight of the Anthropic research is that frontier LLMs have gotten good enough at a very specific, grinding task: writing proofs for a well-defined goal. In their experiments, Claude proved security properties on compiled RISC-V assembly code across 123 real-world open-source libraries from Google's OSS-Fuzz initiative. The proofs ran to about 180 million lines of Rocq (the proof language), with a typical proof spanning roughly 600,000 lines for binaries with a median length of 18,000 instructions. This represents, to their knowledge, the first large-scale effort to apply AI to form verification of production software at the assembly-code level.

Equally important is what the process found: while writing proofs, Claude discovered bugs that had evaded detection for years — including real that required inputs around 20 to 64 MB or unusually deep nesting, exactly the kinds of cases a fuzzer is structurally unlikely to hit. In one instance the effort surfaced a logic bug that had hidden latent for more than a decade. The attempts to prove correctness doubled as a powerful bug-finding mechanism, even where the full proof was not achieved.

## How the workflow actually works

The pipeline Anthropic describes is a useful template for any agent builder:

1. **Turn tests into specs.** Rather than authoring formal specifications from scratch, they took existing compilable fuzz tests and encoded the rule "this test suite always passes" as a specification over the compiled RISC-V instructions. That sidesteps the hardest part of formal verification — writing an unambiguous spec — by reusing the tests developers already maintain.
2. **Let the model write the proof.** The LLM generates the Rocq proof against a formal model of the RISC-V instruction set and the Linux process semantics.
3. **Let a mechanical checker verify it.** No human reviews the 180 million lines by eye. The Rocq proof checker mechanically confirms the proof satisfies the spec. The only artifacts a developer must trust are the machine semantics, the theorem statements, and the proof checker itself.
4. **Let the agent fix the bugs it finds.** When a proof attempt fails because of a real bug, Claude patches the code, the spec is regenerated, and the agent proves the new spec. This loop — attempt, discover, patch, reprove — is the agentic pattern at work.

## What this means for coding agents

If you build coding agents, this research is not an abstract curiosity. It points to a plausible future where the verification loop — not just code generation — becomes a first-class agent capability.

First, **the cost of "correct" is falling**. Anthropic reports newer models complete the same proof tasks with roughly 40% fewer tokens than their predecessors. Efficiency gains like this are what make a formerly bespoke activity approachably pervasive, in the same way fuzzing matured from an exotic technique to a standard part of the CI pipeline.

Second, **proofs are reusable, which compounds the benefit**. Proofs are recursively built from smaller proofs, and agents working in a shared workspace reused each other's proofs, needing 17% fewer tokens than solo agents. At the project level, different programs share enormous amounts of common code (runtime initialization, sanitizer stubs), so the proof for one library transfers to the next. This is precisely the "amortize the cost" dynamic that makes the economics work at ecosystem scale — verify a dependency once, and every downstream consumer benefits.

Third, **this changes what good evaluation looks like**. Anthropic's guidance on building effective agents stresses that agents are typically just LLMs using tools in a loop, and that code is a natural fit because output can be verified by automated tests. Formal verification is the far end of that spectrum: instead of testing a sample of behaviors, a proof checks all of them. For an eval tooling builder, that suggests a hierarchy — from unit tests and integration tests, up to property-based or fuzz checks, and ultimately to machine-checked proofs for the properties you most care about. Each rung costs more but buys a stronger guarantee, and LLMs are making the top rung affordable for the first time.

## The honest caveats

It is worth holding onto a couple of limitations from the research so you don't over-market the idea. "Formally verified" does not mean "bug-free." A proof certifies that the code satisfies the spec you wrote, under the machine model you assumed — it cannot tell you whether the spec matches reality. The Anthropic proofs, for example, cover single-threaded static RISC-V binaries under specific OS assumptions, not every deployment. And the proof's scope is only as good as the trusted components: the instruction-set semantics, the theorem statements, and the proof checker itself. If any of those is wrong, the guarantee is wrong too. In short, formal verification shifts the location of uncertainty rather than eliminating it — but it moves it to a smaller, well-defined surface.

## The takeaway for tooling builders

The trajectory the research describes is clear: formal verification, historically a bespoke craft for safety-critical code, is becoming as practical as fuzzing for a much larger share of software. For builders of coding agents and evaluation tooling, the practical moves are to treat proof-writing as another agent loop with a mechanical verifier as the ground truth; to design workflows that reuse and share proofs where possible; and to layer verification into the evaluation stack in increasing strength — tests, fuzzing, and finally machine-checked proofs for the properties that matter most. The guarantee of "no crashes on any input" is a much stronger signal for an agent's output than "passes the test suite," and LLMs are now making that signal reachable at scale.

We wrote this as an educational explainer for builders, not as a benchmark or a vendor endorsement. For the full methodology, experiments, and appendices, see Anthropic's research post on formal verification.
