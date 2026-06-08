/**
 * DASHBOARD EXTERNO — API Completa
 * ──────────────────────────────────────────────────────────
 * Este é o servidor do dashboard do gestor de tráfego.
 *
 * Como funciona:
 *  1. O gestor cadastra seus clientes e conecta as contas
 *     de Meta/Google dentro do próprio painel dele.
 *  2. Na tela de Configurações do painel, ele gera uma API Key.
 *  3. Você cola essa API Key no dashboard da Marazul.
 *  4. O dashboard da Marazul usa essa chave para puxar
 *     TODOS os dados do sistema — clientes, métricas,
 *     campanhas, relatórios — como um livro aberto.
 *
 * Instalar: npm install express cors bcrypt jsonwebtoken uuid dotenv
 * Rodar   : node server.js
 */

require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const bcrypt  = require('bcrypt')
const jwt     = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const app     = express()

app.use(cors())
app.use(express.json())

/* ════════════════════════════════════════════════════════════
   "BANCO DE DADOS" (em produção, usar PostgreSQL / MongoDB)
   ════════════════════════════════════════════════════════════ */

const DB = {

  /* Usuários do painel do gestor */
  users: [
    {
      id:       'user-1',
      name:     'Gestor de Tráfego',
      email:    'gestor@agencia.com',
      password: bcrypt.hashSync('senha123', 10), // nunca salvar senha em texto puro
      role:     'admin',
    },
  ],

  /* API Keys geradas nas Configurações */
  apiKeys: [
    /* Exemplo de chave já gerada para a Marazul */
    {
      id:          'key-1',
      key:         'mgr_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // chave real gerada com uuidv4
      label:       'Dashboard Marazul',
      createdAt:   '2025-06-01T00:00:00Z',
      lastUsed:    null,
      active:      true,
    },
  ],

  /* Clientes cadastrados no painel do gestor */
  clients: [
    {
      id:    'cli-1',
      name:  'Restaurante Sol',
      color: 'cyan',
      sector:'Alimentação',
      meta:  { accountId: 'act_111111111', connected: true  },
      google:{ customerId: '123-456-7890', connected: true  },
    },
    {
      id:    'cli-2',
      name:  'Clínica Vida',
      color: 'violet',
      sector:'Saúde',
      meta:  { accountId: 'act_222222222', connected: true  },
      google:{ customerId: '234-567-8901', connected: false },
    },
    {
      id:    'cli-3',
      name:  'Loja Moderna',
      color: 'green',
      sector:'Varejo',
      meta:  { accountId: 'act_333333333', connected: true  },
      google:{ customerId: '345-678-9012', connected: true  },
    },
  ],

  /* Dados de relatório por cliente
     Em produção, esses dados viriam da Meta API + Google Ads API */
  reports: {
    'cli-1': {
      summary: {
        investment:  3200.00,
        impressions: 84000,
        reach:       61000,
        clicks:      12430,
        conversions: 318,
        revenue:     16320.00,
        roas:        5.1,
        cpc:         0.74,
        cpm:         14.28,
        ctr:         3.2,
        frequency:   1.37,
        convRate:    2.56,
      },
      byPlatform: {
        meta: {
          investment:  1800.00,
          impressions: 54000,
          clicks:      7200,
          conversions: 198,
          roas:        5.5,
        },
        google: {
          investment:  1400.00,
          impressions: 30000,
          clicks:      5230,
          conversions: 120,
          roas:        4.6,
        },
      },
      campaigns: [
        { id:'c1', name:'Stories — Promo Almoço',     platform:'Meta',   budget:800,   impressions:38400, clicks:3210, conv:98,  roas:6.2, cpc:0.68, status:'Ativo'   },
        { id:'c2', name:'Search — Restaurante',        platform:'Google', budget:1200,  impressions:21000, clicks:5100, conv:142, roas:4.8, cpc:0.79, status:'Ativo'   },
        { id:'c3', name:'Remarketing — Visitantes',    platform:'Meta',   budget:600,   impressions:14200, clicks:2840, conv:78,  roas:4.1, cpc:0.73, status:'Pausado' },
        { id:'c4', name:'Display — Awareness',         platform:'Google', budget:400,   impressions:10600, clicks:1320, conv:18,  roas:2.3, cpc:0.84, status:'Ativo'   },
      ],
      timeSeries: [
        { date:'2025-05-01', investment:98,  clicks:380, conversions:9  },
        { date:'2025-05-02', investment:112, clicks:420, conversions:11 },
        { date:'2025-05-03', investment:95,  clicks:310, conversions:8  },
        { date:'2025-05-04', investment:130, clicks:510, conversions:14 },
        { date:'2025-05-05', investment:108, clicks:440, conversions:10 },
        { date:'2025-05-06', investment:121, clicks:490, conversions:12 },
        { date:'2025-05-07', investment:140, clicks:560, conversions:15 },
      ],
      topAds: [
        { id:'a1', name:'Prato do dia — vídeo 15s',  platform:'Meta',   impressions:18200, clicks:1640, conv:52, ctr:9.01, status:'Ativo'   },
        { id:'a2', name:'Delivery rápido — carrossel',platform:'Meta',   impressions:12400, clicks:980,  conv:31, ctr:7.90, status:'Ativo'   },
        { id:'a3', name:'Brand Search',               platform:'Google', impressions:8800,  clicks:2100, conv:68, ctr:23.8, status:'Ativo'   },
      ],
    },

    'cli-2': {
      summary: {
        investment:  1800.00,
        impressions: 42000,
        reach:       31000,
        clicks:      6720,
        conversions: 89,
        revenue:     6120.00,
        roas:        3.4,
        cpc:         1.20,
        cpm:         21.42,
        ctr:         1.9,
        frequency:   1.35,
        convRate:    1.32,
      },
      byPlatform: {
        meta: {
          investment:  900.00,
          impressions: 22000,
          clicks:      2800,
          conversions: 38,
          roas:        2.9,
        },
        google: {
          investment:  900.00,
          impressions: 20000,
          clicks:      3920,
          conversions: 51,
          roas:        3.8,
        },
      },
      campaigns: [
        { id:'c5', name:'Search — Clínica Saúde',     platform:'Google', budget:900,  impressions:18300, clicks:4100, conv:52, roas:3.8, cpc:1.10, status:'Ativo'   },
        { id:'c6', name:'Feed Instagram — Consulta',   platform:'Meta',   budget:500,  impressions:9400,  clicks:1820, conv:37, roas:2.9, cpc:1.32, status:'Ativo'   },
      ],
      timeSeries: [
        { date:'2025-05-01', investment:55,  clicks:210, conversions:3 },
        { date:'2025-05-02', investment:62,  clicks:240, conversions:4 },
        { date:'2025-05-03', investment:48,  clicks:180, conversions:2 },
        { date:'2025-05-04', investment:70,  clicks:280, conversions:5 },
      ],
      topAds: [
        { id:'a4', name:'Consulta online — imagem',  platform:'Meta',   impressions:6200, clicks:980,  conv:18, ctr:15.8, status:'Ativo' },
        { id:'a5', name:'Clínica perto de você',     platform:'Google', impressions:9400, clicks:2200, conv:34, ctr:23.4, status:'Ativo' },
      ],
    },

    'cli-3': {
      summary: {
        investment:  2600.00,
        impressions: 66000,
        reach:       48000,
        clicks:      9840,
        conversions: 241,
        revenue:     11700.00,
        roas:        4.5,
        cpc:         0.92,
        cpm:         13.63,
        ctr:         2.8,
        frequency:   1.37,
        convRate:    2.45,
      },
      byPlatform: {
        meta: {
          investment:  1500.00,
          impressions: 40000,
          clicks:      5800,
          conversions: 148,
          roas:        4.7,
        },
        google: {
          investment:  1100.00,
          impressions: 26000,
          clicks:      4040,
          conversions: 93,
          roas:        4.2,
        },
      },
      campaigns: [
        { id:'c7', name:'Shopping — Coleção Nova',    platform:'Google', budget:700,  impressions:14000, clicks:2200, conv:62,  roas:5.1, cpc:0.81, status:'Ativo'   },
        { id:'c8', name:'Feed — Lançamento Verão',    platform:'Meta',   budget:800,  impressions:22000, clicks:3100, conv:88,  roas:4.9, cpc:0.88, status:'Ativo'   },
        { id:'c9', name:'Remarketing Carrinho',       platform:'Meta',   budget:500,  impressions:11000, clicks:1980, conv:51,  roas:4.2, cpc:0.96, status:'Ativo'   },
        { id:'c10',name:'Search — Marca',             platform:'Google', budget:400,  impressions:8200,  clicks:1840, conv:40,  roas:3.8, cpc:0.98, status:'Pausado' },
      ],
      timeSeries: [
        { date:'2025-05-01', investment:82,  clicks:310, conversions:8  },
        { date:'2025-05-02', investment:90,  clicks:340, conversions:9  },
        { date:'2025-05-03', investment:78,  clicks:290, conversions:7  },
        { date:'2025-05-04', investment:98,  clicks:390, conversions:11 },
        { date:'2025-05-05', investment:86,  clicks:330, conversions:8  },
      ],
      topAds: [
        { id:'a6', name:'Produto em destaque — vídeo', platform:'Meta',   impressions:12000, clicks:1800, conv:52, ctr:15.0, status:'Ativo' },
        { id:'a7', name:'Shopping — Tênis Verão',      platform:'Google', impressions:7800,  clicks:1400, conv:38, ctr:17.9, status:'Ativo' },
      ],
    },
  },
}

/* ════════════════════════════════════════════════════════════
   MIDDLEWARE DE AUTENTICAÇÃO
   Verifica a API Key enviada no header Authorization
   ════════════════════════════════════════════════════════════ */

function requireApiKey(req, res, next) {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'API Key não informada',
      hint:  'Envie o header: Authorization: Bearer SUA_API_KEY',
    })
  }

  const key    = authHeader.split(' ')[1]
  const record = DB.apiKeys.find(k => k.key === key && k.active)

  if (!record) {
    return res.status(401).json({ error: 'API Key inválida ou desativada' })
  }

  /* Registra o último uso */
  record.lastUsed = new Date().toISOString()
  next()
}

/* ════════════════════════════════════════════════════════════
   ROTAS DE AUTENTICAÇÃO DO PAINEL DO GESTOR
   (usadas pelo gestor para fazer login e gerar API Keys)
   ════════════════════════════════════════════════════════════ */

/* POST /auth/login — o gestor faz login no painel dele */
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = DB.users.find(u => u.email === email)

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'E-mail ou senha inválidos' })
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET ?? 'segredo-temporario',
    { expiresIn: '8h' }
  )

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

/* POST /auth/api-keys — gera uma nova API Key (requer login JWT) */
app.post('/auth/api-keys', requireJwt, (req, res) => {
  const newKey = {
    id:        uuidv4(),
    key:       `mgr_live_${uuidv4().replace(/-/g, '')}`,
    label:     req.body.label ?? 'Nova integração',
    createdAt: new Date().toISOString(),
    lastUsed:  null,
    active:    true,
  }
  DB.apiKeys.push(newKey)
  res.status(201).json(newKey)
})

/* GET /auth/api-keys — lista as API Keys (requer login JWT) */
app.get('/auth/api-keys', requireJwt, (req, res) => {
  res.json(DB.apiKeys.map(k => ({ ...k, key: k.key.slice(0, 12) + '••••••••••••' })))
})

/* DELETE /auth/api-keys/:id — revoga uma API Key (requer login JWT) */
app.delete('/auth/api-keys/:id', requireJwt, (req, res) => {
  const record = DB.apiKeys.find(k => k.id === req.params.id)
  if (!record) return res.status(404).json({ error: 'Key não encontrada' })
  record.active = false
  res.json({ message: 'API Key revogada' })
})

function requireJwt(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token não informado' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET ?? 'segredo-temporario')
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}

/* ════════════════════════════════════════════════════════════
   ROTAS DA API PÚBLICA (exigem API Key)
   Estas são as rotas que o dashboard da Marazul consome
   ════════════════════════════════════════════════════════════ */

/* GET /api/clients
   Lista todos os clientes do gestor */
app.get('/api/clients', requireApiKey, (req, res) => {
  res.json(DB.clients.map(({ id, name, color, sector, meta, google }) => ({
    id, name, color, sector,
    platforms: {
      meta:   meta.connected,
      google: google.connected,
    },
  })))
})

/* GET /api/clients/:id
   Dados de um cliente específico */
app.get('/api/clients/:id', requireApiKey, (req, res) => {
  const client = DB.clients.find(c => c.id === req.params.id)
  if (!client) return res.status(404).json({ error: 'Cliente não encontrado' })
  res.json(client)
})

/* GET /api/clients/:id/report?period=last_30d
   Relatório completo: métricas, campanhas, série temporal, top ads */
app.get('/api/clients/:id/report', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Relatório não encontrado' })
  res.json(report)
})

/* GET /api/clients/:id/summary
   Só o resumo de KPIs (mais leve) */
app.get('/api/clients/:id/summary', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Não encontrado' })
  res.json(report.summary)
})

/* GET /api/clients/:id/campaigns
   Só a lista de campanhas */
app.get('/api/clients/:id/campaigns', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Não encontrado' })
  res.json(report.campaigns)
})

/* GET /api/clients/:id/timeseries
   Série temporal dia a dia (para gráfico) */
app.get('/api/clients/:id/timeseries', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Não encontrado' })
  res.json(report.timeSeries)
})

/* GET /api/clients/:id/ads
   Top anúncios do cliente */
app.get('/api/clients/:id/ads', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Não encontrado' })
  res.json(report.topAds)
})

/* GET /api/clients/:id/platforms
   Dados separados por plataforma (Meta vs Google) */
app.get('/api/clients/:id/platforms', requireApiKey, (req, res) => {
  const report = DB.reports[req.params.id]
  if (!report) return res.status(404).json({ error: 'Não encontrado' })
  res.json(report.byPlatform)
})

/* ─── Start ─── */
const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => console.log(`Dashboard API rodando em http://localhost:${PORT}`))
