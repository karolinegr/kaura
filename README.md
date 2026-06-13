# kaura

Um site comemorativo — uma página única, animada e interativa, feita como presente.
Roda 100% no navegador (sem backend, sem custo de servidor).

Feito com **Vite + React + TypeScript + Tailwind CSS + Framer Motion**, com toques
interativos de **tsParticles** (partículas que reagem ao mouse), **react-spring +
use-gesture** (física: arrastar), **canvas-confetti** (confete) e **react-youtube**
(áudio de um vídeo do YouTube).

## Seções

- Abertura com contador de tempo ao vivo
- Mapa estilizado da distância entre duas cidades
- Galeria de fotos (baralho de polaroids arrastável, com zoom ao clicar)
- Trilha sonora (músicas com trechos de letra)
- Bloco interativo "every lifetime" com confete
- Cartinhas (cards que viram)
- Mural de tweets (carrossel no celular, mosaico no desktop)
- Cards de interesses (que viram ao tocar)
- Palavras cruzadas jogáveis
- Modo noite com céu estrelado e uma surpresa escondida
- Pétalas caindo pela tela + música de fundo

## Rodando localmente

```bash
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # testa a versão de produção
```

## Onde fica o conteúdo

Tudo que é conteúdo está em arquivos simples de editar:

| O quê | Arquivo | Pasta de mídia |
|------|---------|----------------|
| Configurações gerais (textos, datas, cidades, música) | `src/config.ts` | — |
| Fotos | `src/data/photos.ts` | `public/photos/` |
| Cartinhas | `src/data/letters.ts` | — |
| Tweets/prints | `src/data/tweets.ts` | `public/tweets/` |
| Músicas | `src/data/songs.ts` | — |
| Cards de interesses | `src/data/passions.ts` | — |
| Palavras cruzadas | `src/data/crossword.ts` | — |

As cores ficam no topo de `src/index.css`, no bloco `@theme` — mude os valores
`--color-*` e o site inteiro muda junto.

A música de fundo toca o áudio de um vídeo do YouTube: em `src/config.ts → youtubeId`
fica só o ID do vídeo. Como navegadores bloqueiam som automático, ela começa no
primeiro gesto do usuário (clique, tecla, scroll ou toque).

## Deploy

Pronto para **GitHub Pages** (workflow em `.github/workflows/deploy.yml`): a cada push
na branch `main`, o site é buildado e publicado automaticamente. Em **Settings → Pages**,
defina **Source: GitHub Actions**. Para domínio próprio, ajuste `public/CNAME`.
