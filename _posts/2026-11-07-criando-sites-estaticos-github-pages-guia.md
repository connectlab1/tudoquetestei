---
layout: post
title: "Criação de Sites no GitHub com Jekyll: Guia Completo de Hospedagem e Automação"
date: 2026-11-07 15:00:00 -0300
categories: [GitHub Pages, Jekyll, Infraestrutura]
description: "Um passo a passo completo sobre como criar, estruturar e publicar sites estáticos gratuitos no GitHub Pages utilizando o motor de geração Jekyll."
---

O **GitHub Pages** é uma das ferramentas mais eficientes e econômicas para desenvolvedores, criadores de conteúdo e profissionais de tecnologia que precisam colocar projetos no ar. Ao combinar a hospedagem nativa do GitHub com o motor estático **Jekyll**, você obtém um site de altíssima performance, segurança robusta e **custo zero de infraestrutura**.

Neste artigo, abordamos a arquitetura do GitHub Pages, a estrutura de arquivos exigida pelo Jekyll e o fluxo prático para publicar seu site sem complicações.

---

## 1. Como Funciona a Hospedagem no GitHub Pages

O GitHub Pages serve arquivos estáticos (HTML, CSS, JS e mídias) diretamente dos repositórios do GitHub. Existem dois tipos principais de publicação:

* **Site de Perfil/Organização (`usuario.github.io`):** O repositório deve ter o nome exato do seu usuário no GitHub. O site fica publicado no domínio raiz (`https://usuario.github.io`).
* **Site de Projeto (`usuario.github.io/nome-do-projeto`):** Pode ser ativado em qualquer repositório público. O site fica disponível como um subdiretório.

Como a entrega é baseada em arquivos estáticos distribuídos por CDN, não há backend dinâmico ou banco de dados para gerenciar, o que garante carregamento instantâneo e proteção contra a maioria das vulnerabilidades web.

---

## 2. Estrutura de Arquivos Compatível com Jekyll

Para que o motor do Jekyll reconheça seu projeto e processe a paginação, os layouts e o conteúdo em Markdown, a raiz do seu repositório deve seguir a seguinte estrutura:

```text
meu-site/
├── _config.yml         # Configurações globais (título, plugins, paginação)
├── _posts/             # Artigos em Markdown (YYYY-MM-DD-titulo.md)
├── _layouts/           # Templates HTML (default.html, post.html)
├── assets/             # Arquivos CSS, SCSS, JS e imagens
└── index.html          # Página principal (obrigatória para o jekyll-paginate)
```

> **Atenção:** O arquivo da página principal deve ser obrigatoriamente **`index.html`** (e não `index.md`) se você utilizar o plugin nativo de paginação (`jekyll-paginate`), permitindo que a variável `paginator.posts` seja processada corretamente.

---

## 3. Configuração do `_config.yml`

O arquivo `_config.yml` é o centro de controle do Jekyll. Abaixo está uma configuração base com suporte a paginação e URLs amigáveis:

```yaml
title: "Tudo Que Testei"
description: "Laboratório prático de testes e infraestrutura"
baseurl: "" # Deixe em branco para usuario.github.io ou coloque "/nome-do-projeto"
url: "https://usuario.github.io"

# Configuração de Paginação
plugins:
  - jekyll-paginate

paginate: 6
paginate_path: "/page:num/"

# Markdown e Permalinks
markdown: kramdown
permalink: /:categories/:title/
```

---

## 4. Criando um Artigo em Markdown

Todos os artigos devem ficar dentro da pasta **`_posts/`**. O nome do arquivo deve seguir rigorosamente o padrão `AAAA-MM-DD-titulo-do-post.md`.

No topo de cada arquivo, insira o cabeçalho **Front Matter** delimitado por três hifens (`---`):

```markdown
---
layout: post
title: "Como Configurar Servidores Web de Alta Performance"
date: 2026-11-07 14:00:00 -0300
categories: [Infraestrutura, Web]
description: "Testes práticos de otimização de Nginx e Caddy para produção."
---

Aqui começa o conteúdo do seu artigo escrito em Markdown tradicional.

### Vantagens dessa abordagem:
1. Escreva em texto puro com formatação simples.
2. Suporte nativo a blocos de código com *syntax highlighting*.
3. Versionamento total pelo Git.
```

---

## 5. Publicando no GitHub (Deploy Automático)

Com a estrutura montada, basta enviar as alterações para o repositório remoto. O GitHub recompila o site automaticamente a cada `git push`:

```bash
# Adicionar as alterações ao controle de versão
git add .

# Criar o commit de alteração
git commit -m "feat: adiciona artigo sobre criacao de sites no github"

# Enviar para a branch principal
git push origin main
```

### Ativando o GitHub Pages no Repositório
1. Vá até o seu repositório no GitHub e clique na aba **Settings**.
2. Na barra lateral esquerda, clique em **Pages**.
3. Em **Build and deployment > Source**, selecione **Deploy from a branch** (ou **GitHub Actions** se usar um pipeline customizado).
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**.

Em poucos segundos, o pipeline do GitHub processará o build do Jekyll e seu site estará publicado e acessível publicamente.
