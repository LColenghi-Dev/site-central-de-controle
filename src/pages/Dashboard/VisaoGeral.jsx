import { useEffect, useState } from 'react'
import {
  TrendingUp, Users, DollarSign, Eye,
  ArrowUpRight, ArrowDownRight,
  Layers, Cpu, CheckCheck, Clock,
} from 'lucide-react'

/* ── Dados mockados ─────────────────────────────────────── */
const KPIS = [
  {
    label: 'Investimento',
    value: 28400,
    format: v => 'R$ ' + (v / 1000).toFixed(1) + 'k',
    trend: 14.2,
    up: true,
    icon: DollarSign,
    color: 'cyan',
    delay: 0,
  },
  {
    label: 'ROAS',
    value: 420,           /* × 100 para animar como inteiro */
    format: v => (v / 100).toFixed(1) + '×',
    trend: 18,
    up: true,
    icon: TrendingUp,
    color: 'green',
    delay: 80,
  },
  {
    label: 'Impressões',
    value: 1247,          /* × 1 000 → exibe como 1.247M */
    format: v => (v / 1000).toFixed(2) + 'M',
    trend: 22.5,
    up: true,
    icon: Eye,
    color: 'violet',
    delay: 160,
  },
  {
    label: 'Leads Gerados',
    value: 847,
    format: v => Math.round(v).toString(),
    trend: 18.3,
    up: true,
    icon: Users,
    color: 'amber',
    delay: 240,
  },
]

const WEEK_DATA = [
  { day: 'Seg', h: 52 }, { day: 'Ter', h: 68 },
  { day: 'Qua', h: 45 }, { day: 'Qui', h: 80 },
  { day: 'Sex', h: 73 }, { day: 'Sáb', h: 91 },
  { day: 'Dom', h: 84 },
]

const PROJ_SUMMARY = { andamento: 8, revisao: 2, concluidos: 14 }
const AUTO_SUMMARY = { ativos: 5, execucoes: '6.4k', uptime: '99.8%' }

/* ── Componente KPI com contador animado ─────────────────── */
function KpiCard({ label, value, format, trend, up, icon: Icon, color, delay }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const dur = 1400
      const run = ts => {
        const p = Math.min((ts - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        setDisplayed(eased * value)
        if (p < 1) requestAnimationFrame(run)
      }
      requestAnimationFrame(run)
    }, delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return (
    <div className={`vg-kpi vg-kpi--${color}`}>
      <div className="vg-kpi__top">
        <span className="vg-kpi__label">{label}</span>
        <div className="vg-kpi__icon-wrap">
          <Icon size={15} />
        </div>
      </div>
      <p className="vg-kpi__value">{format(displayed)}</p>
      <div className={`vg-kpi__trend ${up ? 'vg-trend--up' : 'vg-trend--down'}`}>
        {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend}% vs mês anterior
      </div>
    </div>
  )
}

/* ── Componente Principal ────────────────────────────────── */
export default function VisaoGeral() {
  return (
    <div className="vg">

      {/* Saudação */}
      <div className="vg-greeting">
        <div>
          <p className="vg-greeting__eyebrow">Bom dia — Junho 2025</p>
          <h2 className="vg-greeting__title">
            Sua conta está em <em>alta performance</em>.
          </h2>
        </div>
        <div className="vg-greeting__badge">
          <span className="vg-greeting__dot" />
          Dados atualizados agora
        </div>
      </div>

      {/* KPIs */}
      <div className="vg-kpis">
        {KPIS.map((k, i) => (
          <KpiCard key={i} {...k} />
        ))}
      </div>

      {/* Gráfico 7 dias + widgets */}
      <div className="vg-bottom">

        {/* Mini chart */}
        <div className="vg-chart-card dash-card">
          <div className="vg-chart-card__head">
            <div>
              <p className="dash-label">Performance — Últimos 7 dias</p>
              <p className="vg-chart-card__sub">Investimento diário vs retorno</p>
            </div>
            <div className="vg-chart-legend">
              <span className="vg-legend-dot vg-legend-dot--cyan" /> Invest.
              <span className="vg-legend-dot vg-legend-dot--green" /> Retorno
            </div>
          </div>
          <div className="vg-bars">
            {WEEK_DATA.map((d, i) => (
              <div key={i} className="vg-bar-group">
                <div className="vg-bar-pair">
                  <div
                    className="vg-bar vg-bar--invest"
                    style={{ '--h': `${d.h * 0.75}%`, '--i': i }}
                  />
                  <div
                    className="vg-bar vg-bar--retorno"
                    style={{ '--h': `${d.h}%`, '--i': i + 0.5 }}
                  />
                </div>
                <span className="vg-bar-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widgets coluna direita */}
        <div className="vg-widgets">

          {/* Projetos widget */}
          <div className="vg-widget dash-card">
            <div className="vg-widget__head">
              <Layers size={15} className="vg-widget__icon" />
              <span className="vg-widget__title">Projetos</span>
            </div>
            <div className="vg-widget__rows">
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--cyan" />
                <span className="vg-widget__row-label">Em andamento</span>
                <span className="vg-widget__row-val">{PROJ_SUMMARY.andamento}</span>
              </div>
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--amber" />
                <span className="vg-widget__row-label">Em revisão</span>
                <span className="vg-widget__row-val">{PROJ_SUMMARY.revisao}</span>
              </div>
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--green" />
                <span className="vg-widget__row-label">Concluídos</span>
                <span className="vg-widget__row-val">{PROJ_SUMMARY.concluidos}</span>
              </div>
            </div>
            <div className="vg-widget__progress-bar">
              <div
                className="vg-widget__progress-fill"
                style={{ '--w': `${(PROJ_SUMMARY.concluidos / (PROJ_SUMMARY.andamento + PROJ_SUMMARY.revisao + PROJ_SUMMARY.concluidos)) * 100}%` }}
              />
            </div>
            <p className="vg-widget__foot">
              <CheckCheck size={12} /> {PROJ_SUMMARY.concluidos} entregas no mês
            </p>
          </div>

          {/* Automações widget */}
          <div className="vg-widget dash-card">
            <div className="vg-widget__head">
              <Cpu size={15} className="vg-widget__icon" />
              <span className="vg-widget__title">Automações n8n</span>
            </div>
            <div className="vg-widget__rows">
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--green vg-status--pulse" />
                <span className="vg-widget__row-label">Flows ativos</span>
                <span className="vg-widget__row-val">{AUTO_SUMMARY.ativos}</span>
              </div>
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--cyan" />
                <span className="vg-widget__row-label">Execuções hoje</span>
                <span className="vg-widget__row-val">{AUTO_SUMMARY.execucoes}</span>
              </div>
              <div className="vg-widget__row">
                <span className="vg-status-dot vg-status--violet" />
                <span className="vg-widget__row-label">Uptime</span>
                <span className="vg-widget__row-val">{AUTO_SUMMARY.uptime}</span>
              </div>
            </div>
            <div className="vg-widget__progress-bar">
              <div className="vg-widget__progress-fill vg-widget__progress-fill--green" style={{ '--w': '99.8%' }} />
            </div>
            <p className="vg-widget__foot">
              <Clock size={12} /> Última exec. há 2 segundos
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
