---
layout: post
title: "Guia Definitivo: Construindo e Automatizando Blogs com Jekyll, Markdown e GitHub Actions"
date: 2026-11-07 20:00:00 -0300
categories: [eng-software, tutoriais, devops]
tags: [jekyll, github-pages, ci-cd, markdown, web-development]
author: ConnectLab
---

Nos últimos anos, o ecossistema de desenvolvimento web passou por uma revolução silenciosa. O movimento de retorno às arquiteturas estáticas (Jamstack) resgatou a simplicidade, a segurança e o alto desempenho de servir arquivos pré-compilados diretamente de uma infraestrutura de distribuição global (CDN).

Neste artigo abrangente, vamos explorar a fundo como arquitetar, configurar e automatizar a publicação de um blog moderno utilizando **Jekyll**, **Markdown** e pipelines de integração e entrega contínuas (**CI/CD**) no **GitHub Actions**, cobrindo desde a fundação teórica até a resolução de problemas complexos de roteamento e cache.

---

## 1. Por que Arquitetura Estática com Jekyll?

Diferente de sistemas CMS tradicionais baseados em bancos de dados relacionais e execução em tempo de requisição (como WordPress ou Drupal), um gerador de sites estáticos (SSG - *Static Site Generator*) como o Jekyll opera em tempo de compilação.

```text
[ CMS Tradicional ]
Requisição HTTP -> Servidor Web -> Linguagem (PHP/Node) -> Consulta DB -> Renderização HTML -> Resposta HTTP

[ Arquitetura Jamstack / SSG ]
Git Commit -> Build Engine (Jekyll) -> Arquivos HTML/CSS/JS Estáticos -> CDN (Edge) -> Resposta HTTP Directa
```

### Principais Vantagens:
1. **Desempenho Extremo:** Os arquivos HTML já nascem prontos na infraestrutura. A latência de resposta é limitada apenas pelo tempo de transferência de rede do nó de CDN mais próximo do usuário.
2. **Segurança por Design:** Sem banco de dados, sem endpoints dinâmicos e sem código executável no servidor web. Isso reduz a superfície de ataque a praticamente zero.
3. **Custos Nulos de Infraestrutura:** A hospedagem via GitHub Pages elimina a necessidade de servidores dedicados ou instâncias serverless pagas.
4. **Portabilidade e Controle de Versão:** Todo o conteúdo do blog reside em arquivos texto formatados em Markdown dentro de um repositório Git.

---

## 2. Anatomia de um Projeto Jekyll

Para que o engine do Jekyll processe a estrutura corretamente sem erros de compilação, o repositório deve respeitar uma hierarquia rigorosa de arquivos e diretórios:

```text
meu-blog-jekyll/
├── .github/
│   └── workflows/
│       └── jekyll.yml          # Workflow de automação do CI/CD
├── _posts/
│   ├── 2026-11-01-primeiro-post.md
│   └── 2026-11-07-guia-definitivo-jekyll.md
├── _layouts/                   # (Opcional) Templates HTML customizados
├── _includes/                  # (Opcional) Componentes reutilizáveis (headers, footers)
├── _config.yml                 # Arquivo central de configurações globais
├── index.md                    # Ponto de entrada (Home Page)
├── sobre.md                    # Página institucional estática
└── Gemfile                     # Gerenciador de dependências Ruby (opcional para builds via Actions)
```

### O Papel do Front Matter
Cada arquivo Markdown no Jekyll contém um bloco inicial delimitado por três hífens (`---`). Este bloco é denominado **Front Matter** e define os metadados que orientam o compilador:

```yaml
---
layout: post
title: "Título do seu artigo aqui"
date: 2026-11-07 20:00:00 -0300
categories: [tecnologia, testes]
permalink: /artigos/primeiro-post/
---
```

---

## 3. Configuração Global e Engenharia de Caminhos (`_config.yml`)

O arquivo `_config.yml` atua como o cérebro da aplicação. O erro mais frequente ao implantar sites no GitHub Pages é o mapeamento incorreto das variáveis `url` e `baseurl`.

Quando um site é hospedado em um repositório secundário (como `https://usuario.github.io/meu-repositorio/`), o Jekyll precisa saber exatamente como construir os links absolutos e relativos para scripts, estilos CSS e imagens.

```yaml
# ==============================================================================
# Configurações do Projeto
# ==============================================================================
title: "Tudo Que Testei"
tagline: "Laboratório de testes, análises práticas e engenharia."
description: "Avaliações profundas sobre tecnologia, desenvolvimento e produtividade."
author: "ConnectLab"
email: "contato@connectlab.ddns.net"

# ==============================================================================
# Mapeamento de Caminhos e Domínios (Crítico para GitHub Pages)
# ==============================================================================
# O domínio raiz da hospedagem do GitHub
url: "https://connectlab1.github.io"

# O nome exato do repositório no GitHub (com a barra inicial)
baseurl: "/tudoquetestei"

# ==============================================================================
# Idioma e Fusos Horários
# ==============================================================================
lang: pt-BR
timezone: America/Sao_Paulo

# ==============================================================================
# Tema e Processamento
# ==============================================================================
theme: minima
markdown: kramdown

# Plugins suportados pelo GitHub Pages
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# ==============================================================================
# Exclusões de Build
# ==============================================================================
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/
  - .github/
```

---

## 4. Pipeline Completo de CI/CD com GitHub Actions

Antigamente, o GitHub Pages realizava a compilação de forma oculta nos seus servidores. O padrão moderno e recomendado pela comunidade é utilizar o **GitHub Actions**, garantindo visibilidade total do build, validação de etapas e logs em tempo real.

Crie o arquivo `.github/workflows/jekyll.yml` com a seguinte declaração:

```yaml
name: Deploy Jekyll Site to GitHub Pages

on:
  # Dispara o pipeline em todo push efetuado na branch main
  push:
    branches: ["main"]

  # Permite a execução manual do pipeline através da aba Actions no GitHub
  workflow_dispatch:

# Define permissões estritas para o token de autenticação do GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Garante que apenas um deploy ocorra por vez, evitando condições de corrida
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # ----------------------------------------------------------------------------
  # Job 1: Build (Compilação do código fonte Markdown para HTML estático)
  # ----------------------------------------------------------------------------
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do Repositório
        uses: actions/checkout@v4

      - name: Configurar ambiente GitHub Pages
        uses: actions/configure-pages@v5

      - name: Compilar site com Jekyll Engine
        uses: actions/jekyll-build-pages@v1
        with:
          source: ./
          destination: ./_site

      - name: Enviar Artefato Compilado
        uses: actions/upload-pages-artifact@v3

  # ----------------------------------------------------------------------------
  # Job 2: Deploy (Publicação dos artefatos nos servidores web da CDN do GitHub)
  # ----------------------------------------------------------------------------
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Publicar no GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

---

## 5. Diagnóstico de Erros Comuns e Solução de Problemas

Durante o ciclo de vida do desenvolvimento de um site estático, diversos percalços podem surgir. Abaixo estão os cenários mais frequentes e como solucioná-los com precisão técnica.

### Erro 1: Erro HTTP 404 na Raiz do Domínio
* **Causa:** O repositório não possui um arquivo `index.md` ou `index.html` na pasta raiz contendo a marcação `layout: home`. Sem ele, a pasta compilada `_site` fica vazia na raiz.
* **Solução:** Crie o arquivo `index.md` com as configurações mínimas do Front Matter.

### Erro 2: `HttpError: Not Found` no log do GitHub Actions
* **Causa:** O mecanismo de publicação do repositório está configurado para o modo legado (*Deploy from a branch*) em vez de aceitar acionamento via Actions.
* **Solução:** Acesse **Settings > Pages** no repositório e altere a opção **Source** para **GitHub Actions**.

### Erro 3: O Deploy dá Verde (`Reported success!`), mas o site não atualiza
* **Causa:** Política agressiva de cache HTTP do navegador do cliente ou invalidação pendente na CDN do GitHub.
* **Solução:** Force a atualização ignorando o cache local com `Ctrl + F5` (Windows/Linux) ou `Cmd + Shift + R` (macOS), ou teste acessando em uma **guia anônima**.

### Erro 4: Estilos CSS e Imagens não carregam
* **Causa:** Referências de caminho rígidas (como `/assets/style.css`) sem considerar a subpasta definida no `baseurl`.
* **Solução:** Utilize o filtro nativo do Jekyll para construir URLs seguras nos seus arquivos HTML/Markdown:
  ```html
  <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
  ```

---

## Conclusão

A união do **Jekyll** com o **GitHub Pages** via **GitHub Actions** fornece uma infraestrutura pronta para produção, altamente disponível, rápida e sem custos de hospedagem. Uma vez superadas as etapas iniciais de estruturação dos arquivos de entrada e alinhamento dos caminhos de rede no `_config.yml`, o fluxo de trabalho se resume à simplicidade de escrever novos arquivos Markdown e realizar o `git push`.

Este artigo é um reflexo direto dos experimentos práticos realizados e documentados no repositório do **Tudo Que Testei**.
