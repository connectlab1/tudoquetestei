---
layout: post
title: "FAQ: Como Resolver os Problemas Mais Comuns no GitHub Pages e Jekyll"
date: 2026-11-07 16:00:00 -0300
categories: [FAQ, GitHub Pages, Jekyll, Suporte]
description: "Respostas diretas e soluções práticas para os erros mais frequentes encontrados ao publicar blogs e sites estáticos no GitHub Pages."
---

Ao gerenciar sites estáticos utilizando o ecossistema do GitHub Pages com o Jekyll, é comum esbarrar em alguns comportamentos inesperados durante o processo de *build* e publicação. 

Esta FAQ reúne os problemas mais comuns relatados por desenvolvedores e as soluções diretas para resolvê-los sem rodeios.

---

## 1. Por que meus artigos recentes não aparecem na página inicial?

**Causa mais comum:** O arquivo da página principal está nomeado como `index.md` em vez de `index.html`. 
* **A Solução:** O plugin nativo de paginação do Jekyll (`jekyll-paginate`) exige obrigatoriamente que a raiz utilize um arquivo **`index.html`** para processar corretamente o loop de exibição dos posts (`paginator.posts`). Renomeie o arquivo e faça um novo commit.

## 2. O GitHub Actions retornou erro de Build. O que fazer?

**Causa mais comum:** Incompatibilidade de plugins ou sintaxe inválida no cabeçalho Front Matter de algum arquivo Markdown.
* **A Solução:** 
  1. Vá até a aba **Actions** no seu repositório do GitHub para ver o relatório detalhado do erro.
  2. Verifique se todos os arquivos em `_posts/` possuem o delimitador `---` correto no topo e se o título entre aspas não quebra a estrutura YAML (evite dois pontos `:` soltos no título sem estar entre aspas).
  3. Confirme se o arquivo `_config.yml` lista apenas plugins permitidos nativamente pelo GitHub Pages (como `jekyll-paginate` e `jekyll-seo-tag`).

## 3. Como funcionam as URLs e os Links Relativos no Jekyll?

**Causa mais comum:** Links quebrados ao navegar entre páginas ou ao hospedar o site em um subdiretório de projeto (`usuario.github.io/nome-do-projeto`).
* **A Solução:** Sempre utilize o filtro de Liquid **`relative_url`** para referenciar links internos e arquivos de ativos:
  ```html
  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
