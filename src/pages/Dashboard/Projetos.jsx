import { ExternalLink, Palette, Video, Calendar, Layers } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   Substitua pelas URLs das suas listas no ClickUp.
   Como encontrar: abra a lista no ClickUp → copie a URL.
   ────────────────────────────────────────────────────────── */
const CLICKUP_WORKSPACE = 'https://app.clickup.com'
const CLICKUP_DESIGN    = 'https://app.clickup.com/9007154660/v/l/8cdwhf4-13093'   // URL da lista de Design
const CLICKUP_VIDEO     = 'https://app.clickup.com/9007154660/v/l/6-901316762308-1'   // URL da lista de Vídeo
const CLICKUP_AGENDA    = 'https://app.clickup.com/9007154660/v/l/8cdwhf4-13173'   // URL do calendário/Agendamentos

const LISTS = [
  {
    icon:  Palette,
    name:  'Design',
    label: 'Abrir Lista de Design',
    desc:  'Aprovação de criativos, identidade visual e materiais gráficos da conta.',
    color: 'violet',
    url:   CLICKUP_DESIGN,
  },
  {
    icon:  Video,
    name:  'Edição de Vídeo',
    label: 'Abrir Lista de Vídeo',
    desc:  'Roteiros, gravações, edições e publicação de conteúdo em vídeo.',
    color: 'amber',
    url:   CLICKUP_VIDEO,
  },
  {
    icon:  Calendar,
    name:  'Agendamentos',
    label: 'Abrir Calendário',
    desc:  'Calendário editorial e publicações sincronizados com o calendário da conta.',
    color: 'green',
    url:   CLICKUP_AGENDA,
  },
]

const WORKSPACE_LINKS = [
  { label: 'Visão Geral',    url: CLICKUP_WORKSPACE },
]

export default function Projetos() {
  return (
    <div className="cc">

      {/* Cabeçalho */}
      <div className="cc-header">
        <div>
          <p className="cc-eyebrow">Gestão de Projetos</p>
          <h2 className="cc-title">Central ClickUp</h2>
        </div>
        <a
          href={CLICKUP_WORKSPACE}
          target="_blank"
          rel="noopener noreferrer"
          className="cc-launch-btn cc-launch-btn--cyan"
        >
          Abrir Workspace <ExternalLink size={14} />
        </a>
      </div>

      {/* Card hero do workspace */}
      <div className="cc-workspace-hero dash-card">
        <div className="cc-workspace-hero__inner">
          <div className="cc-workspace-icon">
            <Layers size={22} />
          </div>
          <div>
            <p className="cc-workspace-hero__name">ClickUp — Marazul</p>
            <p className="cc-workspace-hero__sub">3 listas ativas &nbsp;·&nbsp; Sincronizado agora</p>
          </div>
        </div>
        <div className="cc-workspace-hero__links">
          {WORKSPACE_LINKS.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-quick-link"
            >
              {l.label} <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>

      {/* 3 cards das listas */}
      <div className="cc-lists-grid">
        {LISTS.map((list, i) => {
          const Icon = list.icon
          return (
            <div key={i} className={`cc-list-card cc-list-card--${list.color}`}>

              <div className="cc-list-card__head">
                <div className={`cc-list-card__icon cc-list-card__icon--${list.color}`}>
                  <Icon size={20} />
                </div>
                <span className="cc-connected">
                  <span className="cc-connected-dot" /> Conectado
                </span>
              </div>

              <p className="cc-list-card__name">{list.name}</p>
              <p className="cc-list-card__desc">{list.desc}</p>

              <a
                href={list.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`cc-launch-btn cc-launch-btn--${list.color}`}
              >
                {list.label} <ExternalLink size={14} />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
