---
layout: post
title: "Code Generation with LLMs"
date: 2026-04-04 10:00:00 -0700
tags:
- llms
- code-gen
---

I'm using LLMs to write more of the code I rely on. 

The AI tools evolve significantly every 2 weeks, it feels like, so I expect my current views to change very soon.

AI code gen loop
1. Requirements gathering (see next block)
2. Implementation
3. Integration
4. Validation
5. Verification
6. Write docs for the code changes
7. Pull request

What's changed for me in the last 2 weeks is spending more time and effort on specs (i.e., Requirements Gathering). I really like using agent teams to review and refine them before sending off the specs for implementation. The efficiency gain is having LLMs think through a problem on my behalf and flag open questions.

Requirements gathering
1. Intent
2. Functional success
3. Non-Functional success
4. How to recover from failure states
5. Unacceptable solutions
6. Ask for a team of agents to propose 3–5 solutions and explain trade-offs
7. Review via multi-agent team and have the agents write the final spec in markdown
8. Review the written version
