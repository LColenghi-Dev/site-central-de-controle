import { ExternalLink, CheckCircle } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   Substitua as URLs pelas contas reais de cada plataforma
   ────────────────────────────────────────────────────────── */
const PLATFORMS = [
  {
    name: 'Meta Ads',
    subtitle: 'Facebook & Instagram',
    desc: 'Gerencie campanhas, conjuntos de anúncios e criativos para Facebook e Instagram.',
    color: 'cyan',
    url: 'https://adsmanager.facebook.com/adsmanager',
    links: [
      { label: 'Gerenciador de Anúncios', url: 'https://adsmanager.facebook.com/adsmanager' },
      { label: 'Business Manager',        url: 'https://business.facebook.com'              },
      { label: 'Biblioteca de Anúncios',  url: 'https://www.facebook.com/ads/library'       },
    ],
  },
  {
    name: 'Google Ads',
    subtitle: 'Search, Display & YouTube',
    desc: 'Gerencie campanhas de busca, display, shopping e vídeo na rede Google.',
    color: 'violet',
    url: 'https://ads.google.com',
    links: [
      { label: 'Painel de Campanhas', url: 'https://ads.google.com'           },
      { label: 'Google Analytics',    url: 'https://analytics.google.com'     },
      { label: 'Tag Manager',         url: 'https://tagmanager.google.com'    },
    ],
  },
]

export default function TrafegoPago() {
  return (
    <div className="cc">

      {/* Cabeçalho */}
      <div className="cc-header">
        <div>
          <p className="cc-eyebrow">Central de Campanhas</p>
          <h2 className="cc-title">Tráfego Pago</h2>
        </div>
        <div className="cc-status-pill">
          <span className="cc-status-dot" />
          2 plataformas ativas
        </div>
      </div>

      {/* Cards das plataformas */}
      <div className="cc-platforms">
        {PLATFORMS.map((p, i) => (
          <div key={i} className={`cc-platform-card cc-platform-card--${p.color}`}>

            <div className="cc-platform-card__head">
              <div>
                <p className="cc-platform-card__name">{p.name}</p>
                <p className="cc-platform-card__sub">{p.subtitle}</p>
              </div>
              <span className="cc-connected">
                <CheckCircle size={12} /> Conectado
              </span>
            </div>

            <p className="cc-platform-card__desc">{p.desc}</p>

            <div className="cc-platform-card__links">
              {p.links.map((l, j) => (
                <a
                  key={j}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cc-quick-link"
                >
                  {l.label} <ExternalLink size={11} />
                </a>
              ))}
            </div>

            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`cc-launch-btn cc-launch-btn--${p.color}`}
            >
              Abrir {p.name} <ExternalLink size={15} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
