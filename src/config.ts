/* ════════════════════════════════════════════════════════════
   CONFIGURAÇÃO PRINCIPAL DO SITE
   Esse é o arquivo mais importante pra você editar. Tudo que é
   "informação de vocês" mora aqui. Mexa à vontade. 💚🤎💙
   ════════════════════════════════════════════════════════════ */

export const config = {
  /** Nome/título que aparece no topo e na aba do navegador. */
  siteTitle: 'KAURA',

  /** Frases que aparecem na abertura, uma de cada vez (efeito máquina de escrever). */
  taglines: [
    'o nosso cantinho na internet',
    'feito de verde, marrom e azul',
    'de São Paulo a Caxias, com amor',
    'feliz aniversário de namoro 🌷',
  ],

  /** A "fórmula" do ship, mostrada com destaque na abertura. */
  shipFormula: 'KAroline + laURA',

  /**
   * Data em que começaram a namorar (o contador conta a partir daqui).
   * Formato: 'AAAA-MM-DDThh:mm:ss'.
   * 16 de maio de 2026:
   */
  startDate: '2026-05-16T00:00:00',

  /**
   * Marcos da história de vocês, em ordem cronológica (a mini-timeline da
   * abertura mostra quantos dias já se passaram desde cada um).
   * Formato da data: 'AAAA-MM-DDThh:mm:ss'.
   */
  milestones: [
    { date: '2026-03-21T00:00:00', icon: '✨', label: 'a gente se achou' },
    { date: '2026-04-04T00:00:00', icon: '💬', label: 'começamos a conversar' },
    { date: '2026-05-16T00:00:00', icon: '💚', label: 'começamos a namorar' },
  ],

  /** Cidades de vocês (usadas na seção da distância). */
  cityA: 'São Paulo',
  cityB: 'Caxias do Sul',
  /** Distância aproximada entre elas, em km (só pra mostrar na tela). */
  distanceKm: 765,

  /**
   * Música de fundo — toca o áudio do vídeo OFICIAL do YouTube.
   * É só o ID do vídeo (o que vem depois de youtu.be/ ou watch?v=).
   * https://youtu.be/d4lSke63WMI  ->  'd4lSke63WMI'
   * Se deixar vazio (''), o player some.
   */
  youtubeId: 'd4lSke63WMI',
  musicTitle: 'I Believe — Jonas Brothers',

  /**
   * A surpresa do modo noturno: o mapa do céu na noite do primeiro beijo.
   * (a imagem fica em public/sky.png) — ajuste a data se quiser.
   */
  firstKiss: {
    place: 'Caxias do Sul, RS',
    date: '16 de maio de 2026',
    coords: "29°10′S · 51°11′O",
  },
}
