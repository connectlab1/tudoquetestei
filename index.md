---
layout: default
title: "Início"
---

<div class="posts-grid">
  {% for post in paginator.posts %}
    <article class="post-card">
      {% if post.categories.size > 0 %}
        <div class="post-categories">
          {% for category in post.categories %}
            <span class="category-badge">{{ category }}</span>
          {% endfor %}
        </div>
      {% endif %}

      <h2 class="post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>

      <p class="post-date">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%d/%m/%Y" }}
        </time>
      </p>

      {% if post.description %}
        <p class="post-excerpt">{{ post.description }}</p>
      {% else %}
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
      {% endif %}

      <a href="{{ post.url | relative_url }}" class="read-more">Ler artigo &rarr;</a>
    </article>
  {% endfor %}
</div>

{% if paginator.total_pages > 1 %}
  <nav class="pagination-container" aria-label="Navegação de Páginas">
    
    {% if paginator.previous_page %}
      {% if paginator.previous_page == 1 %}
        <a href="{{ '/' | relative_url }}" class="pagination-btn">&laquo; Anterior</a>
      {% else %}
        <a href="{{ paginator.previous_page_path | relative_url }}" class="pagination-btn">&laquo; Anterior</a>
      {% endif %}
    {% endif %}

    <div class="pagination-numbers">
      {% for i in (1..paginator.total_pages) %}
        {% if i == paginator.page %}
          <span class="page-number current">{{ i }}</span>
        {% elsif i == 1 %}
          <a href="{{ '/' | relative_url }}" class="page-number">{{ i }}</a>
        {% else %}
          <a href="{{ site.paginate_path | relative_url | replace: ':num', i }}" class="page-number">{{ i }}</a>
        {% endif %}
      {% endfor %}
    </div>

    {% if paginator.next_page %}
      <a href="{{ paginator.next_page_path | relative_url }}" class="pagination-btn">Próxima &raquo;</a>
    {% endif %}

  </nav>
{% endif %}
