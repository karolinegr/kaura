import { motion } from 'framer-motion'
import Section from './Section'
import DraggableHeart from './DraggableHeart'
import { config } from '../config'


const ROUTE = 'M505,120 C400,60 260,90 175,250'

// etiqueta de cidade (pílula com o nome), largura calculada pelo texto
function CityLabel({ x, y, name }: { x: number; y: number; name: string }) {
  const w = Math.max(110, name.length * 12.5 + 30)
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 20}
        width={w}
        height={36}
        rx={18}
        className="fill-cream stroke-sage"
        strokeWidth="1.5"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="21"
        fontFamily="Inter"
        fontWeight="600"
        className="fill-wine"
      >
        {name}
      </text>
    </g>
  )
}

export default function Distance() {
  return (
    <Section id="distancia" title="perto, mesmo de longe" subtitle={`${config.cityA} 💗 ${config.cityB}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-sage/40 bg-gradient-to-b from-cream/90 to-blush/40 p-3 shadow-sm backdrop-blur-sm sm:p-6"
      >
        <svg viewBox="0 0 680 360" className="w-full" role="img" aria-label="mapa da nossa distância">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5f80a0" />
              <stop offset="0.5" stopColor="#d96f93" />
              <stop offset="1" stopColor="#6f854f" />
            </linearGradient>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.4" className="fill-sage" opacity="0.22" />
            </pattern>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* textura de pontinhos */}
          <rect x="0" y="0" width="680" height="360" fill="url(#dots)" />

          {/* corações decorativos bem fraquinhos (cantos livres) */}
          <text x="70" y="80" fontSize="26" className="fill-tulip" opacity="0.18">♥</text>
          <text x="600" y="320" fontSize="22" className="fill-blue" opacity="0.18">♥</text>

          {/* rota: base suave + tracinhos coloridos que fluem */}
          <path d={ROUTE} fill="none" className="stroke-sage" strokeWidth="2" opacity="0.3" />
          <path
            id="route"
            d={ROUTE}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 12"
          >
            <animate attributeName="stroke-dashoffset" values="0;-13" dur="0.9s" repeatCount="indefinite" />
          </path>

          {/* pino: cidade A — São Paulo (azul), a nordeste (direita) */}
          <g>
            <circle className="fill-blue" cx="505" cy="120" r="20" opacity="0.35">
              <animate attributeName="r" values="12;24;12" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle className="fill-cream" cx="505" cy="120" r="10" />
            <circle className="fill-bluedeep" cx="505" cy="120" r="6.5" />
          </g>
          <CityLabel x={505} y={162} name={config.cityA} />

          {/* pino: cidade B — Caxias do Sul (verde), a sudoeste (esquerda) */}
          <g>
            <circle className="fill-moss" cx="175" cy="250" r="20" opacity="0.35">
              <animate attributeName="r" values="12;24;12" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
            </circle>
            <circle className="fill-cream" cx="175" cy="250" r="10" />
            <circle className="fill-forest" cx="175" cy="250" r="6.5" />
          </g>
          <CityLabel x={175} y={292} name={config.cityB} />

          {/* selo "765 km" no alto do arco, com floatzinho */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -5; 0 0"
              dur="3.4s"
              repeatCount="indefinite"
            />
            <rect x="280" y="176" width="130" height="40" rx="20" className="fill-cream stroke-gold" strokeWidth="1.5" />
            <text x="345" y="203" textAnchor="middle" fontSize="20" fontFamily="Inter" fontWeight="700" className="fill-wine">
              <tspan className="fill-tulip">♥ </tspan>
              {config.distanceKm.toLocaleString('pt-BR')} km
            </text>
          </g>

          {/* coração viajando pela rota */}
          <g filter="url(#glow)">
            <path
              className="fill-tulip"
              transform="translate(-10,-10)"
              d="M10 6 C8 1 0 2 0 7 C0 11 5 15 10 18 C15 15 20 11 20 7 C20 2 12 1 10 6 Z"
            />
            <animateMotion dur="6s" repeatCount="indefinite" rotate="0">
              <mpath href="#route" />
            </animateMotion>
          </g>
        </svg>

        <p className="mt-3 text-center font-hand text-xl text-moss sm:text-2xl">
          {config.distanceKm.toLocaleString('pt-BR')} km que não significam nada quando o coração já mora aí.
        </p>
      </motion.div>

      {/* o coraçãozinho azul (você): a distância tenta afastar, mas ele sempre volta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-8 flex max-w-md flex-col items-center rounded-2xl bg-blue/5 px-6 py-7 text-center"
      >
        <p className="mt-2 max-w-xs font-hand text-xl text-blue/90">
          a distância insiste em tentar me afastar de você…
        </p>
        <div className="mt-5">
          <DraggableHeart emoji="💙" labelClass="text-blue" />
        </div>
      </motion.div>
    </Section>
  )
}
