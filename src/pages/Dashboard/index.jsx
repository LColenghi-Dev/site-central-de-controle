import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, TrendingUp, Layers, Cpu,
  Bell, Settings, LogOut, ChevronRight,
} from 'lucide-react'
import logo from '../../assets/imagens/logo-marazul.svg'
import VisaoGeral  from './VisaoGeral'
import TrafegoPago from './TrafegoPago'
import Projetos    from './Projetos'
import Automacoes  from './Automacoes'

const TABS = [
  { id: 'visao',    label: 'Visão Geral',  icon: LayoutDashboard },
  { id: 'trafego',  label: 'Tráfego Pago', icon: TrendingUp      },
  { id: 'projetos', label: 'Projetos',     icon: Layers          },
  { id: 'auto',     label: 'Automações',   icon: Cpu             },
]

const TAB_COMPONENTS = {
  visao:    VisaoGeral,
  trafego:  TrafegoPago,
  projetos: Projetos,
  auto:     Automacoes,
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState('visao')

  useEffect(() => {
    if (!sessionStorage.getItem('marazul_auth')) {
      navigate('/login')
    }
  }, [navigate])

  function logout() {
    sessionStorage.removeItem('marazul_auth')
    navigate('/login')
  }

  const CurrentTab  = TAB_COMPONENTS[active]
  const activeLabel = TABS.find(t => t.id === active)?.label

  return (
    <div className="dash">

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside className="dash__sidebar">
        <div className="dash__sidebar-top">

          {/* Brand */}
          <div className="dash__brand">
            <img src={logo} alt="Marazul" className="dash__brand-logo" />
            <div className="dash__status">
              <span className="dash__status-dot" />
              <span className="dash__status-text">Sistema ativo</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="dash__nav">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`dash__nav-item${active === id ? ' dash__nav-item--active' : ''}`}
                onClick={() => setActive(id)}
              >
                <Icon size={17} className="dash__nav-icon" />
                <span>{label}</span>
                {active === id && (
                  <ChevronRight size={13} className="dash__nav-arrow" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="dash__sidebar-foot">
          <button className="dash__foot-btn">
            <Settings size={15} />
            <span>Configurações</span>
          </button>
          <button
            className="dash__foot-btn dash__foot-btn--danger"
            onClick={logout}
          >
            <LogOut size={15} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ───────────────────────────────────────── */}
      <div className="dash__main">

        {/* Header */}
        <header className="dash__header">
          <div className="dash__header-left">
            <p className="dash__breadcrumb">
              Central de Comando <span>/</span> {activeLabel}
            </p>
            <div className="dash__period-badge">
              <span className="dash__period-dot" />
              Junho 2025
            </div>
          </div>

          <div className="dash__header-right">
            <button className="dash__bell" aria-label="Notificações">
              <Bell size={17} />
              <span className="dash__bell-badge">3</span>
            </button>
            <div className="dash__avatar">LF</div>
          </div>
        </header>

        {/* Content */}
        <main className="dash__content">
          <CurrentTab key={active} />
        </main>
      </div>
    </div>
  )
}
