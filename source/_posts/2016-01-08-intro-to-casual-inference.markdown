---
layout: post
title: "Intro to Casual Inference
date: 2016-01-08 16:04:53 -0700
comments: true
categories: data statistics
---

It's Friday, and I needed a break from a Rails 4 upgrade, so I dove into the topic of __casual inference__.

At a high level, Casual Inference is concerned with measuring the non-explicit relationship between "cause" and "effect" as "cause" variables change. Or, more formally,

{% blockquote Wikipedia https://en.wikipedia.org/wiki/Causal_inference Causal inference %}
Causal inference is the process of drawing a conclusion about a causal connection based on the conditions of the occurrence of an effect. The main difference between causal inference and inference of association is that the former analyzes the response of the effect variable when the cause is changed. The science of why things occur is called etiology.
{% endblockquote %}


I found [this article](http://csm.lshtm.ac.uk/themes/causal-inference/) to be a helpful intro to the topic. And when I wanted to read deeper on the subject, I really enjoyed skimming [this open textbook](http://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/) from the Harvard School of Public Health. When trying to find practical application of the topic, I laughed a little too much reading [this article](https://www.business.utah.edu/sites/default/files/media/in_the_mood_for_a_loan_january_2013.pdf) analyzing how the Super Bowl, American Idol, and the holidays postively or negatively effected sentiment to thereby influence how loan officers evaluated credit applications (see page 3 to get a gist for the paper). Lastly, Google created an [R package, CasualImpact,](https://google.github.io/CausalImpact/CausalImpact.html) for analyzing casual inference.

{% img center /images/2016-01-casual-inference.png %}

Happy casual inference Friday!