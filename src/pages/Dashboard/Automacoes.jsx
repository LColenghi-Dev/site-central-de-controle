import { ExternalLink, Zap } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   Substitua pela URL real da sua instância n8n
   ────────────────────────────────────────────────────────── */
const N8N_URL = 'https://SEU-DOMINIO.app.n8n.cloud'

const FLOWS = [
  { name: 'Lead → CRM + Slack',        last: '2s atrás'    },
  { name: 'Relatório Diário Ads',       last: '1h atrás'    },
  { name: 'Aprovação de Criativos',     last: '14min atrás' },
  { name: 'Notif. Leads Qualificados',  last: '8s atrás'    },
  { name: 'Backup ClickUp → Drive',     last: '6h atrás'    },
]

export default function Automacoes() {
  return (
    <div className="cc">

      {/* Cabeçalho */}
      <div className="cc-header">
        <div>
          <p className="cc-eyebrow">Orquestração de Processos</p>
          <h2 className="cc-title">Automações n8n</h2>
        </div>
        <a
          href={N8N_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cc-launch-btn cc-launch-btn--orange"
        >
          Abrir Editor n8n <ExternalLink size={14} />
        </a>
      </div>

      <div className="cc-n8n-grid">

        {/* Hero card do n8n */}
        <div className="cc-n8n-hero dash-card">
          <div className="cc-n8n-hero__inner">
            <div className="cc-n8n-logo">
              <Zap size={26} />
            </div>
            <div>
              <p className="cc-n8n-hero__name">n8n Workflow Editor</p>
              <p className="cc-n8n-hero__sub">5 flows ativos &nbsp;·&nbsp; Uptime 99.8%</p>
            </div>
          </div>
          <div className="cc-n8n-hero__actions">
            <a
              href={N8N_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-launch-btn cc-launch-btn--orange"
            >
              Abrir Workspace <ExternalLink size={14} />
            </a>
            <a
              href={`${N8N_URL}/workflow/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-btn-ghost"
            >
              Novo Flow <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Lista de flows com link direto */}
        <div className="cc-flows-list dash-card">
          <p className="dash-label" style={{ marginBottom: '14px' }}>Flows Ativos</p>
          {FLOWS.map((f, i) => (
            <a
              key={i}
              href={N8N_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-flow-row"
            >
              <span className="cc-flow-pulse" />
              <div className="cc-flow-info">
                <p className="cc-flow-name">{f.name}</p>
                <p className="cc-flow-last">Última exec. {f.last}</p>
              </div>
              <ExternalLink size={13} className="cc-flow-ext" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
