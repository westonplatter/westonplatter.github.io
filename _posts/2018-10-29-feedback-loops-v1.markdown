---
layout: post
title: Feedback Loops, v1
date: 2018-10-29 16:04:53 -0700
tags:
- feedback loops
---

I created a simple python client for Robinhood. It's called [fast_arrow](https://github.com/westonplatter/fast_arrow), and it gave me a different perspective on feedback loops.

I started building fast_arrow when I submitted 3 pull requests to another Robinhood client library, but received no feedback and they were not merged. It was demotivating to work on code changes that sat there with no feedback. After a week of waiting, I started buildng fast_arrow. I built small bits of functionality usually in blocks of 2 hours at a coffee shop. I was quick to tag and release the changes to pypi. I felt I was making progress and continued to work on small features.

So far this was a typical workflow for me.

But then I tried experimenting with two new feedback loops.

Experiment #1. Write code to make examples work. Rather than writing a comprehensive test suite, I created a folder of examples and wrote code to make them work. Some the examples were incredibly basic (like [authentication](https://github.com/westonplatter/fast_arrow/blob/master/examples/auth.py) and fetching a stock quote). I was motivated to see features come to life, and ones I wanted to use as a Robinhood user. I would often start a 2 hour coding session by prototyping what I wanted the example to do and look like, and then work for 2 hours to make it work.

Experiment #2. Post examples/features to an active/large reddit feed. I also started posting the examples (eg, [selling veritcal spreads](https://github.com/westonplatter/fast_arrow/blob/master/examples/option_order_place_vertical.py)) on Reddit in an investing/options specific channel (https://www.reddit.com/r/options/) since most of the functionality I focused on was options trading. I loved reading the comments and getting honest (and sometimes blunt) feedback on what I just built.
