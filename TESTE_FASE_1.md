# 🧪 GUIA DE TESTE - FASE 1

## 📋 Pré-requisitos

- [ ] Backend rodando em `https://aiutodesk-backend.onrender.com`
- [ ] Android Studio/Emulador configurado (ou iOS Simulator)
- [ ] Expo Go instalado (para testar em celular)
- [ ] npm packages instalados (`npm install` já foi feito)

---

## 🚀 Como Rodar o Projeto

### 1. Inicie o Servidor de Desenvolvimento

```bash
cd c:\Users\Daniel Luna\Desktop\AiutoDesk\aiutodesk-app
npm start
```

### 2. Escolha a Plataforma

```
› Press w for web
› Press a for Android
› Press i for iOS
› Press e to exit
```

Pressione a opção desejada.

---

## ✅ Teste 1: Signup (Cadastro)

### Passo a Passo:

1. **Abra o app** → Deve mostrar tela de **Login**
2. **Clique em "Criar conta"** → Vai para tela de **Signup**
3. **Preencha os campos:**
   - Nome: `João Silva`
   - Email: `joao.silva@exemplo.com`
   - Senha: `senha123`
   - Confirmação: `senha123`
4. **Selecione uma empresa** (lista deve carregar automaticamente)
5. **Clique em "Cadastrar"**

### Resultados Esperados:

- ✅ Deve enviar POST para `/auth/signup`
- ✅ Spinner deve aparecer enquanto carrega
- ✅ Após sucesso, deve redirecionar para **Login**
- ✅ Se houver erro, mostra mensagem em vermelho

### Se der erro:

```
"Email já cadastrado"
→ Use outro email e tente novamente

"Erro de conexão"
→ Verifique internet e URL do backend

"Empresas não carregaram"
→ Verifique permissão de CORS no backend
```

---

## ✅ Teste 2: Login (Autenticação)

### Passo a Passo:

1. **Você está na tela de Login**
2. **Preencha com os dados que acabou de cadastrar:**
   - Email: `joao.silva@exemplo.com`
   - Senha: `senha123`
3. **Clique em "Entrar"**

### Resultados Esperados:

- ✅ Deve enviar POST para `/auth/login`
- ✅ Spinner deve aparecer
- ✅ Backend retorna JWT (`accessToken`)
- ✅ Deve chamar GET `/auth/me` automaticamente
- ✅ Restaurar dados do usuário
- ✅ Redirecionar para home `/(tabs)`

### Observar no Console:

```
[AuthService] Login realizado com sucesso
[AuthService] Buscando dados do usuário...
Usuário autenticado!
```

### Se der erro:

```
"Email ou senha incorretos"
→ Verif credenciais

"Erro de conexão"
→ Backend pode estar offline
```

---

## ✅ Teste 3: Persistência (O Mais Importante!)

### Passo a Passo:

1. **Você fez login e está na home**
2. **Feche o app completamente:**
   - Saia do Expo (Ctrl+C no terminal)
   - Ou force fechar o app no emulador
3. **Reabra o app:**
   ```bash
   npm start
   # Pressione 'a' ou 'i'
   ```

### Resultados Esperados:

- ✅ Deve mostrar LOADING spinner por 1-2 segundos
- ✅ Deve chamar GET `/auth/me` com token armazenado
- ✅ **NÃO deve mostrar Login novamente**
- ✅ Deve ir diretamente para **Home** com dados restaurados

### Se der erro:

```
Vai para Login sem motivo
→ Token pode não estar sendo armazenado
→ Verificar SecureStore (verificar console)

Fica em loading infinito
→ /auth/me pode estar lento ou token expirou
```

---

## ✅ Teste 4: Validação de Campos

### Teste 4.1: Email Vazio

- Tente fazer login sem preencer email
- ✅ Deve mostrar erro "Preencha todos os campos"

### Teste 4.2: Senha Curta no Signup

- Tente cadastrar com senha `123`
- ✅ Deve mostrar erro "Senha deve ter mín. 6 caracteres"

### Teste 4.3: Senhas Diferentes no Signup

- Senha: `senha123`
- Confirmação: `senha456`
- ✅ Deve mostrar erro "Senhas não conferem"

### Teste 4.4: Email Inválido

- Email: `nao-eh-email`
- ✅ Deve mostrar erro "Email inválido"

---

## ✅ Teste 5: Seletor de Tenant (Empresa)

### Passo a Passo:

1. **Vá para Signup**
2. **Ao carregar a tela:**
   - Deve carregar lista de empresas automaticamente
   - Deve mostrar spinner enquanto carrega
3. **Clique no seletor de empresa:**
   - Deve abrir dropdown com lista
4. **Selecione uma empresa:**
   - Deve fechar dropdown
   - Empresa selecionada aparece no botão
5. **Tente se cadastrar sem selecionar empresa:**
   - ✅ Deve mostrar erro "Selecione uma empresa"

---

## 🔍 Debug e Logs

### Abra o Console do Emulador/Simulator

```bash
# Já está aberto no terminal onde rodou 'npm start'
# Procure por logs com [AuthService], [Axios], etc
```

### Logs Esperados ao Fazer Login:

```
[AuthService] Login realizado com sucesso
[Axios] POST /auth/login - Status 200
[AuthService] Buscando dados do usuário (GET /auth/me)
[Axios] GET /auth/me - Status 200
[RootLayout] Sessão restaurada com sucesso
Redirecionando para /(tabs)
```

### Logs Esperados no Startup:

```
[RootLayout] Verificando status de autenticação...
[AuthService] Token encontrado em SecureStore
[AuthService] Validando token com GET /auth/me...
[AuthService] Usuário restaurado com sucesso
```

---

## 🐛 Troubleshooting Rápido

### Problema: "Cannot find module"

**Solução:**
```bash
npm install
npm start
```

### Problema: "API URL não encontrada"

**Solução:**
Verificar em `services/api/axios-client.ts`:
```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 
                      'https://aiutodesk-backend.onrender.com';
```

### Problema: "SecureStore returns null"

**Nota:** No web (browser), SecureStore pode não funcionar.
- Use Android/iOS para testar persistência
- ou Configure mock para web

### Problema: CORS Error

**Solução:** Backend precisa estar com CORS habilitado:
```typescript
app.enableCors();
```

---

## 📊 Checklist de Validação Final

### Funcionalidades:

- [ ] Signup com 2+ empresas diferentes funcionam
- [ ] Login com credenciais corretas funciona
- [ ] Login com credenciais incorretas mostra erro
- [ ] Persistência: Fechar e reabrir restaura sessão
- [ ] Validações de campo funcionam
- [ ] Seletor de empresa carrega e funciona
- [ ] Spinner mostra enquanto carrega
- [ ] Redireciona corretamente para tabs

### Erros Tratados:

- [ ] 400 Bad Request (validação)
- [ ] 401 Unauthorized (credenciais inválidas)
- [ ] 409 Conflict (email duplicado)
- [ ] Network Error (sem internet)

### Performance:

- [ ] Login < 3 segundos
- [ ] Signup < 3 segundos
- [ ] Persistência < 1 segundo
- [ ] Carregamento tenants < 2 segundos

---

## 📝 Após Validar

Se tudo passou:

```bash
git add .
git commit -m "feat(auth): Fase 1 validada e testada com sucesso"
git push
```

Se encontrou bugs:

```bash
git add .
git commit -m "fix(auth): Corrigir [descrição do bug]"
```

---

## 📞 Precisa de Ajuda?

1. **Verificar logs** no console
2. **Verificar URL** do backend em `axios-client.ts`
3. **Testar endpoint** no Postman primeiro
4. **Verificar permissões** de CORS no backend

---

**Boa sorte! 🚀**
