const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Habilita CORS
app.use(cors());
app.use(express.json());

// Log de requisições
app.use((req, res, next) => {
  console.log(`[PROXY] ${req.method} ${req.path}`);
  next();
});

// ✅ PROXY CORRETO
app.use('/', createProxyMiddleware({
  target: 'https://aiutodesk-backend.onrender.com',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/' // Mantém o path como está (sem duplicação)
  },
  logLevel: 'info',
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Proxy rodando em http://localhost:${PORT}`);
  console.log(`📡 Redirecionando para: https://aiutodesk-backend.onrender.com`);
});