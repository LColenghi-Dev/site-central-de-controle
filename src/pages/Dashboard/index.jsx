export default function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      background: '#060b19',
      color: '#f4f7fa',
      fontFamily: "'Urbanist', sans-serif",
    }}>
      <p style={{ fontSize: '13px', color: '#00b4d8', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
        Em construção
      </p>
      <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em' }}>
        Dashboard
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px' }}>
        A Central de Controle chegará em breve.
      </p>
    </div>
  )
}
