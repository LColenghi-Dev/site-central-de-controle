import logo from '../assets/imagens/logo-marazul.svg'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__logo">
          <img src={logo} alt="Marazul" />
        </a>

        <nav className="navbar__nav">
          <a href="#solucoes"   className="navbar__link">Soluções</a>
          <a href="#ecossistema" className="navbar__link">Ecossistema</a>
          <a href="#diretoria"  className="navbar__link">Diretoria</a>
        </nav>

        <button className="navbar__cta" type="button">
          Acessar Painel
        </button>
      </div>
    </header>
  )
}
