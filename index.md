---
layout: default
title: Início
---

<div class="hero-section" style="padding: 2rem 0 3rem 0; border-bottom: 1px solid var(--border-color); margin-bottom: 2.5rem;">
  <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem;">
    Laboratório <span style="color: var(--primary-color);">Tudo Que Testei</span> 🧪
  </h1>
  <p style="font-size: 1.15rem; color: var(--text-muted); max-width: 650px; line-height: 1.6;">
    Um espaço prático onde documento testes de infraestrutura, scripts, ferramentas de código aberto, configurações de servidores e tecnologias do dia a dia. Sem rodeios, direto ao que funciona.
  </p>
</div>

<div class="posts-container">
  <h2 style="font-size: 1.4rem; font-weight: 600; color: #ffffff; margin-bottom: 1.5rem;">
    ⚡ Artigos e Testes Recentes
  </h2>

  <div class="post-grid">
    {% for post in site.posts %}
      <article class="post-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.75rem; margin-bottom: 1.5rem; transition: transform 0.2s ease, border-color 0.2s ease;">
        
        <div class="post-meta" style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 0.5rem;">
          <time datetime="{{ post.date | date_to_xmlschema }}">
            {% assign date_format = site.minima.date_format | default: "%d/%m/%Y" %}
            {{ post.date | date: date_format }}
          </time>
          {% if post.categories.size > 0 %}
            <span>• </span><span style="color: var(--primary-color);">{{ post.categories | join: ", " }}</span>
          {% endif %}
        </div>

        <h3 style="margin: 0 0 0.75rem 0; font-size: 1.35rem;">
          <a href="{{ post.url | relative_url }}" style="color: var(--primary-color); text-decoration: none; font-weight: 600;">
            {{ post.title }}
          </a>
        </h3>

        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
          {% if post.description %}
            {{ post.description }}
          {% else %}
            {{ post.excerpt | strip_html | truncatewords: 25 }}
          {% endif %}
        </p>

        <a href="{{ post.url | relative_url }}" style="display: inline-flex; align-items: center; font-size: 0.9rem; font-weight: 600; color: var(--text-main); text-decoration: none;">
          Ler artigo completo &rarr;
        </a>

      </article>
    {% endfor %}
  </div>
</div>
