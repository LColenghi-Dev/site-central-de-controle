import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import logo   from '../../assets/imagens/logo-marazul.svg'
import loginBg from '../../assets/imagens/login-bg.jpg'

export default function Login() {
  const navigate  = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="login">

      {/* ── LADO ESQUERDO — visual imersivo ───────────────────── */}
      <div
        className="login__visual"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="login__visual-overlay" />
        <div className="login__visual-content">
          <img src={logo} alt="Marazul" className="login__brand-logo" />
          <p className="login__tagline">
            <span className="login__tagline-top">Seja bem-vindo</span>
            <span className="login__tagline-bottom">
              ao seu Ecossistema.
            </span>
          </p>
        </div>
      </div>

      {/* ── LADO DIREITO — formulário ──────────────────────────── */}
      <div className="login__panel">
        <form className="login__form" onSubmit={handleSubmit} noValidate>

          <div className="login__header">
            <h1 className="login__title">Entrar</h1>
            <p className="login__sub">Acesse sua central de marketing</p>
          </div>

          <div className="login__fields">
            {/* E-mail */}
            <div className="login__field">
              <label className="login__label" htmlFor="email">E-mail</label>
              <div className="login__input-wrap">
                <Mail className="login__icon" size={16} aria-hidden="true" />
                <input
                  id="email"
                  className="login__input"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="login__field">
              <label className="login__label" htmlFor="password">Senha</label>
              <div className="login__input-wrap">
                <Lock className="login__icon" size={16} aria-hidden="true" />
                <input
                  id="password"
                  className="login__input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login__eye"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* Lembrar de mim */}
          <label className="login__remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <span>Lembrar de mim</span>
          </label>

          {/* Submit */}
          <button type="submit" className="login__submit">
            Acessar Ecossistema
          </button>

        </form>
      </div>
    </div>
  )
}
