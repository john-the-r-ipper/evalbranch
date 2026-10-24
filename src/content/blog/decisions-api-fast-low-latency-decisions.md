---
title: "The OpenAI Decisions API: Fast, Low-Cost Classifications for Agents"
description: "OpenAI's Decisions API returns bounded classification answers (choice, score, probability) up to 10x faster than the Responses API. Here is how developers use it."
pubDate: 2026-10-24
category: llm-apis
tags: ["llm-apis", "structured-output", "agents", "latency", "developer-tools"]
author: "Evalbranch Editorial"
sources:
  - title: "Build more responsive apps with the Decisions API — OpenAI"
    url: "https://openai.com/index/decisions-api/"
  - title: "OpenAI Platform Docs — Decisions API"
    url: "https://developers.openai.com/api/docs/guides/decisions"
  - title: "Introducing GPT-6 Sol and Luna — OpenAI"
    url: "https://openai.com/index/introducing-gpt-6-sol-and-luna/"
mentionsPublisher: false
---

Agents and applications make many small decisions during a workflow: classify an input, route a request, choose the next action, or score something on a rubric. Individually each decision is trivial; at scale, the latency and cost of a full generative call add up. OpenAI's **Decisions API**, now generally available, is built for exactly this workload. It focuses a reasoning model on questions with bounded answers and returns fast, structured results instead of freeform text.

The headline number: OpenAI says the Decisions API makes decisions from text, images, and structured inputs **up to 10x faster** than GPT-6 Luna through the Responses API. Because the output is a small structured answer, there are also no output-token charges — you only pay for input tokens. This changes the economics of high-volume classification inside agents.

## The three answer types

Developers define a question and the allowed answers, then pass context as text, images, or native JSON. The API returns one of three answer types:

- **Predicate** — estimate the probability that a condition is true (for example, whether a product photo shows visible damage). Result is a `probability` from 0 to 1.
- **Choice** — select one of your predefined options (for example, whether an agent should continue, retry, or ask for clarification). Result includes the chosen value plus probabilities and confidence.
- **Score** — rate an input against ordered levels in a rubric (for example, severity of damage). Result is the probability-weighted average of the level indices.

## Why latency and cost matter for agents

The difference between a responsive agent and a sluggish one is often the number of small model calls in the hot path. If every routing decision costs a full generation, a conversation tangibly slows down. Customers report meaningful wins:

- **Box** uses Decisions to classify business documents and route them to the next step — about **5x faster route selection** on 30 certificate-of-insurance cases with the same accuracy as the Responses API.
- **Datadog** uses it to score the risk of agent-generated shell commands before executing them — **40x faster p95** with comparable accuracy, placing Decisions directly in the hot path of a remediation action.
- **Ramp** attributes AI costs to actual work — **4x faster and 30% cheaper** than GPT-6 Luna with no accuracy loss.
- **Sierra** picks the next action during live customer conversations — under **280 ms p95**, about 3x faster and 90% lower cost per call.
- **Speak** integrated Decisions with GPT-Live for language learners, cutting time-to-next-action by over **90%** (from 1.4s to 0.13s).

## What's in the GA release

Since the public beta, OpenAI has added native **GPT-Live** integration for real-time voice, prompt caching for reused context, and inference residency in the US and EU. Developers can pass native JSON inputs, include images in question instructions, and ask **up to 400 questions per request** (twice the previous limit). Pricing is $0.10 per million input tokens and $0.01 per million cached input tokens, with Zero Data Retention available to eligible customers.

## Evaluating a decision pipeline

When you add a decision endpoint to an agent, evaluate it like any classification task: choose one recurring decision, define the question and possible answers, and test on examples that reflect real usage. Because the output space is bounded, Decisions is a natural fit for building an eval suite — you can measure accuracy, latency, and cost against a labeled set before you put it in the hot path.

For teams building commerce and order workflows on top of LLM calls, the same "bounded decision instead of freeform generation" pattern applies — which is the approach [OnlyOrders](https://onlyorders.tech/) describes for turning DMs into confirmed orders.

## Source

This summary is based on OpenAI's announcement, *Build more responsive apps with the Decisions API* (Oct 22, 2026), and the official Decisions API developer guide. See the links in the article metadata for full details.
