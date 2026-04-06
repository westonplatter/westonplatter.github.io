# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog (westonplatter.com) using the Hyde theme, hosted on GitHub Pages.

## Commands

```bash
# Serve locally with live reload
jekyll serve

# Build site (outputs to _site/)
jekyll build
```

## Architecture

- **Theme**: Hyde (based on Poole) - two-column layout with sidebar
- **Layouts**: `_layouts/` - default.html wraps all pages, post.html and page.html extend it
- **Includes**: `_includes/` - head.html, sidebar.html, disqus.html (comments)
- **Posts**: `_posts/` - markdown files with `YYYY-MM-DD-title.markdown` naming
- **Static assets**: `public/css/` for styles, `assets/` for other files

## Post Format

Posts use YAML front matter:
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM
tags:
- tag1
- tag2
---
```

Use `<!--more-->` to define the excerpt separator.
