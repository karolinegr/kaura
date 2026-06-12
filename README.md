# kaura 💚🤎💙

Site de aniversário de namoro da **Karoline & Laura** (ship: **KAURA**).
Feito com **Vite + React + TypeScript + Tailwind CSS + Framer Motion**, com toques
interativos de **tsParticles** (partículas que reagem ao mouse), **react-spring +
use-gesture** (física: coração arrastável e baralho de fotos), **canvas-confetti**
(confete em formato de coração) e **react-youtube** (toca o áudio oficial da música).
Tudo roda no navegador (sem backend, sem custo de servidor).

## Seções

- **Abertura** — título em degradê verde→azul, frases em "máquina de escrever" e contador ao vivo (juntas desde 16/05/2026)
- **Distância** — mapa estilizado São Paulo ↔ Caxias do Sul com uma cartinha viajando entre vocês
- **Galeria de fotos** — um **baralho de polaroids** que você arrasta/joga pra ver a próxima (física), com um **coração azul arrastável** logo abaixo
- **Trilha sonora de nós** — I Believe (Jonas Brothers), Daylight (Taylor Swift) e Anavitória
- **every lifetime ∞** — a caixinha clicável *every night → every day → how about every lifetime?* com confete de corações, sobre partículas de coração/tulipa que reagem ao mouse
- **Cartinhas** — mensagens que abrem como envelopes
- **Mural de tweets** — prints engraçados de vocês
- **O que a gente ama** — tulipas, gatos, Barça Femení 🌷🐱⚽
- **Palavras cruzadas de nós** — uma cruzadinha jogável com as piadas internas/referências de vocês (14 palavras: GATOS, GRANA, HAAS, SETE, BROWNIE, MADRIDISTA, ALEXIA, AGNES, GUIJARRAZO, KIKA, LAURA, KAURA, TULIPA, AZUL), com confete ao resolver 🧩
- **Vales/tickets** — resgatáveis com senha (fica salvo no navegador)
- **Modo noite 🌙** — botão sol/lua no menu liga um céu estrelado (com lua e estrela cadente); a preferência fica salva
- **Pétalas de tulipa** caindo pela tela o tempo todo + trilha sonora tocando

### As cores

A paleta é as cores **dela** (verde + marrom terroso) como base, com o **seu azul**
entrando nos detalhes, botões e na linha entre as cidades — as cores de vocês misturadas.

---

## Rodando localmente

```bash
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em dist/
npm run preview  # testa a versão de produção
```

---

## ✏️ Como colocar o SEU conteúdo

Tudo que é "conteúdo de vocês" está em arquivos fáceis de editar:

| O quê | Arquivo | Pasta de arquivos |
|------|---------|-------------------|
| Nomes, data do namoro, cidades, senha, música | `src/config.ts` | — |
| Fotos | `src/data/photos.ts` | `public/photos/` |
| Cartinhas | `src/data/letters.ts` | — |
| Tweets (prints) | `src/data/tweets.ts` | `public/tweets/` |
| Músicas/trechos | `src/data/songs.ts` | — |
| Paixões (tulipas/gatos/Barça) | `src/data/passions.ts` | — |
| Palavras cruzadas | `src/data/crossword.ts` | — |
| Vales | `src/data/tickets.ts` | — |

### A música 🎵

O player toca o **áudio do vídeo oficial do YouTube**. Em `src/config.ts → youtubeId`
fica só o ID do vídeo (hoje `d4lSke63WMI`, de https://youtu.be/d4lSke63WMI). Pra trocar
de música, é só pôr o ID de outro vídeo. A música tenta tocar ao abrir o site e,
como os navegadores bloqueiam som automático, ela começa no **primeiro gesto** dela
(clique, tecla, scroll ou toque). O botão flutuante também pausa/retoma.

### As palavras cruzadas 🧩

A grade fica em `src/data/crossword.ts`. As palavras se **cruzam**, então se for editar,
cuide pra as letras baterem nos cruzamentos (ou me peça pra montar uma grade nova).

### As cores 🎨

A paleta toda está no topo de `src/index.css`, no bloco `@theme`.
Mude os valores `--color-*` e o site inteiro muda junto.

> Os arquivos `exemplo-*.svg` em `public/photos/` e `public/tweets/` são só
> placeholders — pode apagar quando colocar os reais.

---

## 🚀 Publicar (deploy grátis)

**Vercel** (recomendado): crie conta em https://vercel.com, suba o projeto pro GitHub,
"New Project" → ela detecta Vite sozinha → Deploy. Você recebe um link tipo
`kaura.vercel.app` pra mandar pra Laura 💌

**Netlify**: mesmo fluxo; build `npm run build`, pasta de publicação `dist`.

---

## 🔄 Resetar os vales resgatados (pra testar)

No Console do navegador (F12):

```js
localStorage.removeItem('kaura:redeemed')
```

E recarregue a página.
