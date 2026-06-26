# CPPEM Carreiras

Sistema completo de **Vagas e Carreiras** do **CPPEM Colégio e Cursos**, com:

- **Página pública** (`/carreiras`) — hero institucional, indicadores, busca e filtros, cards de vagas e página de detalhes com candidatura.
- **Área administrativa** (`/admin`) — autenticada via Supabase Auth, para cadastrar, editar, encerrar, reabrir e excluir vagas, além de gerenciar as configurações do site.

> O sistema **não captura dados de candidatos**. Toda candidatura é direcionada para um **formulário externo do Notion** (link aberto em nova aba).

---

## 🧱 Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS 3
- [Supabase](https://supabase.com/) (Postgres + Auth + RLS)
- Deploy na [Vercel](https://vercel.com/)

---

## 📁 Estrutura do projeto

```
src/
  app/
    page.tsx                      → redireciona para /carreiras
    carreiras/page.tsx            → página pública de vagas
    carreiras/[slug]/page.tsx     → detalhes da vaga
    admin/layout.tsx              → força renderização dinâmica do admin
    admin/login/page.tsx          → login (Supabase Auth)
    admin/dashboard/page.tsx      → métricas e resumos
    admin/vagas/page.tsx          → listagem + ações
    admin/vagas/nova/page.tsx     → nova vaga
    admin/vagas/[id]/editar       → editar vaga
    admin/configuracoes/page.tsx  → textos, indicadores, redes, formulário
  components/                     → JobCard, JobFilters, JobDetails, Hero,
                                    StatsSection, AboutSection, LinkedInCard,
                                    Footer, Header, Logo, JobsExplorer,
                                    admin/AdminLayout, admin/AdminJobForm,
                                    admin/RichTextEditor
  lib/
    supabase/client.ts            → cliente browser (anon key)
    supabase/server.ts            → cliente server (cookies)
    types.ts, constants.ts        → tipos e opções (setores, unidades, etc.)
    jobs.ts, settings.ts          → acesso aos dados
    slug.ts                       → geração de slug
  proxy.ts                        → protege rotas /admin
supabase/migrations/0001_init.sql → schema, RLS e seed
.env.example
```

---

## 🚀 Como rodar localmente

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente** (veja a próxima seção):

   ```bash
   cp .env.example .env.local
   # edite .env.local com os dados do seu projeto Supabase
   ```

3. **Rode o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

   Acesse:
   - Página pública: <http://localhost:3000/carreiras>
   - Admin: <http://localhost:3000/admin>

> Sem as variáveis do Supabase, a página pública abre normalmente (sem vagas) e o admin redireciona para o login.

---

## 🔐 Como configurar o Supabase

1. Crie um projeto em <https://supabase.com>.

2. Abra **SQL Editor → New query**, cole o conteúdo de
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) e clique em **RUN**.
   Isso cria as tabelas `jobs` e `site_settings`, as políticas de segurança (RLS),
   triggers de `updated_at` e alguns dados de exemplo.

3. **Crie o usuário administrador** (para acessar o `/admin`):
   - Vá em **Authentication → Users → Add user**.
   - Informe e-mail e senha (ex.: `administrador@cppem.com.br`).
   - Marque para confirmar o e-mail automaticamente (ou confirme manualmente).

   > O login usa **e-mail + senha**. Não há cadastro público de usuários — apenas
   > usuários criados no painel do Supabase conseguem entrar no admin.

4. Pegue as chaves em **Project Settings → API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Modelo de segurança (RLS)

| Tabela          | Público (anônimo)            | Autenticado (admin) |
| --------------- | ---------------------------- | ------------------- |
| `jobs`          | lê apenas `status = 'aberta'` | CRUD completo       |
| `site_settings` | leitura                      | leitura + edição    |

A página pública usa apenas a **anon key**. Nenhuma chave sensível é exposta no
client. A `service_role` **não é necessária** para o funcionamento padrão.

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env.local` (use `.env.example` como base):

| Variável                        | Obrigatória | Descrição                                            |
| ------------------------------- | ----------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | ✅          | URL do projeto Supabase                              |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅          | Chave pública (anon) do Supabase                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | ❌          | Apenas server-side, se algum dia for necessário      |

---

## ☁️ Como publicar na Vercel

1. Suba o repositório para o GitHub.
2. Em <https://vercel.com>, clique em **Add New → Project** e importe o repositório.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em **Deploy**. A Vercel detecta o Next.js automaticamente.
5. Após o deploy, acesse `https://SEU-DOMINIO.vercel.app/carreiras`.

---

## 📝 Formulário de candidatura (Notion)

- Os botões **"Candidatar-se agora"** abrem o formulário do Notion em nova aba
  (URL configurável em **Admin → Configurações → Link do formulário**).
- O sistema **não armazena** nome, e-mail, telefone, currículo ou qualquer dado
  pessoal de candidatos.

---

## 🗂️ Tipos de vaga

- **Trabalho** — vagas administrativas, comerciais, marketing, tecnologia,
  pedagógico, serviços gerais, etc. Campos: setor, tipo de vaga (presencial/
  híbrido/home office), unidade, local, horário previsto. Campos de conteúdo:
  **Responsabilidades, Requisitos e Qualificações, Benefícios**.
- **Professor** — docência. Campos: categoria (Polivalente ou de Disciplina),
  segmento, unidade, local. Campos de conteúdo: **Descrição da vaga, Requisitos
  e Qualificações, Benefícios**.

> Os campos de conteúdo possuem um editor com **negrito, itálico, listas e
> emojis** (o texto é salvo como HTML e exibido formatado na página da vaga).

As vagas aparecem em dois blocos na página pública: **"Encontre sua vaga de
Trabalho"** e **"Encontre sua vaga de Professor"**. Apenas vagas com status
**Aberta** são exibidas publicamente.

---

## 📦 Scripts

| Comando         | Descrição                       |
| --------------- | ------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento     |
| `npm run build` | Build de produção               |
| `npm run start` | Inicia o build de produção      |
| `npm run lint`  | Verifica o código com ESLint    |
