# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Jekyll-based personal blog site hosted on GitHub Pages. The site uses the Hyde theme (based on Poole) and is deployed at westonplatter.com.

## Development Commands

### Local Development
```bash
# Install Jekyll globally (if not using Bundler)
gem install jekyll

# Serve the site locally with live reload
jekyll serve
# OR if using GitHub Pages locally:
jekyll serve --livereload

# Build the site for production
jekyll build

# Check site health
jekyll doctor

# Clean generated files
jekyll clean
```

### GitHub Pages Notes
- This site deploys directly to GitHub Pages without a Gemfile
- Uses GitHub Pages' default Jekyll configuration and plugins
- Local development should match GitHub Pages Jekyll version for consistency

### Content Management
```bash
# Create a new blog post (manually create file in _posts/)
# Format: YYYY-MM-DD-title.markdown

# Preview drafts
bundle exec jekyll serve --drafts
```

## Site Architecture

### Jekyll Structure
- `_config.yml` - Site configuration, metadata, and Jekyll settings
- `_layouts/` - HTML templates (default.html, post.html, page.html)
- `_includes/` - Reusable HTML components (head.html, sidebar.html, disqus.html)
- `_posts/` - Blog posts in Markdown format
- `_drafts/` - Unpublished drafts
- `public/css/` - Stylesheets (Hyde theme + custom.css overrides)
- `assets/` - Images and other media files

### Content Types
- **Blog Posts**: Markdown files in `_posts/` with YAML front matter
- **Static Pages**: `about.md`, `books.md`, `projects.md`, `tags.md`
- **Homepage**: `index.html` with post listing

### Theme Customization
- Base theme: Hyde (two-column layout with sidebar)
- Theme CSS stack: `poole.css` (base) → `hyde.css` (theme) → `syntax.css` (code highlighting) → `custom.css` (overrides)
- Custom fonts: Fjalla One (headings), Open Sans (body text)
- Responsive design with `.hide-mobile` and `.hide-desktop` classes
- Sidebar is sticky by default with `.sidebar-sticky` class

### Key Features
- Google Analytics integration
- Disqus comments on posts
- Tag-based post organization
- RSS feed (`atom.xml`)
- Related posts suggestions
- Social media links (GitHub, Twitter)

### Front Matter Structure
Blog posts use this YAML front matter:
```yaml
---
layout: post
title: Post Title
date: YYYY-MM-DD HH:MM:SS -0700
tags:
- tag1
- tag2
---
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the master branch. No manual build process required for deployment.

## Content Guidelines

### Blog Post Creation
1. Create file in `_posts/` with format: `YYYY-MM-DD-title.markdown`
2. Use proper YAML front matter (see structure above)
3. Posts are sorted by date automatically
4. Use `<!--more-->` for excerpt separation (configured in `_config.yml`)

### Navigation Management
- Sidebar navigation auto-generates from pages with `layout: page`
- Static pages (about.md, books.md, etc.) appear in sidebar navigation
- Homepage link is hardcoded, other pages are dynamic

### Asset Management
- Images go in `/assets/` directory
- CSS overrides go in `/public/css/custom.css`
- Jekyll processes all files, so be careful with naming conventions