import { motion } from 'framer-motion'
import Section from './Section'
import { config } from '../config'

export default function Distance() {
  return (
    <Section
      id="distancia"
      title="perto, mesmo de longe"
      subtitle={`${config.cityA} 💌 ${config.cityB}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl rounded-3xl border border-sage/40 bg-cream/80 p-3 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <svg viewBox="0 0 640 300" className="w-full" role="img" aria-label="mapa do amor">
          {/* rota pontilhada entre as cidades */}
          <path
            id="route"
            className="stroke-sage"
            d="M140,110 C290,30 360,290 500,200"
            fill="none"
            strokeWidth="3"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />

          {/* pino: cidade A (azul = você) */}
          <g>
            <circle className="fill-blue" cx="140" cy="110" r="20" opacity="0.35">
              <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle className="fill-bluedeep" cx="140" cy="110" r="9" />
            <text className="fill-cocoa" x="140" y="84" textAnchor="middle" fontSize="27" fontFamily="Inter">
              {config.cityA}
            </text>
          </g>

          {/* pino: cidade B (verde = ela) */}
          <g>
            <circle className="fill-moss" cx="500" cy="200" r="20" opacity="0.35">
              <animate attributeName="r" values="14;22;14" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
            </circle>
            <circle className="fill-forest" cx="500" cy="200" r="9" />
            <text className="fill-cocoa" x="500" y="240" textAnchor="middle" fontSize="27" fontFamily="Inter">
              {config.cityB}
            </text>
          </g>

          {/* cartinha viajando entre as duas */}
          <text textAnchor="middle" dominantBaseline="central" fontSize="26">
            💌
            <animateMotion dur="7s" repeatCount="indefinite" rotate="0">
              <mpath href="#route" />
            </animateMotion>
          </text>
        </svg>

        <div className="mt-2 text-center">
          <p className="font-serif text-4xl font-semibold text-mix sm:text-5xl">
            {config.distanceKm.toLocaleString('pt-BR')} km
          </p>
          <p className="mt-2 font-hand text-xl text-moss sm:text-2xl">
            que não significam nada quando o coração já mora aí ♡
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
