import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
)

const N8N_BASE = 'https://n8n.marazulagenciadigital.com.br'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Não autenticado' })

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).json({ error: 'Sessão inválida' })

  const segments = Array.isArray(req.query.path) ? req.query.path : [req.query.path ?? '']
  const url = new URL(`${N8N_BASE}/${segments.join('/')}`)

  Object.entries(req.query).forEach(([k, v]) => {
    if (k !== 'path') url.searchParams.set(k, String(v))
  })

  try {
    const upstream = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'X-N8N-API-KEY': process.env.N8N_API_KEY ?? '',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    })

    const data = await upstream.json()
    return res.status(upstream.status).json(data)
  } catch (e) {
    return res.status(502).json({ error: 'n8n inacessível', detail: e.message })
  }
}