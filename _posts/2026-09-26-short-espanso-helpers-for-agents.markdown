---
layout: post
title: "Short: Espanso helpers for coding agents"
date: 2026-09-26 08:00:00 -0600
tags:
- agentic-coding
- shortcuts
---

One of the strategies I use while working with LLMs (both chat and [claude code](https://claude.com/product/claude-code)/[omp](https://omp.sh/docs/quickstart)/[opencode](https://opencode.ai/v2/docs)) is keeping a collection of curated prompts that I carry between machines with Espanso.

<!--more-->

I got the idea while listening to a [three-part series](https://parth.club/content/reid-riffs-with-parth-patil) with Reid Hoffman and Parth Patil. In the podcasts, Parth explains different prompts he's experimented with and refined to get better analysis and outcomes.

Of the prompts Parth relays during the interview, this one stuck with me:

> Please consider the above request and ask me additional questions to clarify the intent, means, and methods until the task is sufficiently clear to you.

I like how this prompt puts the LLM in the driver's seat to surface gaps and interview me to clarify the intent to resolve them. I find this is a better use of my time than trying to perfect a requirements doc.

Other prompts that I use often:

1. "Other agents and I are working in this directory. Focus on your instructions. Expect file changes from other agents."
2. "Kick off an async agent to [fill in]"
3. "Create a markdown agent handoff doc. Describe the current context we've been working on [fill in]"

To make them easy to reuse, I added them to my [Espanso](https://espanso.org/) expansions. Espanso is a cross-platform, open-source text expander tool.

Here is the current set:

```yaml
matches:
  # Ask agent to prepare a single git commit message for review
  - trigger: ":ac"
    replace: "Review the file changes and prepare a git commit message for me to review"

  # Ask agent to prepare grouped git commit messages for review
  - trigger: ":agc"
    replace: |
      Review the file changes.
      Group changes into logical blocks.
      Prepare commit messages for each group that describe complex parts well.
      Preview them in a summary table with columns:
        - Group #
        - File
        - Commit message first line

  - trigger: ":akk"
    replace: "Kick off an async agent to "

  # Note for agents about concurrent work in this folder
  - trigger: ":af"
    replace: "Other agents and I are working in this directory. Focus on your instructions. Expect file changes from other agents"

  # Ask for a comparison table of proposed solutions
  - trigger: ":ast"
    replace: |
      Create a summary table of the solutions you're suggesting
      Shape the table so that:
        - rows: each row is a comparable attribute of the problem definition
        - columns: each column represents the solutions
      Add a final row to the table showing your rating of the solution on a scale of 1 to 10

  - trigger: ":apr"
    replace: |
      Review:
        1. current context window
        2. working commits
      Open a draft pull request on GitHub

  # Create an agent handoff doc in markdown
  - trigger: ":aho"
    replace: |
      Create a markdown agent handoff doc
      Describe the current context we've been working on
```