# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-21

### Adicionado
- Integração de modais dinâmicos para a seção de Serviços (App.jsx).
- Arquivo de configuração de segurança do Netlify (`netlify.toml`).
- Extensas metatags Open Graph e Twitter Cards (`index.html`).
- Mapeamento array (`map`) da seção de Depoimentos, eliminando a redundância de código (`App.jsx`).

### Alterado
- Refatoração do App.jsx para injetar propriedades `aria-label` e reforçar a acessibilidade (`WCAG`).
- Otimização do README com checklist de produção e licença.

### Removido
- Pasta duplicada de projeto/backup (`Atendcon`).

## [1.0.0] - Lançamento Inicial

### Adicionado
- Lançamento base do frontend.
- Componentes e seções de serviços e cases.
