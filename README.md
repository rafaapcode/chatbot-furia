# ChatBot Fúria

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://webchat-furia.vercel.app/)

O **ChatBot Fúria** é uma aplicação web que simula uma conversa inteligente para fornecer informações sobre a organização Fúria e seu time de CS (Counter-Strike).  
Através da integração de tecnologias de IA, o chatbot consegue tanto responder perguntas comuns quanto buscar informações atualizadas na internet.

---

## ✨ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework React para desenvolvimento web.
- [TailwindCSS](https://tailwindcss.com/) — Framework de CSS utilitário.
- [OpenAI API](https://platform.openai.com/docs/) — Para geração de respostas conversacionais.
- [Perplexity API](https://www.perplexity.ai/) — Para buscas atualizadas na internet.

---

## 🔗 Acesso ao Projeto

O projeto está disponível publicamente em produção:

[**➡️ Acessar ChatBot Fúria**](https://webchat-furia.vercel.app/)

---

## 📷 Visão Geral


O **ChatBot** se comunica diretamente com a **API da OpenAI** para gerar respostas. Quando necessário ela usa uma tool que utiliza a integração com a **API do Perplexity** para trazer informações recentes da web.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Clonar o Repositório

Clone o repositório do projeto utilizando o comando abaixo:

```bash
git clone https://github.com/rafaapcode/chatbot-furia.git
```

### 2. Acessar o Diretório do Projeto

Após clonar, entre na pasta do projeto:

```bash
cd chatbot-furia
```

### 3. Instalar as Dependências

Instale todas as dependências necessárias para o funcionamento do projeto:

```bash
npm install
# ou
yarn install
```

### 4. Configurar as Variáveis de Ambiente

Crie um arquivo ```.env```  na raiz do projeto e adicione as seguintes variáveis:

```bash
PERPLEXITY_TOKEN=your_perplexity_token_here
OPEN_AI_API_KEY=your_openai_api_key_here
BASE_URL=PERPLEXTITY_API_URL
```

### 5. Iniciar o Servidor de Desenvolvimento

Execute o comando a seguir para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

### 6. Acessar a Aplicação

Abra o navegador e acesse:

```text
http://localhost:3000
```

--------

## 🛠️ Estrutura do Projeto

A estrutura principal do projeto está organizada da seguinte forma:

- `/components`: Contém os componentes reutilizáveis da interface.
- `/app`: Estrutura de rotas do Next.js, responsável pelas páginas da aplicação.
- `/actions`: Serviços para integração com APIs externas (OpenAI e Perplexity).

---

## 🧠 Funcionalidades

O **ChatBot Fúria** oferece as seguintes funcionalidades:

- **Simulação de conversas inteligentes** relacionadas à equipe de eSports Fúria.
- **Busca de informações atualizadas** utilizando a API do Perplexity.
- **Geração de respostas naturais** por meio da API da OpenAI (GPT).
- **Interface responsiva e otimizada**, proporcionando uma boa experiência em dispositivos móveis e desktop.

---
