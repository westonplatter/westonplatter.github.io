---
layout: post
title: "Short: Using agent quorums"
date: 2026-04-04 10:00:00 -0700
tags:
- llms
- code-gen
- agentic
---

I've been working with Claude Code for a year, and one aspect that's been helpful is asking Claude to spin up a team of agents to work through problems.

For example, I've been creating an app ([ngv-trader](https://github.com/westonplatter/ngv-trader)) to track long running quant strategies across futures and options. When building out the requirements or specs for various features, across the Frontend, Backend, and Database, and a few other areas, I have Claude spin up a quorum of agents from different disciplines to review and provide feedback on the implementation plan. The goal is to see issues or incomplete solutions before jumping into the coding phase, and then work with the cross-discipline agent teams to find better solutions.

I originally stumbled on this workflow while using BMAD's [party mode](https://docs.bmad-method.org/explanation/party-mode/), which facilitates this cross-discipline feedback session in their spec development process.

I have personally chosen to use the agent quorum workflow outside of BMAD by creating my own cross-discipline team description and then asking claude to create a team of subagents from the prompt. 

> Please spin up a cross-discipline team of sub-agents from https://github.com/westonplatter/ngv-trader/blob/main/docs/planning-agents-quorum.md and provide feedback and critical review on the following spec document I've put together in @my-product-spec-doc.md. When the team raises a concern, please have them work together to find alternative solutions.
