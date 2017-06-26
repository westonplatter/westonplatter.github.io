---
layout: post
title: "The Rewrite, Part 1: Selections"
date: 2017-06-26 16:04:53 -0700
tags: rewrite
---

After a year of contracting with small companies, I took a full-time position
at [Choozle](https://choozle.com). The tech stack is a "very interesting"
consortment of home-grown PHP with a recent and refreshing addition of React.


For technical and business reasons, we decided to consider re-architecting the
current PHP monolith into "something else." We have the freedom
to change everything, yes, Everything. Language. Architecture. Server setup. DB.
Yep, everything.

Rather than copying and pasting from HackerNews "Best Techstacks Ever 2017", I started
to think about the behavioral and functional aspects of what we really need. I
use the term "we" because I'm trying to think of what our entire tech team needs
not just what I would prefer. What follows is a short, requirements focused list
of things that I see us benefiting from. As a senior engineer/developer, I see my
role as working within and alongside teams to move ideas from concept to reality
in short timescales. Ideally, I'd like for us to ship alpha products in 3 weeks,
and beta in 6 weeks*.

\* Side note: I believe this 3 week metric encompasses non-technical aspects
(team structure, experience level, etc). Let's assume we're set up for success
on those fronts.

Overall:
- Micro-service configurable
- Planning to use DC/OS for containerized environments

Frontend:
- We really like the react (w/ redux + webpack) setup we have.

Web tier:
- JSON rendering
- HTML rendering
- API versioning
- Authentication is dead-simple (session, jwt, or Oauth2)
- Authorization is dead-simple (maybe this is an implementation issue?)
- Well supported by 3rd party libraries (ie, copy and paste S3 setup)
- Popular on StackOverflow (let's be honest)
- Easily integrate with selected ORM
- Built-in logging
- Testing support
- Able to make JSON responses performant (less than 10ms)

ORM:
- MySQL compatible
- Easily execute simple SQL operations (e.g., User.where(“email LIKE %?”, “gmail.com”).count)
- Handles relationships
- Handles validation
- Handles eager joins
- Handles pagination like operations well (limit, offset, ordering, etc)
- Handles scoping
- Allows you to put multiple operations in  1 SQL transaction
- Again, popular on StackOverflow (let's be honest)
- Built-in logging
- Testing support
- Performant (how do we measure this?)

*Questions:
- Do we keep the API and React frontend in the same codebase or separate?
- What else am I missing?
*
