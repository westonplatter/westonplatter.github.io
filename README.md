# westonplatter.com

Personal blog of Weston Platter — [westonplatter.com](https://westonplatter.com).

Built with Jekyll using a custom minimal layout, deployed via GitHub Pages.

## Local Development

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve
```

Site will be available at http://localhost:4000.

```bash
# Build site to _site/
bundle exec jekyll build
```

## Stack

- Jekyll 4.3
- Ruby 3.3
- Custom layouts under `_layouts/` (no upstream theme)
- `jekyll-sitemap` plugin
- `html-proofer` for link checks (test group)

## Structure

- `_posts/` — blog posts, `YYYY-MM-DD-title.markdown`
- `_drafts/` — unpublished drafts
- `_layouts/` — `default`, `home`, `page`, `post`
- `_tabs/` — top-level pages (about, archives, categories, tags)
- `_data/` — site data files
- `assets/` — images and static assets
- `_config.yml` — site configuration

## Post Format

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

Use `<!--more-->` to mark the excerpt separator.

## Deployment

Pushes to `main` trigger [`.github/workflows/jekyll.yml`](.github/workflows/jekyll.yml), which builds the site and deploys it to GitHub Pages.

## License

Content © Weston Platter. Code released under the [MIT License](LICENSE.md).
