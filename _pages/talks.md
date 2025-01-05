---
layout: page
title: Talks and Conferences
permalink: /talks/
description: Mainly talks I've given but also some of my involvement in community events
nav: true
nav_order: 5
horizontal: false
---

<!-- pages/talks.md -->
<div class="talks">
{% if site.enable_talk_categories and page.display_categories %}
  <!-- Display categorized talks -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_talks = site.talks | where: "category", category %}
  {% assign sorted_talks = categorized_talks | sort: "importance" %}
  <!-- Generate cards for each talk -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for talk in sorted_talks %}
      {% include talks_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for talk in sorted_talks %}
      {% include talks.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display talks without categories -->

{% assign sorted_talks = site.talks | sort: "importance" %}

  <!-- Generate cards for each talk -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for talk in sorted_talks %}
      {% include talks_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for talk in sorted_talks %}
      {% include talks.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
